import React, { useState, useEffect } from "react";
// import {  Button } from "bootstrap";
import Loader from "../../../Layout/Loader/Loader";
import Select from "react-select";

import ShowSingleEmployee from "./ShowSingleEmployee";
import { useSelector } from "react-redux";
import Selector from "../../../Layout/Const/Selector";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import MyVerticallyCenteredModalView from "./MyVerticallyCenteredModalView.js";
import { toast, ToastContainer } from "react-toastify";
import { endPoint } from "../../../config/Config";
import { customStyles } from "../../../config/react-select-style";



const EmployeeList = () => {
  const notifyAdd = () => toast("Employee Added Successfully");
  const [isDisableSubmitButton, setIsDisableSubmitButton] = useState(false);
  const [designationValue, setDesignationValue] = useState("Helper");
  const [designation, setDesignation] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [ListOfEmployee, setListOfEmployee] = useState([]);
  const [allEmpListConst, setAllEmpListConst] = useState([]);
  const [employeeStatusState, setEmployeeStatusState] = useState([])
  const [isLoading, setisLoading] = useState(true);
  const showNavMenu = useSelector((state) => state.NavState);
  const [statusFilterOptions, setStatusFilterOptions] = useState([
    { label: "All", value: "All" }, { label: "Active", value: "Active" }, { label: "Left", value: "Left" }
  ])
  const [statusFilterValue, setStatusFilterValue] = useState(statusFilterOptions[0])


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
  const [recruitmentTypeValue, setrecruitmentTypeValue] = useState({});
  const [addNewEmployee, setAddNewEmployee] = useState(employeeInitialState);
  const url = localStorage.getItem("authUser");
  const [disableSubmitForUpdatePhoto, setdisableSubmitForUpdatePhoto] = useState(false);
  const [modalShowView, setModalShowView] = useState(false)
  const recruitmentType = [
    { label: "Weekly", value: "Weekly" },
    { label: "Monthly", value: "Monthly" },
    { label: "Contract", value: "Contract" }];
  const jobStatus = [
    { label: "Active", value: "Active" },
    { label: "Left", value: "Left" },
  ];

  const [updateSelectorList, setUpdateSelectorList] = useState(false);
  const [jobStatusValue, setJobStatusValue] = useState({});
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
          setListOfEmployee(data);
          setAllEmpListConst(data);
          setEmployeeStatusState(data)

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

      var raw;

      if (addNewEmployee.monthlySalary === "") {

        raw = JSON.stringify({
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
          salary: 0,
        });

      } else {
        raw = JSON.stringify({
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

      }





      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${endPoint}api/employeeLists`, requestOptions)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Employee added successfully")
          } else {
            toast.error("Something went wrong")
          }
          return response.json()
        })
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

        })
        .catch((error) => {
          toast.error("Something went wrong")
          console.log("error", error)
        });
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
    var raw

    if (e === "SalaryNot") {
      raw = JSON.stringify({

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
        employeePic2: emplToUpdate.employeePic2,
        employeeCnicFront: emplToUpdate.employeeCnicFront,
        employeeCnicBsck: emplToUpdate.employeeCnicBsck,
        recruitmentType: emplToUpdate.recruitmentTypeValueUpdate.value,
        salary: 0,
        chart_id: emplToUpdate.chartID,
      });
    } else {
      raw = JSON.stringify({
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
        employeePic2: emplToUpdate.employeePic2,
        employeeCnicFront: emplToUpdate.employeeCnicFront,
        employeeCnicBsck: emplToUpdate.employeeCnicBsck,
        recruitmentType: emplToUpdate.recruitmentTypeValueUpdate.value,
        salary: emplToUpdate.salary,
        chart_id: emplToUpdate.chartID,
      });
    }
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization", `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${endPoint}api/employeeLists`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          const filterdEmp = employeeStatusState.filter((emp) => {
            return emp.employee_Id !== emplToUpdate.employee_Id;
          });
          const unSorted = [...filterdEmp, {
            employeeSerialNumber: emplToUpdate.employeeSerialNumber,
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
            employeePic1: emplToUpdate.employeePic1,
            employeePic2: emplToUpdate.employeePic2,
            employeeCnicFront: emplToUpdate.employeeCnicFront,
            employeeCnicBsck: emplToUpdate.employeeCnicBsck,
            recruitmentType: emplToUpdate.recruitmentTypeValueUpdate.value,
            salary: parseFloat(emplToUpdate.salary,)
          }]


          var sortedEmpConst = unSorted.sort(
            (a, b) => a.name.localeCompare(b.name)
          );
          setListOfEmployee(sortedEmpConst)
          setEmployeeStatusState(sortedEmpConst)
          setAllEmpListConst(sortedEmpConst)
          setStatusFilterValue(statusFilterOptions[0])
          toast.success(
            "Employee updated successfully")
        } else {
          toast.error(
            "Something went wrong")
        }

        return response.text();
      })
      .then((result) => setModalShowView(false))
      .catch((error) => {
        toast.error(
          "Something went wrong")
        console.log("error", error)
      });
    setIsEmplEditModeOn(false)
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const searchItem = (e) => {
    var allData = allEmpListConst;
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

  const updateEmployeeStatusBase = (e) => {
    let filterData;
    if (e.value === "All") {
      filterData = employeeStatusState
    } else if (e.value === "Active") {
      filterData = employeeStatusState.filter((EachEmp) => {
        return EachEmp.jobStatus === "Active"
      })
    } else if (e.value === "Left") {
      filterData = employeeStatusState.filter((EachEmp) => {
        return EachEmp.jobStatus === "Left"
      })
    }
    var sorted = filterData.sort(
      (a, b) => a.name.localeCompare(b.name)
    );
    setListOfEmployee(sorted)
    setAllEmpListConst(sorted)


  }
  return (
    <>
      {isLoading ? (
        <>
          {" "}
          <Loader />{" "}
        </>
      ) : (
        <>
          <div
            className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
              }   `}
          >
            <span>&nbsp; Employees Management</span>
          </div>
          <div
            role="main"
            className={`right_col  h-100  ${showNavMenu === false ? "right_col-margin-remove" : " "
              } `}
          >

            <MyVerticallyCenteredModal
              show={modalShow}
              AddNewEmployeeServer={AddNewEmployeeServer}
              addNewEmployee={addNewEmployee}
              setAddNewEmployee={setAddNewEmployee}
              fileHandle1={fileHandle1}
              fileHandle2={fileHandle2}
              fileHandle3={fileHandle3}
              fileHandle4={fileHandle4}
              setEmployeeListValidator={setEmployeeListValidator}
              onHide={() => {
                setdisableSubmitForUpdatePhoto(false)
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
              setdisableSubmitForUpdatePhoto={setdisableSubmitForUpdatePhoto}
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


            <MyVerticallyCenteredModalView
              show={modalShowView}
              emplToUpdate={emplToUpdate}
              onHide={() => {
                setIsEmplEditModeOn(false)
                setModalShowView(false)

              }}
              disableSubmitForUpdatePhoto={disableSubmitForUpdatePhoto}
              isEmplEditModeOn={isEmplEditModeOn}
              setIsEmplEditModeOn={setIsEmplEditModeOn}
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

            <div className="x_panel  ">
              <div className="x_content ">
                <span className="section">
                  <div className="row px-2  pt-3">
                    <div className="col-5 ">
                      <i className='fa fa-list'></i>&nbsp;Listing
                    </div>
                    <div className="col-7 text-right px-0 ">
                      <div className="col-md-5"> <input
                        type="text"
                        placeholder="Search Filter"
                        className="form-control height-button   "
                        onChange={(e) => searchItem((e.target.value).toLowerCase())}
                      /></div>
                      <div className="col-md-4  text-left ">
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          defaultValue={"Active"}
                          value={statusFilterValue}
                          onChange={(value) => {
                            setStatusFilterValue(value)
                            updateEmployeeStatusBase(value)
                          }}
                          isSearchable={true}
                          name="color"
                          options={statusFilterOptions}
                          styles={customStyles}
                        /></div>
                      <div className="col-md-3 pr-4">
                        <button
                          className="btn     btn-sm   px-2 mr-0 w-100 height-button "
                          onClick={() => setModalShow(true)}
                          style={{ backgroundColor: ' #f79c74 ', color: "white", borderRadius: "20px " }}

                        >
                          Add New
                          <i className="ml-2 fa fa-plus-square"></i>
                        </button>
                      </div>
                    </div>




                  </div>
                </span>

                <div className="table-responsive px-3 pb-2">
                  <table className="table table-striped jambo_table bulk_action">
                    <thead>
                      <tr className="headings  ">
                        <th className="column-title fontWeight300    right-border-1 text-center" width="7%"> Sr. </th>
                        <th className="column-title fontWeight300    right-border-1 text-center" width="12%">
                          Emp.Name
                        </th>
                        <th className="column-title fontWeight300   right-border-1 text-center " width="8%">
                          FatherName
                        </th>
                        <th className="column-title fontWeight300    right-border-1 text-center" width="12%">CNIC</th>
                        <th className="column-title fontWeight300    right-border-1 text-center" width="12%">
                          Address
                        </th>
                        <th className="column-title fontWeight300   right-border-1 text-center " width="5%">
                          Designation
                        </th>
                        <th className="column-title fontWeight300   right-border-1 text-center " width="7%">
                          Recruitment
                        </th>
                        <th className="column-title fontWeight300   right-border-1 text-center " width="9%">
                          Salary
                        </th>
                        <th className="column-title fontWeight300    right-border-1 text-center" width="9%">Phone</th>
                        <th className="column-title fontWeight300    right-border-1 text-center" width="4%">
                          Status
                        </th>
                        <th className="column-title fontWeight300   right-border-1 text-center " width="5%">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {ListOfEmployee.map((item, index) => {
                        return (
                          <tr className="even pointer" key={item.employee_Id}>
                            <td className=" ">{item.employeeSerialNumber}</td>
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
                                      var arrData = employeeStatusState;
                                      var updatedData = arrData.filter(
                                        (eachEmp) => {
                                          return (
                                            eachEmp.employee_Id !==
                                            item.employee_Id
                                          );
                                        }
                                      );
                                      var newEMpl = arrData.filter(
                                        (eachEmp) => {
                                          return (
                                            eachEmp.employee_Id ===
                                            item.employee_Id
                                          );
                                        }
                                      );

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

                                      // Searching sstate managing
                                      var ListOfEmployeeInitialData = employeeStatusState;

                                      var updatedDataConst = ListOfEmployeeInitialData.filter(
                                        (eachEmp) => {
                                          return (
                                            eachEmp.employee_Id !==
                                            item.employee_Id
                                          );
                                        }
                                      );
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
                                      setListOfEmployee(sorted);
                                      setEmployeeStatusState(sorted)
                                      setStatusFilterValue(statusFilterOptions[0])
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


          </div>
        </>
      )}
    </>
  );
};

export default EmployeeList;
