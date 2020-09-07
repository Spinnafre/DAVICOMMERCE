import React, { useEffect, useState } from "react";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CheckSteps from "../../components/checkSteps";
import { SavePayment } from "../../Actions/CartAction";

import { FaCcPaypal, FaCcVisa, FaCcMastercard, FaBitcoin } from "react-icons/fa";

function PaymentScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(SavePayment({ paymentMethod }));
    props.history.push("place-order");
  }

  return (
    <div className="ContentPayment">
      <CheckSteps step1 step2 step3></CheckSteps>
      <form onSubmit={handleSubmit} className="Form-Container">
        <div>
          <legend>Pagamento</legend>
          <ul className="Container-Payment-Icons">
            <li>
              <input
                type="radio"
                name="payment"
                id="payment"
                onChange={(payment) => setPaymentMethod(payment.target.value)}
                value="Paypal"
                required
              />
              <FaCcPaypal size={30} />
            </li>
            <li>
              <input
                type="radio"
                name="payment"
                id="payment"
                onChange={(payment) => setPaymentMethod(payment.target.value)}
                value="Visa"
                required
              />
              <FaCcVisa size={30} />
            </li>
            <li>
              <input
                type="radio"
                name="payment"
                id="payment"
                onChange={(payment) => setPaymentMethod(payment.target.value)}
                value="Mastercard"
                required
              />
              <FaCcMastercard size={30} />
            </li>
            <li>
              <input
                type="radio"
                name="payment"
                id="payment"
                onChange={(payment) => setPaymentMethod(payment.target.value)}
                required
                value="Bitcoin"
              />
              <FaBitcoin size={30} />
            </li>
          </ul>
        </div>
        <div className="container-button">
          <button type="submit" className="buttons primary">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
export default PaymentScreen;
