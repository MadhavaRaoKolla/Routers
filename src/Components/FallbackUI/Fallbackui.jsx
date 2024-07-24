import React from "react";
import "./Fallbackui.scss";

const Fallbackui = () => {
  return (
    <div className="fallback">
      <h2>Hi, you should'nt be here.</h2>
      <h3>Something went wrong...!</h3>
      <p>Have a look at console.</p>
    </div>
  );
};

export default Fallbackui;
