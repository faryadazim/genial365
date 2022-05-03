import React, { useEffect, useState } from "react";
import Loader from "../../Layout/Loader/Loader";
import "./Role.css";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import { ToastContainer, toast } from 'react-toastify';
const AddRole = () => { 
  const [isLoading, setisLoading] = useState(false); 
  
  const [displayUserRegBox, setdisplayUserRegBox] = useState(true);
  
  const [RoleRegistered , setRoleRegistered] = useState([{} , {} , {} , {}]);
  const notify = () => toast("Wow so easy!");
 
  //   Edit Model
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
     
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {" "}
          <div className="right_col  h-100" role="main">
          


          
          {displayUserRegBox ? (
              <>
                {" "}
                <div className="x_panel">
                  <div className="x_title">
                    <h2 className="pl-2 pt-2">Role Creation</h2>
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
                        console.log("adsasdfadsads");
                        notify();
                      }}
                    >
                      {/* <span className="section">Personal Info</span> */}
                      <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Enter Role Type<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <input
                            className="form-control"
                            data-validate-length-range={6}
                            data-validate-words={2}
                            name="name"
                            placeholder="ex. Saleman"
                            required="required"
                          />
                        </div>
                      </div>

                  

                      {/* <div className="ln_solid"> */}
                      <div className="form-group">
                        <div className="col-md-6 offset-md-3 pb-2">
                          <button
                            type="submit"
                            className="btn btn-primary btn-sm px-3"onClick={notify}
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
                <i className="fa fa-close"></i>
              </Modal.Header>
              <Modal.Body>
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4  label-align">
                    Enter Type Name<span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-8">
                    <input
                      className="form-control"
                      data-validate-length-range={6}
                      data-validate-words={2}
                      name="name"
                      placeholder="ex. Admin"
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
                  onClick={()=>{
                    handleClose()
                     notify()} }
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
                        <th className="column-title">Type Name</th> 
                        <th className="column-title text-center"  width="20%" >Action </th> 
                      </tr>
                    </thead>

                    <tbody>
                     {
RoleRegistered.map((Role , index)=>{
  return <tr className="even pointer">
  <td className=" ">{index+1}</td>
  <td className=" "> Admin </td>
  
  <td width="20%" className="a-right a-right     text-center">
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
})

                     }
                          
                 
                    </tbody>
                  </table>
                     {/* Pagination  */}
                     <div className="  d-flex justify-content-end pr-3 pt-2">
                  <nav aria-label="Page navigation example  bg-danger">
                    <ul className="pagination border-radius-none">
                      <li className="page-item paginate_button previous border-radius-none">
                        <a className="page-link border-radius-none height-page-link"  >
                          Previous
                        </a>
                      </li>
                      <li className="page-item paginate_button border-radius-none">
                        <a className="page-link height-page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item paginate_button ">
                        <a className="page-link height-page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item paginate_button ">
                        <a className="page-link height-page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item paginate_button next  ">
                        <a className="page-link border-radius-none height-page-link" href="#">
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav></div>
                  {/* Pagination  */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddRole;
