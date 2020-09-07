import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CheckSteps from "../../components/checkSteps";
import { SaveShipping } from "../../Actions/CartAction";

function ShippingScreen(props) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(SaveShipping({ address, city, postal, country }));
    props.history.push("payment");
  }

  return (
    <div className="ContentArea">
      <CheckSteps step1 step2></CheckSteps>
      <form onSubmit={handleSubmit} className="Form-Container">
        <div>
          <legend>Endereço</legend>
          <fieldset>
            <div className="Name">
              <label htmlFor="address">Endereço:</label>
              <input
                type="text"
                name="address"
                id="address"
                onChange={(address) => setAddress(address.target.value)}
                required
              />
            </div>
            <div className="Name">
              <label htmlFor="city">Cidade:</label>
              <input
                type="text"
                name="city"
                id="city"
                onChange={(city) => setCity(city.target.value)}
                required
              />
            </div>
            <div className="Name">
              <label htmlFor="codPostal">Código postal:</label>
              <input
                type="text"
                name="codPostal"
                id="codPostal"
                onChange={(codPostal) => setPostal(Number(codPostal.target.value))}
                required
              />
            </div>
            <div className="Name">
              <label htmlFor="country">País:</label>
              <input
                type="text"
                name="country"
                id="country"
                onChange={(country) => setCountry(country.target.value)}
                required
              />
            </div>

            <div className="container-button">
              <button type="submit" className="buttons primary">
                Continue
              </button>
            </div>
          </fieldset>
        </div>
      </form>
    </div>
  );
}
export default ShippingScreen;
