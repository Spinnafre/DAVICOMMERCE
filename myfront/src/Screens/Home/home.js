import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsPeopleCircle, BsSearch, BsArrowLeftShort } from "react-icons/bs";

import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../../Actions/listProducts";

import Rating from "../../components/Rating";

function Home(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const category = props.match.params.id ? props.match.params.id : "";
  // Pego a o meu estado
  const ProductList = useSelector((state) => state.productList);
  const { products, loading, error } = ProductList;

  // Disparador de actions
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));
    // api.get('products').then(products=>setProducts(products.data))
  }, [category]);

  // console.log("TELA HOME - PROPS MATCH ID:",props.match.params.id)
  // console.log("ProductList ",products)

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>
      {/* {category && <h3 className="Category-Name">Cetegoria: {category}</h3>} */}

      <ul
        className={
          category ? "filter category-filter-align" : "filter center-filter"
        }
      >
        {category ? (
          <Link to={"/"} className="Link-Back-Home">
            <BsArrowLeftShort size={30} /> Voltar para página inicial
          </Link>
        ) : (
          <div></div>
        )}
        <div className="Search-Container">
          <li className="Select-Order">
            {/* Ordenar por{" "} */}
            <label htmlFor="select">Ordenar por: </label>
            <select name="sortOrder" onChange={sortHandler} id="select">
              <option value=" ">Padrão</option>
              <option value="lowest">Preços Maiores</option>
              <option value="highest">Preços Menores</option>
            </select>
          </li>
          <li>
            <form onSubmit={submitHandler}>
              <input
                name="searchKeyword"
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Pesquisar..."
                autocomplete="off"
              />
              <button type="submit">
                <BsSearch size={25} />
              </button>
            </form>
          </li>
        </div>
      </ul>
      {loading ? (
        <div>Carregando...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="products">
          {products.map((product) => (
            <li className="product" key={product._id}>
              <div className="product1">
                <Link to={`/products/${product._id}`}>
                  <img src={product.image} alt="product" />
                </Link>
                <div className="product-name">
                  <Link to={`/products/${product._id}`}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="Container-Card-Footer">
                  <div className="price">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(product.price)}
                  </div>

                  <div className="product-rating">
                    <Rating
                      value={product.rating}
                      text={`(${product.numReviews})`}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default Home;
