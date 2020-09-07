import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./styles.css";

import { addToCart, RemoveFromCart } from "../../Actions/CartAction";
import {SaveOrder} from '../../Actions/OrderActions'

import { ImShocked } from "react-icons/im";
import CardPayment from "../../components/CardPaymanet";
import CheckSteps from "../../components/checkSteps";

function PlaceOrderScreen(props) {
  const StateInitial = useSelector((state) => state.addToCart);
  const { carts, shipping, payment } = StateInitial;
  const productQTD = props.location.search
    ? Number(props.location.search.split("=")[1]): 1;

  const itemPrice = carts.reduce((t, n) => t + n.price * n.qtd, 0);
  // Frete
  const shippingPrice = itemPrice > 100 ? 0 : 10;

  const taxPrice = Math.round(0.2 * itemPrice * 100) / 100;
  const totalPrice = itemPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();
  console.log(itemPrice,shippingPrice,taxPrice,totalPrice)
  useEffect(() => {}, []);
  if (!StateInitial.shipping.address) {
    props.history.push("/shipping");
  } else if (!StateInitial.payment) {
    props.history.push("/payment");
  }
  function OrderHandle(e) {
    dispatch(SaveOrder({
      cartItems:carts,shipping,
      payment:payment.paymentMethod,
      itemsPrice:itemPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    }))
    alert('Compra realizada com sucesso!')
    props.history.push("/profile");

  }

  return (
    <div>
      <div className="CheckSteps-Container">
        <CheckSteps step1 step2 step3 step4></CheckSteps>
      </div>
      <div className="cart">
        <div className="placeorder">
          <div className="Shipping-container">
            <h2>Informações do Comprador</h2>
            <div>
              <ul className="Container-Payment-Info">
                <li>
                  <strong>Rua: </strong>
                  {StateInitial.shipping.address}
                </li>
                <li>
                  <strong>Cidade: </strong> {StateInitial.shipping.city}
                </li>
                <li>
                  <strong>Código Postal: </strong>
                  {StateInitial.shipping.postal}
                </li>
                <li>
                  <strong>País: </strong> {StateInitial.shipping.country}
                </li>
              </ul>
            </div>
          </div>
          <div className="Payment-container">
            <h2>Pagamento</h2>
            <div>
              Método de pagamento:
              <CardPayment value={StateInitial.payment.paymentMethod} />
            </div>
          </div>
          <ul className="class-list-container">
            <li className="Container-Title-Cart">
              <h3 className="Title-Cart">Meu carrinho</h3>
              <div>Preço</div>
            </li>
            {carts.length === 0 ? (
              <div className="No-cart-Container">
                <span>Ops,Seu carrinho está vazio!</span>
                <ImShocked size={50} />
              </div>
            ) : (
              carts.map((product) => (
                <div className="cart-product-container" key={product.id}>
                  <img
                    src={product.img}
                    alt={product.name}
                    className="imgCart"
                  />
                  <div className="cart-name">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                    <div className="QtdDelete">Quantidade:{product.qtd}</div>
                  </div>
                  <div className="cart-price">
                    <strong>
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.price * product.qtd)}
                    </strong>
                  </div>
                </div>
              ))
            )}
          </ul>
        </div>

        <div className="placeorder-action">
          <ul className="placeorder-container-calculate">
            <li>
              <button onClick={OrderHandle} className="button">
                Encomendar
              </button>
            </li>
            <li className="placeorder-container-title">
              <h2>Valor da compra</h2>
            </li>
            <li>
              <div>Item</div>
              <div>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(itemPrice)}
              </div>
            </li>
            <li>
              <div>Frete</div>
              <div>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(shippingPrice)}
              </div>
            </li>
            <li>
              <div>Imposto</div>
              <div>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(taxPrice)}
              </div>
            </li>
            <li>
              <div>Total</div>
              <div>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(totalPrice)}
              </div>
            </li>
          </ul>

          {/* <button className="button" disabled={carts.length===0} onClick={checkoutHandler}>Comprar</button> */}
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
