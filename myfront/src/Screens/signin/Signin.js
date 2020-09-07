import React, { useEffect, useState } from "react";
// import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { Login } from "../../Actions/ActionsUsers";
import { Link } from "react-router-dom";

function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Pego o User Login do meu estado GLOBAL do store
  const LoginInfo = useSelector((state) => state.UserLogin);
  const { loading, userInfo, error } = LoginInfo;
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    /*Se o usuário já estiver cadastrado, então irá pular o 
    login (Tanto para a compra como quando o mesmo querer logar novamente)
    */
    if (userInfo) {
      //
      props.history.push(redirect);
    }
  }, [userInfo]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(Login(email, password));
  }

  return (
    <div className="ContentArea">
      <form onSubmit={handleSubmit} className="Form-Container">
        <div>
          {loading && <div>Carregando</div>}
          {error && <div>{error}</div>}
          <legend>Entrar</legend>
          <fieldset>
            <div className="button-form">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(email) => setEmail(email.target.value)}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="exemplo: user@gmail.com"
                required
              />
            </div>
            <div className="button-form">
              <label htmlFor="password">Senha:</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(password) => setPassword(password.target.value)}
                required
              />
            </div>
            <div className="container-button">
              <button type="submit" className="buttons primary">
                Entrar
              </button>
            </div>
            <div className="container-button">
              <Link
                to={
                  redirect === "/"
                    ? "register"
                    : "register?redirect=" + redirect
                }
                className="links"
              >
                Novo no Davicommerce?
              </Link>
            </div>
          </fieldset>
        </div>
      </form>
    </div>
  );
}
export default SigninScreen;
