import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 

import { setNavSm, setNavMd } from "../actions/NavState";
const Header = ({roleName}) => {
  const dispatch = useDispatch();
  const showNavMenu = useSelector((state) => state.NavState);
  const [ScreenWidth, setScreenWidth] = useState();
  const { innerWidth: width } = window;
  const toggleNav = () => {
    if (showNavMenu == true) {
      dispatch(setNavSm());
    } else {
      dispatch(setNavMd());
    }
  };

  useEffect(() => {
    setScreenWidth(width);
  }, []);

  return (
    <>
      <div
        className={`top_nav   ${
          showNavMenu === false ? "top_nav-margin-remove" : " "
        }  `}
      >
        <div className="nav_menu">
          <div
            className={`nav toggle  ${
              showNavMenu === true ? "toggle-to-Add-margin" : " "
            }  `}
          >
            <a className="menu_toggle" onClick={() => toggleNav()}>
              <i className="fa fa-bars" />
            </a>
          </div>
          <nav className="nav navbar-nav">
            <ul className=" navbar-right">
              {/* User Profile */}
              {width >= 484 ? (
                <li
                  className="nav-item dropdown open"
                  style={{ paddingLeft: 15 }}
                >
                  <a
                    href="javascript:;"
                    className="user-profile dropdown-toggle"
                    aria-haspopup="true"
                    id="navbarDropdown"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src="images/img.jpg" alt />
                   {roleName}
                  </a>
                  <div
                    className="dropdown-menu dropdown-usermenu pull-right"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="javascript:;">
                      {" "}
                      Profile
                    </a>
                    <a className="dropdown-item" href="javascript:;">
                      <span className="badge bg-red pull-right">50%</span>
                      <span>Settings</span>
                    </a>
                    <a className="dropdown-item" href="javascript:;">
                      Help
                    </a>
                    <a className="dropdown-item" href="login.html">
                      <i className="fa fa-sign-out pull-right" /> Log Out
                    </a>
                  </div>
                </li>
              ) : (
                <></>
              )}

              {/* Notification */}
              {/* <li role="presentation" className="nav-item dropdown open">
          <a href="javascript:;" className="dropdown-toggle info-number" id="navbarDropdown1" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-envelope-o" /><span className="badge bg-green">6</span></a>
          <ul className="dropdown-menu list-unstyled msg_list" role="menu" aria-labelledby="navbarDropdown1">
            <li className="nav-item"><a className="dropdown-item">
                <span className="image"><img src="images/img.jpg" alt="Profile Image" /></span>
                <span>
                  <span>John Smith</span>
                  <span className="time">3 mins ago</span>
                </span>
                <span className="message">Film festivals used to be do-or-die moments for movie makers. They were where...</span>
              </a></li>
            <li className="nav-item"><a className="dropdown-item">
                <span className="image"><img src="images/img.jpg" alt="Profile Image" /></span>
                <span>
                  <span>John Smith</span>
                  <span className="time">3 mins ago</span>
                </span>
                <span className="message">Film festivals used to be do-or-die moments for movie makers. They were where...</span>
              </a></li>
            <li className="nav-item"><a className="dropdown-item">
                <span className="image"><img src="images/img.jpg" alt="Profile Image" /></span>
                <span>
                  <span>John Smith</span>
                  <span className="time">3 mins ago</span>
                </span>
                <span className="message">Film festivals used to be do-or-die moments for movie makers. They were where...</span>
              </a></li>
            <li className="nav-item"><a className="dropdown-item">
                <span className="image"><img src="images/img.jpg" alt="Profile Image" /></span>
                <span>
                  <span>John Smith</span>
                  <span className="time">3 mins ago</span>
                </span>
                <span className="message">Film festivals used to be do-or-die moments for movie makers. They were where...</span>
              </a></li>
            <li className="nav-item">
              <div className="text-center"><a className="dropdown-item">
                  <strong>See All Alerts</strong>
                  <i className="fa fa-angle-right" />
                </a></div>
            </li>
          </ul>
        </li> */}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
