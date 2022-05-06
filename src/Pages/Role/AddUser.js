import React, { useEffect, useState } from "react";
import Loader from "../../Layout/Loader/Loader";
import "./Role.css";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Pagination from "./Pagination";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
const AddUser = () => {
  
  const showNavMenu = useSelector((state) => state.NavState);
  const [displayUserRegBox, setdisplayUserRegBox] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  const [UserRegistered, setUserRegistered] = useState([{}]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [showUserEntity, setshowUserEntity] = useState(5)
  const [postsPerPage, setpostsPerPage] = useState(5);
  const [repeatPassword, setRepeatPassword] = useState("");

  const [currentEditUser, setcurrentEditUser] = useState({
    email: "",
    id: "",
    passwordHash: "",
    phoneNumber: "",
    role: "",
    roleName: "",
    userName: "",
  });
  const [userRegisteredAdd, setuserRegisteredAdd] = useState({
    userName: "",
    password: "",
    phoneNumber: "",
    email: "",
  });
  const [Roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  // const [userData , setUserData] = {
  //   Email: "",
  //   "PasswordHash": "AD8vH35ujnt0np2k03qVMTgCgDlQPQgEMMNQnB5b/IcVgH8MPh1S1rhqn6nIrfz0+A==",
  //   "SecurityStamp": "259b86f8-aee5-4b4e-b687-ce383434ce74",
  //   "PhoneNumber": "03045726268",
  //   "PhoneNumberConfirmed": false,
  //   "TwoFactorEnabled": false,
  //   "LockoutEndDateUtc": null,
  //   "LockoutEnabled": false,
  //   "AccessFailedCount": 0,
  //   "UserName": "genial365@gmail.com"
  // }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //   Edit Model
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = UserRegistered.slice(indexOfFirstPost, indexOfLastPost);

  const notifyDelete = () => toast("Deleted Successfully!");
  const notifyAdd = () => toast("User Created Successfully!");

  const fetchAllData = () => {
    // fetchUser
    fetch("http://weaving-dev.genial365.com/api/Users")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setUserRegistered(json);

        fetch("http://weaving-dev.genial365.com/api/Roles")
          .then((response) => response.json())
          .then((role) => {
            setRoles(role);
            setisLoading(false);
          });
      });

    // fetch Role
  };

  const deleteUser = (e) => {
    console.log(e, "Delte this one");
    //

    fetch(`http://weaving-dev.genial365.com/api/Users/${e}`, {
      method: "DELETE",
      // headers: {
      //   Authorization:
      //     JSON.parse(localStorage.getItem("authUser")).token_type +
      //     " " +
      //     JSON.parse(localStorage.getItem("authUser")).access_token,
      //   "Content-Type": "application/x-www-form-urlencoded",
      // },
    })
      .then((response) => {
        fetchAllData();
        notifyDelete();
      })
      .catch((error) => console.log("error", error));
  };
  const AddUserRegistered = () => {
    console.log("Submit this one");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userRegisteredAdd),
    };
 
    fetch("http://localhost:63145/api/Users", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("success", data.Id);
        const requestOptionsForRole = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            UserId: data.Id,
            RoleId: selectedRole,
          }),
        };
        fetch(
          "http://weaving-dev.genial365.com/api/UserRoles",
          requestOptionsForRole
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("success", data);
            setuserRegisteredAdd({
              userName: "",
              password: "",
              phoneNumber: "",
              email: "",
            })
            fetchAllData();
            setRepeatPassword("");
            notifyAdd();
          }).catch((err)=>{
            console.log("err" , err);
          })
      }).catch((err)=>{
        console.log("err" , err);
      })
  };

  useEffect(() => {
    // Fetching data
    fetchAllData();
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
          <div className={`right_col  h-100  ${
          showNavMenu === false ? "footer-margin-remove" : " "
        } `}  role="main">
            {/* Registration Form  */}

            {displayUserRegBox ? (
              <>
                {" "}
                <div className="x_panel">
                  <div className="x_title">
                    <h2 className="pl-2 pt-2">User Registration</h2>
                    <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
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
                        AddUserRegistered();
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
                            value={userRegisteredAdd.userName}
                            onChange={(e) =>
                              setuserRegisteredAdd({
                                ...userRegisteredAdd,
                                userName: e.target.value,
                              })
                            }
                            // required="required"
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
                            // required="required"
                            type="email"
                            value={userRegisteredAdd.email}
                            onChange={(e) =>
                              setuserRegisteredAdd({
                                ...userRegisteredAdd,
                                email: e.target.value,
                              })
                            }
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
                            // required

                            value={userRegisteredAdd.password}
                            onChange={(e) =>
                              setuserRegisteredAdd({
                                ...userRegisteredAdd,
                                password: e.target.value,
                              })
                            }
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
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Phone Number
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <input
                            className="form-control"
                            type="text"
                            name="phoneNumber"
                            value={userRegisteredAdd.phoneNumber}
                            onChange={(e) =>
                              setuserRegisteredAdd({
                                ...userRegisteredAdd,
                                phoneNumber: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="field item form-group">
                        <label className="col-form-label col-md-3 col-sm-3  label-align">
                          Select Role<span className="required">*</span>
                        </label>
                        <div className="col-md-6 col-sm-6">
                          <Form.Select
                            aria-label="Default select example"
                            className="form-control text-center w-50"
                            onChange={(e) => setSelectedRole(e.target.value)}
                          >
                            {Roles.map((item) => {
                              return (
                                <option value={item.Id}>{item.Name}</option>
                              );
                            })}
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
                      value={currentEditUser}
                      onChange={(e) => setcurrentEditUser()}
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
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Select Role<span className="required">*</span>
                  </label>
                  <div className="col-md-6 col-sm-6">
                    <Form.Select
                      aria-label="Default select example"
                      className="form-control text-center w-75"
                      onChange={(e) => setSelectedRole(e.target.value)}
                    >
                      {Roles.map((item) => {
                        return <option value={item.Id}>{item.Name}</option>;
                      })}
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
                        <th className="column-title">Phone</th>
                        <th className="column-title">Role </th>
                        <th className="column-title text-center">Action </th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentPosts.map((user, index) => {
                        return (
                          <tr className="even pointer">
                            <td className=" ">{index + 1}</td>
                            <td className=" "> {user.userName} </td>
                            <td className=" ">{user.email}</td>
                            <td className=" ">
                              {user.phoneNumber == null
                                ? "No Available"
                                : user.phoneNumber}
                            </td>
                            <td className="a-right a-right  ">
                              {user.roleName}
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
                                  deleteUser(user.id);
                                }}
                              ></i>{" "}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className="  d-flex justify-content-between pr-3 pt-2">
                    <div className="d-flex  ml-3 mb-3">
                      <span className="pt-1 pr-2">Show</span>
                      <div className="wisthOfOtions">
                        {" "}
                        <Form.Select
                          onChange={(e) =>
                            postsPerPage(parseInt(e.target.value))
                          }
                          aria-label="Default select example"
                          className="form-control  wisthOfOtions"
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="20">20</option>
                          <option value="25">25</option>
                        </Form.Select>
                      </div>
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
