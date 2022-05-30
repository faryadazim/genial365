import React, { useEffect } from 'react'
import { Modal } from "react-bootstrap";
import Select from "react-select";
const customStyles = {
  // control: base => ({
  //   ...base, 
  //   // This line disable the blue border

  // })
  control: (provided, state, base) => ({
    ...provided,
    background: '#fff',
    borderColor: '#d9e4e8',
    borderRadius: "none",
    minHeight: '30px',
    height: '30px',
    // boxShadow: state.isFocused ? null : null,
    ...base, boxShadow: 'none'
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
    padding: '0 6px',
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
const LoomListUpdate = (props) => {
  useEffect(() => {

  }, [])

  return (
    <Modal
      {...props}
      size="lg" aria-labelledby="contained-modal-title-vcenter"
      centered     >
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
            <form>
              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">
                  Size<span className="required">*</span>
                </label>
                <div className="col-md-8 col-sm-8">
                  <input
                    className={props.loomValidatorUpdate ? "form-control" : "form-control requiredValidateInput"}
                    name="nanr"
                    type="number"
                    placeholder="ex. Loom Number"
                    required="required"
                    value={props.UpdateLoomList.loomSize}
                    onChange={(e) => {
                      props.setUpdateLoomList({
                        ...props.UpdateLoomList,
                        loomSize: e.target.value,
                      })
                    }}
                  />
                </div>
              </div>
              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">
                  Draw Box<span className="required">*</span>
                </label>
                <div className="col-md-8 col-sm-8">
                  <Select
                    required
                    className="basic-single"
                    classNamePrefix="select"
                    value={props.DropBoxValue}
                    onChange={(value) => {
                      props.setUpdateLoomList({
                        ...props.UpdateLoomList,
                        drawBox: value.value,
                      });
                      props.setDropBoxValue({ label: value.label, value: value.value })
                    }}
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

                  <Select
                    required
                    className="basic-single"
                    classNamePrefix="select"
                    value={props.JacquardValue}
                    onChange={(value) => {
                      props.setUpdateLoomList({
                        ...props.UpdateLoomList,
                        jacquard: value.value,
                      });
                      props.setJacquardValue({ label: value.label, value: value.value })
                    }}
                    isSearchable={true}
                    name="color"
                    options={props.Jacquard}
                    styles={customStyles}
                  />
                </div>
              </div>
              <div className="field item form-group d-none">
                <label className="col-form-label col-md-3 col-sm-3  label-align">
                  Weaving Unit<span className="required">*</span>
                </label>
                <div className="col-md-8 col-sm-8">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    value={props.weavingUnitValue}
                    onChange={(value) => {
                      props.setUpdateLoomList({
                        ...props.UpdateLoomList,
                        weavingUnitId: value.value,
                      });
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

                      props.UpdateLoomListFunc(e)
                    }}
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