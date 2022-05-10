import { ToastContainer, toast } from "react-toastify";
import React, { useState } from "react";

const Login = ({ setisLogin, isLogin  , setUserRole}) => {
  const [logInAuth, setlogInAuth] = useState({
    username: "",
    password: "",
    grant_type: "password",
  });
  const onLogin = () => {
    localStorage.setItem("authUser", "http://localhost:63145/");
  };
  const notify = () => toast("Login SuccessFully!");

  return (
    <div>
      <div>
        <div className="login_wrapper ">
          <div className="animate form login_form">
            <section className="login_content">
              <form>
                <h1>Login Form</h1>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    required
                    value={logInAuth.username}
                    onChange={(e) =>
                      setlogInAuth({ ...logInAuth, username: e.target.value })
                    }
                  />
                </div>
                <div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                    value={logInAuth.password}
                    onChange={(e) =>
                      setlogInAuth({ ...logInAuth, password: e.target.value })
                    }
                  />
                </div>
                <div className="text-right">
                  <button
                    className="btn btn-default submit btn-official px-3 btn-sm"
                    type="submit"
                    aria-invalid="true"
                    onClick={(e) => {
                      e.preventDefault();



                      // var myHeaders = new Headers();
                      // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
                      // myHeaders.append("Cookie", ".AspNet.Cookies=j8weul8CZYMGpWMK6COQfs0ETbEwIb4sUoUhk_klWvwv7Ye3vondyjnRd7eR6iIwfSNYs7rZ5HBF-U3iX1AmCOq2jLI_5diq_zMxlJFh_Kn9K2QMUGa2sUWFjYHRnghFqIT4LS3u7ABqOIkjW8BFsxtj3wVwTELIFlVTJ1pZ8KMF3anPQzlaOwF-tea0GC9_HuJ9i9VnbAK_BBiCSaE5kzOZ3cmleiw_lNPLT9QnxAkhHmdHfJkt9TYh6vmGko5hthWu0h4GXsiX3xyzeOhti38cuxQiL0gz5MhNXG973MWSCqFKVS8V7jOkB1ck4tAT5d78on92TAxIcchvwjomgNeqk5oxVJDCZMobk6lSPamHWQJl1rKPBZ5P3249ixn36QTj9PvLWrroMmi7VMsoUhaGUdgqwmEwou5384vL5KHhYlKRHz3Eu6itgTJb9HOatj_ryrGIgtxpgS2XJWjnVCZ24uCpcmmaiARk4IhN6ECV5rOt0CPH4GpzKEI4f6Qf");
                      
                      // var urlencoded = new URLSearchParams();
                      // urlencoded.append("username", "user1");
                      // urlencoded.append("password", "5@7B2s6d2k6$8");
                      // urlencoded.append("grant_type", "password");
                      
                      // var requestOptions = {
                      //   method: 'POST',
                      //   headers: myHeaders,
                      //   body: urlencoded,
                      //   redirect: 'follow'
                      // };
                      
                      // fetch("http://localhost:63145/token", requestOptions)
                      //   .then(response => response.text())
                      //   .then(result => console.log(result))
                      //   .catch(error => console.log('error', error));





                      // setisLogin(!isLogin)

                      var urlencoded = new URLSearchParams();
                      urlencoded.append("username", logInAuth.username);
                      urlencoded.append("password", logInAuth.password);
                      urlencoded.append("grant_type", "password");

                      var urlencoded = new URLSearchParams();
                      urlencoded.append("username", logInAuth.username);
                      urlencoded.append("password", logInAuth.password);
                      urlencoded.append("grant_type", "password");
    
                      fetch("http://localhost:63145/token", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: urlencoded,
                      })
                        .then((result) => {
                          result.json().then((response) => {
                            if (result.status === 200) {
                              // localStorage.setItem(
                                console.log(response , "Login ");
                              //   "authUser",
                              //   JSON.stringify(response)
                              // );
                              // window.location.reload(false);
                              notify();
                              setisLogin(true);
                            } else {
                              // setisCredentials(false);
                              console.log("false");
                            }
                          });
                        })
                        .catch((error) => console.log("error", error));
                
                        // notify();
                      onLogin();
                    }}
                  >
                    Log in
                  </button>
                </div>
                <div className="clearfix" />
                <div className="separator">
                  <p className="change_link">
                    Any Problem?
                    <a href="#signup" className="to_register">
                      {" "}
                      Need Help{" "}
                    </a>
                  </p>
                  <div className="clearfix" />
                  <br />
                  <div>
                    {/* <img src="images/logo.svg" alt className="md-logo" />
                     */}

                    <h1>
                      <img
                        src="images/logo_icon.svg"
                        alt
                        className="sm-logo-in-Login"
                      />{" "}
                      Genial365
                    </h1>
                    <p>
                      ©2022 All Rights Reserved. Product of Technupur. Privacy
                      and Terms
                    </p>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
