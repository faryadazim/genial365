import React from "react";
import "./Loader.css";
const Loader = () => {
  return (
    <>
      <div className="right_col  heightOfLoader   " role="main">
        <div className="loader   " style={{marginTop:'250px'}}>
          <div className="outer" />
          <div className="middle" />
          <div className="inner" />
        </div>
      </div>
    </>
  );
};

export default Loader;
