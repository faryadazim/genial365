import React, { useEffect, useState } from "react";
import Loader from "../../Layout/Loader/Loader";
import "./Role.css";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { endPoint } from '../../config/Config.js'
import axios from "axios";
import Select from "react-select";

const customStyles = {
  // control: base => ({
  //   ...base, 
  //   // This line disable the blue border

  // })
  control: (provided, state, base) => ({
    ...provided,
    background: '#fff',
    borderColor: '#d9e4e8',
    borderRadius: "none",
    minHeight: '30px',
    height: '30px',
    // boxShadow: state.isFocused ? null : null,
    ...base, boxShadow: 'none'
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px  #003a4d",
    color: state.isSelected ? "#f79c74" : "#003a4d",
    background: '#fff',

  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: '30px',
    padding: '0 6px',
    // background: '#fff',

  }),

  input: (provided, state) => ({
    ...provided,
    margin: '0px',

  }),
  indicatorSeparator: state => ({
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '30px',

  }),

}
const RolePermission = () => {
  const url = localStorage.getItem("authUser");
  const showNavMenu = useSelector((state) => state.NavState);
  const [isLoading, setisLoading] = useState(false);

  const [pagePermissionList, setpagePermissionList] = useState([])
  const [reRenderApp, setReRenderApp] = useState(false)

  const [roleValue, setRoleVAlue] = useState("");
  const [roleOptions, setRoleOptions] = useState([]);

  const [RoleToBeSearch, setRoleToBeSearch] = useState("")


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const fetchRollData = () => {
    fetch(url + "api/Roles", {
      method: "GET",
      headers: {
        // Authorization: "bearer" + " " + e,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((response) => {
      response.json().then((data) => {
        var arr = []
        data.map((item) => {
          arr.push({ label: item.Name, value: item.Id })
        })
        setRoleOptions(arr)
      });
    })
  }


  const fetchAllData = (e) => {
    fetch(url + `api/PagePermissions?roleId=${e}`, {
      method: "GET",
      headers: {
        // Authorization: "bearer" + " " + e,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        response.json().then((data) => {

          var sorted = data.sort(
            (a, b) => a.module_name.localeCompare(b.module_name)
          );
          setpagePermissionList(sorted)
          setReRenderApp(!reRenderApp)
          fetchRollData()
        });
      })
      .catch((error) => console.log("error", error));
  }


  const updatePagePermission = async (pagePermissionState) => {
    var data = JSON.stringify({
      "PermissionId": pagePermissionState.pagePermissionId,
      "RoleId": RoleToBeSearch,
      "PageId": pagePermissionState.pageID,
      "EditPermission": pagePermissionState.EditPermission,
      "viewPermission": pagePermissionState.viewPermission,
      "DelPermission": pagePermissionState.DelPermission,
      "AddPermission": pagePermissionState.AddPermission,
    });

    console.log(JSON.parse(data));
    var config = {
      method: 'put',
      url: `${endPoint}api/updatePagePermissions?roleId=${RoleToBeSearch}`,
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    await axios(config)
      .then(function (response) {
        if (response.status === 200) {
          console.log("updated SuccesFully ");
          fetchAllData(RoleToBeSearch)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const updatePermissions = () => {
    let tat = [];
    pagePermissionList.map((eachMod) => {
      eachMod.pages.map((eachPage) => {
        tat.push({
          "PermissionId": eachPage.pagePermissionId,
          "PageId": eachPage.pageID,
          "AddPermission": eachPage.AddPermission,
          "viewPermission": eachPage.viewPermission,
          "EditPermission": eachPage.EditPermission,
          "DelPermission": eachPage.DelPermission
        })
      })
    })

    console.log(tat, "--------");



    var data = JSON.stringify({
      "roleId": RoleToBeSearch,
      "pages": tat
    });

    var config = {
      method: 'put',
      url: `${endPoint}api/PutPagePermissionAll`,
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchAllData()
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
          <div
            className={`right_col  h-100  ${showNavMenu === false ? "footer-margin-remove" : " "
              } `}
            role="main"
          >
            <div className="field item form-group d-flex justify-content-center">
              <div className="col-md-8 col-sm-8   d-flex justify-content-around align-items-center pl-0" style={{ paddingRight: "40%" }}>

                <Select
                  required
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={"Active"}
                  value={roleValue}
                  onChange={(value) => {
                    setRoleVAlue(value)
                    setRoleToBeSearch(value.value)
                    fetchAllData(value.value)
                  }}
                  isSearchable={true}
                  name="color"
                  options={roleOptions}
                  styles={customStyles}
                />

              </div>
              <div className="col-md-4  text-right px-0">
                <button className="btn btn-info btn-sm mb-0 px-3 " onClick={() => { updatePermissions() }}>
                  Update
                </button>

              </div>
            </div>
            {/* Model  */}
            {RoleToBeSearch === "" ? <div className="text-center">Select Any Role</div> : <>   <div className="x_panel">
              <div className="x_content">
                <div className="table-responsive">
                  <table className="table  jambo_table  ">
                    <thead>
                      <tr className="headings">
                        <th className="column-title text-center" width="40%">
                          {" "}
                          Title{" "}
                        </th>
                        <th className="column-title text-center" width="12%">View </th>
                        <th className="column-title text-center" width="12%">Delete </th>
                        <th className="column-title text-center" width="12%">Add </th>
                        <th className="column-title text-center" width="12%">Edit </th>
                        <th className="column-title text-center" width="12%">Update </th>
                      </tr>
                    </thead>

                    <tbody>
                      {pagePermissionList.map((item, index) => {
                        return (
                          <>

                            <tr className="moduleBgColor">
                              <td colSpan="6" className="py-2">
                                <div>{item.module_name}</div>
                              </td>
                            </tr>
                            {

                              item.pages.map((arr) => {
                                return <>

                                  <tr className="even pointer">

                                    <td className=" pl-5 ">{arr.pageName}</td>
                                    <td className=" text-center ">

                                      <input
                                        type="checkbox"
                                        className="flat"
                                        checked={arr.viewPermission === 'true' ? true : false}
                                        onChange={() => {
                                          const filteredModules = pagePermissionList.filter((eachMod) => {
                                            return eachMod.module_id !== item.module_id
                                          })
                                          const filterPages = item.pages.filter((eachPage) => {
                                            return eachPage.page_id !== arr.page_id
                                          })
                                          const updatedFilteredDataUnsorted = [...filteredModules, {
                                            module_name: item.module_name, module_id: item.module_id,
                                            pages: [...filterPages, {
                                              pageID: arr.pageID,
                                              page_id: arr.page_id,
                                              pageName: arr.pageName,
                                              pagePermissionId: arr.pagePermissionId,
                                              pageURL: arr.pageURL,
                                              AddPermission: arr.AddPermission,
                                              DelPermission: arr.DelPermission,
                                              EditPermission: arr.EditPermission,
                                              viewPermission: (arr.viewPermission === 'true' ? "false" : "true"),
                                            }].sort((a, b) => a.pageName.localeCompare(b.pageName))
                                          }]
                                          const updatedFilteredDataSorted = updatedFilteredDataUnsorted.sort(
                                            (a, b) => a.module_name.localeCompare(b.module_name)
                                          );
                                          setpagePermissionList(updatedFilteredDataSorted);
                                        }}
                                      />

                                    </td>
                                    <td className=" text-center ">

                                      <input
                                        type="checkbox"
                                        className="flat"
                                        checked={arr.DelPermission === 'true' ? true : false}
                                        onChange={() => {
                                          const filteredModules = pagePermissionList.filter((eachMod) => {
                                            return eachMod.module_id !== item.module_id
                                          })
                                          const filterPages = item.pages.filter((eachPage) => {
                                            return eachPage.page_id !== arr.page_id
                                          })
                                          const updatedFilteredDataUnsorted = [...filteredModules, {
                                            module_name: item.module_name, module_id: item.module_id,
                                            pages: [...filterPages, {
                                              pageID: arr.pageID,
                                              page_id: arr.page_id,
                                              pageName: arr.pageName,
                                              pagePermissionId: arr.pagePermissionId,
                                              pageURL: arr.pageURL,
                                              AddPermission: arr.AddPermission,
                                              DelPermission: (arr.DelPermission === 'true' ? "false" : "true"),
                                              EditPermission: arr.EditPermission,
                                              viewPermission: arr.viewPermission,
                                            }].sort((a, b) => a.pageName.localeCompare(b.pageName))
                                          }];
                                          const updatedFilteredDataSorted = updatedFilteredDataUnsorted.sort(
                                            (a, b) => a.module_name.localeCompare(b.module_name));
                                          setpagePermissionList(updatedFilteredDataSorted);


                                        }}
                                      />

                                    </td>

                                    <td className=" text-center ">

                                      <input
                                        type="checkbox"
                                        className="flat"
                                        checked={arr.AddPermission === 'true' ? true : false}
                                        onChange={() => {
                                          const filteredModules = pagePermissionList.filter((eachMod) => {
                                            return eachMod.module_id !== item.module_id
                                          })
                                          const filterPages = item.pages.filter((eachPage) => {
                                            return eachPage.page_id !== arr.page_id
                                          })
                                          const updatedFilteredDataUnsorted = [...filteredModules, {
                                            module_name: item.module_name, module_id: item.module_id,
                                            pages: [...filterPages, {
                                              pageID: arr.pageID,
                                              page_id: arr.page_id,
                                              pageName: arr.pageName,
                                              pagePermissionId: arr.pagePermissionId,
                                              pageURL: arr.pageURL,
                                              AddPermission: (arr.AddPermission === 'true' ? "false" : "true"),
                                              DelPermission: arr.DelPermission,
                                              EditPermission: arr.EditPermission,
                                              viewPermission: arr.viewPermission,
                                            }].sort((a, b) => a.pageName.localeCompare(b.pageName))
                                          }];
                                          const updatedFilteredDataSorted = updatedFilteredDataUnsorted.sort(
                                            (a, b) => a.module_name.localeCompare(b.module_name));
                                          setpagePermissionList(updatedFilteredDataSorted);
                                        }} />
                                    </td><td className=" text-center ">
                                      <input
                                        type="checkbox"
                                        className="flat"
                                        checked={arr.EditPermission === 'true' ? true : false}
                                        onChange={() => {
                                          const filteredModules = pagePermissionList.filter((eachMod) => {
                                            return eachMod.module_id !== item.module_id
                                          })
                                          const filterPages = item.pages.filter((eachPage) => {
                                            return eachPage.page_id !== arr.page_id
                                          })
                                          const updatedFilteredDataUnsorted = [...filteredModules, {
                                            module_name: item.module_name, module_id: item.module_id,
                                            pages: [...filterPages, {
                                              pageID: arr.pageID,
                                              page_id: arr.page_id,
                                              pageName: arr.pageName,
                                              pagePermissionId: arr.pagePermissionId,
                                              pageURL: arr.pageURL,
                                              AddPermission: arr.AddPermission,
                                              DelPermission: arr.DelPermission,
                                              EditPermission: (arr.EditPermission === 'true' ? "false" : "true"),
                                              viewPermission: arr.viewPermission,
                                            }].sort((a, b) => a.pageName.localeCompare(b.pageName))
                                          }];
                                          const updatedFilteredDataSorted = updatedFilteredDataUnsorted.sort(
                                            (a, b) => a.module_name.localeCompare(b.module_name)
                                          );
                                          setpagePermissionList(updatedFilteredDataSorted);
                                        }}
                                      />

                                    </td>
                                    <td className=" text-center ">
                                      <i class="fa fa-refresh" aria-hidden="true" onClick={() => updatePagePermission(arr)}></i>
                                    </td>
                                  </tr>
                                </>
                              })
                            }
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                  {/* <button className="btn btn-sm btn-primary" onClick={()=>{console.log(pagePermissionList)}}> Console</button> */}
                </div>
              </div>
            </div></>}

          </div>
        </>
      )}
    </>
  );
};

export default RolePermission;
