import React , {useState}from 'react'
import { Modal, Button } from "react-bootstrap";

const EditBorderQuality = (props) => {
    const [isDisabledSubmitButton , setISDisableButton] = useState(false)
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
            <h2 className="pl-2 pt-2">Update Border Quality</h2>
            <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
              <li></li>
            </ul>
            <div className="clearfix" />
            <div className="x_content"></div>
          </div>
        
          <p className="text-center">
         {
            isDisabledSubmitButton  &&    <div className='mb-2'>       <code >  Make Sure to Fill All Values</code></div>
         }

            <div className="field item form-group">
              <label className="col-form-label col-md-4 col-sm-4  label-align">
                Enter Quality Name<span className="required">*</span>
              </label>
              <div className="col-md-5 col-sm-5">
                <input
                  className="form-control"
                  data-validate-length-range={6}
                  data-validate-words={2}
                  name="name"
                  placeholder="ex. Phool"
                  required="true"
                 value={props.EditBorderQualityState.borderQuality1}
                  onChange={(e) =>
                   {
            
                    setISDisableButton(false)
                    props.setEditBorderQualityState({...props.EditBorderQualityState ,  borderQuality1: e.target.value })}
                  }
                />
              </div>
              <div className="col-md-3">
              <button
                type="submit"
                className="btn btn-primary btn-sm px-3 "
                onClick={(e) => {
                    setISDisableButton(false)
              
                    if (props.EditBorderQualityState.borderQuality1=="") {
                        setISDisableButton(true)
                    }else{
                      props.updateBorderQuality()
                    }

                }}
    
              >
                Submit
              </button>
              <button type="submit" className="btn btn-danger btn-sm px-3 "
               onClick={()=>{props.setModalShow(false)
                setISDisableButton(false) }}>
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
