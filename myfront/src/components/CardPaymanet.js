import React from "react";
import {
  FaCcPaypal,
  FaCcVisa,
  FaCcMastercard,
  FaBitcoin,
} from "react-icons/fa";

export default function Cards(props) {
  return !props.value ? (
    <div></div>
  ) : (
    <div className="rating">
      <span>
        {props.value === "Visa" ? (
          <FaCcVisa size={36} />
        ) : props.value === "Mastercard" ? (
          <FaCcMastercard size={36} />
        ) : props.value==="Bitcoin"?(
          <FaBitcoin size={36} />
        ): props.value==="Paypal"?(
          <FaCcPaypal size={36} />
        ):""
        }
      </span>
    </div>
  );
}
