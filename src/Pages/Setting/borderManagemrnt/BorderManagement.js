import React, { useEffect, useState } from "react";

import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loader from "../../../Layout/Loader/Loader";
import BorderQuality from "./BorderQuality";
import BorderSize from "./BorderSize";

const BorderManagement = () => {
  const showNavMenu = useSelector((state) => state.NavState);  

  
  const [isLoadBorderQuality ,setisLoadBorderQuality ] = useState(true)
  const [isLoadBorderSize ,setisLoadBorderSize ] = useState(false)
  useEffect(() => {}, []);

  return (
    <>
      {isLoadBorderSize  && isLoadBorderQuality? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div
            className={`right_col  h-100 paddingOnContentInBorderManagement  ${
              showNavMenu == false ? "right_col-margin-remove" : " "
            } `}
            role="main"
          >
            {" "}
      
          
              {/* Model  */}
              <div className="col-md-6">    
                 <BorderQuality  setisLoadBorderQuality={setisLoadBorderQuality}/>
              </div>
              <div className="col-md-6"> 
              <BorderSize setisLoadBorderSize={setisLoadBorderSize} />
              </div>
             
              
          </div>
        </>
      )}
    </>
  );
};

export default BorderManagement;
