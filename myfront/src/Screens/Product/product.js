import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Gravatar from "react-gravatar";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { productsDetails } from "../../Actions/listProducts";

import Rating from "../../components/Rating";
import { AddReview } from "../../Actions/ProductRegisterActions";

import { PRODUCT_REVIEW_RESET } from "../../constants/productConstants";

import { BsPeopleCircle, BsSearch, BsArrowLeftShort } from "react-icons/bs";

function Product(props) {
  const [Qtd, setQtd] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const userInfoSignin = useSelector((state) => state.UserLogin);
  const { userInfo } = userInfoSignin;

  const productDetail = useSelector((state) => state.productsDetails);
  const { product, loading, error } = productDetail;

  const ProductReviews = useSelector((state) => state.ProductReviews);
  const {
    success: ReviewSaveSuccess,
    loading: loadingReview,
    error: errorReview,
  } = ProductReviews;
  // console.log("productSaveSuccess - Tela: Product- dados= ",ProductReviews)
  const dispatch = useDispatch();

  // Sempre que salvar as reviews e o resultado for sucesso, então irá recarregar
  useEffect(() => {
    // Se salvar com sucesso irá limpar o campo Rating e Comment
    if (ReviewSaveSuccess) {
      alert("Comentário adicionado com sucesso!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_RESET });
    }

    dispatch(productsDetails(props.match.params.id));
    return () => {
      // cleanup
    };
  }, [ReviewSaveSuccess]);

  function handleAddToCart() {
    // Envio pela query o id e a Quantidade
    props.history.push(`/cart/${props.match.params.id}?qtd=${Qtd}`);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      AddReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  // console.log("Product= ",product?typeof(product.reviews.length):"Carregando")
  console.log("PRODUCT= ", product ? product.reviews.length : "Nada");
  return loading ? (
    <div>Carregando...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <>
      <div className="Container-Product">
        <div className="back-page">
          <a className="Link-Back-Home" onClick={()=>props.history.goBack()}> <BsArrowLeftShort size={30} /> Voltar para a página anterior</a>
        </div>
        <div className="Details">
          <div className="detail-img">
            <img src={product.image} alt="product" />
          </div>
          <div className="details-info">
            <ul>
              <li>
                <h2>{product.name}</h2>
              </li>
              <li>
                <a href="#reviews">
                  <Rating
                    value={product.rating}
                    text={product.numReviews + " reviews"}
                  />
                </a>
              </li>
              <li className="price-detail">
                <b>{Intl.NumberFormat("pt-BR", {style: "currency",currency: "BRL",}).format(product.price)}</b>
              </li>
              <li className="Desc-product">
                <strong>Descrição do produto:</strong>
                <div>{product.description}</div>
              </li>
            </ul>
          </div>

          <div className="details-action">
            <ul>
              <li>
                Preço: <strong>{Intl.NumberFormat("pt-BR", {style: "currency",currency: "BRL",}).format(product.price)}</strong>
                
              </li>
              <li>Disponível: {product.QtdStock > 0 ? "Sim" : "Não"}</li>
              <li>
                Quantidade:{" "}
                <select
                  value={Qtd}
                  onChange={(qtd) => setQtd(qtd.target.value)}
                >
                  {/* Criei um array com o tamanho da quantidade dos produtos
              selecioneis só os índices do array e somei o índice+1
               */}
                  {[...Array(product.QtdStock).keys()].map((x) => (
                    <option value={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </li>
              <li>
                {product.QtdStock > 0 ? (
                  <button onClick={handleAddToCart}>
                    Adicionar ao carrinho
                  </button>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="Container-Comments-Users">
        <h2 className="Header-Comments-Container">
          Avaliações dos Clientes ({product.numReviews})
        </h2>
        {userInfo ? (
          <div className="Container-Form-Area">
            <form className="Container-comment" onSubmit={submitHandler}>
              <h1>Avalie o produto</h1>

              <ul>
                <li>
                  <label htmlFor="rating-select">Classificação: </label>
                  <select
                    name="rating"
                    id="rating-select"
                    onChange={(v) => setRating(v.target.value)}
                    value={rating}
                  >
                    <option value="1">Muito ruim</option>
                    <option value="2">Ruim</option>
                    <option value="3">Bom</option>
                    <option value="4">Muito bom</option>
                    <option value="5">Excelente</option>
                  </select>
                </li>
                <li>
                  <label htmlFor="comment-area">Comentário: </label>
                  <textarea
                    name="comment"
                    id="comment-area"
                    placeholder="Digite o comentário..."
                    onChange={(text) => setComment(text.target.value)}
                  ></textarea>
                </li>
                <button type="submit" className="button">
                  Enviar comentários
                </button>
              </ul>
            </form>
          </div>
        ) : (
          <div className="Login-warning">
            <span>
              {" "}
              Por favor, faça o <Link to="/signin">Login</Link> para poder
              comentar
            </span>
          </div>
        )}
        {!product.reviews.length && <div>Sem avaliações</div>}
        <ul className="Comment">
          {product.reviews.map((prod) => (
            <li>
              <div className="Header-Comment-User">
                <div className="info-user-comment">
                  <h3>{prod.name.substring(0,10)}</h3>
                </div>
              </div>
              <div className="Content-Comment-User">
                <div className="stars-comment-user">
                  <Rating value={prod.rating} />
                </div>
                <div className="comment-user">{prod.comment}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default Product;
