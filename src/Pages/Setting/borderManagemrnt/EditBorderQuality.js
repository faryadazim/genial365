import React, { useState , useEffect } from 'react'
import { Modal, Button } from "react-bootstrap";

const EditBorderQuality = (props) => {
 
const [isValidateBorderQuality, setisValidateBorderQuality] = useState(true)

 
  
  return (

    <div className='marginForModel'>  <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <>
        {" "}
        <div className="x_panel mb-0">
          <div className="x_title">
            <h2 className="pl-2 pt-2">Update Border Design</h2>
            <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
              <li></li>
            </ul>
            <div className="clearfix" />
            <div className="x_content"></div>
          </div>

          <p className="text-center pr-5 my-5"> 
            <div className="field item form-group">
              <label className="col-form-label col-md-4 col-sm-4  label-align">
                Enter Design Name<span className="required">*</span>
              </label>
              <div className="col-md-5 col-sm-5">
                <input
                  className={isValidateBorderQuality? "form-control" : "form-control requiredValidateInput"}
                  data-validate-length-range={6}
                  data-validate-words={2}
                  name="name"
                  placeholder="ex. Phool"
                  required="true"
                  value={props.EditBorderQualityState.borderQuality1}
                  onChange={(e) => {
                 
                    props.setEditBorderQualityState({ ...props.EditBorderQualityState, borderQuality1: e.target.value })
                  
                  }
                  }
                />
              </div>
              <div className="col-md-3">
                <button
                  type="submit"
                  className="btn btn-primary btn-sm px-3 "
               
                  onClick={(e) => { 

                    if (props.EditBorderQualityState.borderQuality1=="") {
                      setisValidateBorderQuality(false)
                    } else {
                      props.updateBorderQuality() 
                      setisValidateBorderQuality(true)
                    } 
                  
            

                  }}

                >
                  Update
                </button>
                <button type="submit" className="btn btn-danger btn-sm px-3 "
                  onClick={() => {
                    props.setModalShow(false) 
                  }}>
                  Cancel
                </button>
              </div>
            </div>
          </p>
        </div>
      </>
    </Modal></div>
  );
};

export default EditBorderQuality;
