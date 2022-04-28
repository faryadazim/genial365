import React from "react";


const Login = ({setisLogin , isLogin}) => {
  return (
    <div  >
      <div> 
        <div className="login_wrapper "  >
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
                  />
                </div>
                <div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="text-right">
                  <button className="btn btn-default submit btn-official px-3 btn-sm"  type="submit" 
                 aria-invalid="true"
                 onClick={
                   (e)=>{e.preventDefault()
                    setisLogin(!isLogin)}
                 }>
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
                    <img src="images/logo_icon.svg" alt className="sm-logo-in-Login" /> Genial365
                    </h1>
                    <p>
                      ©2022 All Rights Reserved. Product of Technupur. Privacy and Terms
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
