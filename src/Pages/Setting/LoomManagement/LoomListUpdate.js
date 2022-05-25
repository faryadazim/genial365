import React , {useEffect} from 'react'
import { Modal } from "react-bootstrap";
import Select from "react-select";
const customStyles = {
  // control: base => ({
  //   ...base, 
  //   // This line disable the blue border
 
  // })
  control: (provided, state , base) => ({
    ...provided,
    background: '#fff',
    borderColor: '#d9e4e8',
    borderRadius:"none",
    minHeight: '30px',
    height: '30px',
    // boxShadow: state.isFocused ? null : null,
    ...base,    boxShadow: 'none'
  }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px  #003a4d",
      color: state.isSelected ? "#f79c74" : "#003a4d",
      background: '#fff',
   
    }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: '30px',
    padding: '0 6px' ,  
      // background: '#fff',
    
  }),

  input: (provided, state) => ({
    ...provided,
    margin: '0px',
    
  }),
  indicatorSeparator: state => ({
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '30px',
    
  }),
  
}
// const customStyles = {
//     option: (provided, state) => ({
//       ...provided,
//       borderBottom: "1px  #003a4d",
//       color: state.isSelected ? "#f79c74" : "#003a4d",
//       padding: 8,
  
  
//     }),
//   };



  
const LoomListUpdate=(props) =>{
  useEffect(() => {
   
  }, [])
  
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <>
          {" "}
          <div className="x_panel mb-0">
            <div className="x_title">
              <h2 className="pl-2 pt-2">Update Loom Machine</h2>
              <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
                <li>
                  <a className="close-link">
                    <i className="fa fa-close" onClick={props.onHide} />
                  </a>
                </li>
              </ul>
              <div className="clearfix" />
            </div>
            <div className="x_content mb-2 mt-2">
              {
                props.inCompleteInput? <p className='text-center'> <code>Please Fill All Boxes  </code></p> : ""
              }
             
              <form>
                {/* <span className="section">Personal Info</span> */}
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Loom Number<span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-8">
                    <input
                      className="form-control"
                      name="nanr"
                      type="number"
                      placeholder="ex. Loom Number"
                      required="required"
                      value={props.UpdateLoomList.loomNumber}
                      onChange={(e) =>
                     {   props.setInCompleteInput(false)
                         props.setUpdateLoomList({
                          ...props.UpdateLoomList,
                          loomNumber: e.target.value,
                        })}
                      }
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Size<span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-8">
                    <input
                      className="form-control"
                      name="nanr"
                      placeholder="ex. Loom Number"
                      required="required"
                      value={props.UpdateLoomList.loomSize}
                      onChange={(e) =>
                        {  props.setInCompleteInput(false)
                          props.setUpdateLoomList({
                          ...props.UpdateLoomList,
                          loomSize: e.target.value,
                        })}
                      }
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Draw Box<span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-8">
                    {/* <input
                      className="form-control"
                      name="nanr"
                      placeholder="ex. Loom Number"
                      required="required"
                      value={props.UpdateLoomList.drawBox}
                      onChange={(e) =>
                        props.setUpdateLoomList({
                          ...props.UpdateLoomList,
                          drawBox: e.target.value,
                        })
                      }
                    /> */}
                      <Select
                      required
                      className="basic-single"
                      classNamePrefix="select" 
              
                      value={props.DropBoxValue.value}
                      onChange={(value) => { 
                        props.setInCompleteInput(false)
                        props.setUpdateLoomList({
                          ...props.UpdateLoomList,
                          drawBox: value.value,
                        });
                        // props.setInCompleteInput(false)
                       }
                    }
                      isSearchable={true}
                      name="color"
                      options={props.DropBox}
                      styles={customStyles}
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Jacquad<span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-8">
                    {/* <input
                      className="form-control"
                      name="nanr"
                      placeholder="ex. Loom Number"
                      required="required"
                      value={props.UpdateLoomList.jacquard}
                      onChange={(e) =>
                        props.setUpdateLoomList({
                          ...props.UpdateLoomList,
                          jacquard: e.target.value,
                        })
                      }
                    /> */}
                     <Select
                      required
                      className="basic-single"
                      classNamePrefix="select" 
              
                      value={props.JacquardValue.value}
                      onChange={(value) => { 
                        props.setInCompleteInput(false)
                        props.setUpdateLoomList({
                          ...props.UpdateLoomList,
                          jacquard: value.value,
                        });
                        // props.setInCompleteInput(false)
                       }
                    }
                      isSearchable={true}
                      name="color"
                      options={props.Jacquard}
                      styles={customStyles}
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Weaving Unit<span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-8">
                    {/* <select
                      className="form-control"
                      onChange={(e) =>
                        props.setUpdateLoomList({
                          ...props.UpdateLoomList,
                          weavingUnitId: e.target.value,
                        })
                      }
                    >
                      <option value={1}>Unit A</option>
                      <option value={2}>Unit B</option>
                      <option value={3}>Unit C</option>
                    </select> */}
                     <Select
                      // required props.UpdateLoomList.weavingUnitId
                      className="basic-single"
                      classNamePrefix="select"    
                      value={props.weavingUnitValue.value}
                      onChange={(value) => { 
                        props.setInCompleteInput(false)
                        props.setUpdateLoomList({
                          ...props.UpdateLoomList,
                          weavingUnitId: value.value,
                        });
                        // props.setInCompleteInput(false)
                       }}
                      isSearchable={true}
                      name="color"
                      options={props.weavingUnitOption}
                      styles={customStyles}
                    />
                  </div>
                </div>
                <div className="form-group mt-2 ">
                  <div className="col-md-6 offset-md-3 pb-2  ">
                    <button
                      className="btn btn-primary btn-sm px-4"
                      onClick={(e) => {
                        props.setInCompleteInput(false)
                        props.UpdateLoomListFunc(e)}}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      </Modal>
    );
  }
export default LoomListUpdate;  