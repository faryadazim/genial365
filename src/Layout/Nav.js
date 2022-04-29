import React, { useEffect } from "react";
import $ from "jquery";
import "jquery";
import { NavLink } from "react-router-dom";
const Nav = () => {
  var openUpMenu = function () {
    $(".sidebar-menu").find("li").removeClass("active active-sm");
    $(".sidebar-menu").find("li ul").slideUp();
  };
  const newFunc = (ev) => {
    console.log("Click ");
    var $li = $(ev.target).parent();

    if ($li.is(".active")) {
      $li.removeClass("active active-sm");
      $("ul:first", $li).slideUp(function () {});
    } else {
      if (!$li.parent().is(".child_menu")) {
        openUpMenu();
      } else {
        if ($("body").is("nav-sm")) {
          if (!$li.parent().is("child_menu")) {
            openUpMenu();
          }
        }
      }

      $li.addClass("active");

      $("ul:first", $li).slideDown(function () {
        // setContentHeight();
      });
    }
  };
  useEffect(() => {
    return () => {
      // $('.sidebar-menu').on('click', ()=>newFunc ()   )   };
      $(".sidebar-menu")
        .find("a")
        .on("click", (ev) => newFunc(ev));
    };
  }, []);

  return (
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
                <li className="active">
                  <a>
                    <i className="fa fa-home" /> Home{" "}
                    <span className="fa fa-chevron-down" />
                  </a>
                  <ul className="nav child_menu" style={{ display: "block" }}>
                    <li className="current-page">
                      <a href="#">Dashboard</a>
                    </li>
                    <li>
                      <a href="#">Dashboard2</a>
                    </li>
                    <li>
                      <a href="#">Dashboard3</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>
                    <i className="fa fa-edit" /> Forms{" "}
                    <span className="fa fa-chevron-down" />
                  </a>
                  <ul className="nav child_menu">
                    <li>
                      <a href="#">General Form</a>
                    </li>
                    <li>
                      <a href="#">Advanced Components</a>
                    </li>
                    <li>
                      <a href="#">Form Validation</a>
                    </li>
                    <li>
                      <a href="#">Form Wizard</a>
                    </li>
                    <li>
                      <a href="#">Form Upload</a>
                    </li>
                    <li>
                      <a href="#">Form Buttons</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>
                    <i className="fa fa-desktop" /> UI Elements{" "}
                    <span className="fa fa-chevron-down" />
                  </a>
                  <ul className="nav child_menu">
                    <li>
                      <a href="#">General Elements</a>
                    </li>
                    <li>
                      <a href="#">Media Gallery</a>
                    </li>
                    <li>
                      <a href="#">Typography</a>
                    </li>
                    <li>
                      <a href="#">Icons</a>
                    </li>
                    <li>
                      <a href="#">Glyphicons</a>
                    </li>
                    <li>
                      <a href="#">Widgets</a>
                    </li>
                    <li>
                      <a href="#">Invoice</a>
                    </li>
                    <li>
                      <a href="#">Inbox</a>
                    </li>
                    <li>
                      <a href="#">Calendar</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>
                    <i className="fa fa-table" /> Tables{" "}
                    <span className="fa fa-chevron-down" />
                  </a>
                  <ul className="nav child_menu">
                    <li>
                      <a href="#">Tables</a>
                    </li>
                    <li>
                      <a href="#">Table Dynamic</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>
                    <i className="fa fa-bar-chart-o" /> Data Presentation{" "}
                    <span className="fa fa-chevron-down" />
                  </a>
                  <ul className="nav child_menu">
                    <li>
                      <a href="#">Chart JS</a>
                    </li>
                    <li>
                      <a href="#">Chart JS2</a>
                    </li>
                    <li>
                      <a href="#">Moris JS</a>
                    </li>
                    <li>
                      <a href="#">ECharts</a>
                    </li>
                    <li>
                      <a href="#">Other Charts</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>
                    <i className="fa fa-clone" />
                    Layouts <span className="fa fa-chevron-down" />
                  </a>
                  <ul className="nav child_menu">
                    <li>
                      <a href="#">Fixed Sidebar</a>
                    </li>
                    <li>
                      <a href="#">Fixed Footer</a>
                    </li>
                  </ul>
                </li>

                <li>
                  <a>
                    <i className="fa fa-windows" /> Extras{" "}
                    <span className="fa fa-chevron-down" />
                  </a>
                  <ul className="nav child_menu">
                    <li>
                      <a href="#">403 Error</a>
                    </li>
                    <li>
                      <a href="#">404 Error</a>
                    </li>
                    <li>
                      <a href="#">500 Error</a>
                    </li>
                    <li>
                      <a href="#">Plain Page</a>
                    </li>
                    <li>
                      <a href="#">Login Page</a>
                    </li>
                    <li>
                      <a href="#">Pricing Tables</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>
                    <i className="fa fa-sitemap" /> Multilevel Menu{" "}
                    <span className="fa fa-chevron-down" />
                  </a>
                  <ul className="nav child_menu">
                    <li>
                      <a href="#">Level One</a>
                    </li>
                    <li>
                      <a>
                        Level One
                        <span className="fa fa-chevron-down" />
                      </a>
                      <ul className="nav child_menu">
                        <li className="sub_menu">
                          <a href="#">Level Two</a>
                        </li>
                        <li>
                          <a href="#">Level Two</a>
                        </li>
                        <li>
                          <a href="#">Level Two</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">Level One</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>
                    <i className="fa fa-bug" />
                    User Control <span className="fa fa-chevron-down" />
                  </a>
                  <ul className="nav child_menu">
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
                      <NavLink to="PermissionAccess">Role Permission</NavLink>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i className="fa fa-laptop" /> Landing Page{" "}
                    <span className="label label-success pull-right">
                      Coming Soon
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* /sidebar menu */}
          {/* /menu footer buttons */}
          <div className="sidebar-footer hidden-small">
            <a data-toggle="tooltip" data-placement="top" title="Settings">
              <span className="glyphicon glyphicon-cog" aria-hidden="true" />
            </a>
            <a data-toggle="tooltip" data-placement="top" title="FullScreen">
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
              <span className="glyphicon glyphicon-off" aria-hidden="true" />
            </a>
          </div>
          {/* /menu footer buttons */}
        </div>
      </div>
    </>
  );
};

export default Nav;
