import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {Register} from '../../Actions/ActionsUsers'

function RegisterScreen(props) {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')

  const UserRegist=useSelector(state=>state.UserRegister)
  const {loading,error,userInfo}=UserRegist
  const redirect=props.location.search? props.location.search.split("=")[1]:'/'
  const dispatch = useDispatch();
  console.log("State Reducer Register = ",UserRegist)
  useEffect(() => {
    // Se as informações passadas pelo o usuário estiver OK
    if(userInfo){
      props.history.push(redirect)
      window.location.reload(false);
    }
  }, [userInfo]);
  
  function handleSubmit(e) {
    e.preventDefault()
    dispatch(Register(email,password,name))
  }

  return (
    <div className="ContentArea">
      <form onSubmit={handleSubmit} className="Form-Container">
        <div>
        {loading && <div>Carregando</div>}
        {error && <div>{error}</div>}
        <legend>Registrar</legend>
        <fieldset>
          <div className="button-form">
            <label htmlFor="name">Name:</label>
            <input type="name" name="name" id="name" onChange={name=>setName(name.target.value)} autocomplete="off" required/>
          </div>
          <div className="button-form">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" onChange={email=>setEmail(email.target.value)} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="exemplo: user@gmail.com" required/>
          </div>
          <div className="button-form">
            <label htmlFor="password">Senha:</label>
            <input type="password" name="password" id="password" onChange={password=>setPassword(password.target.value)} required/>
          </div>
          <div className="button-form">
            <label htmlFor="repassword">Confirme a Senha:</label>
            <input type=".button-form" name="repassword" id="repassword" onChange={password=>setConfirmPassword(password.target.value)} required/>
          </div>
          <div className="button-form">
            <button type="submit" className="buttons primary" >
              Registrar
            </button>
          </div>
          <div className="container-button">
              <Link to={redirect ==="/" ? "signin":"signin?redirect=/"+redirect} className="links">Já possui uma conta?</Link>
          </div>
        </fieldset>
        </div>
      </form>
    </div>
  );
}
export default RegisterScreen;
