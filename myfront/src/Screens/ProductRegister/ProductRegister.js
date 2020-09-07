import React, { useEffect, useState } from "react";
import { AiFillFileAdd } from "react-icons/ai";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { Register, Delete } from "../../Actions/ProductRegisterActions";
import { listProducts } from "../../Actions/listProducts";
import { IoMdCreate, IoIosTrash, IoIosAddCircle } from "react-icons/io";
import api from "../../api/api";

import Dropzone from "../../components/UploadIMG";

function ProductScreen(props) {
  const [modaVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [selectedImg, setSelectedImg] = useState("");
  const [brande, setBrande] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [QtdStock, setQtdStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  // Product SAVE
  const Productregister = useSelector((state) => state.ProductRegister);
  const {
    loading: loadingSave,
    error: errorSave,
    sucess: sucessSave,
  } = Productregister;

  // Product list
  const listProduct = useSelector((state) => state.productList);
  const { loading, error, products } = listProduct;

  // PRODUCT DELETE
  const productDel = useSelector((state) => state.ProductDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    sucess: sucessDelete,
  } = productDel;

  const dispatch = useDispatch();
  useEffect(() => {
    if (sucessSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
  }, [sucessSave, sucessDelete]);
  console.log("SELECTED IMG= ", selectedImg);
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      Register({
        _id: id,
        name,
        image,
        brande,
        price,
        category,
        QtdStock,
        description,
      })
    );
  }
  function OpenModal(product) {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setBrande(product.brande);
    setCategory(product.category);
    setDescription(product.description);
    setPrice(product.price);
    setQtdStock(product.QtdStock);
    setImage(product.image);
  }
  function closeModel() {
    setModalVisible(false);
  }
  function HandleDelete(product) {
    console.log("ESTOU DELETANDO O ", product._id);
    if (window.confirm("Tem certeza que deseja deletar o produto?")) {
      dispatch(Delete(product._id));
    }
  }
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploading(true);
    await api
      .post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setImage(response.data.image_URL);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  return (
    <div className="ContentAreaRegister">
      {modaVisible && (
        <form onSubmit={handleSubmit} className="Form-Container">
          <div>
            {loading && <div>Carregando</div>}
            {error && <div>{error}</div>}
            <legend>Cadastre o seu produto</legend>
            <fieldset>
              {image && (
                <div className="Image-Preview">
                  <img src={image} alt="" />
                </div>
              )}
              <div className="input">
                <label htmlFor="price">URL da imagem:</label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={image}
                  placeholder="Cole a URL da imagem ou insira um arquivo"
                  onChange={(image) => setImage(image.target.value)}
                />
              </div>

              <div className="label-input-file">
                <label htmlFor="input-file" >
                    <span>Upload do arquivo</span>
                </label>
                <input
                  type="file"
                  onChange={uploadFileHandler}
                  id="input-file"
                ></input>
                {uploading && <div>Enviando...</div>}
              </div>

              <div className="input">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  required
                  onChange={(name) => setName(name.target.value)}
                />
              </div>
              <div className="input">
                <label htmlFor="price">Preço:</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={price}
                  title="Use o '.' ao invés de ','"
                  required
                  onChange={(price) => setPrice(price.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="desc">Descricao:</label>
                <textarea
                  type="text"
                  name="description"
                  id="desc"
                  value={description}
                  required
                  onChange={(descricao) =>
                    setDescription(descricao.target.value)
                  }
                ></textarea>
              </div>
              <div className="input">
                <label htmlFor="price">Categoria:</label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={category}
                  required
                  onChange={(category) => setCategory(category.target.value)}
                />
              </div>
              <div className="input">
                <label htmlFor="price">Quantidade no Estoque:</label>
                <input
                  type="text"
                  name="stock"
                  id="stock"
                  value={QtdStock}
                  required
                  onChange={(stock) => setQtdStock(stock.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="brand">Marca:</label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={brande}
                  required
                  onChange={(brand) => setBrande(brand.target.value)}
                />
              </div>

              <div className="container-button">
                <button type="submit" className="buttons primary">
                  {id ? "Atualizar" : "Criar"}
                </button>
                <button
                  type="button"
                  className="buttons primary"
                  onClick={closeModel}
                >
                  Voltar
                </button>
              </div>
            </fieldset>
          </div>
        </form>
      )}

      <div
        className={modaVisible ? "close-product-list" : "product-list"}
        autocomplete="off"
      >
        <div className="product-header">
          <button onClick={() => OpenModal({})} className="buttonF create">
            <span> Criar Produto</span>
            <IoIosAddCircle size={28} />
          </button>
        </div>
        <div className="table-container">
          <table className="Product-Register-Table">
            <thead >
              <tr className="Container-header-product-edit">
                <th>ID</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Marca</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="Container-product-edit">
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(product.price)}
                  </td>
                  <td>{product.category}</td>
                  <td>{product.brande}</td>
                  <td className="Container-buttons-td">
                    <button
                      onClick={() => OpenModal(product)}
                      className="buttonF edit"
                    >
                      <span>Editar</span>
                      <IoMdCreate size={20} />
                    </button>
                    {"  "}
                    <button
                      onClick={() => HandleDelete(product)}
                      className="buttonF delete"
                    >
                      <span>Deletar</span>
                      <IoIosTrash size={25} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default ProductScreen;
