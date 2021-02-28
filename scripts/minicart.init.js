import ReactDOM from "react-dom";
import React from "react";
import Minicart from "./components/minicart.js";

ReactDOM.render(
  <Minicart
    ref={(addedToCart) => {
      window.addedToCart = addedToCart;
    }}
  />,
  document.querySelector("#minicart")
);
