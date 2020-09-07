import React from "react";
import { BsPeopleCircle } from "react-icons/bs";
import { TiShoppingCart} from "react-icons/ti";
import { IoMdCloseCircle, IoLogoGithub,IoIosCreate,IoMdCalendar } from "react-icons/io";
import { BsController, BsTagFill, BsAwardFill } from "react-icons/bs";
import Gravatar from "react-gravatar";

import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from "./Screens/Home/home";
import ProductScreen from "./Screens/Product/product";
import CartScreen from "./Screens/Cart/Cart";
import SigninScreen from "./Screens/signin/Signin";
import RegisterScreen from "./Screens/Register/Register";
import ProductRegistrer from "./Screens/ProductRegister/ProductRegister";
import { useSelector } from "react-redux";
import ShippingScreen from "./Screens/Shipping/Shipping";
import PaymentScreen from "./Screens/Payment/Payment";
import PlaceOrderScreen from "./Screens/PlaceOrder/PlaceOrder";
import ProfileScreen from "./Screens/Profile/profile";
import OrderDetail from "./Screens/OrderDetail/OrderDetail";
import OrdersScreen from "./Screens/OrderScreen/OrderScreen";

function App() {
  const UserLogin = useSelector((state) => state.UserLogin);
  const { userInfo } = UserLogin;
  function openMenu() {
    const side = document.querySelector(".sideMenu");
    side.classList.add("open");
  }
  function closeMenu() {
    const side = document.querySelector(".sideMenu");
    side.classList.remove("open");
  }

  return (
    <BrowserRouter>
      <div className="container-grid">
        <header className="Header">
          <div className="container-left">
            <button className="button-side" onClick={openMenu}>
              &#9776;
            </button>
            <div className="brand">
              <Link to="/">DAVICOMMERCE</Link>
            </div>
          </div>
          <div className="header-links">
            <Link to="/cart" className="cart-container">
              <span>Carrinho</span>
              <TiShoppingCart color="orange" size={35} />
            </Link>
            {userInfo && userInfo.isADM ? (
              <Link to="/orders" className="cart-container">
                <span>Entregas</span>
                <IoMdCalendar color="orange" size={35} />
              </Link>
            ) : (
              ""
            )}
            {userInfo && userInfo.isADM ? (
              <Link to="/product/register" className="cart-container">
                <span>Estoque</span>
                <IoIosCreate size={35} color="orange"/>

              </Link>
            ) : (
              ""
            )}

            

            {userInfo ? (
              <Link to="/profile" className="profile-container">
                <span>{userInfo.name.split(" ")[0]}</span>
                <Gravatar
                  email={userInfo.email}
                  size={50}
                  rating="pg"
                  default={"retro"}
                  className="CustomAvatar-image"
                />
              </Link>
            ) : (
              <Link to="/signin" className="register-container">
                <span>Entrar</span>
                <BsPeopleCircle color="white" size={30} />
              </Link>
            )}
          </div>
        </header>

        <main className="Main">
          <div className="content">
            <Route component={Home} path="/category/:id" />
            <Route component={Home} path="/" exact />
            <Route component={ProductScreen} path="/products/:id" />
            <Route component={CartScreen} path="/cart/:id?" />
            <Route component={SigninScreen} path="/signin" />
            <Route component={RegisterScreen} path="/register" />
            <Route component={ProductRegistrer} path="/product/register" />
            <Route component={ShippingScreen} path="/shipping" />
            <Route component={PaymentScreen} path="/payment" />
            <Route component={PlaceOrderScreen} path="/place-order" />
            <Route component={ProfileScreen} path="/profile" />
            <Route component={OrderDetail} path="/orderDetail/:id" />
            <Route component={OrdersScreen} path="/orders" />
          </div>
        </main>

        <aside className="sideMenu">
          <h3>
            Categorias <BsTagFill size={30} />
          </h3>
          <button className="closeMenu" onClick={closeMenu}>
            <IoMdCloseCircle color="red" size={35} />
          </button>
          <ul>
            <div className="Group-Container">
              <h3 className="Ttitle-Group">
                Roupas <BsAwardFill size={30} />
              </h3>
              <li>
                <Link to="/category/Camisa">Camisas</Link>
                <li>
                  <Link to="/category/Tênis">Tênis</Link>
                </li>
              </li>
            </div>
            <div className="Group-Container">
              <h3 className="Ttitle-Group">
                Eltrônicos <BsController size={30} />
              </h3>
              <li>
                <Link to="/category/Consoles">Consoles</Link>
              </li>
              <li>
                <Link to="/category/Games">Games</Link>
              </li>
              <li>
                <Link to="/category/Smartphone">Smartphone</Link>
              </li>
            </div>
          </ul>
        </aside>

        <footer className="Footer">
          <span className="Link-Github">
            <a
              href="https://github.com/Spinnafre"
              target="_blank"
              rel="noopener noreferrer"
            >
              <b>
                <IoLogoGithub size={30} />
              </b>
              Spinnafre{" "}
            </a>
          </span>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
