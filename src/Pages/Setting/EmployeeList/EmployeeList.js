import React, { useState, useEffect } from "react";
// import {  Button } from "bootstrap";
import Loader from "../../../Layout/Loader/Loader";

import ShowSingleEmployee from "./ShowSingleEmployee";
import { useSelector } from "react-redux";
import Selector from "../../../Layout/Const/Selector";
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal'
// import { Modal, Button } from "react-bootstrap";
// import Creatable from "react-select/creatable";
// import Select from "react-select";

// const customStyles = {
//   option: (provided, state) => ({
//     ...provided,
//     borderBottom: "1px  #003a4d",
//     color: state.isSelected ? "#f79c74" : "#003a4d",
//     padding: 8,

//     backgroundColor: "white",
//   }),
// };

const EmployeeList = () => {
  const [isDisableSubmitButton , setIsDisableSubmitButton] = useState(false)
  const [designationValue, setDesignationValue] = useState("Helper");
  const [designation, setDesignation] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [ListOfEmployee, setListOfEmployee] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const showNavMenu = useSelector((state) => state.NavState);
  const [showSingleUser, setShowSingleUSer] = useState(false);
  const [singleUserId, setSingleUserId] = useState("");
  const [roleValue, setRoleVAlue] = useState("Active"); 
  const [recruitmentTypeValue, setrecruitmentTypeValue] = useState("Monthly");
  const [stateUpdater ,setStateUpdater] = useState(true)
  const [addNewEmployee, setAddNewEmployee] = useState({
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
    designation: 0,
    employeePic1: "",
    employeePic2: "",
    employeeCnicFront: "",
    employeeCnicBsck: "",
    recruitmentType: "",
    weeklySalary: 0,
    monthlySalary: 0,
  });
 const [componentUpdater , setComponentUpdater] = useState(true)
 const url = localStorage.getItem("authUser");
const recruitmentType = [
  { label: "Weekly", value: "Weekly" },
  { label: "Monthly", value: "Monthly" },
  { label: "Contract", value: "Contract" },
]
  const jobStatus = [
    { label: "Active", value: "Active" },
    { label: "Left", value: "Left" },
  ];
  const [listOfEmployeeName, setListOfEmployeeName] = useState([]);
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
        setAddNewEmployee({ ...addNewEmployee, employeePic1: result });
        // setAddNewEmployee({ ...addNewEmployee, employeePic2: result });
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
    fetch(url+"api/FileUpload", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("result image upload", result);
        setAddNewEmployee({ ...addNewEmployee, employeePic2: result });
      })
      .catch((error) => console.log("error", error));
  };
  const fileHandle3 = (e) => {

    console.log( e.target.files[0]);
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
    console.log(requestOptions );
    fetch(url+"api/FileUpload", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("result image upload", result);
  
 setAddNewEmployee({ ...addNewEmployee, employeeCnicBsck: result });
      })
      .catch((error) => console.log("error", error));
  };
  const fileHandle4 = (e) => {
    console.log( e.target.files[0]);
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
    console.log(requestOptions );

    fetch(url+"api/FileUpload", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("result image upload", result);
  
 setAddNewEmployee({ ...addNewEmployee, employeeCnicBsck: result });
      })
      .catch((error) => console.log("error", error));
  };
  const fetchAllData = () => {
    fetch(url +"api/employeeLists", {
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

          // ----- Setting Employee List ------
          fetch(url +"api/employeeDesignations", {
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

              // notifyAdd();
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
if (
  addNewEmployee.name==='' 
  // || addNewEmployee.address==='' || addNewEmployee.fatherName==='' || addNewEmployee.cnicNum==='' ||
  // addNewEmployee.designation==='' || addNewEmployee.employeeCnicBsck==='' || addNewEmployee.employeeCnicFront==='' || addNewEmployee.phoneNum1==='' ||
  //  addNewEmployee.employeePic2==='' || addNewEmployee.homePhoneNum==='' || addNewEmployee.jobStatus==='' ||
  //  addNewEmployee.monthlySalary==='' || addNewEmployee.recruitmentType==='' || addNewEmployee.phoneNum2==='' ||   addNewEmployee.phoneNum3==='' || addNewEmployee.recruitmentType===''   || addNewEmployee.referenceName===''
) {
  console.log("empty");
} else {
   const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addNewEmployee),
      };
      
      fetch(url +"api/employeeLists", requestOptions)
        .then((response) => response.json())
        .then((data) => {  
          setModalShow(false);
          fetchAllData();
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
          setIsDisableSubmitButton(false)
        })
        .catch((err) => {
          console.log("err front End", err);
        });
   
}     
  };

  const fetchEmployeeByDemand = (e) => { 
    setShowSingleUSer(false);

    setSingleUserId("");
    if (e.value == -1) {
      setShowSingleUSer(false);
      console.log("show All");
      setSingleUserId("");
    } else {
      setSingleUserId(e.value);
      setShowSingleUSer(true);
    }
  };

  const handleChange = (field, value) => {
    if ( value.__isNew__==true) { 
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          designationName: value.value
        }),
      };
      
      fetch(url +"api/employeeDesignations", requestOptions)
        .then((response) => response.json())
        .then((data) => {   
          console.log(data , "new Designation Created");
          setDesignationValue(data.designation_id);
          setAddNewEmployee({...addNewEmployee , designation:data.designation_id})
        })
        .catch((err) => {
          console.log("err front End", err);
        });
        console.log("new Created Not Saved");
}  else{
  setDesignationValue(value.value);
  setAddNewEmployee({...addNewEmployee , designation:value.value})
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
  
  useEffect(() => {
    fetchAllData();
 
  }, []);

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
            className={`right_col  h-100  ${
              showNavMenu === false ? "right_col-margin-remove" : " "
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
              onHide={() => setModalShow(false)}
              jobStatus={jobStatus}
              recruitmentType={recruitmentType}
              setRoleVAlue={setRoleVAlue}
              recruitmentTypeValue={recruitmentTypeValue}
              designationValue={designationValue}
              designation={designation}
              handleChange={handleChange}
              isDisableSubmitButton={isDisableSubmitButton}
          
            />

            {/* <div className="col-md-3">
              <div className="form-group row  w-50">
                <select
                  className="form-control"
                  onChange={(e) => {
                    fetchEmployeeByDemand(e.target.value);
                  }}
                >
                  <option value={"-1"}>All</option>
                  {listOfEmployeeName.map((item) => {
                    return (
                      <option value={item.employee_Id}>{item.name}</option>
                    );
                  })}
                </select>
              </div>
            </div> */}

            <div className="col-md-6 px-0">
              {/* <div className="form-group row  w-100"> */}
              <div className="w-50 mb-2">
                {" "}
                <Selector
                setStateUpdater={setStateUpdater} stateUpdater={stateUpdater}
                  listOfEmployeeName={listOfEmployeeName}
                  fetchEmployeeByDemand={fetchEmployeeByDemand}
                  setSingleUserId={setSingleUserId}
                  setModalShow={setModalShow}
                  componentUpdater={componentUpdater}
                      
                />
              </div>
              {/* </div> */}
            </div>
            <div className="col-md-6 text-right">
              <button
                className="btn btn-success  mt-2 btn-sm   px-2"
                onClick={() => setModalShow(true)}
              >
                Add New Employee
                <i className="ml-2 fa fa-plus-square"></i>
              </button>
            </div>
            {showSingleUser ? (
              <ShowSingleEmployee
              componentUpdater={componentUpdater} setComponentUpdater={setComponentUpdater}
              fetchAllData={fetchAllData}
                singleUserId={singleUserId}
                setShowSingleUSer={setShowSingleUSer}
              />
            ) : (
              <div className="x_panel">
                <div className="x_content">
                  <div className="table-responsive">
                    <table className="table table-striped jambo_table bulk_action">
                      <thead>
                        <tr className="headings">
                          <th className="column-title"> Sr. </th>
                          <th className="column-title">Emp.Name</th>
                          <th className="column-title">FatherName</th>
                          <th className="column-title">CNIC</th>
                          <th className="column-title">Address</th>
                          <th className="column-title">Designation</th>
                          <th className="column-title">Job Status</th>
                          <th className="column-title">Salary</th>
                          <th className="column-title">Phone</th>
                        </tr>
                      </thead>

                      <tbody>
                        {ListOfEmployee.map((item, index) => {
                          return (
                            <tr className="even pointer" key={item.employee_Id}>
                              <td className=" ">{index + 1}</td>
                              <td className=" ">{item.name}</td>
                              <td className=" ">{item.fatherName}</td>
                              <td className=" ">{item.cnicNum}</td>
                              <td className=" ">{item.address}</td>
                              <td className=" ">{item.designationName}</td>
                              <td className=" ">{item.jobStatus}</td>
                              <td className=" ">{item.monthlySalary}</td>
                              <td className=" ">{item.phoneNum1}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default EmployeeList;

// function MyVerticallyCenteredModal(props) {
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <>
//         {" "}
//         <div className="x_panel mb-0">
//           <div className="x_title">
//             <h2 className="pl-2 pt-2">Add Employee</h2>
//             <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
//               <li>
//                 <a className="close-link">
//                   <i className="fa fa-close" onClick={props.onHide} />
//                 </a>
//               </li>
//             </ul>
//             <div className="clearfix" />
//           </div>
//           <div className="x_content mb-2 mt-2">
//             <form>
//               {/* <span className="section">Personal Info</span> */}
//               <div className="field item form-group">
//                 <label className="col-form-label col-md-3 col-sm-3  label-align">
//                   Name<span className="required">*</span>
//                 </label>
//                 <div className="col-md-8 col-sm-8">
//                   <input
//                     className="form-control"
//                     name="nanr"
//                     placeholder="ex. Ali A.Khan"
//                     required
//                     value={props.addNewEmployee.name}
//                     onChange={
                    
//                       (e) => 
//                      {   props.changeSubmitButtonCondition()
//                         props.setAddNewEmployee({
//                         ...props.addNewEmployee,
//                         name: e.target.value,
//                       })}
//                     }
//                   />
//                 </div>
//               </div>
//               <div className="field item form-group">
//                 <label className="col-form-label col-md-3 col-sm-3  label-align">
//                   CNIC<span className="required">*</span>
//                 </label>
//                 <div className="col-md-8 col-sm-8">
//                   <input
//                     className="form-control"
//                     name="nanr"
//                     placeholder="ex. 33103-4578234-5"
//                     required="required"
//                     value={props.addNewEmployee.cnicNum}
//                     onChange={(e) =>
//                      {   props.changeSubmitButtonCondition()
//                         props.setAddNewEmployee({
//                         ...props.addNewEmployee,
//                         cnicNum: e.target.value,
//                       })}
//                     }
//                   />
//                 </div>
//               </div>
//               <div className="field item form-group">
//                 <label className="col-form-label col-md-3 col-sm-3  label-align">
//                   Father Name<span className="required">*</span>
//                 </label>
//                 <div className="col-md-8 col-sm-8">
//                   <input
//                     className="form-control"
//                     name="f-Name"
//                     placeholder="ex. Abubakar A.Khan"
//                     required="required"
//                     value={props.addNewEmployee.fatherName}
//                     onChange={(e) =>
//                     {   props.changeSubmitButtonCondition()
//                         props.setAddNewEmployee({
//                         ...props.addNewEmployee,
//                         fatherName: e.target.value,
//                       })}
//                     }
//                   />
//                 </div>
//               </div>

//               <div className="field item form-group">
//                 <label className="col-form-label col-md-3 col-sm-3  label-align">
//                   Phone Numbers<span className="required">*</span>
//                 </label>
//                 <div className="col-md-8 col-sm-8">
//                   <div class="row">
//                     <div className="col-md-6">
//                       <input
//                         className="form-control"
//                         name="number"
//                         placeholder="Phone Number 1"
//                         value={props.addNewEmployee.phoneNum1}
//                         onChange={(e) =>
//                          {   props.changeSubmitButtonCondition()
//                             props.setAddNewEmployee({
//                             ...props.addNewEmployee,
//                             phoneNum1: e.target.value,
//                           })}
//                         }
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <input
//                         className="form-control"
//                         name="number"
//                         placeholder="Phone Number 2 (Optional)"
//                         value={props.addNewEmployee.phoneNum2}
//                         onChange={(e) =>
//                           props.setAddNewEmployee({
//                             ...props.addNewEmployee,
//                             phoneNum2: e.target.value,
//                           })
//                         }
//                       />
//                     </div>
//                   </div>
//                   <div class="row mt-3">
//                     <div className="col-md-6">
//                       <input
//                         className="form-control"
//                         name="number"
//                         placeholder="Phone Number 3 (Optional)"
//                         value={props.addNewEmployee.phoneNum3}
//                         onChange={(e) =>
//                          {   props.changeSubmitButtonCondition()
//                             props.setAddNewEmployee({
//                             ...props.addNewEmployee,
//                             phoneNum3: e.target.value,
//                           })}
//                         }
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <input
//                         className="form-control"
//                         name="number"
//                         placeholder="Home Phone (Optional)"
//                         value={props.addNewEmployee.homePhoneNum}
//                         onChange={(e) =>
//                          {   props.changeSubmitButtonCondition()
//                             props.setAddNewEmployee({
//                             ...props.addNewEmployee,
//                             homePhoneNum: e.target.value,
//                           })}
//                         }
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="field item form-group">
//                 <label className="col-form-label col-md-3 col-sm-3  label-align">
//                   Address<span className="required">*</span>
//                 </label>
//                 <div className="col-md-8 col-sm-8">
//                   <input
//                     className="form-control"
//                     name="address"
//                     placeholder="ex. Street 22 ,City Pakistan 39000"
//                     required="required"
//                     value={props.addNewEmployee.address}
//                     onChange={(e) =>
//                      {   props.changeSubmitButtonCondition()
//                         props.setAddNewEmployee({
//                         ...props.addNewEmployee,
//                         address: e.target.value,
//                       })}
//                     }
//                   />
//                 </div>
//               </div>
//               <div className="field item form-group">
//                 <label className="col-form-label col-md-3 col-sm-3  label-align">
//                   Reference Name<span className="required">*</span>
//                 </label>
//                 <div className="col-md-4 col-sm-8">
//                   <input
//                     className="form-control"
//                     name="address"
//                     placeholder="ex. Azim Maalic"
//                     required="required"
//                     value={props.addNewEmployee.referenceName}
//                     onChange={(e) =>
//                      {   props.changeSubmitButtonCondition()
//                         props.setAddNewEmployee({
//                         ...props.addNewEmployee,
//                         referenceName: e.target.value,
//                       })}
//                     }
//                   />
//                 </div>
//                 <div className="col-md-4 col-sm-8">
//                   <input
//                     className="form-control"
//                     name="Phone "
//                     placeholder="Reference Phone "
//                     value={props.addNewEmployee.referencePhoneNum}
//                     onChange={(e) =>
//                     {   props.changeSubmitButtonCondition()
//                         props.setAddNewEmployee({
//                         ...props.addNewEmployee,
//                         referencePhoneNum: e.target.value,
//                       })}
//                     }
//                   />
//                 </div>
//               </div>

//               <div className="field item form-group">
//                 <label className="col-form-label col-md-3 col-sm-3  label-align">
//                   Job Status<span className="required">*</span>
//                 </label>
//                 <div className="col-md-3 col-sm-8">
//                   <div className="form-group row ml-1-2">
//                     <Select
//                     required
//                       className="basic-single"
//                       classNamePrefix="select"
//                       defaultValue={"Active"}
//                       value={props.roleValue}
//                       onChange={(value) => {
//                         //  props.setRoleVAlue(value.value) ,
//                         props.changeSubmitButtonCondition()
//                         props.setAddNewEmployee({
//                           ...props.addNewEmployee,
//                           jobStatus: value.value,
//                         });
//                       }}
//                       // isDisabled={isDisabled}
//                       // isLoading={isLoading}
//                       // isClearable={true}
//                       // isRtl={isRtl}
//                       // onChange={setRoleVAlue()}
//                       isSearchable={true}
//                       name="color"
//                       options={props.jobStatus}
//                       styles={customStyles}
//                     />
//                     {/* <select
//                       className="form-control"
//                       onChange={(e) =>
//                         props.setAddNewEmployee({
//                           ...props.addNewEmployee,
//                           jobStatus: e.target.value,
//                         })
//                       }
//                     >
//                       <option value={"Active"}>Active</option>
//                       <option value={"Left"}>Left</option>
//                     </select> */}
//                   </div>
//                 </div>
//                 <label className="col-form-label col-md-2 col-sm-3  label-align">
//                   Designation <span className="required">*</span>
//                 </label>
//                 <div className="col-md-3 col-sm-8">
          

//                   <Creatable
//                     isClearable={false}
                 
//                     onChange={(value) =>
//                      {   
//                         props.handleChange(
//                         "Designation",
//                         value,
//                         props.designationValue
//                       )}
//                     }
//                     defaultValue="Not"
//                     options={props.designation}
//                     value={props.designationValue.value}
//                     styles={customStyles}
//                   />

 

//                 </div>
//               </div>
//               <div className="field item form-group">
//                 <label className="col-form-label col-md-3 col-sm-3  label-align">
//                   Select RecruitmentType Type{" "}
//                   <span className="required">*</span>
//                 </label>
//                 <div className="col-md-3 col-sm-8">
//                   <div className="form-group row ml-1-2">
//                     <select
//                       className="form-control"

//                       onChange={(e) =>
//                       {   props.changeSubmitButtonCondition()
//                           props.setAddNewEmployee({
//                           ...props.addNewEmployee,
//                           recruitmentType: e.target.value,
//                         })}
//                       }
//                     >
//                       <option value="Monthly">Monthly</option>
//                       <option value="Weekly">Weekly</option>
//                       <option value="Contractor">Contractor</option>
//                     </select>
//                   </div>
//                 </div>
//                 <label className="col-form-label col-md-2 col-sm-3  label-align">
//                   Monthly Salary <span className="required">*</span>
//                 </label>
//                 <div className="col-md-3 col-sm-8">
//                   <div>
//                     <input
//                       className="form-control"
//                       name="nanr"
//                       placeholder="ex. 20000"
//                       required="required"
//                       value={props.addNewEmployee.monthlySalary}
//                       onChange={(e) =>
//                         {   props.changeSubmitButtonCondition()
//                           props.setAddNewEmployee({
//                           ...props.addNewEmployee,
//                           monthlySalary: e.target.value,
//                         })}
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="field item form-group">
//                 <label className="col-form-label col-md-3 col-sm-3  label-align">
//                   Picture 1
//                 </label>
//                 <div className="col-md-3 col-sm-8">
//                   <div>
//                     <input
//                       className="form-control form-control-sm"
//                       id="formFileSm"
//                       name="employeePic1"
//                       type="file"
//                       style={{ height: "33px" }}
//                       onChange={ props.fileHandle1 }
//                     />
//                   </div>
//                 </div>

//                 <label className="col-form-label col-md-2 col-sm-3  label-align">
//                   Picture 2
//                 </label>
//                 <div className="col-md-3 col-sm-8">
//                   <div>
//                     <input
//                       className="form-control form-control-sm"
//                       id="formFileSm"
//                       type="file"
//                       style={{ height: "33px" }}
//                       onChange={ props.fileHandle2}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="field item form-group">
//                 <label className="col-form-label col-md-3 col-sm-3  label-align">
//                   CNIC Front
//                 </label>
//                 <div className="col-md-3 col-sm-8">
//                   <div>
//                     <input
//                       className="form-control form-control-sm"
//                       id="formFileSm"
//                       type="file"
//                       style={{ height: "33px" }}
//                       onChange={ props.fileHandle3 }
//                     />
//                   </div>
//                 </div>

//                 <label className="col-form-label col-md-2 col-sm-3  label-align">
//                   CNIC Back
//                 </label>
//                 <div className="col-md-3 col-sm-8">
//                   <div>
//                     <input
//                       className="form-control form-control-sm"
//                       id="formFileSm"
//                       type="file"
//                       style={{ height: "33px" }}
//                       onChange={ props.fileHandle4}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="form-group mt-2 ">
//                 <div className="col-md-6 offset-md-3 pb-2  ">
//                   <button
//                     type="submit"
//                     disabled={props.isDisableSubmitButton}
//                     className="btn btn-primary btn-sm px-4"
//                     onClick={(e) => props.AddNewEmployeeServer(e)}
//                   >
//                     Submit
//                   </button>
                
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </>
//     </Modal>
//   );
// }