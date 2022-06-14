import React, { useState , useEffect } from 'react'
import { Modal, Button } from "react-bootstrap";

const EditBorderSize = (props) => {
 

  const [isValidateBorderSize, setisValidateBorderSize] = useState(true)
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
            <h2 className="pl-2 pt-2">Update Border Size</h2>
            <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
              <li></li>
            </ul>
            <div className="clearfix" />
            <div className="x_content"></div>
          </div>

          <p className="text-center">


            <div className="field item form-group">
              <label className="col-form-label col-md-4 col-sm-4  label-align">
                Enter Border Size<span className="required">*</span>
              </label>
              <div className="col-md-5 col-sm-5">
                <input
                  className={isValidateBorderSize ? "form-control" : "form-control requiredValidateInput"}
                  data-validate-length-range={6}
                  data-validate-words={2}
                  name="name"
                  placeholder="ex. 20/34"

                  value={props.EditBorderSizeState.borderSize1}
                  onChange={(e) => {


                    props.setEditBorderSizeState({ ...props.EditBorderSizeState, borderSize1: e.target.value })
                  }
                  }
                />
              </div>
              <div className="col-md-3">
                <button
                  type="submit"
                  className="btn btn-primary btn-sm px-3 "
                  onClick={(e) => {
                    if (props.EditBorderSizeState.borderSize1=="") {
                      setisValidateBorderSize(false)
                    } else {
                      setisValidateBorderSize(true)
                      props.updateBorderSize()
                    }
                
                  }}

                >
                  Update
                </button>
                <button type="submit" className="btn btn-danger btn-sm px-3 "
                  onClick={() => {
                    props.setModalShow(false)
                    setisValidateBorderSize(true)
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

export default EditBorderSize;
