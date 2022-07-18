import React from "react";
import Select from "react-select";
import { Modal } from "react-bootstrap";

import { preventMinus } from '../../../config/oreventMinus'
import { customStyles } from "../../../config/react-select-style";
const UpdateGrayProduct = (props) => {



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
            <h2 className="pl-2 pt-2">Update Gray Product</h2>
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
              {/* <span className="section">Personal Info</span> */}
              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">
                  Item Name<span className="required">*</span>
                </label>
                <div className="col-md-8 col-sm-8">
                  <Select
                    // required
                    isDisabled={true}
                    className="basic-single"
                    classNamePrefix="select"
                    value={props.updatedGrayProductList.itemNameValue}
                    onChange={(value) => {
                      props.setUpdatedGrayProductList({
                        ...props.updatedGrayProductList,
                        itemNameValue: {
                          label: value.label,
                          value: value.value,
                        },
                      });
                    }}
                    isSearchable={true}
                    name="color"
                    options={props.itemNameOptions}
                    styles={customStyles}
                  />
                </div>
              </div>
              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">
                  Size<span className="required">*</span>
                </label>
                <div className="col-md-8 col-sm-8">
                  <Select
                    isDisabled={true}
                    className="basic-single"
                    classNamePrefix="select"
                    value={props.updatedGrayProductList.itemSizeValue}
                    onChange={(value) => {
                      props.setUpdatedGrayProductList({
                        ...props.updatedGrayProductList,
                        itemSizeValue: {
                          label: value.label,
                          value: value.value,
                        },
                      });
                    }}
                    isSearchable={true}
                    name="color"
                    options={props.itemSizeOptions}
                    styles={customStyles}
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
                    className={
                      props.updatedGrayProductListValidation
                        .PerPieceGrayWeightGram
                        ? "form-control"
                        : "form-control requiredValidateInput"
                    }
                    type="number"
                    onKeyPress={(e) => { preventMinus(e) }}
                    min="0"
                    name="nanr"
                    placeholder="ex. 459.08 Gram"
                    value={props.updatedGrayProductList.PerPieceGrayWeightGram}
                    onChange={(e) => {
                      props.setUpdatedGrayProductList({
                        ...props.updatedGrayProductList,
                        PerPieceGrayWeightGram: e.target.value,
                      });
                      props.setUpdatedGrayProductListValidation({
                        ...props.updatedGrayProductListValidation,
                        PerPieceGrayWeightGram: true,
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
                        className={
                          props.updatedGrayProductListValidation.graySizeppWidth
                            ? "form-control"
                            : "form-control requiredValidateInput"
                        }
                        type="number"
                        onKeyPress={(e) => { preventMinus(e) }}
                        min="0"
                        placeholder="Width"
                        value={props.updatedGrayProductList.graySizeppWidth}
                        onChange={(e) => {
                          props.setUpdatedGrayProductList({
                            ...props.updatedGrayProductList,
                            graySizeppWidth: e.target.value,
                          });
                          console.log("change");
                          props.setUpdatedGrayProductListValidation({
                            ...props.updatedGrayProductListValidation,
                            graySizeppWidth: true,
                          });
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className={
                          props.updatedGrayProductListValidation
                            .graySizeppLength
                            ? "form-control"
                            : "form-control requiredValidateInput"
                        }
                        name="number"
                        type="number"
                        onKeyPress={(e) => { preventMinus(e) }}
                        min="0"
                        placeholder="Length"
                        value={props.updatedGrayProductList.graySizeppLength}
                        onChange={(e) => {
                          props.setUpdatedGrayProductList({
                            ...props.updatedGrayProductList,
                            graySizeppLength: e.target.value,
                          });
                          props.setUpdatedGrayProductListValidation({
                            ...props.updatedGrayProductListValidation,
                            graySizeppLength: true,
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
                    <h4 className="text-danger font-weight-bolder">   Loom No 76  </h4>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-12">
                    <div className="field item form-group">
                      <div className="col-md-12 col-sm-12">
                        <label className="col-form-label col-md-3  col-sm-3  label-align ">  No of Piece in one border   </label>
                        <div className="col-md-3  px-1 ">
                          <input
                            className={
                              props.updatedGrayProductListValidation
                                .LoomNumbPieceInBorder76
                                ? "form-control"
                                : "form-control requiredValidateInput"
                            }
                            name="number"
                            type="number"
                            onKeyPress={(e) => { preventMinus(e) }}
                            min="0"
                            placeholder="Ex. Grams"
                            value={
                              props.updatedGrayProductList
                                .LoomNumbPieceInBorder76
                            }
                            onChange={(e) => {
                              props.setUpdatedGrayProductList({
                                ...props.updatedGrayProductList,
                                LoomNumbPieceInBorder76: e.target.value,
                              });
                              props.setUpdatedGrayProductListValidation({
                                ...props.updatedGrayProductListValidation,
                                LoomNumbPieceInBorder76: true,
                                LoomNumbPieceInBorder96: true,
                              });
                            }}
                          />
                        </div>
                        <label className="col-form-label col-md-2  col-sm-3  label-align ">
                          Nativing Rate
                        </label>
                        <div className="col-md-3  px-0  ">
                          <input
                            className={
                              props.updatedGrayProductListValidation
                                .nativingRate76
                                ? "form-control  "
                                : "form-control requiredValidateInput"
                            }
                            type="number"
                            onKeyPress={(e) => { preventMinus(e) }}
                            min="0"
                            placeholder="Nativing Rate..."
                            value={props.updatedGrayProductList.nativingRate76}
                            onChange={(e) => {
                              props.setUpdatedGrayProductList({
                                ...props.updatedGrayProductList,
                                nativingRate76: e.target.value,
                              });
                              props.setUpdatedGrayProductListValidation({
                                ...props.updatedGrayProductListValidation,
                                nativingRate76: true,
                                nativingRate96: true,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="field item form-group">
                      <div className="col-md-12 col-sm-12">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Rate Per Border (with Draw)
                        </label>
                        <div className="col-md-3  px-1 ">
                          <input
                            className={
                              props.updatedGrayProductListValidation
                                .LoomNumbRatePerBorderWithDraw76
                                ? "form-control "
                                : "form-control requiredValidateInput"
                            }
                            name="number"
                            type="number"
                            onKeyPress={(e) => { preventMinus(e) }}
                            min="0"
                            placeholder="With Draw"
                            value={
                              props.updatedGrayProductList
                                .LoomNumbRatePerBorderWithDraw76
                            }
                            onChange={(e) => {
                              props.setUpdatedGrayProductList({
                                ...props.updatedGrayProductList,
                                LoomNumbRatePerBorderWithDraw76: e.target.value,
                              });
                              props.setUpdatedGrayProductListValidation({
                                ...props.updatedGrayProductListValidation,
                                LoomNumbRatePerBorderWithDraw76: true,
                              });
                            }}
                          />
                        </div>
                        <label className="col-form-label col-md-2  col-sm-3  label-align ">
                          Without Draw
                        </label>
                        <div className="col-md-3  px-0  ">
                          <input
                            className={
                              props.updatedGrayProductListValidation
                                .LoomNumbRatePerBorderWithoutDraw76
                                ? "form-control "
                                : "form-control requiredValidateInput"
                            }
                            name="number"
                            type="number"
                            onKeyPress={(e) => { preventMinus(e) }}
                            min="0"
                            placeholder="Without Draw xx"
                            value={
                              props.updatedGrayProductList
                                .LoomNumbRatePerBorderWithoutDraw76
                            }
                            onChange={(e) => {
                              props.setUpdatedGrayProductList({
                                ...props.updatedGrayProductList,
                                LoomNumbRatePerBorderWithoutDraw76:
                                  e.target.value,
                              });
                              props.setUpdatedGrayProductListValidation({
                                ...props.updatedGrayProductListValidation,
                                LoomNumbRatePerBorderWithoutDraw76: true,
                              });
                            }}
                          />
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
                </div>
                <div className="row ">
                  <div className="col-md-12">
                    <div className="field item form-group">
                      <div className="col-md-12 col-sm-12">
                        <label className="col-form-label col-md-3  col-sm-3  label-align ">
                          No of Piece in one border
                        </label>
                        <div className="col-md-3  px-1 ">
                          <input
                            className={
                              props.updatedGrayProductListValidation
                                .LoomNumbPieceInBorder96
                                ? "form-control"
                                : "form-control requiredValidateInput"
                            }
                            type="number"
                            onKeyPress={(e) => { preventMinus(e) }}
                            min="0"
                            placeholder="123..."
                            value={
                              props.updatedGrayProductList
                                .LoomNumbPieceInBorder96
                            }
                            onChange={(e) => {
                              props.setUpdatedGrayProductList({
                                ...props.updatedGrayProductList,
                                LoomNumbPieceInBorder96: e.target.value,
                              });
                              props.setUpdatedGrayProductListValidation({
                                ...props.updatedGrayProductListValidation,
                                LoomNumbPieceInBorder96: true,
                                LoomNumbPieceInBorder76: true,
                              });
                            }}
                          />
                        </div>
                        <label className="col-form-label col-md-2  col-sm-3  label-align ">
                          Nativing Rate
                        </label>
                        <div className="col-md-3  px-0  ">
                          <input
                            className={
                              props.updatedGrayProductListValidation
                                .nativingRate96
                                ? "form-control"
                                : "form-control requiredValidateInput"
                            }
                            type="number"
                            onKeyPress={(e) => { preventMinus(e) }}
                            min="0"
                            placeholder="Nativing Rate..."
                            value={props.updatedGrayProductList.nativingRate96}
                            onChange={(e) => {
                              props.setUpdatedGrayProductList({
                                ...props.updatedGrayProductList,
                                nativingRate96: e.target.value,
                              });
                              props.setUpdatedGrayProductListValidation({
                                ...props.updatedGrayProductListValidation,
                                nativingRate96: true,
                                nativingRate76: true,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="field item form-group">
                      <div className="col-md-12 col-sm-12">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Rate Per Border (with Draw)
                        </label>
                        <div className="col-md-3  px-1 ">
                          <input
                            className={
                              props.updatedGrayProductListValidation
                                .LoomNumbRatePerBorderWithDraw96
                                ? "form-control "
                                : "form-control requiredValidateInput"
                            }
                            name="number"
                            type="number"
                            onKeyPress={(e) => { preventMinus(e) }}
                            min="0"
                            placeholder="With Draw"
                            value={
                              props.updatedGrayProductList
                                .LoomNumbRatePerBorderWithDraw96
                            }
                            onChange={(e) => {
                              props.setUpdatedGrayProductList({
                                ...props.updatedGrayProductList,
                                LoomNumbRatePerBorderWithDraw96: e.target.value,
                              });
                              props.setUpdatedGrayProductListValidation({
                                ...props.updatedGrayProductListValidation,
                                LoomNumbRatePerBorderWithDraw96: true,
                              });
                            }}
                          />
                        </div>
                        <label className="col-form-label col-md-2  col-sm-3  label-align ">
                          Without Draw
                        </label>
                        <div className="col-md-3  px-0  ">
                          <input
                            className={
                              props.updatedGrayProductListValidation
                                .LoomNumbRatePerBorderWithoutDraw96
                                ? "form-control "
                                : "form-control requiredValidateInput"
                            }
                            name="number"
                            type="number"
                            onKeyPress={(e) => { preventMinus(e) }}
                            min="0"
                            placeholder="Without Draw"
                            value={
                              props.updatedGrayProductList
                                .LoomNumbRatePerBorderWithoutDraw96
                            }
                            onChange={(e) => {
                              props.setUpdatedGrayProductList({
                                ...props.updatedGrayProductList,
                                LoomNumbRatePerBorderWithoutDraw96:
                                  e.target.value,
                              });
                              props.setUpdatedGrayProductListValidation({
                                ...props.updatedGrayProductListValidation,
                                LoomNumbRatePerBorderWithoutDraw96: true,
                              });
                            }}
                          />
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
                    value={props.updatedGrayProductList.status}
                    onChange={(value) => {
                      props.setUpdatedGrayProductList({
                        ...props.updatedGrayProductList,
                        status: { label: value.label, value: value.value },
                      });
                    }}
                    isSearchable={true}
                    name="color"
                    options={props.itemStatusOptions}
                    styles={customStyles}
                  />
                </div>
              </div>
              <div className="form-group mt-2 ">
                <div className="col-md-6 offset-md-3 pb-2  ">
                  <button
                    className="btn btn-primary btn-sm px-4"
                    onClick={(e) => props.updateGrayProductList(e)}
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

export default UpdateGrayProduct;
