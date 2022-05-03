import React, { useEffect, useState } from "react";
import Loader from "../../Layout/Loader/Loader";
import "./Role.css";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Pagination from "./Pagination";

const AddUser = () => {
  const [displayUserRegBox, setdisplayUserRegBox] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  const [UserRegistered, setUserRegistered] = useState([{}]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [showUserEntity, setshowUserEntity] = useState(5)
  const [postsPerPage ,setpostsPerPage ] = useState(5);

  const [currentEditUser, setcurrentEditUser] = useState("");
  
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  //   Edit Model
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = UserRegistered.slice(indexOfFirstPost, indexOfLastPost);


  console.log(indexOfLastPost ,indexOfFirstPost , currentPosts );

  useEffect(() => {
    fetch("https://api.github.com/users/faryadazim/repos")
      .then((response) => response.json())
      .then((json) => {
        setUserRegistered(json);
        setisLoading(false);
      });
    console.log(UserRegistered);
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
            {/* Registration Form  */}

            {displayUserRegBox ? (
              <>
                {" "}
                <div className="x_panel">
                  <div className="x_title">
                    <h2 className="pl-2 pt-2">User Registration</h2>
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
                      }}
                    >
                      {/* <span className="section">Personal Info</span> */}
                      <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Username<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <input
                            className="form-control"
                            data-validate-length-range={6}
                            data-validate-words={2}
                            name="name"
                            placeholder="ex. Ali A.Khan"
                            required="required"
                          />
                        </div>
                      </div>

                      <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          email<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <input
                            className="form-control"
                            name="email"
                            required="required"
                            type="email"
                          />
                        </div>
                      </div>

                      <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Password<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <input
                            className="form-control"
                            type="password"
                            id="password1"
                            name="password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
                            title="Minimum 8 Characters Including An Upper And Lower Case Letter, A Number And A Unique Character"
                            required
                          />
                          <span
                            style={{ position: "absolute", right: 15, top: 7 }}
                            onClick="hideshow()"
                          >
                            <i id="slash" className="fa fa-eye-slash" />
                            <i id="eye" className="fa fa-eye" />
                          </span>
                        </div>
                      </div>
                      <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Repeat password<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <input
                            className="form-control"
                            type="password"
                            name="password2"
                            data-validate-linked="password"
                            required="required"
                          />
                        </div>
                      </div>
                      <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Select Role<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <Form.Select aria-label="Default select example" className="form-control text-center w-50">
                            <option>--- Select Role ---</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
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
                <Modal.Title>Update User</Modal.Title>
                <i className="fa fa-close"></i>
              </Modal.Header>
              <Modal.Body>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Username<span className="required">*</span>
                  </label>
                  <div className="col-md-9 col-sm-9">
                    <input
                      className="form-control"
                      data-validate-length-range={6}
                      data-validate-words={2}
                      name="name"
                      placeholder="ex. Ali A.Khan"
                      required="required"
                      value={
                        currentEditUser == "" ? "  " : currentEditUser.name
                      }
                      // onChange={(e)=>setcurrentEditUser({...currentEditUser ,name:e.target.value}) }
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    email<span className="required">*</span>
                  </label>
                  <div className="col-md-9 col-sm-9">
                    <input
                      className="form-control"
                      name="email"
                      required="required"
                      type="email"
                      value={
                        currentEditUser == ""
                          ? "  "
                          : `${currentEditUser.full_name
                              .slice(11)
                              .toLowerCase()}@gmail.com`
                      }
                      //   onChange={(e)=>setcurrentEditUser({...currentEditUser ,full_name:e.target.value}) }
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    email<span className="required">*</span>
                  </label>
                  <div className="col-md-6 col-sm-6">
                  <Form.Select aria-label="Default select example" className="form-control text-center">
                            <option>--- Select Role ---</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
                     </div>
                </div>

              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  className="btn-sm px-3"
                  onClick={handleClose}
                >
                  Update
                </Button>
                <Button
                  variant="success"
                  className="btn-sm px-3 ModalButtonPositionAdjectment "
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
                        <th className="column-title"> # </th>
                        <th className="column-title">User Name </th>
                        <th className="column-title">Email </th>
                        <th className="column-title">Created Date</th>
                        <th className="column-title">Modified Date </th>
                        <th className="column-title">Role </th>
                        <th className="column-title">Action </th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentPosts.map((user, index) => {
                        return (
                          <tr className="even pointer">
                            <td className=" ">{index + 1}</td>
                            <td className=" "> {user.name} </td>
                            <td className=" ">
                              {user.full_name.slice(11).toLowerCase()}@gmail.com
                            </td>
                            <td className=" ">May 23, 2014 11:47:56 PM </td>
                            <td className=" ">May 23, 2022 21:47:56 PM </td>
                            <td className="a-right a-right  text-center">
                   Admin
                            </td>
                            <td className="a-right a-right  text-center ">
                            <i
                                className="fa fa-edit pr-2"
                                onClick={() => {
                                  setcurrentEditUser(user);
                                  handleShow();
                                }}
                              ></i>
                               <i
                                className="fa fa-trash-o"
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
                  
<div className="  d-flex justify-content-between pr-3 pt-2">
         <div className="d-flex  ml-3"> 
         <span className="pt-1 pr-2">Show</span>  
          <div className="wisthOfOtions"> <Form.Select onChange={(e)=>postsPerPage(parseInt(e.target.value))} aria-label="Default select example" className="form-control  wisthOfOtions">
                           
                            <option value="5"   >5</option>
                            <option value="10"  >10</option>
                            <option value="20" >20</option>
                            <option value="25" >25</option>
                         
                          </Form.Select></div>
           <span className="pt-1 pl-2">Entities</span> 
         </div>
            <Pagination
        postsPerPage={postsPerPage}
        totalPosts={UserRegistered.length}
        paginate={paginate}
      />
</div>
        
                     {/* Pagination  */}
                    
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

export default AddUser;
