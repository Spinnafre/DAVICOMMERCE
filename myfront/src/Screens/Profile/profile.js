import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Gravatar from "react-gravatar";
import "./styles.css";
import { Logout, UpdateUser } from "../../Actions/ActionsUsers";
import { ImExit } from "react-icons/im";
import { ListMyOrders } from "../../Actions/OrderActions";

import { IoMdCreate, IoIosTrash, IoIosAddCircle,IoIosClipboard } from "react-icons/io";

function ProfileScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const UserLogin = useSelector((state) => state.UserLogin);
  const { loading, error, userInfo } = UserLogin;

  const MyOrders = useSelector((state) => state.MyOrderList);
  const {
    loading: LoadingGetOrders,
    myOrder,
    error: ErrorGetOrders,
  } = MyOrders;

  console.log(
    "MyOrders- Tela Profile= ",
    LoadingGetOrders,
    " ",
    myOrder,
    " ",
    ErrorGetOrders
  );

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ListMyOrders());
    // Se as informações passadas pelo o usuário estiver OK
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
    }
  }, [userInfo]);
  console.log("InfoUser- Tela Profile= ", userInfo);
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(UpdateUser({ userId: userInfo._id, email, password, name }));
  }
  function handleLogout(e) {
    dispatch(Logout());
    props.history.push("/signin");
    window.location.reload(false);
  }
  function handleDetail(e) {
    dispatch(Logout());
    props.history.push("/signin");
  }
  return (
    <div className="ContentArea-Profile">
      <form  className="Form-Container Profile" onSubmit={handleSubmit}>
        <div className="container-profile-form">
          {loading && <div>Carregando</div>}
          {error && <div>{error}</div>}
          <legend>Editar Perfil</legend>
          <Gravatar
            email={email}
            size={120}
            rating="pg"
            default={"retro"}
            className="CustomAvatar-image"
          />
          <fieldset >
            <div className="button-form">
              <label htmlFor="name">Nome:</label>
              <input
                type="name"
                name="name"
                id="name"
                value={name}
                onChange={(name) => setName(name.target.value)}
                required
              />
            </div>
            <div className="button-form">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(email) => setEmail(email.target.value)}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="exemplo: user@gmail.com"
                required
              />
            </div>
            <div className="button-form">
              <label htmlFor="password">Nova senha:</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                onChange={(password) => setPassword(password.target.value)}
              />
            </div>
            <div className="button-form">
              <button
                type="submit"
                className="buttons primary"
                
              >
                Registrar
              </button>
            </div>
            <div className="button-form">
              <button type="button" className="button-logout" onClick={handleLogout}>
                Sair
                <ImExit size={22} />
              </button>
            </div>
          </fieldset>
        </div>
      </form>

      <div className="table-container MyOrders-Table-Container">
        <table className="MyOrders-Table">
          <thead>
            <tr className="Container-header-product-edit">
              <th>ID</th>
              <th>DATA</th>
              <th>TOTAL</th>
              <th>PAGO</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {LoadingGetOrders ? (
              <div>Carregando</div>
            ) : ErrorGetOrders ? (
              <div>{ErrorGetOrders}</div>
            ) : (
              myOrder.map((order) => (
                <tr key={order._id} className="Container-product-edit">
                  <td>{order._id}</td>
                  <td>{order.createdAt}</td>
                  <td >
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(order.totalPrice)}
                  </td>
                  <td>{order.isPaid?"Pago":"Não pago"}</td>
                  <td className="Container-buttons-td">
                    {/* <Link to={`/orderDetail/${order._id}`}>Detalhes</Link> */}
                    <Link to={`/orderDetail/${order._id}`} className="link-detail">
                        <span>Detalhes</span>
                        <IoIosClipboard size={25} />
                    </Link>
                    {"  "}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ProfileScreen;
