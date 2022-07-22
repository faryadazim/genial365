import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import { endPoint } from '../../../config/Config'

const Content = () => {
  const showNavMenu = useSelector((state) => state.NavState);
  const roleName = localStorage.getItem("roleName");
  const userName = localStorage.getItem("userName");
  const loginId = localStorage.getItem("loginId");
  const [showPassword, setshowPassword] = useState(false);
  const [passwordState, setPasswordState] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [canChangePassword, setCanChangePassword] = useState(false);
  const changePasswordFunc = (e) => {
    e.preventDefault(); var config = {
      method: 'post',
      url: `${endPoint}api/Users/changePassword?Userid=${loginId.slice(1, -1)}&UserOldPassword=${passwordState.oldPassword}&UserNewPassword=${passwordState.newPassword}`,
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
        'Content-Type': 'application/json'
      },
    };

    axios(config)
      .then(function (response) {
        if (response.status === 200) {

          toast.success("Updated Successfully")
          setPasswordState({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          })
        } else {
          toast.error("Incorrect old Password")
          setPasswordState({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          })
        }
      })
      .catch(function (error) {
        toast.error("Incorrect old Password")
        setPasswordState({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
      });
  };

  return (
    <>
      <div
        className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
          }   `}
      >
        <span>&nbsp; User Profile</span>
      </div>
      <div
        role="main"
        className={`right_col  h-100  ${showNavMenu === false ? "right_col-margin-remove" : " "
          } `}
      >
        <form onSubmit={(e) => changePasswordFunc(e)} >  <div className="x_panel">
          <div className="x_content my-3">
            <span className="section pl-4">
              <i className="fa fa-edit"></i>&nbsp; Edit User Profile
            </span>
            <div className="row">
              <div className="field item form-group col-md-12">
                <label className="col-form-label col-md-3 col-sm-3 label-align"> User Name</label>
                <div className="col-md-8 col-sm-8">
                  <input
                    className="form-control "
                    value={userName}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="field item form-group col-md-12">
                <label className="col-form-label col-md-3 col-sm-3 label-align">Role </label>
                <div className="col-md-8 col-sm-8">
                  <input
                    className="form-control"
                    value={roleName}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="field item form-group col-md-12">
                <label className="col-form-label col-md-3 col-sm-3 label-align"> Old Password<span className="required">*</span></label>
                <div className="col-md-8 col-sm-8">
                  <input
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
                    className="form-control"
                    type={!showPassword ? "password" : "text"}
                    value={passwordState.oldPassword}
                    onChange={(e) => {
                      setPasswordState({
                        ...passwordState,
                        oldPassword: e.target.value,
                      });

                      if (
                        e.target.value === "" ||
                        passwordState.newPassword === ""
                      ) {
                        setCanChangePassword(false);
                      } else {
                        setCanChangePassword(true);
                      }
                    }}
                  /> <span
                    style={{ position: "absolute", right: 15, top: 7 }}
                    onClick={() => {
                      setshowPassword(!showPassword);
                    }}
                  >
                    <i id="slash" className="fa fa-eye-slash" />
                    <i id="eye" className="fa fa-eye" />
                  </span>
                </div>
              </div>
            </div>
            <div className="row">

              <div className="field item form-group col-md-12">
                <label className="col-form-label col-md-3 col-sm-3 label-align"> New Password <span className="required">*</span></label>
                <div className="col-md-8 col-sm-8">
                  <input
                    required
                    className="form-control"
                    type={!showPassword ? "password" : "text"}
                    value={passwordState.newPassword}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
                    onChange={(e) => {
                      setPasswordState({
                        ...passwordState,
                        newPassword: e.target.value,
                      });
                      if (
                        passwordState.oldPassword === "" ||
                        e.target.value === ""
                      ) {
                        setCanChangePassword(false);
                      } else {
                        setCanChangePassword(true);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 text-right x_footer">   <button
            style={{ backgroundColor: ' #f79c74 ', color: "white", borderRadius: "20px ", marginRight:"95px"}}
            className="btn  btn-sm px-3 my-0 mb-3"
            type="submit"
            disabled={!canChangePassword}  >
            Change Password
          </button>  </div>
        </div>
        </form>
      </div>


    </>
  );
};

export default Content;
