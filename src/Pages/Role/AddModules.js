import React, { useState } from "react";
// Component Import
import Loader from "../../Layout/Loader/Loader";
// Boostraps Import
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
// Notifier Import
import { toast } from "react-toastify";
// style Import
import "./Role.css";

import { useSelector } from "react-redux";
const AddModules = () => {
  const [isLoading, setisLoading] = useState(false);
  // Nav Toggle State
  const showNavMenu = useSelector((state) => state.NavState);

  const [displayUserRegBox, setdisplayUserRegBox] = useState(true);
  // User Data in State
  const [RoleRegistered, setRoleRegistered] = useState([{}, {}, {}, {}]);
  // Notifier Function
  const notify = () => toast("Module added Successfully!");

  //   Edit Model
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {" "}
          <div
            className={`right_col  h-100 ${
              showNavMenu === false ? "right_col-margin-remove" : "lorem "
            }   `}
            role="main"
          >
            {displayUserRegBox ? (
              <>
                {" "}
                <div className={`x_panel `}>
                  <div className="x_title">
                    <h2 className="pl-2 pt-2">Add Module</h2>
                    <ul className="nav navbar-right panel_toolbox">
                      <li className="dropdown invisible">
                        <a
                          href="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                          role="button"
                          aria-expanded="false"
                        >
                          <i className="fa fa-wrench" />
                        </a>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <a className="dropdown-item" href="#">
                            Settings 1
                          </a>
                          <a className="dropdown-item" href="#">
                            Settings 2
                          </a>
                        </div>
                      </li>
                      <li>
                        <a className="collapse-link invisible">
                          <i className="fa fa-chevron-up" />
                        </a>
                      </li>
                      <li>
                        <a
                          className="close-link"
                          onClick={() => setdisplayUserRegBox(false)}
                        >
                          <i className="fa fa-close" />
                        </a>
                      </li>
                    </ul>
                    <div className="clearfix" />
                  </div>
                  <div className="x_content">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        console.log("aszdazsd");
                        notify();
                      }}
                    >
                      {/* <span className="section">Personal Info</span> */}
                      <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Module Name<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <input
                            className="form-control"
                            data-validate-length-range={6}
                            data-validate-words={2}
                            name="name"
                            placeholder="ex. Sales Record"
                            required="required"
                          />
                        </div>
                      </div>
                      <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Module Icon<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <input
                            className="form-control"
                            data-validate-length-range={6}
                            data-validate-words={2}
                            name="name"
                            placeholder="ex. fa fa-edit"
                            required="required"
                          />
                        </div>
                      </div>

                      {/* <div className="ln_solid"> */}
                      <div className="form-group">
                        <div className="col-md-6 offset-md-3 pb-2">
                          <button
                            type="submit"
                            className="btn btn-primary btn-sm px-3"
                          >
                            Submit
                          </button>
                          <button
                            type="reset"
                            className="btn btn-success btn-sm ml-2 px-3"
                          >
                            Reset
                          </button>

                          {/* </div> */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* Model  */}

            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header>
                <Modal.Title>Update Role</Modal.Title>
                <i className="fa fa-close" onClick={() => handleClose()}></i>
              </Modal.Header>
              <Modal.Body>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4  label-align">
                    Module Name<span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-8">
                    <input
                      className="form-control"
                      data-validate-length-range={6}
                      data-validate-words={2}
                      name="name"
                      placeholder="ex. Sales"
                      required="required"

                      // onChange={(e)=>setcurrentEditUser({...currentEditUser ,name:e.target.value}) }
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4  label-align">
                    Module Icon<span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-8">
                    <input
                      className="form-control"
                      data-validate-length-range={6}
                      data-validate-words={2}
                      name="name"
                      placeholder="ex. fa fa-facebook"
                      required="required"

                      // onChange={(e)=>setcurrentEditUser({...currentEditUser ,name:e.target.value}) }
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  className="btn-sm px-3"
                  onClick={() => {
                    handleClose();
                    notify();
                  }}
                >
                  Update
                </Button>
                <Button
                  variant="success"
                  className="btn-sm px-3 ModalButtonPositionAdjectment"
                  onClick={handleClose}
                >
                  Clear
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Model  */}

            <div className="x_panel">
              <div className="x_content">
                <div className="table-responsive">
                  <table className="table table-striped jambo_table bulk_action">
                    <thead>
                      <tr className="headings">
                        <th className="column-title"> Sr. </th>
                        <th className="column-title">Module Name</th>
                        <th className="column-title">Icon Name</th>
                        <th className="column-title text-center" width="20%">
                          Action{" "}
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {RoleRegistered.map((Role, index) => {
                        return (
                          <tr className="even pointer">
                            <td className=" ">{index + 1}</td>
                            <td className=" "> Sales </td>
                            <td className=" "> fa fa-edit </td>

                            <td
                              width="20%"
                              className="a-right a-right     text-center"
                            >
                              <i
                                className="fa fa-edit"
                                onClick={() => {
                                  handleShow();
                                }}
                              ></i>{" "}
                              <i
                                className="fa fa-trash-o pl-3"
                                onClick={() => {
                                  console.log("click icon");
                                }}
                              ></i>{" "}
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
        </>
      )}
    </>
  );
};

export default AddModules;
