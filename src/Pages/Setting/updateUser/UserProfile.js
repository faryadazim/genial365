import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";


const Content = () => {
  
 
  const notifySuccess = () => toast("Password Change Successfully");
  const notifyFail= (e) => toast(e); 
  const showNavMenu = useSelector((state) => state.NavState);
  const url=localStorage.getItem("authUser")
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
 
console.log(userName);



  const changePasswordFunc = (e) => {
    e.preventDefault(); 

    


    fetch(
      url + 
    `/api/Users/changePassword?Userid=${loginId}&UserOldPassword=${passwordState.oldPassword}&UserNewPassword=${passwordState.newPassword}`,
      {
        method: "POST",
        // headers: {
        //   Authorization:
        //     JSON.parse(localStorage.getItem("authUser")).token_type +
        //     " " +
        //     JSON.parse(localStorage.getItem("authUser")).access_token,
        //   "Content-Type": "application/x-www-form-urlencoded",
        // },
      }
    )
      .then((response) => { 
 if (response.status===200) {
  setPasswordState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  notifySuccess()
 } else {
  notifyFail("Failed !!!")
 }

setCanChangePassword(false)
      })
      .catch((error) =>{notifyFail("Something went wrong")
         console.log("can not update error", error)});


  };

  return (
    <div
      role="main"
      className={`top_nav bg-light p-1 px-3 ${
        showNavMenu == false ? "right_col-margin-remove" : " "
      }  `}
    >
      <div className="x_panel p">
        <div className="x_title">
          <h2 className="pl-2 pt-2">User Profile</h2>
          <ul className="nav navbar-right panel_toolbox d-flex justify-content-end"></ul>
          <div className="clearfix" />
        </div>
        <div className="x_content my-3">
          <form>
            <div className="field item form-group">
              <label className="col-form-label col-md-4 col-sm-4  label-align">
                User Name
              </label>
              <div className="col-md-6 col-sm-6">
                <input
                  className="form-control "
                  value={userName}
                  disabled={true}
                />
              </div>
            </div>
            <div className="field item form-group">
              <label className="col-form-label col-md-4 col-sm-4  label-align">
                Roles
              </label>
              <div className="col-md-6 col-sm-6">
                <input
                  className="form-control"
                  value={roleName}
                  disabled={true}
                />
              </div>
            </div>
            <div className="passwordBreaker text-center pb-2">
              Change Password
            </div>
            <div className="field item form-group">
              <label className="col-form-label col-md-4 col-sm-4  label-align">
                Old Password
              </label>
              <div className="col-md-6 col-sm-6">
                <input
                  className="form-control"
                  type={!showPassword ? "password" : "text"}
                  value={passwordState.oldPassword}
                  onChange={(e) => {
                    setPasswordState({
                      ...passwordState,
                      oldPassword: e.target.value,
                    });

                    if (
                      e.target.value == "" ||
                      passwordState.newPassword == "" ||
                      passwordState.confirmPassword == ""
                    ) {
                      setCanChangePassword(false);

                      console.log("condityoion fail 1111");
                    } else if (
                      passwordState.newPassword !==
                      passwordState.confirmPassword
                    ) {
                      console.log("condityoion fail 22222222");
                      setCanChangePassword(false);
                    } else {
                      setCanChangePassword(true);
                      console.log("now ypu can update");
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
            <div className="field item form-group">
              <label className="col-form-label col-md-4 col-sm-4  label-align">
                New Password
              </label>
              <div className="col-md-6 col-sm-6">
                <input
                  className="form-control"
                  type={!showPassword ? "password" : "text"}
                  value={passwordState.newPassword}
                  onChange={(e) => {
                    setPasswordState({
                      ...passwordState,
                      newPassword: e.target.value,
                    });
                    if (
                      passwordState.oldPassword == "" ||
                      e.target.value == "" ||
                      passwordState.confirmPassword == ""
                    ) {
                      setCanChangePassword(false);
                      console.log("condityoion fail 1111");
                    } else if (
                      e.target.value !== passwordState.confirmPassword
                    ) {
                      console.log("condityoion fail 22222222");
                      setCanChangePassword(false);
                    } else {
                      setCanChangePassword(true);
                      console.log("now ypu can update");
                    }
                  }}
                />  
              </div>
            </div>
            <div className="field item form-group">
              <label className="col-form-label col-md-4 col-sm-4  label-align">
                Confirm Password
              </label>
              <div className="col-md-6 col-sm-6">
                <input
                  type={!showPassword ? "password" : "text"}
                  className="form-control"
                  value={passwordState.confirmPassword}
                  onChange={(e) => {
                    setPasswordState({
                      ...passwordState,
                      confirmPassword: e.target.value,
                    });

                    if (
                      passwordState.oldPassword == "" ||
                      passwordState.newPassword == "" ||
                      e.target.value == ""
                    ) {
                      setCanChangePassword(false);

                      console.log("condityoion fail 1111");
                    } else if (passwordState.newPassword !== e.target.value) {
                      console.log("condityoion fail 22222222");
                      setCanChangePassword(false);
                    } else {
                      setCanChangePassword(true);
                      console.log("now ypu can update");
                    }
                  }}
                />
             <button
                  className="btn btn-sm btn-danger mt-3 "
                  disabled={!canChangePassword}
                  onClick={(e) => changePasswordFunc(e)}
                >
                  Change Password
                </button>
                
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Content;
