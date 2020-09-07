import express, { response } from "express";
import {isAdm, isAuth } from "../../utils";
import Order from "../models/OrderModel";

const Router = express.Router();

// Pegar todos as encomendas de um usuário
Router.get("/", isAuth,isAdm, async(req, res) => {
  // Pego todos o Orders e relaciono cada um com o userId (Referenciado a tabela User),
  // retornando os dados de Order + User
  try {
    const order = await Order.find({}).populate("userId");
  if (order) {
    return res
      .status(200)
      .send({ message: "Operação realizada com sucesso!", data: order });
  } else {
    return res.status(400).send({ message: "Falha ao encontrar no banco!" });
  }
  } catch (error) {
    return res.status(400).send({ message: "Falha no servidor "+ error });
  }

});
// Pegar todos as encomendas de um usuário
Router.get("/my", isAuth, async (req, res) => {
  // Req.user._id é pagado da Autenticação isAuth, ou seja
  // Estou pegando o id do usuário que está logado e usando o sistema
  const order = await Order.find({userId:req.user._id});
  if (order) {
    return res
      .status(200)
      .send({ message: "Operação realizada com sucesso!", data: order });
  } else {
    return res.status(400).send({ message: "Falha ao encontrar no banco!" });
  }
});

// Pegar encomenda específica de um usuário no meio de várias encomendas
Router.get("/:id", isAuth, async (req, res) => {
  const order = await Order.findOne({_id:req.params.id});
  if (order) {
    return res
      .status(200)
      .send({ message: "Operação realizada com sucesso!", data: order });
  } else {
    return res.status(400).send({ message: "Falha ao encontrar no banco!" });
  }
});

//Enviar dados da encomenda para o banco
Router.post("/sendOrder", isAuth, async (req, res) => {
    try {
      const neworder = new Order({
        cartItems: req.body.cartItems,
        userId: req.user._id,
        // Addres, City, Country, PostalCOde...
        shipping: req.body.shipping,
        // Payment Method
        payment: req.body.payment,
        // Informações da Encomenda
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
      });
  
      console.log("DATA= ",neworder)
      const newProd = await neworder.save();
      return res.status(201).send({ data: newProd, message: "Pagamento adicionado com sucesso!" });
    } catch (error) {
      return res.status(400).send({message:`Error ao tentar enviar Encomenda ao banco de dados, descrição: ${error.message}`})
    }
});
Router.put("/:id/pay", isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: req.body.payment,
      paymentResult: {
        payerID: req.body.payerID,
        orderID: req.body.orderID,
        paymentID: req.body.paymentID,
      },
    };
    const newOrder = await order.save();
    return res
      .status(201)
      .send({ message: "Atualização realizada com sucesso!", data: newOrder });
  } else {
    return res.status(401).send({
      message:
        "Não foi possível realizar o atualização do produto, dados inválidos ou algum problema no servidor",
    });
  }
});
Router.delete("/:id", isAuth,isAdm, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const deleted = await order.remove();
    return res
      .status(201)
      .send({ message: "Produto deletado com sucesso", data: deleted });
  } else {
    return res.status(401).send({ error: "Falha ao deletar o produto!" });
  }
});

export default Router;
