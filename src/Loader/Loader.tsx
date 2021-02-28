// Source https://loading.io/css/
import "./loader.css";
import React from "react";

export const Loader = () => {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
