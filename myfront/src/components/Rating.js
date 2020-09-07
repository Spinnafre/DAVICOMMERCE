import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
export default function Rating(props) {
  return !props.value ? (
    <div>
      <BsStar color="gray" size={20} />
      <BsStar color="gray" size={20} />
      <BsStar color="gray" size={20} />
      <BsStar color="gray" size={20} />
      <BsStar color="gray" size={20} />
      <BsStar color="gray" size={20} />
    </div>
  ) : (
    <div className="rating">
      <span>
        {props.value >= 1 ? (
          <BsStarFill color="orange" size={20} />
        ) : props.value >= 0.5 ? (
          <BsStarHalf color="orange" size={20} />
        ) : (
          <BsStar color="orange" size={20} />
        )}
      </span>

      <span>
        {props.value >= 2 ? (
          <BsStarFill color="orange" size={20} />
        ) : props.value >= 1.5 ? (
          <BsStarHalf color="orange" size={20} />
        ) : (
          <BsStar color="orange" size={20} />
        )}
      </span>

      <span>
        {props.value >= 3 ? (
          <BsStarFill color="orange" size={20} />
        ) : props.value >= 2.5 ? (
          <BsStarHalf color="orange" size={20} />
        ) : (
          <BsStar color="orange" size={20} />
        )}
      </span>

      <span>
        {props.value >= 4 ? (
          <BsStarFill color="orange" size={20} />
        ) : props.value >= 3.5 ? (
          <BsStarHalf color="orange" size={20} />
        ) : (
          <BsStar color="orange" size={20} />
        )}
      </span>

      <span>
        {props.value >= 5 ? (
          <BsStarFill color="orange" size={20} />
        ) : props.value >= 4.5 ? (
          <BsStarHalf color="orange" size={20} />
        ) : (
          <BsStar color="orange" size={20} />
        )}
      </span>

      <span>{props.text ? " " + props.text : ""}</span>
    </div>
  );
}
