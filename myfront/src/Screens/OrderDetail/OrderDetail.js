import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";

import CardPayment from "../../components/CardPaymanet";
import { ImShocked } from "react-icons/im";

import Rating from "../../components/Rating";
import { DetailOrder } from "../../Actions/OrderActions";

import { BsPeopleCircle, BsSearch, BsArrowLeftShort } from "react-icons/bs";
import { PRODUCT_REVIEW_RESET } from "../../constants/productConstants";

function OrderDetail(props) {
  const userInfoSignin = useSelector((state) => state.UserLogin);
  const { userInfo } = userInfoSignin;

  const OrderDetail = useSelector((state) => state.DetailOrder);
  const {
    order,
    loading: LoadingGetDetailOrder,
    error: ErrorGetDetailOrder,
  } = OrderDetail;

  const OrderPayOrder = useSelector((state) => state.PayOrder);
  const { order: PaymentOrder, loading, error, success } = OrderPayOrder;

  // console.log("cartOrderSaveSuccess - Tela: cartOrder- dados= ",cartOrderReviews)
  const dispatch = useDispatch();
  console.log("Order Detail - Tela OrderDetails- info: ",order," ",LoadingGetDetailOrder," ",ErrorGetDetailOrder)
  // Sempre que salvar as reviews e o resultado for sucesso, então irá recarregar
  useEffect(() => {
    // Se salvar com sucesso irá limpar o campo Rating e Comment
    if (success) {
      alert("Pagamento realizado!");
      dispatch({ type: PRODUCT_REVIEW_RESET });
    }

    dispatch(DetailOrder(props.match.params.id));
  }, [success]);


  return LoadingGetDetailOrder ? (
    <div>Carregando...</div>
  ) : ErrorGetDetailOrder ? (
    <div>
      Error ao tentar pegar os datalhes da encomenda: {ErrorGetDetailOrder}
    </div>
  ) : (
    <>
      <div className="Container-Product">
        <div className="back-page">
          <button className="Link-Back-Home" onClick={()=>props.history.goBack()}>
            <BsArrowLeftShort size={30} /> Voltar para a tela Anterior
          </button>
        </div>
        <div className="cart">
        <div className="placeorder">
          <div className="Shipping-container">
            <h2>Informações do Comprador</h2>
            <div>
              <ul className="Container-Payment-Info">
                <li>
                  <strong>Rua: </strong>
                  {order.shipping.address}
                </li>
                <li>
                  <strong>Cidade: </strong> {order.shipping.city}
                </li>
                <li>
                  <strong>Código Postal: </strong>
                  {order.shipping.postal}
                </li>
                <li>
                  <strong>País: </strong> {order.shipping.country}
                </li>
              </ul>
            </div>
          </div>
          <div className="Payment-container">
            <h2>Pagamento</h2>
            <div>
              Método de pagamento:
              <CardPayment value={order.payment} />
            </div>
          </div>
          <ul className="class-list-container">
            <li className="Container-Title-Cart">
              <h3 className="Title-Cart">Meu carrinho</h3>
              <div>Preço</div>
            </li>
            {order.cartItems.length === 0 ? (
              <div className="No-cart-Container">
                <span>Ops,Seu carrinho está vazio!</span>
                <ImShocked size={50} />
              </div>
            ) : (
                order.cartItems.map((cartOrder) => (
                <div className="cart-product-container" key={cartOrder.id}>
                  <img
                    src={cartOrder.img}
                    alt={cartOrder.name}
                    className="imgCart"
                  />
                  <div className="cart-name">
                    <Link to={`/products/${cartOrder.id}`}>{cartOrder.name}</Link>
                    <div className="QtdDelete">Quantidade:{cartOrder.qtd}</div>
                  </div>
                  <div className="cart-price">
                    <strong>
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(cartOrder.price * cartOrder.qtd)}
                    </strong>
                  </div>
                </div>
              ))
            )}
          </ul>
        </div>
        <div className="placeorder-action">
          <ul className="placeorder-container-calculate">
            {/* <li>
              <button onClick={OrderHandle} className="button">
                Encomendar
              </button>
            </li> */}
            <li className="placeorder-container-title">
              <h2>Valor da compra</h2>
            </li>
            <li>
              <div>Item</div>
              <div>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(order.itemsPrice)}
              </div>
            </li>
            <li>
              <div>Frete</div>
              <div>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(order.shippingPrice)}
              </div>
            </li>
            <li>
              <div>Imposto</div>
              <div>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(order.taxPrice)}
              </div>
            </li>
            <li>
              <div>Total</div>
              <div>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(order.totalPrice)}
              </div>
            </li>
          </ul>

          {/* <button className="button" disabled={carts.length===0} onClick={checkoutHandler}>Comprar</button> */}
        </div>
        </div>

        
      </div>
    </>
  );
}
export default OrderDetail;

          {/* <button className="button" disabled={carts.length===0} onClick={checkoutHandler}>Comprar</button> */}