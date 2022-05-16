import React, { useState, useEffect } from "react";

import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loader from "../../../Layout/Loader/Loader";
const GrayProductList = () => {
  const showNavMenu = useSelector((state) => state.NavState);
  const [ListOfGrayProduct, setListOfGrayProduct] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  const fetchAllData = () => {
    fetch("http://localhost:63145/api/grayProductLists")
      .then((response) => response.json())
      .then((json) => {
        console.log("uuuuuu", json);
        setListOfGrayProduct(json);
        // setListOfGrayProduct()
        setisLoading(false);
      });
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          role="main"
          className={`right_col  h-100  ${showNavMenu == false ? "right_col-margin-remove" : " "
            } `}
        >
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />

          <div className="page-title mb-2  ">
            <div className="title_left ">
              <h1>Gray Product Details</h1>
            </div>
            <div className="text-right">
              <button
                className="btn btn-primary  btn-sm w-10"
                onClick={() => setModalShow(true)}
              >
                {" "}
                Add New &nbsp;&nbsp;&nbsp;
                <i className="fa fa-plus-circle"></i>
              </button>
              <button className="btn btn-success  btn-sm w-10">
                {" "}
                Print &nbsp;&nbsp;&nbsp;
                <i className="fa fa-print"></i>
              </button>
            </div>
            <div className="clearfix" />
          </div>

          <div className="x_panel">
            <div className="x_content">
              <div className="table-responsive">
                <table className="table table-striped jambo_table bulk_action">
                  <thead>
                    <tr className="headings-for-Gray-Product-Table">
                      <th
                        className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                                         removeLeftBorder  removeTopBorder text-center"
                        style={{ width: "3%" }}
                      >
                        <div className=" py-1 d-flex justify-content-center ">
                          {" "}
                          Sr.
                        </div>
                      </th>
                      <th
                        className="column-title     border border-primary removePadding   border-bottom-color removeTopBorder  text-center"
                        style={{ width: "6%" }}
                      >
                        <div className=" py-1">Size </div>
                      </th>
                      <th
                        className="column-title  text-center   border border-primary removePadding   border-bottom-color removeTopBorder"
                        style={{ width: "13%" }}
                      >
                        <div className=" py-1 paddingXaxisTable">
                          Per Piece Gray Weight in Grams
                        </div>{" "}
                      </th>
                      <th
                        className="column-title pileSize  border border-primary removePadding   border-bottom-color removeTopBorder  text-center"
                        style={{ width: "16%" }}
                      >
                        <div>
                          <div className="col-md-12 py-1">
                            Gray Size Pile to Pile
                          </div>
                          <div className="col-md-6 border border-primary removeLeftBorder removeRightBorder removeBottomBorder  py-1 ">
                            Length
                          </div>
                          <div className="col-md-6 border  border-primary removeRightBorder removeBottomBorder py-1">
                            Width
                          </div>
                        </div>
                      </th>

                      <th
                        className="column-title   
                                         border border-primary removePadding   border-bottom-color removeTopBorder  removePadding  text-center"
                        style={{ width: "27%" }}
                      >
                        76" Loom
                        <div className=" py-1 col-md-12 text-center removePadding">
                          <div className=" py-1 col-md-6 text-center  removePadding  border border-primary removeLeftBorder removeBottomBorder removeRightBorder pt-5">
                            No Of Piece in one Border{" "}
                          </div>
                          <div className=" py-1 col-md-6 text-center  removePadding  border border-primary  removeRightBorder removeBottomBorder">
                            <div className="col-md-12 text-center  removePadding  border border-primary removeRightBorder removeLeftBorder removeBottomBorder removeTopBorder removeLeftBorder ">
                              Rate Per Border
                            </div>
                            <div className="col-md-6 text-center    removePadding border border-primary removeRightBorder removeBottomBorder removeLeftBorder">
                              With Draw Box
                            </div>
                            <div className="col-md-6 text-center  removePadding  border border-primary removeRightBorder removeBottomBorder">
                              Without Draw Box
                            </div>
                          </div>
                        </div>
                      </th>
                      <th
                        className="column-title  
                                         border border-primary removePadding   border-bottom-color removeTopBorder  removePadding  text-center"
                        style={{ width: "27%" }}
                      >
                        96" Loom
                        <div className=" py-1 col-md-12 text-center removePadding">
                          <div className=" py-1 col-md-6 text-center  removePadding  border border-primary removeLeftBorder removeBottomBorder removeRightBorder ">
                            No Of Piece in one Border{" "}
                          </div>
                          <div className=" py-1 col-md-6 text-center  removePadding  border border-primary  removeRightBorder removeBottomBorder">
                            <div className="col-md-12 text-center  removePadding  border border-primary removeRightBorder removeLeftBorder removeBottomBorder removeTopBorder removeLeftBorder ">
                              Rate Per Border
                            </div>
                            <div className="col-md-6 text-center   removePadding border border-primary   removeBottomBorder removeLeftBorder ">
                              With Draw Box
                            </div>
                            <div className="col-md-6 text-center  removePadding  border border-primary removeRightBorder removeBottomBorder removeLeftBorder">
                              Without Draw Box
                            </div>
                          </div>
                        </div>
                      </th>
                      <th
                        className="column-title  text-center  border border-primary 
                                        removeLeftBorder removeTopBorder removeRight Border   border-bottom-color "
                        style={{ width: "4%" }}
                      >
                        Status
                      </th>
                      <th
                        className="column-title  text-center  border border-primary 
                                        removeLeftBorder removeTopBorder removeRight Border   border-bottom-color "
                        style={{ width: "2%" }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ListOfGrayProduct.map((item, index) => {
                      return (
                        <tr className="">
                          <td
                            className="column-title    removePadding   
                                        text-center paddingYaxisTable"
                            style={{ width: "3%" }}
                          >
                            <div className="  d-flex justify-content-center ">
                              {" "}
                              {index + 1}
                            </div>
                          </td>
                          <td
                            className="column-title   paddingYaxisTable   removePadding      text-center"
                            style={{ width: "6%" }}
                          >
                            <div className="  ">{item.itemSize} </div>
                          </td>
                          <td
                            className="column-title  text-center  paddingYaxisTable  removePadding "
                            style={{ width: "13%" }}
                          >
                            <div className="  ">
                              {item.PerPieceGrayWeightGram}
                            </div>{" "}
                          </td>
                          <td
                            className="column-title pileSize    removePadding   paddingYaxisTable   text-center"
                            style={{ width: "16%", height: "100%" }}
                          >
                            <div>
                              <div className="col-md-6">
                                {item.graySizeppLength}
                              </div>
                              <div className="col-md-6 ">
                                {item.graySizeppWidth}
                              </div>
                            </div>
                          </td>

                          <td
                            className="column-title   
                                              removePadding      removePadding  text-center paddingYaxisTable"
                            style={{ width: "27%" }}
                          >
                            <div className="  col-md-12 text-center removePadding">
                              <div className="   col-md-6 text-center  removePadding            pt-5">
                                {item.LoomNumbPieceInBorder76}
                              </div>
                              <div className="  col-md-6 text-center             ">
                                <div className="col-md-6 text-center    ">
                                  {item.LoomNumbRatePerBorderWithDraw76}
                                </div>
                                <div className="col-md-6 text-center  removePadding  ">
                                  {item.LoomNumbRatePerBorderWithoutDraw76}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td
                            className="column-title  
                                            removePadding       removePadding  text-center paddingYaxisTable"
                            style={{ width: "27%" }}
                          >
                            <div className=" py-1 col-md-12 text-center removePadding">
                              <div className=" py-1 col-md-6 text-center  removePadding             ">
                                {item.LoomNumbPieceInBorder96}
                              </div>
                              <div className=" py-1 col-md-6 text-center  removePadding     ">
                                <div className="col-md-6 text-center   removePadding          ">
                                  {item.LoomNumbRatePerBorderWithDraw96}
                                </div>
                                <div className="col-md-6 text-center  removePadding    removeLeftBorder">
                                  {item.LoomNumbRatePerBorderWithoutDraw76}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td
                            className="column-title removePadding  text-center   paddingYaxisTable    
                                            "
                            style={{ width: "4%" }}
                          >
                            {item.status}
                          </td>
                          <td
                            className="column-title removePadding  text-center   paddingYaxisTable    
                                            "
                            style={{ width: "2%" }}
                          >
                            <i className="fa fa-edit text-common"></i>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GrayProductList;

function MyVerticallyCenteredModal(props) {
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
            <h2 className="pl-2 pt-2">Add Employee</h2>
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
                  Size<span className="required">*</span>
                </label>
                <div className="col-md-8 col-sm-8">
                  <input
                    className="form-control"
                    name="nanr"
                    placeholder="ex. Ali A.Khan"
                    required="required"
                  />
                </div>
              </div>
              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">
                  Per Piece Gray Wright in Grams
                  <span className="required">*</span>
                </label>
                <div className="col-md-8 col-sm-8">
                  <input
                    className="form-control"
                    name="nanr"
                    placeholder="ex. 33103-4578234-5"
                    required="required"
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
                        className="form-control"
                        name="number"
                        placeholder="Width"
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        name="number"
                        placeholder="Length"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row ">
                  <div className="col-md-12 text-center ">
                    <h4 >
                      Loom No 76
                    </h4>

                  </div>

                  <div className="col-md-12">
                    <div className="field item form-group">
                      <label className="col-form-label col-md-3 col-sm-3  label-align">
                        No of Piece in one border<span className="required">*</span>
                      </label>
                      <div className="col-md-8 col-sm-8">
                        <div class="row">
                          <input
                            className="form-control"
                            name="number"
                            placeholder="Width"
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
                              className="form-control"
                              name="number"
                              placeholder="With Draw"
                            />
                          </div>
                          <div className="col-md-6">
                            <input
                              className="form-control"
                              name="number"
                              placeholder="Without Draw"
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
                    <h4  >
                      Loom No 96
                    </h4>

                  </div>

                  <div className="col-md-12">
                    <div className="field item form-group">
                      <label className="col-form-label col-md-3 col-sm-3  label-align">
                        No of Piece in one border<span className="required">*</span>
                      </label>
                      <div className="col-md-8 col-sm-8">
                        <div class="row">
                          <input
                            className="form-control"
                            name="number"
                            placeholder="Width"
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
                              className="form-control"
                              name="number"
                              placeholder="With Draw"
                            />
                          </div>
                          <div className="col-md-6">
                            <input
                              className="form-control"
                              name="number"
                              placeholder="Without Draw"
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
                  <select className="form-control">
                    <option value="Active">Active</option>
                    <option value="Deactivated">De-Activate</option>
                  </select>
                </div>
              </div>
              <div className="form-group mt-2 ">
                <div className="col-md-6 offset-md-3 pb-2  ">
                  <button type="submit" className="btn btn-primary btn-sm px-4">
                    Submit
                  </button>
                  <button className="btn btn-success btn-sm ml-2 px-3">
                    Reset
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
