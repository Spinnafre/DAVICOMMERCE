import express from "express";
import Product from "../models/Products";
import multer from "multer";
import { getToken, isAuth, isAdm } from "../../utils";


// import storageConfig from '../config/config'

// const upload = multer(storageConfig)

const router = express.Router();

router.get("/products", async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const searchKeyword = req.query.searchKeyword
    ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: "i",
        },
      }
    : {};

  const sortOrder = req.query.sortOrder
    ? req.query.sortOrder === "lowest"
      ? { price: 1 }
      : { price: -1 }
    : { _id: -1 };

  const products = await Product.find({ ...category, ...searchKeyword }).sort(
    sortOrder
  );
  return res.status(200).send(products);
});

router.get("/products/:id", async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
  });
  if (product) {
    return res.status(200).send(product);
  } else {
    return res.status(400).send({ mensage: "Product not found" });
  }
});

router.post("/products", isAuth, isAdm, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    brande: req.body.brande,
    price: req.body.price,
    category: req.body.category,
    QtdStock: req.body.QtdStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(200)
      .send({ message: "Produto Criado", data: newProduct });
  } else {
    return res.status(500).send({ message: "Falha ao cadastrar produto" });
  }
});

router.put("/products/:id", isAuth, isAdm, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.image = req.body.image;
    product.brande = req.body.brande;
    product.price = req.body.price;
    product.category = req.body.category;
    product.QtdStock = req.body.QtdStock;
    product.description = req.body.description;

    const newProduct = await product.save();
    if (newProduct) {
      return res
        .status(200)
        .send({ message: "Produto Atualizado com sucesso", data: newProduct });
    }
  }
  return res.status(500).send({ message: "Falha ao Atualizar produto" });
});

router.post("/:id/reviews", isAuth, async (req, res) => {
  const prodID = req.params.id;
  const product = await Product.findById(prodID);
  if (product) {
    const review = {
      rating: Number(req.body.rating),
      name: req.body.name,
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    // Calcular a média dos reviews para adicionar na média geral do produto
    product.rating = product.reviews.reduce(
      (acumulator, nextReview) =>(nextReview.rating + acumulator),0) / product.reviews.length;

    const newProduct=await product.save()
    // retorno a review que adicionei
    return res.status(201).send({data:newProduct.reviews[newProduct.reviews.length-1],message:"Review adicionada com sucesso!"})
  }
  else{
    return res.status(400).send({message:"Não foi possível adicionar a review"})
  }
});

router.delete("/products/:id", isAuth, isAdm, async (req, res) => {
  // const productId = req.params.id;
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: "Product Deleted" });
  } else {
    res.send("Error in Deletion.");
  }
});

export default router;
