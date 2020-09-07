import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./styles.css";
import { addToCart,RemoveFromCart } from "../../Actions/CartAction";
import { BsPeopleCircle, BsSearch, BsArrowLeftShort } from "react-icons/bs";

function CartScreen(props) {
  const StateInitial = useSelector(state => state.addToCart);
  const {carts}=StateInitial
  const productQTD = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const productID = props.match.params.id;

  const dispatch = useDispatch();
  useEffect(() => {
    // Se tiver algum
    if (productID) {
      dispatch(addToCart(productID, productQTD));
    }
  }, []);

  function RemoveItemFromCart(ID){
    dispatch(RemoveFromCart(ID))
  }
  function checkoutHandler(){
    props.history.push(`/signin?redirect=shipping`)
  }
  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="class-list-container">
          <div className="back-page">
          <a className="Link-Back-Home" onClick={()=>props.history.goBack()}> <BsArrowLeftShort size={30} /> Voltar para a página anterior</a>
        </div>
          <li className="Container-Title-Cart">
            <h3 className="Title-Cart" >Meu carrinho</h3>
            <div>Preço</div>
          </li>
          {carts.length === 0 ? (
            <div>Seu carrinho está vazio</div>
          ) : (
            carts.map((product) => (
              <div className="cart-product-container" key={product.id}>
                <img src={product.img} alt={product.name} className="imgCart"/>
                <div className="cart-name">
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                  <div className="QtdDelete">
                    Qtd:{" "}
                    <select value={product.qtd} onChange={e=>dispatch(addToCart(product.id,e.target.value))}>
                      {[...Array(product.QtdStock).keys()].map((qtd) => (
                        <option value={qtd + 1} key={qtd}>{qtd + 1}</option>
                      ))}
                    </select>
                    <button type="button" onClick={()=>RemoveItemFromCart(product.id)}>Deletar</button>
                  </div>
                </div>
                <div className="cart-price"><strong>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price * product.qtd)}</strong></div>
                
              </div>
            ))
          )}
        </ul>
      </div>

      <div className="cart-action">
        <h2>
          Total (
          {carts.reduce((t, p) => {
            return t + p.qtd;
          }, 0)}
          {" "}items) : {"  "}
          
          { Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(carts.reduce((t, p) => {
            return t + p.price * p.qtd 
          }, 0)) }
          
        </h2>
        <button className="button" disabled={carts.length===0} onClick={checkoutHandler}>Comprar</button>
      </div>
    </div>
  );
}

export default CartScreen;
