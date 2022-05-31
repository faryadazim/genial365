import React from "react";
import Select from "react-select";
import { Modal, Button } from "react-bootstrap";
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

    ...base, boxShadow: 'none'
  }),
  option: (provided, state) => ({
    ...provided,

    borderBottom: "1px  #003a4d",
    color: state.isSelected ? "#f79c74" : "#003a4d",
    background: '#fff',

  }),
  valueContainer: (provided, state) => ({
    ...provided, fontSize: "11px",
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
const customStylesDanger = {
  // control: base => ({
  //   ...base, 
  //   // This line disable the blue border

  // })
  control: (provided, state, base) => ({
    ...provided,
    background: '#fff',
    borderColor: 'red',
    borderRadius: "none",
    minHeight: '30px',
    height: '30px',

    ...base, boxShadow: 'none'
  }),
  option: (provided, state) => ({
    ...provided,

    borderBottom: "1px  #003a4d",
    color: state.isSelected ? "#f79c74" : "#003a4d",
    background: '#fff',

  }),
  valueContainer: (provided, state) => ({
    ...provided, fontSize: "11px",
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
const AddNewGrayProductList = (props) => {
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
            <h2 className="pl-2 pt-2">Add Gray Product</h2>
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {/* <span className="section">Personal Info</span> */}
              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">
                  Item Name<span className="required">*</span>
                </label>
                <div className="col-md-8 col-sm-8">
                  <Select
                    // required
                    className="basic-single"
                    classNamePrefix="select"
                    // value={props.itemNameValue.value}
                    onChange={(value) => {
                      props.setAddNewProduct({
                        ...props.AddNewProduct,
                        itemName: value.value,
                      });
                    }}
                    isSearchable={true}
                    name="color"
                    options={props.itemNameOptions}
                    styles={props.addNewGrayProductValidator.itemName ? customStyles : customStylesDanger}
                  />
                </div>
              </div>
              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">
                  Size<span className="required">*</span>
                </label>
                <div className="col-md-8 col-sm-8">
                  <Select
                    // required
                    className="basic-single"
                    classNamePrefix="select"
                    // value={props.itemSizeValue.value}
                    onChange={(value) => {
                      props.setAddNewProduct({
                        ...props.AddNewProduct,
                        itemSize: value.value,
                      });
                    }}
                    isSearchable={true}
                    name="color"
                    options={props.itemSizeOptions}
                    styles={props.addNewGrayProductValidator.itemSize ? customStyles : customStylesDanger}
                  />
                </div>
              </div>
              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">
                  Per Piece Weight in Grams
                  <span className="required">*</span>
                </label>
                <div className="col-md-8 col-sm-8">
                  <input
                    className={props.addNewGrayProductValidator.PerPieceGrayWeightGram ? "form-control" : "form-control requiredValidateInput"}
                    type="number"
                    name="nanr"
                    placeholder="ex. 459.08 Gram"
                    // required="required"
                    value={props.AddNewProduct.PerPieceGrayWeightGram}
                    onChange={(e) => {
                      props.setAddNewProduct({
                        ...props.AddNewProduct,
                        PerPieceGrayWeightGram: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">
                  GraySize Pile to Pile<span className="required">*</span>
                </label>
                <div className="col-md-8 col-sm-8">
                  <div class="row">
                    <div className="col-md-6">
                      <input
                        className={props.addNewGrayProductValidator.graySizeppWidth ? "form-control" : "form-control requiredValidateInput"}
                        type="number"
                        placeholder="Width"
                        value={props.AddNewProduct.graySizeppWidth}
                        onChange={(e) => {
                          props.setAddNewProduct({
                            ...props.AddNewProduct,
                            graySizeppWidth: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className={props.addNewGrayProductValidator.graySizeppLength ? "form-control" : "form-control requiredValidateInput"}
                        name="number"
                        type="number"
                        placeholder="Length"
                        value={props.AddNewProduct.graySizeppLength}
                        onChange={(e) => {
                          props.setAddNewProduct({
                            ...props.AddNewProduct,
                            graySizeppLength: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row ">
                  <div className="col-md-12 text-center ">
                    <h4 className="text-danger font-weight-bolder">
                      Loom No 76
                    </h4>
                  </div>

                  <div className="col-md-12">
                    <div className="field item form-group">
                      <label className="col-form-label col-md-3  col-sm-3  label-align ">
                        No of Piece in one border
                        <span className="required">*</span>
                      </label>
                      <div className="col-md-8 col-sm-8">
                        <div class="row">
                          <input

                            className={props.addNewGrayProductValidator.LoomNumbPieceInBorder76 ? "form-control  mx-2" : "form-control  mx-2 requiredValidateInput"}


                            name="number"
                            type="number"
                            placeholder="Ex. Grams"
                            value={props.AddNewProduct.LoomNumbPieceInBorder76}
                            onChange={(e) => {
                              props.setAddNewProduct({
                                ...props.AddNewProduct,
                                LoomNumbPieceInBorder76: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="field item form-group  ">
                      <label className="col-form-label col-md-3 col-sm-3  label-align">
                        Rate Per Border<span className="required">*</span>
                      </label>
                      <div className="col-md-8 col-sm-8">
                        <div class="row">
                          <div className="col-md-6">
                            <input
                              className={props.addNewGrayProductValidator.LoomNumbRatePerBorderWithDraw76 ? "form-control " : "form-control   requiredValidateInput"}
                              name="number"
                              type="number"
                              placeholder="With Draw"
                              value={
                                props.AddNewProduct
                                  .LoomNumbRatePerBorderWithDraw76
                              }
                              onChange={(e) => {
                                props.setAddNewProduct({
                                  ...props.AddNewProduct,
                                  LoomNumbRatePerBorderWithDraw76:
                                    e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div className="col-md-6">
                            <input
                              className={props.addNewGrayProductValidator.LoomNumbRatePerBorderWithoutDraw76 ? "form-control " : "form-control   requiredValidateInput"}
                              name="number"
                              type="number"
                              placeholder="Without Draw xx"
                              value={
                                props.AddNewProduct
                                  .LoomNumbRatePerBorderWithoutDraw76
                              }
                              onChange={(e) => {
                                props.setAddNewProduct({
                                  ...props.AddNewProduct,
                                  LoomNumbRatePerBorderWithoutDraw76:
                                    e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row ">
                  <div className="col-md-12 text-center ">
                    <h4 className="text-danger font-weight-bolder">
                      Loom No 96
                    </h4>
                  </div>

                  <div className="col-md-12">
                    <div className="field item form-group">
                      <label className="col-form-label col-md-3 col-sm-3  label-align">
                        No of Piece in one border
                        <span className="required">*</span>
                      </label>
                      <div className="col-md-8 col-sm-8 customPaddingForGrayProductBorderInput">
                        <div class="row">
                          <input
                            className={props.addNewGrayProductValidator.LoomNumbPieceInBorder96 ? "form-control " : "form-control   requiredValidateInput"}

                            type="number"
                            placeholder="Width"
                            value={props.AddNewProduct.LoomNumbPieceInBorder96}
                            onChange={(e) => {
                              props.setAddNewProduct({
                                ...props.AddNewProduct,
                                LoomNumbPieceInBorder96: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="field item form-group  ">
                      <label className="col-form-label col-md-3 col-sm-3  label-align">
                        Rate Per Border<span className="required">*</span>
                      </label>
                      <div className="col-md-8 col-sm-8">
                        <div class="row">
                          <div className="col-md-6">
                            <input
                              className={props.addNewGrayProductValidator.LoomNumbRatePerBorderWithDraw96 ? "form-control " : "form-control   requiredValidateInput"}
                              name="number"
                              type="number"
                              placeholder="With Draw"
                              value={props.AddNewProduct.LoomNumbRatePerBorderWithDraw96}
                              onChange={(e) => {
                                props.setAddNewProduct({
                                  ...props.AddNewProduct,
                                  LoomNumbRatePerBorderWithDraw96: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div className="col-md-6">
                            <input
                              className={props.addNewGrayProductValidator.LoomNumbRatePerBorderWithoutDraw96 ? "form-control " : "form-control   requiredValidateInput"}
                              name="number"
                              type="number"
                              placeholder="Without Draw"
                              value={props.AddNewProduct.LoomNumbRatePerBorderWithoutDraw96}
                              onChange={(e) => {
                                props.setAddNewProduct({
                                  ...props.AddNewProduct,
                                  LoomNumbRatePerBorderWithoutDraw96: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">
                  Status<span className="required">*</span>
                </label>
                <div className="col-md-8 col-sm-8">

                  <Select
                    // required
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={"Active"}
                    // value={props.itemStatusValue.value}
                    onChange={(value) => {
                      props.setAddNewProduct({
                        ...props.AddNewProduct,
                        status: value.value,
                      });
                    }}
                    isSearchable={true}
                    name="color"
                    options={props.itemStatusOptions}
                    styles={props.addNewGrayProductValidator.status ? customStyles : customStylesDanger}
                  />
                </div>
              </div>
              <div className="form-group mt-2 ">
                <div className="col-md-6 offset-md-3 pb-2  ">
                  <button
                    className="btn btn-primary btn-sm px-4"
                    onClick={() => props.AddNewProductFunc()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default AddNewGrayProductList;
