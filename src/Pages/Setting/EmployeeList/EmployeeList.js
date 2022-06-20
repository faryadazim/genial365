import React, { useState, useEffect } from "react";
// import {  Button } from "bootstrap";
import Loader from "../../../Layout/Loader/Loader";

import ShowSingleEmployee from "./ShowSingleEmployee";
import { useSelector } from "react-redux";
import Selector from "../../../Layout/Const/Selector";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import MyVerticallyCenteredModalView from "./MyVerticallyCenteredModalView.js";
import { toast, ToastContainer } from "react-toastify";
import { endPoint } from "../../../config/Config";

const EmployeeList = () => {
  const notifyAdd = () => toast("Employee Added Successfully");
  const [isDisableSubmitButton, setIsDisableSubmitButton] = useState(false);
  const [designationValue, setDesignationValue] = useState("Helper");
  const [designation, setDesignation] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [ListOfEmployee, setListOfEmployee] = useState([]);
  const [allEmpListConst, setAllEmpListConst] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const showNavMenu = useSelector((state) => state.NavState);



  const employeeInitialState = {
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
    monthlySalary: "",
  };
  // const [showSingleUser, setShowSingleUSer] = useState(false);
  // const [singleUserId, setSingleUserId] = useState("");
  // const [roleValue, setRoleVAlue] = useState("Active");
  const [recruitmentTypeValue, setrecruitmentTypeValue] = useState({});
  // const [stateUpdater, setStateUpdater] = useState(true);
  const [addNewEmployee, setAddNewEmployee] = useState(employeeInitialState);
  // const [componentUpdater, setComponentUpdater] = useState(true);
  const url = localStorage.getItem("authUser");
  const [disableSubmitForUpdatePhoto, setdisableSubmitForUpdatePhoto] = useState(false);
  const [modalShowView, setModalShowView] = useState(false)
  const recruitmentType = [
    { label: "Weekly", value: "Weekly" },
    { label: "Monthly", value: "Monthly" },
    { label: "Contract", value: "Contract" },
  ];
  const jobStatus = [
    { label: "Active", value: "Active" },
    { label: "Left", value: "Left" },
  ];

  const [updateSelectorList, setUpdateSelectorList] = useState(false);
  const [jobStatusValue, setJobStatusValue] = useState({});
  // const [listOfEmployeeName, setListOfEmployeeName] = useState([]);
  const employeeListValidatorInitialState = {
    name: true,
    fatherName: true,
    phoneNum1: true,
    phoneNum2: true,
    phoneNum3: true,
    homePhoneNum: "",
    cnicNum: true,
    address: true,
    referenceName: true,
    referencePhoneNum: true,
    jobStatus: true,
    designation: true,
    employeePic1: true,
    employeePic2: true,
    employeeCnicFront: true,
    employeeCnicBsck: true,
    recruitmentType: true,
    weeklySalary: true,
    monthlySalary: true,
  };
  const [employeeListValidator, setEmployeeListValidator] = useState(
    employeeListValidatorInitialState
  );
  const [emplToUpdate, setEmployeeToUpdate] = useState({})

  // const [selectEmployee, setselectEmployee] = useState({})
  const [isEmplEditModeOn, setIsEmplEditModeOn] = useState(false)
  const fileHandle1 = (e) => {
    console.log("emploeyeee pic 1");
    setdisableSubmitForUpdatePhoto(true);
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
        setAddNewEmployee({ ...addNewEmployee, employeePic1: result });
        // setAddNewEmployee({ ...addNewEmployee, employeePic2: result });
        setdisableSubmitForUpdatePhoto(false);
      })
      .catch((error) => console.log("error", error));
  };
  const fileHandle2 = (e) => {
    setdisableSubmitForUpdatePhoto(true);
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
        setdisableSubmitForUpdatePhoto(false);
        setAddNewEmployee({ ...addNewEmployee, employeePic2: result });
      })
      .catch((error) => console.log("error", error));
  };
  const fileHandle3 = (e) => {
    setdisableSubmitForUpdatePhoto(true);
    console.log(e.target.files[0]);
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
    console.log(requestOptions);
    fetch(url + "api/FileUpload", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("result image upload", result);

        setAddNewEmployee({ ...addNewEmployee, employeeCnicFront: result });
        setdisableSubmitForUpdatePhoto(false);
      })
      .catch((error) => console.log("error", error));
  };
  const fileHandle4 = (e) => {
    setdisableSubmitForUpdatePhoto(true);
    console.log(e.target.files[0]);
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
    console.log(requestOptions);

    fetch(url + "api/FileUpload", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("result image upload", result);

        setAddNewEmployee({ ...addNewEmployee, employeeCnicBsck: result });
        setdisableSubmitForUpdatePhoto(false);
      })
      .catch((error) => console.log("error", error));
  };
  const fetchAllData = () => {
    fetch(url + "api/employeeLists", {
      method: "GET",
      headers: {
        // Authorization: "bearer" + " " + e,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          console.log(data, "success");
          setListOfEmployee(data);
          setAllEmpListConst(data);

          // ----- Setting Employee List ------
          fetch(url + "api/employeeDesignations", {
            method: "GET",
            headers: {
              // Authorization: "bearer" + " " + e,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              var arr = [];
              data.map((item) => {
                arr.push({
                  label: item.designationName,
                  value: item.designation_id,
                });
              });

              setDesignation(arr);
            });
          // // ----- Setting Employee List ------

          setisLoading(false);
        });
      })
      .catch((error) => console.log("error", error));
  };

  const AddNewEmployeeServer = (e) => {
    e.preventDefault();
    console.log(addNewEmployee);
    if (addNewEmployee.name === "") {
      setEmployeeListValidator({ ...employeeListValidator, name: false });
    } else if (addNewEmployee.cnicNum === "") {
      setEmployeeListValidator({ ...employeeListValidator, cnicNum: false });
    } else if (addNewEmployee.fatherName === "") {
      setEmployeeListValidator({ ...employeeListValidator, fatherName: false });
    } else if (addNewEmployee.phoneNum1 === "") {
      setEmployeeListValidator({ ...employeeListValidator, phoneNum1: false });
    } else if (addNewEmployee.address === "") {
      setEmployeeListValidator({ ...employeeListValidator, address: false });
    } else if (addNewEmployee.jobStatus === "") {
      setEmployeeListValidator({ ...employeeListValidator, jobStatus: false });
    } else if (addNewEmployee.designation === "") {
      setEmployeeListValidator({
        ...employeeListValidator,
        designation: false,
      });
    } else if (addNewEmployee.recruitmentType === "") {
      setEmployeeListValidator({
        ...employeeListValidator,
        recruitmentType: false,
      });
    } else if (addNewEmployee.monthlySalary === "") {
      setEmployeeListValidator({
        ...employeeListValidator,
        monthlySalary: false,
      });
    } else if (addNewEmployee.employeePic1 === "") {
      setEmployeeListValidator({
        ...employeeListValidator,
        employeePic1: false,
      });
    } else if (addNewEmployee.employeePic2 === "") {
      setEmployeeListValidator({
        ...employeeListValidator,
        employeePic2: false,
      });
    } else if (addNewEmployee.employeeCnicFront === "") {
      setEmployeeListValidator({
        ...employeeListValidator,
        employeeCnicFront: false,
      });
    } else if (addNewEmployee.employeeCnicBsck === "") {
      setEmployeeListValidator({
        ...employeeListValidator,
        employeeCnicBsck: false,
      });
    } else {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token
        }`
      );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        name: addNewEmployee.name,
        fatherName: addNewEmployee.fatherName,
        phoneNum1: addNewEmployee.phoneNum1,
        phoneNum2: addNewEmployee.phoneNum2,
        phoneNum3: addNewEmployee.phoneNum3,
        homePhoneNum: addNewEmployee.homePhoneNum,
        cnicNum: addNewEmployee.cnicNum,
        address: addNewEmployee.address,
        referenceName: addNewEmployee.referenceName,
        referencePhoneNum: addNewEmployee.referencePhoneNum,
        jobStatus: addNewEmployee.jobStatus,
        designation: parseInt(addNewEmployee.designation),
        employeePic1: addNewEmployee.employeePic1,
        employeePic2: addNewEmployee.employeePic2,
        employeeCnicFront: addNewEmployee.employeeCnicFront,
        employeeCnicBsck: addNewEmployee.employeeCnicBsck,
        recruitmentType: addNewEmployee.recruitmentType,
        salary: parseFloat(addNewEmployee.monthlySalary),
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${endPoint}api/employeeLists`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          setAddNewEmployee({
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
            monthlySalary: "",
          });
          setModalShow(false);
          fetchAllData();

          setIsDisableSubmitButton(false);
          setEmployeeListValidator(employeeListValidatorInitialState);
          setJobStatusValue("");
          setrecruitmentTypeValue("");
          setUpdateSelectorList(!updateSelectorList);
          notifyAdd();
        })
        .catch((error) => console.log("error", error));
    }
  };

  // const fetchEmployeeByDemand = (e) => {
  //  // setShowSingleUSer(false);

  //  // setSingleUserId("");
  //   if (e.value == -1) {
  //     setShowSingleUSer(false);
  //     console.log("show All");
  //     setSingleUserId("");
  //   } else {
  //     setSingleUserId(e.value);
  //     setShowSingleUSer(true);
  //   }
  // };

  const handleChange = (field, value) => {
    if (value.__isNew__ == true) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          designationName: value.value,
        }),
      };

      fetch(url + "api/employeeDesignations", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data, "new Designation Created");
          setDesignationValue(data.designation_id);
          setAddNewEmployee({
            ...addNewEmployee,
            designation: data.designation_id,
          });
        })
        .catch((err) => {
          console.log("err front End", err);
        });
      console.log("new Created Not Saved");
    } else {
      setDesignationValue(value.value);
      setAddNewEmployee({ ...addNewEmployee, designation: value.value });
    }
    console.log(value.value);
    //     switch (field) {
    //       case "Designation":
    //         setDesignationValue(value.value);
    //         setAddNewEmployee({...addNewEmployee , designation:value.value})
    // // if new call api and create A  new designation
    //         break;
    //       default:
    //         break;
    //     }
  };


  // -----------Function for updated -------
  const fileHandle1ForUpdate = (e) => {
    setdisableSubmitForUpdatePhoto(true);
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
        setdisableSubmitForUpdatePhoto(false);
        setEmployeeToUpdate({ ...emplToUpdate, employeePic1: result });
      })
      .catch((error) => console.log("error", error));
  };
  const fileHandle2ForUpdate = (e) => {
    setdisableSubmitForUpdatePhoto(true);
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
        setdisableSubmitForUpdatePhoto(false);
        setEmployeeToUpdate({ ...emplToUpdate, employeePic2: result });
      })
      .catch((error) => console.log("error", error));
  };
  const fileHandle3ForUpdate = (e) => {
    setdisableSubmitForUpdatePhoto(true);
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
        setdisableSubmitForUpdatePhoto(false);
        setEmployeeToUpdate({ ...emplToUpdate, employeeCnicFront: result });
      })
      .catch((error) => console.log("error", error));
  };
  const fileHandle4ForUpdate = (e) => {
    setdisableSubmitForUpdatePhoto(true);
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
        setdisableSubmitForUpdatePhoto(false);
        setEmployeeToUpdate({ ...emplToUpdate, employeeCnicBsck: result });
      })
      .catch((error) => console.log("error", error));
  };
  const updateEmployeeClouds = (e) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      employee_Id: emplToUpdate.employee_Id,
      name: emplToUpdate.name,
      fatherName: emplToUpdate.fatherName,
      phoneNum1: emplToUpdate.phoneNum1,
      phoneNum2: emplToUpdate.phoneNum2,
      phoneNum3: emplToUpdate.phoneNum3,
      homePhoneNum: emplToUpdate.homePhoneNum,
      cnicNum: emplToUpdate.cnicNum,
      address: emplToUpdate.address,
      referenceName: emplToUpdate.referenceName,
      referencePhoneNum: emplToUpdate.referencePhoneNum,
      jobStatus: emplToUpdate.jobStatusValueUpdate.value,
      designation: emplToUpdate.designationValueUpdate.value,
      employeePic1: emplToUpdate.employeePic1,
      employeePic2:  emplToUpdate.employeePic2,
      employeeCnicFront:  emplToUpdate.employeeCnicFront,
      employeeCnicBsck:  emplToUpdate.employeeCnicBsck,
      recruitmentType: emplToUpdate.recruitmentTypeValueUpdate.value,
      salary: emplToUpdate.salary,
      chart_id: emplToUpdate.chartID,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${endPoint}api/employeeLists`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          console.log("updatedSuccessFully");
          const filterdEmp = ListOfEmployee.filter((emp) => {
            return emp.employee_Id !== emplToUpdate.employee_Id;
          });




          setListOfEmployee([...filterdEmp, {
            address: emplToUpdate.address,
            chartID: emplToUpdate.chartID,
            employee_Id: emplToUpdate.employee_Id,
            name: emplToUpdate.name,
            fatherName: emplToUpdate.fatherName,
            phoneNum1: emplToUpdate.phoneNum1,
            phoneNum2: emplToUpdate.phoneNum2,
            phoneNum3: emplToUpdate.phoneNum3,
            homePhoneNum: emplToUpdate.homePhoneNum,
            cnicNum: emplToUpdate.cnicNum,
            referenceName: emplToUpdate.referenceName,
            referencePhoneNum: emplToUpdate.referencePhoneNum,
            jobStatus: emplToUpdate.jobStatusValueUpdate.value,
            designation: emplToUpdate.designationValueUpdate.value,
            designationName: emplToUpdate.designationValueUpdate.label,
            employeePic1:emplToUpdate.employeePic1,
            employeePic2: emplToUpdate.employeePic2,
            employeeCnicFront:emplToUpdate.employeeCnicFront,
            employeeCnicBsck:emplToUpdate.employeeCnicBsck,
            recruitmentType: emplToUpdate.recruitmentTypeValueUpdate.value,
            salary: parseFloat(emplToUpdate.salary,)
          }])
        } else {
          console.log("Something went wrong");
        }

        return response.text();
      })
      .then((result) => setModalShowView(false))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const searchItem = (e) => {
    var allData = allEmpListConst;
    console.log(e);
    setListOfEmployee(allEmpListConst);
    var filteredData = allData.filter((obj) => {
      var data = Object.keys(obj)
        .filter((key) => obj[key].toString().toLowerCase().includes(e))
        .reduce((cur, key) => {
          return Object.assign(cur, { [key]: obj[key] });
        }, {});
      if (Object.keys(data).length !== 0) {
        return obj;
      }
    });
    setListOfEmployee(filteredData);
  };

  return (
    <>
      {isLoading ? (
        <>
          {" "}
          <Loader />{" "}
        </>
      ) : (
        <>
          {" "}
          <div
            role="main"
            className={`right_col  h-100  ${showNavMenu === false ? "right_col-margin-remove" : " "
              } `}
          >

            {/* Add New Employee  */}
            <MyVerticallyCenteredModal
              show={modalShow}
              AddNewEmployeeServer={AddNewEmployeeServer}
              addNewEmployee={addNewEmployee}
              setAddNewEmployee={setAddNewEmployee}
              fileHandle1={fileHandle1}
              fileHandle2={fileHandle2}
              fileHandle3={fileHandle3}
              fileHandle4={fileHandle4}
              onHide={() => {
                setModalShow(false);
                setAddNewEmployee({
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
                  monthlySalary: "",
                });
                setEmployeeListValidator(employeeListValidatorInitialState);
                setJobStatusValue("");
                setrecruitmentTypeValue("");
              }}
              disableSubmitForUpdatePhoto={disableSubmitForUpdatePhoto}
              jobStatus={jobStatus}
              recruitmentType={recruitmentType}
              jobStatusValue={jobStatusValue}
              setJobStatusValue={setJobStatusValue}
              recruitmentTypeValue={recruitmentTypeValue}
              setrecruitmentTypeValue={setrecruitmentTypeValue}
              designationValue={designationValue}
              designation={designation}
              handleChange={handleChange}
              isDisableSubmitButton={isDisableSubmitButton}
              employeeListValidator={employeeListValidator}
            />

            {/* View Employee Detail  */}
            <MyVerticallyCenteredModalView
              show={modalShowView}
              emplToUpdate={emplToUpdate}
              onHide={() => {
                setIsEmplEditModeOn(false)
                setModalShowView(false)
                
              }}
              disableSubmitForUpdatePhoto={disableSubmitForUpdatePhoto}
              isEmplEditModeOn={isEmplEditModeOn}
              selectEmployee={emplToUpdate}
              setEmployeeToUpdate={setEmployeeToUpdate}
              designation={designation} jobStatus={jobStatus} recruitmentType={recruitmentType}
              ListOfEmployee={ListOfEmployee} setListOfEmployee={setListOfEmployee}
              updateEmployeeClouds={updateEmployeeClouds}
              fileHandle1ForUpdate={fileHandle1ForUpdate}
              fileHandle2ForUpdate={fileHandle2ForUpdate}
              fileHandle3ForUpdate={fileHandle3ForUpdate}
              fileHandle4ForUpdate={fileHandle4ForUpdate}
            />
            <div className="col-md-6 px-0 ">
              {/* <div className="form-group row  w-100"> */}
              {/* <div className="col-md-6">
                {" "}
                <div className=" ">
                  <Selector
                    setStateUpdater={setStateUpdater}
                    stateUpdater={stateUpdater}
                    listOfEmployeeName={listOfEmployeeName}
                    fetchEmployeeByDemand={fetchEmployeeByDemand}
                    setSingleUserId={setSingleUserId}
                    setModalShow={setModalShow}
                    componentUpdater={componentUpdater}
                    updateSelectorList={updateSelectorList}
                  />
                </div>
              </div> */}
              <div className="col-md-6 pl-0">
                {" "}
                <div className=" mb-2">
                  {" "}
                  <input
                    type="text"
                    placeholder="Search Filter"
                    className="form-control "
                    onChange={(e) => searchItem((e.target.value).toLowerCase())}
                  />
                </div>
              </div>

              {/* </div> */}
            </div>
            <div className="col-md-6 text-right pr-0">
              <button
                className="btn btn-success  mt-2 btn-sm   px-2 mr-0"
                onClick={() => setModalShow(true)}
              >
                Add New Employee
                <i className="ml-2 fa fa-plus-square"></i>
              </button>
            </div>
            {/* {showSingleUser ? (
              <ShowSingleEmployee
                setUpdateSelectorList={setUpdateSelectorList}
                updateSelectorList={updateSelectorList}
                componentUpdater={componentUpdater}
                setComponentUpdater={setComponentUpdater}
                fetchAllData={fetchAllData}
                singleUserId={singleUserId}
                setShowSingleUSer={setShowSingleUSer}
              />
            ) : ( */}
            <div className="x_panel">
              <div className="x_content">
                <div className="table-responsive">
                  <table className="table table-striped jambo_table bulk_action">
                    <thead>
                      <tr className="headings fontWeight300">
                        <th className="column-title fontWeight300 "> Sr. </th>
                        <th className="column-title fontWeight300 ">
                          Emp.Name
                        </th>
                        <th className="column-title fontWeight300 ">
                          FatherName
                        </th>
                        <th className="column-title fontWeight300 ">CNIC</th>
                        <th className="column-title fontWeight300 ">
                          Address
                        </th>
                        <th className="column-title fontWeight300 ">
                          Designation
                        </th>
                        <th className="column-title fontWeight300 ">
                          Recruitment
                        </th>
                        <th className="column-title fontWeight300 ">
                          Salary
                        </th>
                        <th className="column-title fontWeight300 ">Phone</th>
                        <th className="column-title fontWeight300 ">
                          Status
                        </th>
                        <th className="column-title fontWeight300 ">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {ListOfEmployee.map((item, index) => {
                        return (
                          <tr className="even pointer" key={item.employee_Id}>
                            <td className=" ">{index + 1}</td>
                            <td className=" ">{item.name}</td>
                            <td className=" ">{item.fatherName}</td>
                            <td className=" text-right">{item.cnicNum}</td>
                            <td className="text-left  ">{item.address}</td>
                            <td className=" text-left ">
                              {item.designationName}
                            </td>
                            <td className="text-left ">
                              {item.recruitmentType}
                            </td>
                            <td className="text-right ">
                              {item.salary !== null && item.salary.toFixed(2)}
                            </td>
                            <td className=" text-right">{item.phoneNum1}</td>
                            <td className="text-center ">
                              {/* {item.jobStatus} */}

                              <input
                                type="checkbox"
                                class="flat"
                                checked={
                                  item.jobStatus === "Active" ? true : false
                                }
                                onChange={() => {
                                  var myHeaders = new Headers();
                                  myHeaders.append(
                                    "Authorization",
                                    `Bearer ${JSON.parse(
                                      localStorage.getItem("access_token")
                                    ).access_token
                                    }`
                                  );

                                  var requestOptions = {
                                    method: "PUT",
                                    headers: myHeaders,
                                    redirect: "follow",
                                  };

                                  fetch(
                                    `${endPoint}api/updateEmpStatus?id=${item.employee_Id}`,
                                    requestOptions
                                  )
                                    .then((response) => response.text())
                                    .then((result) => {
                                      var arrData = ListOfEmployee;
                                      var updatedData = arrData.filter(
                                        (eachEmp) => {
                                          return (
                                            eachEmp.employee_Id !==
                                            item.employee_Id
                                          );
                                        }
                                      ); // old emp  except updated
                                      var newEMpl = arrData.filter(
                                        (eachEmp) => {
                                          return (
                                            eachEmp.employee_Id ===
                                            item.employee_Id
                                          );
                                        }
                                      );   // //new updated emp
                                      var empToBeUpdate = newEMpl[0];
                                      var arrayUnSorted = [
                                        ...updatedData,
                                        {
                                          ...empToBeUpdate,
                                          jobStatus:
                                            item.jobStatus === "Active"
                                              ? "Left"
                                              : "Active",
                                        },
                                      ];
                                      var sorted = arrayUnSorted.sort(
                                        (a, b) => a.name.localeCompare(b.name)
                                      );
                                      setListOfEmployee(sorted);
                                      // Searching sstate managing
                                      var ListOfEmployeeInitialData = allEmpListConst;

                                      var updatedDataConst = ListOfEmployeeInitialData.filter(
                                        (eachEmp) => {
                                          return (
                                            eachEmp.employee_Id !==
                                            item.employee_Id
                                          );
                                        }
                                      ); // old emp  except updated
                                      var unSortedEmpConst = [...updatedDataConst, {
                                        ...empToBeUpdate,
                                        jobStatus:
                                          item.jobStatus === "Active"
                                            ? "Left"
                                            : "Active",
                                      }];
                                      var sortedEmpConst = unSortedEmpConst.sort(
                                        (a, b) => a.name.localeCompare(b.name)
                                      );
                                      setAllEmpListConst(sortedEmpConst)

                                    })
                                    .catch((error) =>
                                      console.log("error", error)
                                    );
                                }}
                              />
                            </td>
                            <td className=" text-center   ">
                              <i className="fa fa-edit mr-2" onClick={() => {
                                setEmployeeToUpdate({
                                  ...item,
                                  designationValueUpdate: { label: item.designationName, value: item.designation },
                                  recruitmentTypeValueUpdate: { label: item.recruitmentType, value: item.recruitmentType },
                                  jobStatusValueUpdate: { label: item.jobStatus, value: item.jobStatus }
                                });
                                setIsEmplEditModeOn(true)
                                setModalShowView(true)

                              }}></i>
                              <i className="fa fa-eye" onClick={() => {
                                const SelectedEmpl = ListOfEmployee.filter((eachEmp) => {
                                  return eachEmp.employee_Id === item.employee_Id
                                })
                                const selectedPer = SelectedEmpl[0];
                                setEmployeeToUpdate({
                                  ...selectedPer,
                                  designationValueUpdate: { label: item.designationName, value: item.designation },
                                  recruitmentTypeValueUpdate: { label: item.recruitmentType, value: item.recruitmentType },
                                  jobStatusValueUpdate: { label: item.jobStatus, value: item.jobStatus }
                                });
                                setModalShowView(true)
                              }}></i>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* )} */}
          </div>
        </>
      )}
    </>
  );
};

export default EmployeeList;
