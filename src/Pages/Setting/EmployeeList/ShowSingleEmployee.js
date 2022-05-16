import React, { useEffect, useState } from "react";
import Loader from "../../../Layout/Loader/Loader";
const ShowSingleEmployee = ({ singleUserId , setShowSingleUSer }) => {
    const [showFormControlClass, setShowFormControlClass] = useState(true)
    const [isDisableFormControl, setIsDisableFormControl] = useState(true)
 
    const [isLoading, setisLoading] = useState(true);
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
        monthlySalary: "",
    });






    const EditUser = () => {
        setIsDisableFormControl(false)
        setShowFormControlClass(false)
    }




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
        fetch("http://localhost:63145/api/FileUpload", requestOptions)
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
        fetch("http://localhost:63145/api/FileUpload", requestOptions)
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
        fetch("http://localhost:63145/api/FileUpload", requestOptions)
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
        fetch("http://localhost:63145/api/FileUpload", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log("result image upload", result);
                setEmployeeData({ ...EmployeeData, employeeCnicBsck: result });
            })
            .catch((error) => console.log("error", error));
    };
    //   http://localhost:63145/api/employeeLists

    const UpdateUserCredentials = () => {
        console.log(EmployeeData); setIsDisableFormControl(true)
        setShowFormControlClass(true)

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(EmployeeData),
        };
        console.log(requestOptions.body);
        fetch("http://localhost:63145/api/employeeLists", requestOptions)
            .then((response) => response.json())
            .then((data) => { // notifyAdd();
            })
            .catch((err) => {
                console.log("err", err);
            });


    };
const DeleteUser = ()=>{
    // http://localhost:63145/api/employeeLists?id=1007
    fetch(`http://localhost:63145/api/employeeLists?id=${singleUserId}`, {
        method: "DELETE",
        // headers: {
        //   Authorization:
        //     JSON.parse(localStorage.getItem("authUser")).token_type +
        //     " " +
        //     JSON.parse(localStorage.getItem("authUser")).access_token,
        //   "Content-Type": "application/x-www-form-urlencoded",
        // },
      })
        .then((response) => {
          // deleteing Role for this Id
          setShowSingleUSer(false)
   
        })
        .catch((error) => {
          console.log("error", error);
         
        });
}
    useEffect(() => {
        fetch(`http://localhost:63145/api/employeeListsById?id=${singleUserId}`)
            .then((response) => response.json())
            .then((json) => {
                setEmployeeData(json)
                setisLoading(false)

            });
    }, [])




    return (
        <>

            {
                isLoading ?
                    <>
                        <Loader />
                    </> : <>
                        <>
                            <div className="x_panel">
                                <div className="x_title">
                                    <h2 className="pl-2 pt-2">Employee Datails</h2>
                                    <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
                                        <li>
                                            {
                                                showFormControlClass ? <a
                                                    className="close-link mt-2 mr-2"
                                                    onClick={() => EditUser()}
                                                >
                                                    <i className="fa fa-edit" />
                                                </a>
                                                    :
                                                    <a className="close-link mt-2 mr-2"
                                                        onClick={() => UpdateUserCredentials()}>
                                                        <i className="fa fa-save" />
                                                    </a>
                                            }



                                        </li>
                                        <li>
                                        <a className="close-link mt-2 mr-2"
                                                        onClick={() => DeleteUser()}>
                                                        <i className="fa fa-trash text-danger" />
                                                    </a>
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
                                                        <input className={`form-control 
                                         ${showFormControlClass ? "removeFormControlBorder" : " "} `} disabled={isDisableFormControl}
                                                            value={EmployeeData.name}
                                                            onChange={(e) => setEmployeeData({ ...EmployeeData, name: e.target.value })} />


                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-form-label  col-md-3 col-sm-3  ">
                                                        Father Name
                                                    </label>
                                                    <div className="col-md-8 col-sm-8">
                                                        <input className={`form-control 
                                         ${showFormControlClass ? "removeFormControlBorder" : " "} `}
                                                            value={EmployeeData.fatherName} disabled={isDisableFormControl}
                                                            onChange={(e) => setEmployeeData({ ...EmployeeData, fatherName: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-form-label  col-md-3 col-sm-3  ">
                                                        Phone Number 1
                                                    </label>
                                                    <div className="col-md-8 col-sm-8">
                                                        <input className={`form-control 
                                         ${showFormControlClass ? "removeFormControlBorder" : " "} `}
                                                            value={EmployeeData.phoneNum1}
                                                            onChange={(e) => setEmployeeData({ ...EmployeeData, phoneNum1: e.target.value })}
                                                            disabled={isDisableFormControl} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-form-label col-md-3 col-sm-3 ">
                                                        Phone Number 2
                                                    </label>
                                                    <div className="col-md-8 col-sm-8">
                                                        <input className={`form-control 
                                         ${showFormControlClass ? "removeFormControlBorder" : " "} `}
                                                            value={EmployeeData.phoneNum2}
                                                            onChange={(e) => setEmployeeData({ ...EmployeeData, phoneNum2: e.target.value })}
                                                            disabled={isDisableFormControl} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-form-label col-md-3 col-sm-3  ">
                                                        Phone Number 3
                                                    </label>
                                                    <div className="col-md-8 col-sm-8">
                                                        <input className={`form-control 
                                         ${showFormControlClass ? "removeFormControlBorder" : " "} `}
                                                            value={EmployeeData.phoneNum3}
                                                            onChange={(e) => setEmployeeData({ ...EmployeeData, phoneNum3: e.target.value })}
                                                            disabled={isDisableFormControl} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-form-label  col-md-3 col-sm-3    ">
                                                        Home Phone
                                                    </label>
                                                    <div className="col-md-8 col-sm-8">
                                                        <input className={`form-control 
                                         ${showFormControlClass ? "removeFormControlBorder" : " "} `}
                                                            value={EmployeeData.homePhoneNum}
                                                            onChange={(e) => setEmployeeData({ ...EmployeeData, homePhoneNum: e.target.value })}
                                                            disabled={isDisableFormControl} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-form-label  col-md-3 col-sm-3  ">
                                                        CNIC
                                                    </label>
                                                    <div className="col-md-8 col-sm-8">
                                                        <input className={`form-control 
                                         ${showFormControlClass ? "removeFormControlBorder" : " "} `}
                                                            value={EmployeeData.cnicNum}
                                                            onChange={(e) => setEmployeeData({ ...EmployeeData, cnicNum: e.target.value })}
                                                            disabled={isDisableFormControl} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-form-label  col-md-3 col-sm-3 ">
                                                        Address
                                                    </label>
                                                    <div className="col-md-8 col-sm-8">
                                                        <input className={`form-control 
                                         ${showFormControlClass ? "removeFormControlBorder" : " "} `}
                                                            value={EmployeeData.address}
                                                            onChange={(e) => setEmployeeData({ ...EmployeeData, address: e.target.value })}
                                                            disabled={isDisableFormControl} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-form-label  col-md-3 col-sm-3  ">
                                                        Reference Name
                                                    </label>
                                                    <div className="col-md-8 col-sm-8">
                                                        <input className={`form-control 
                                         ${showFormControlClass ? "removeFormControlBorder" : " "} `}
                                                            value={EmployeeData.referenceName}
                                                            onChange={(e) => setEmployeeData({ ...EmployeeData, referenceName: e.target.value })}
                                                            disabled={isDisableFormControl} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-form-label  col-md-3 col-sm-3  ">
                                                        Reference Phone
                                                    </label>
                                                    <div className="col-md-8 col-sm-8">
                                                        <input className={`form-control 
                                         ${showFormControlClass ? "removeFormControlBorder" : " "} `}
                                                            value={EmployeeData.referencePhoneNum}
                                                            onChange={(e) => setEmployeeData({ ...EmployeeData, referencePhoneNum: e.target.value })}
                                                            disabled={isDisableFormControl} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-form-label  col-md-3 col-sm-3    ">
                                                        Job Status
                                                    </label>
                                                    <div className="col-md-8 col-sm-8">
                                                        <input className={`form-control 
                                         ${showFormControlClass ? "removeFormControlBorder" : " "} `}
                                                            value={EmployeeData.jobStatus}
                                                            onChange={(e) => setEmployeeData({ ...EmployeeData, jobStatus: e.target.value })} disabled={isDisableFormControl} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-form-label  col-md-3 col-sm-3  ">
                                                        Designation
                                                    </label>
                                                    <div className="col-md-8 col-sm-8">
                                                        <input className={`form-control 
                                         ${showFormControlClass ? "removeFormControlBorder" : " "} `}
                                                            value={EmployeeData.designation}
                                                            onChange={(e) => setEmployeeData({ ...EmployeeData, phondesignationeNum1: e.target.value })}
                                                            disabled={isDisableFormControl} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-form-label  col-md-3 col-sm-3 ">
                                                        Salary
                                                    </label>
                                                    <div className="col-md-8 col-sm-8">
                                                        <input className={`form-control 
                                         ${showFormControlClass ? "removeFormControlBorder" : " "} `}
                                                            value={EmployeeData.monthlySalary}
                                                            onChange={(e) => setEmployeeData({ ...EmployeeData, monthlySalary: e.target.value })}
                                                            disabled={isDisableFormControl} />
                                                    </div>
                                                </div>


                                            </div>
                                            <div className="col-md-5">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="image text-right" >

                                                            <img src={`http://localhost:63145${EmployeeData.employeePic1.replace(/['"]+/g, "")}`} alt="image not found" width="100px" />
                                                        </div>
                                                        {showFormControlClass ? "" : <input
                                                            className="form-control form-control-sm mt-1"
                                                            id="formFileSm" type="file" style={{ height: "33px" }}
                                                            onChange={fileHandle1} />}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="image text-left" >
                                                            <img src={`http://localhost:63145${EmployeeData.employeePic2.replace(/['"]+/g, "")}`} alt="image not found" width="100px" />
                                                        </div>
                                                        {showFormControlClass ? "" : <input
                                                            className="form-control form-control-sm mt-1"
                                                            id="formFileSm" type="file" style={{ height: "33px" }}
                                                            onChange={fileHandle2} />}
                                                    </div>

                                                    <div className="col-md-6 text-right mt-3">
                                                        <img src={`http://localhost:63145${EmployeeData.employeeCnicFront.replace(/['"]+/g, "")}`} alt="image not found" width="150px" height="100%" />
                                                        {showFormControlClass ? "" : <input
                                                            className="form-control form-control-sm mt-1"
                                                            id="formFileSm" type="file" style={{ height: "33px" }}
                                                            onChange={fileHandle3} />}
                                                    </div>
                                                    <div className="col-md-6 text-left mt-3">
                                                        <img src={`http://localhost:63145${EmployeeData.employeeCnicBsck.replace(/['"]+/g, "")}`} alt="image not found" width="150px " height="100%" />
                                                        {showFormControlClass ? "" : <input
                                                            className="form-control form-control-sm mt-1"
                                                            id="formFileSm" type="file" style={{ height: "33px" }}
                                                            onChange={fileHandle4} />}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="ln_solid"> */}
                                    </form>
                                </div>
                            </div>
                        </></>


            }</>

    );
};

export default ShowSingleEmployee;
