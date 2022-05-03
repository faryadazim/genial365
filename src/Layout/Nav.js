import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const showNavMenu = useSelector((state) => state.NavState);
  const [currentBlock, setCurrentBlock] = useState(1);
  const [noOfModule, setnoOfModule] = useState([
    { moduleName: "Home", icon: "fa fa-home" },
    { moduleName: "Forms", icon: "fa fa-edit" },
    { moduleName: "UI Elements ", icon: "fa fa-desktop" },
    { moduleName: "Tables", icon: "fa fa-table" },
    { moduleName: "Data Presentation", icon: "fa fa-bar-chart-o" },
    { moduleName: "Layouts", icon: "fa fa-clone" },
    { moduleName: "Extras", icon: "fa fa-windows" },
    { moduleName: "Multilevel Menu", icon: "fa fa-sitemap" },
    { moduleName: " User Control", icon: "fa fa-bug" },
  ]);

  return (
    <>
      {" "}
      {showNavMenu == true ? (
        <>
          <div className="col-md-3 left_col">
            <div className="left_col scroll-view">
              {/* Logo */}
              <div className="navbar nav_title" style={{ border: 0 }}>
                <a href="#" className="site_title">
                  <img src="images/logo.svg" alt className="md-logo" />
                  <img src="images/logo_icon.svg" alt className="sm-logo" />
                </a>
              </div>
              <div className="clearfix" />

              {/* Sidebar Menu */}
              <div className="main_menu_side hidden-print main_menu sidebar-menu">
                <div className="menu_section">
                  {/*<h3>General</h3>*/}
                  <ul className="nav side-menu">
                    {noOfModule.map((module, index) => {
                      return (
                        <li
                          //  className={`list-header ${currentBlock==(index+1?"happy" : console.log("null"))}`}
                          className={`   ${
                            currentBlock === index + 1 ? "active" : " "
                          }  `}
                        >
                          <a
                            onClick={(e) => {
                              if (currentBlock === index + 1) {
                                setCurrentBlock("0");
                              } else {
                                setCurrentBlock(index + 1);
                              }
                            }}
                          >
                            <i className={`${module.icon}`} />{" "}
                            {module.moduleName}
                            <span className="fa fa-chevron-down" />
                          </a>
                          <ul
                            className={`nav child_menu ${
                              currentBlock === index + 1 ? "d-block" : " d-none"
                            }`}
                          >
                            <li>
                              <NavLink to="RoleAccess">Add Role</NavLink>
                            </li>
                            <li>
                              <NavLink to="UserAccess">Add User</NavLink>
                            </li>
                            <li>
                              <NavLink to="PagesAccess">Add Pages</NavLink>
                            </li>
                            <li>
                              <NavLink to="ModuleAccess">Add Modules</NavLink>
                            </li>
                            <li>
                              <NavLink to="PermissionAccess">
                                Role Permission
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {/* /sidebar menu */}
              {/* /menu footer buttons */}
              <div className="sidebar-footer hidden-small">
                <a data-toggle="tooltip" data-placement="top" title="Settings">
                  <span
                    className="glyphicon glyphicon-cog"
                    aria-hidden="true"
                  />
                </a>
                <a
                  data-toggle="tooltip"
                  data-placement="top"
                  title="FullScreen"
                >
                  <span
                    className="glyphicon glyphicon-fullscreen"
                    aria-hidden="true"
                  />
                </a>
                <a data-toggle="tooltip" data-placement="top" title="Lock">
                  <span
                    className="glyphicon glyphicon-eye-close"
                    aria-hidden="true"
                  />
                </a>
                <a
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Logout"
                  href="login.html"
                >
                  <span
                    className="glyphicon glyphicon-off"
                    aria-hidden="true"
                  />
                </a>
              </div>
              {/* /menu footer buttons */}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Nav;
