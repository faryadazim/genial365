import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { endPoint } from "../../../config/Config";
import Loader from "../../../Layout/Loader/Loader";
import Creatable from "react-select/creatable";

import Select from "react-select";
import { preventMinus } from "../../../config/oreventMinus";
const customStyles = {
  // control: base => ({
  //   ...base,
  //   // This line disable the blue border

  // })
  control: (provided, state, base) => ({
    ...provided,
    background: "#fff",
    borderColor: "#d9e4e8",
    borderRadius: "none",
    minHeight: "28px",
    height: "28px",
    // boxShadow: state.isFocused ? null : null,
    ...base,
    boxShadow: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px  #003a4d",
    color: state.isSelected ? "#f79c74" : "#003a4d",
    background: "#fff",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: "28px",
    padding: "0 6px",
    // background: '#fff',
  }),

  input: (provided, state) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "28px",
  }),
};


const ShowSingleEmployee = ({
  singleUserId,
  setShowSingleUSer,
  fetchAllData,
  setComponentUpdater,
  componentUpdater, setUpdateSelectorList, updateSelectorList
}) => {
  const [showFormControlClass, setShowFormControlClass] = useState(true);
  const [isDisableFormControl, setIsDisableFormControl] = useState(true);
  const [reRenderComponent, setReRenderComponent] = useState(true);

  const notifyDeleted = () => toast("Employee Deleted Successfully");
  const url = localStorage.getItem("authUser");
  const [isLoading, setisLoading] = useState(true);
  const [designationOptions, setDesignationOptions] = useState([])
  const [designationValue, setDesignationValue] = useState({ label: "", value: "" })
  const jobStatus = [
    { label: "Active", value: "Active" },
    { label: "Left", value: "Left" },
  ];
  const [jobStatusValue, setJobStatusValue] = useState({ label: "", value: "" })
  const [EmployeeData, setEmployeeData] = useState({
    name: "",
    fatherName: "",
    phoneNum1: "",
    phoneNum2: "",
    phoneNum3: "",
    homePhoneNum: "",
    cnicNum: "",
    address: "",
    referenceName: "",
    referencePhoneNum: "",
    jobStatus: "",
    designation: "",
    employeePic1: "",
    employeePic2: "",
    employeeCnicFront: "",
    employeeCnicBsck: "",
    recruitmentType: "",
    weeklySalary: "",
    salary: "",
  });

  const EditUser = () => {
    setIsDisableFormControl(false);
    setShowFormControlClass(false);
  };

  const fileHandle1 = (e) => {
    var myHeaders = new Headers();
    myHeaders.append("contentType", "false");
    myHeaders.append("processData", "false");
    var formdata = new FormData();
    formdata.append("UploadedImage", e.target.files[0]);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    //   ///api/Employees/attach-files
    fetch(url + "api/FileUpload", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("result image upload", result);
        setEmployeeData({ ...EmployeeData, employeePic1: result });
      })
      .catch((error) => console.log("error", error));
  };
  const fileHandle2 = (e) => {
    var myHeaders = new Headers();
    myHeaders.append("contentType", "false");
    myHeaders.append("processData", "false");
    var formdata = new FormData();
    formdata.append("UploadedImage", e.target.files[0]);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    //   ///api/Employees/attach-files
    fetch(url + "api/FileUpload", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("result image upload", result);
        setEmployeeData({ ...EmployeeData, employeePic2: result });
      })
      .catch((error) => console.log("error", error));
  };
  const fileHandle3 = (e) => {
    var myHeaders = new Headers();
    myHeaders.append("contentType", "false");
    myHeaders.append("processData", "false");
    var formdata = new FormData();
    formdata.append("UploadedImage", e.target.files[0]);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    //   ///api/Employees/attach-files
    fetch(url + "api/FileUpload", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("result image upload", result);
        setEmployeeData({ ...EmployeeData, employeeCnicFront: result });
      })
      .catch((error) => console.log("error", error));
  };

  const fileHandle4 = (e) => {
    var myHeaders = new Headers();
    myHeaders.append("contentType", "false");
    myHeaders.append("processData", "false");
    var formdata = new FormData();
    formdata.append("UploadedImage", e.target.files[0]);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    //   ///api/Employees/attach-files
    fetch(url + "api/FileUpload", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("result image upload", result);
        setEmployeeData({ ...EmployeeData, employeeCnicBsck: result });
      })
      .catch((error) => console.log("error", error));
  };
  const UpdateUserCredentials = async () => {
    setComponentUpdater(!componentUpdater);
    setIsDisableFormControl(true);
    setShowFormControlClass(true);
    console.log("employee DAta for update", EmployeeData);





    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "employee_Id": EmployeeData.employee_Id,
      "name": EmployeeData.name,
      "fatherName": EmployeeData.fatherName,
      "phoneNum1": EmployeeData.phoneNum1,
      "phoneNum2": EmployeeData.phoneNum2,
      "phoneNum3": EmployeeData.phoneNum3,
      "homePhoneNum": EmployeeData.phoneNum3,
      "cnicNum": EmployeeData.cnicNum,
      "address": EmployeeData.address,
      "referenceName": EmployeeData.referenceName,
      "referencePhoneNum": EmployeeData.referencePhoneNum,
      "jobStatus": jobStatusValue.value,
      "designation": designationValue.value,
      "employeePic1": EmployeeData.employeePic1,
      "employeePic2": EmployeeData.employeePic2,
      "employeeCnicFront": EmployeeData.employeeCnicFront,
      "employeeCnicBsck": EmployeeData.employeeCnicBsck,
      "recruitmentType": EmployeeData.recruitmentType,
      "salary": parseFloat(EmployeeData.salary),
      "chart_id": EmployeeData.chart_id
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    await fetch(`${endPoint}api/employeeLists`, requestOptions)
      .then(response => response.text())
      .then(result => console.log("_updated Successfully"))
      .catch(error => console.log('error', error));



  };
  const fetchDataForSingleUser = async () => {
    var myHeadersDesignation = new Headers();
    myHeadersDesignation.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeadersDesignation,
      redirect: 'follow'
    };

    await fetch(`${endPoint}api/employeeDesignations`, requestOptions)
      .then(response => response.json())
      .then(result => {
        var arr = [];
        result.map((item) => {
          arr.push({
            label: item.designationName,
            value: item.designation_id,
          });
        });
        setDesignationOptions(arr);
      })
      .catch(error => console.log('error', error));
    // ---------------


    await fetch(url + `api/employeeListsById?id=${singleUserId}`)
      .then((response) => response.json())
      .then((json) => {
        setEmployeeData(json);
        console.log("fetched data", json);
        setisLoading(false);
        setJobStatusValue({ label: json.jobStatus, value: json.jobStatus })
        setDesignationValue({ label: json.designationLabel, value: json.designation })

      });
  };
  const DeleteUser = () => {
    setComponentUpdater(!componentUpdater);
    fetch(`${url}api/employeeLists?id=${singleUserId}`, {
      method: "DELETE",
    })
      .then((response) => {
        // deleteing Role for this Id
        setShowSingleUSer(false);
        fetchAllData();
        setUpdateSelectorList(!updateSelectorList)
        notifyDeleted()
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    fetchDataForSingleUser();
  }, [singleUserId]);

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <>
            <div className="x_panel">
              <div className="x_title">
                <h2 className="pl-2 pt-2">Employee Datails</h2>
                <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
                  <li >
                    {showFormControlClass ? (
                      <a
                        className="close-link mt-2 mr-2 pt-2 bg-none" style={{ border: "none" }}
                        onClick={() => EditUser()}
                      >
                        <i className="fa fa-edit" />
                      </a>
                    ) : (
                      <a className="close-link mt-2 pt-2 mr-2 bg-none border-none " style={{ border: "none" }}
                        onClick={() => UpdateUserCredentials()}
                      >
                        <i className="fa fa-save" />
                      </a>
                    )}
                  </li>
                  <li>
                    {showFormControlClass ? (
                      <a
                        className="close-link mt-2 mr-2 pt-2" style={{ border: 'none' }}
                        onClick={() => DeleteUser()}
                      >
                        <i className="fa fa-trash text-danger" />
                      </a>
                    ) : (
                      <a
                        className="close-link mt-2 mr-2"
                        onClick={() => {
                          setShowFormControlClass(true);
                          fetchDataForSingleUser();
                        }}
                      >
                        <i className="fa fa-close text-danger" />
                      </a>
                    )}
                  </li>
                </ul>
                <div className="clearfix" />
              </div>
              <div className="x_content">
                <form>
                  {/* <span className="section">Personal Info</span> */}
                  <div className="field item form-group pl-2">
                    <div className="col-md-7">
                      <div className="row">
                        <label className="col-form-label col-md-3 col-sm-3   ">
                          Name
                        </label>
                        <div className="col-md-8 col-sm-8">
                          <input
                            className={`form-control 
                                         ${showFormControlClass
                                ? "removeFormControlBorder"
                                : " "
                              } `}
                            type="text"
                            disabled={isDisableFormControl}
                            value={EmployeeData.name}
                            onChange={(e) =>
                              setEmployeeData({
                                ...EmployeeData,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label className="col-form-label  col-md-3 col-sm-3  ">
                          Father Name
                        </label>
                        <div className="col-md-8 col-sm-8">
                          <input
                            type="text"
                            className={`form-control 
                                         ${showFormControlClass
                                ? "removeFormControlBorder"
                                : " "
                              } `}
                            value={EmployeeData.fatherName}
                            disabled={isDisableFormControl}
                            onChange={(e) =>
                              setEmployeeData({
                                ...EmployeeData,
                                fatherName: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label className="col-form-label  col-md-3 col-sm-3  ">
                          Phone Number 1
                        </label>
                        <div className="col-md-8 col-sm-8">
                          <input
                            type="number"
                            onKeyPress={(e) => { preventMinus(e) }}
                            min="0"
                            className={`form-control 
                                         ${showFormControlClass
                                ? "removeFormControlBorder"
                                : " "
                              } `}
                            value={EmployeeData.phoneNum1}
                            onChange={(e) =>
                              setEmployeeData({
                                ...EmployeeData,
                                phoneNum1: e.target.value,
                              })
                            }
                            disabled={isDisableFormControl}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label className="col-form-label col-md-3 col-sm-3 ">
                          Phone Number 2
                        </label>
                        <div className="col-md-8 col-sm-8">
                          <input
                            className={`form-control 
                                         ${showFormControlClass
                                ? "removeFormControlBorder"
                                : " "
                              } `}
                            type="number"
                            onKeyPress={(e) => { preventMinus(e) }}
                            min="0"
                            value={EmployeeData.phoneNum2}
                            onChange={(e) =>
                              setEmployeeData({
                                ...EmployeeData,
                                phoneNum2: e.target.value,
                              })
                            }
                            disabled={isDisableFormControl}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label className="col-form-label col-md-3 col-sm-3  ">
                          Phone Number 3
                        </label>
                        <div className="col-md-8 col-sm-8">
                          <input
                            className={`form-control 
                                         ${showFormControlClass
                                ? "removeFormControlBorder"
                                : " "
                              } `}
                            type="number"
                            onKeyPress={(e) => { preventMinus(e) }}
                            value={EmployeeData.phoneNum3}
                            onChange={(e) =>
                              setEmployeeData({
                                ...EmployeeData,
                                phoneNum3: e.target.value,
                              })
                            }
                            disabled={isDisableFormControl}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label className="col-form-label  col-md-3 col-sm-3    ">
                          Home Phone
                        </label>
                        <div className="col-md-8 col-sm-8">
                          <input
                            className={`form-control 
                                         ${showFormControlClass
                                ? "removeFormControlBorder"
                                : " "
                              } `}
                            type="number"
                            min="0"
                            value={EmployeeData.homePhoneNum}
                            onChange={(e) =>
                              setEmployeeData({
                                ...EmployeeData,
                                homePhoneNum: e.target.value,
                              })
                            }
                            disabled={isDisableFormControl}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label className="col-form-label  col-md-3 col-sm-3  ">
                          CNIC
                        </label>
                        <div className="col-md-8 col-sm-8">
                          <input
                            className={`form-control 
                                         ${showFormControlClass
                                ? "removeFormControlBorder"
                                : " "
                              } `}
                            type="number"

                            onKeyPress={(e) => { preventMinus(e) }}
                            min="0"
                            value={EmployeeData.cnicNum}
                            onChange={(e) =>
                              setEmployeeData({
                                ...EmployeeData,
                                cnicNum: e.target.value,
                              })
                            }
                            disabled={isDisableFormControl}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label className="col-form-label  col-md-3 col-sm-3 ">
                          Address
                        </label>
                        <div className="col-md-8 col-sm-8">
                          <input
                            type="text"
                            className={`form-control 
                                         ${showFormControlClass
                                ? "removeFormControlBorder"
                                : " "
                              } `}
                            value={EmployeeData.address}
                            onChange={(e) =>
                              setEmployeeData({
                                ...EmployeeData,
                                address: e.target.value,
                              })
                            }
                            disabled={isDisableFormControl}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label className="col-form-label  col-md-3 col-sm-3  ">
                          Reference Name
                        </label>
                        <div className="col-md-8 col-sm-8">
                          <input
                            type="text"
                            className={`form-control 
                                         ${showFormControlClass
                                ? "removeFormControlBorder"
                                : " "
                              } `}
                            value={EmployeeData.referenceName}
                            onChange={(e) =>
                              setEmployeeData({
                                ...EmployeeData,
                                referenceName: e.target.value,
                              })
                            }
                            disabled={isDisableFormControl}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label className="col-form-label  col-md-3 col-sm-3  ">
                          Reference Phone
                        </label>
                        <div className="col-md-8 col-sm-8">
                          <input
                            type="number"
                            onKeyPress={(e) => { preventMinus(e) }}
                            min="0"
                            className={`form-control 
                                         ${showFormControlClass
                                ? "removeFormControlBorder"
                                : " "
                              } `}
                            value={EmployeeData.referencePhoneNum}
                            onChange={(e) =>
                              setEmployeeData({
                                ...EmployeeData,
                                referencePhoneNum: e.target.value,
                              })
                            }
                            disabled={isDisableFormControl}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label className="col-form-label  col-md-3 col-sm-3    ">
                          Job Status
                        </label>
                        <div className="col-md-8 col-sm-8">
                          <Select
                            required
                            className="basic-single"
                            classNamePrefix="select"
                            isSearchable={true}
                            name="color"
                            value={jobStatusValue}
                            options={jobStatus}
                            isDisabled={showFormControlClass}
                            styles={customStyles}
                            onChange={(e) => {
                              setJobStatusValue({ label: e.value, value: e.value })
                              // setLoomDetailsUpdate(!loomDetailsUpdate)
                              // updateLoomDetails(e.value);
                              // setLoomListValue({ label: e.label, value: e.value })
                            }
                            }
                          />



                        </div>
                      </div>
                      <div className="row">
                        <label className="col-form-label  col-md-3 col-sm-3  ">
                          Designation
                        </label>
                        <div className="col-md-8 col-sm-8">



                          <Select
                            required
                            className="basic-single"
                            classNamePrefix="select"
                            isSearchable={true}
                            name="color"
                            value={designationValue}
                            options={designationOptions}
                            isDisabled={showFormControlClass}
                            styles={customStyles}
                            onChange={(e) => {
                              setDesignationValue({ label: e.label, value: e.value })
                            }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label className="col-form-label  col-md-3 col-sm-3 ">
                          Salary
                        </label>
                        <div className="col-md-8 col-sm-8">
                          <input
                            className={`form-control 
                                         ${showFormControlClass
                                ? "removeFormControlBorder"
                                : " "
                              } `}
                            value={EmployeeData.salary}
                            onChange={(e) => {
                              console.log(EmployeeData.salary, "salalry")
                              setEmployeeData({
                                ...EmployeeData,
                                salary: e.target.value,
                              })
                            }
                            }
                            disabled={isDisableFormControl}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="image text-right">
                            <img
                              src={`${endPoint}${EmployeeData.employeePic1.replace(
                                /['"]+/g,
                                ""
                              )}`}
                              alt="image not found"
                              width="100px"
                            />
                          </div>
                          {showFormControlClass ? (
                            ""
                          ) : (
                            <input
                              className="form-control form-control-sm mt-1"
                              id="formFileSm"
                              type="file"
                              style={{ height: "33px" }}
                              onChange={fileHandle1}
                            />
                          )}
                        </div>
                        <div className="col-md-6">
                          <div className="image text-left">
                            <img
                              src={`${url}${EmployeeData.employeePic2.replace(
                                /['"]+/g,
                                ""
                              )}`}
                              alt="image not found"
                              width="100px"
                            />
                          </div>
                          {showFormControlClass ? (
                            ""
                          ) : (
                            <input
                              className="form-control form-control-sm mt-1"
                              id="formFileSm"
                              type="file"
                              style={{ height: "33px" }}
                              onChange={fileHandle2}
                            />
                          )}
                        </div>

                        <div className="col-md-6 text-right mt-3">
                          <img
                            src={`${url}${EmployeeData.employeeCnicFront.replace(
                              /['"]+/g,
                              ""
                            )}`}
                            alt="image not found"
                            width="150px"
                            height="100%"
                          />
                          {showFormControlClass ? (
                            ""
                          ) : (
                            <input
                              className="form-control form-control-sm mt-1"
                              id="formFileSm"
                              type="file"
                              style={{ height: "33px" }}
                              onChange={fileHandle3}
                            />
                          )}
                        </div>
                        <div className="col-md-6 text-left mt-3">
                          <img
                            src={`${url}${EmployeeData.employeeCnicBsck.replace(
                              /['"]+/g,
                              ""
                            )}`}
                            alt="image not found"
                            width="150px "
                            height="100%"
                          />
                          {showFormControlClass ? (
                            ""
                          ) : (
                            <input
                              className="form-control form-control-sm mt-1"
                              id="formFileSm"
                              type="file"
                              style={{ height: "33px" }}
                              onChange={fileHandle4}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="ln_solid"> */}
                </form>
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
};

export default ShowSingleEmployee;
