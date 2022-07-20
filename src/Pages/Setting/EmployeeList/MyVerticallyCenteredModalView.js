import { Modal, Button } from "react-bootstrap";
import Creatable from "react-select/creatable";
import Select from "react-select"; 
import { useState } from "react";
import { preventMinus } from "../../../config/oreventMinus";
import { customStyles } from "../../../config/react-select-style";
 
const customStylesBorderRemove = {
  // control: base => ({
  //   ...base,
  //   // This line disable the blue border

  // })
  control: (provided, state, base) => ({
    ...provided,
    background: "#fff",
    borderColor: "white",
    borderRadius: "none",
    minHeight: "30px",
    height: "30px",
    // boxShadow: state.isFocused ? null : null,
    ...base,
    boxShadow: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px  white",
    color: state.isSelected ? "#f79c74" : "#003a4d",
    background: "#fff",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: "30px",
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
    height: "30px",
  }),
};
const MyVerticallyCenteredModalView = (props) => {
  const url = localStorage.getItem("authUser");
  const emplEditValidatorInitialState = {
    empName: true,
    cnicNum: true,
    fatherName: true,
    address: true,
    phoneNumber: true,
    salary: true,
    cnicFront: true,
    cnicBack: true,
    empPic1: true,
    empPic2: true
  }
  const [emplEditValidator, setEmplEditValidator] = useState(emplEditValidatorInitialState)
  const updateFunct = (e) => {

    e.preventDefault();





    if (props.selectEmployee.name === "" || props.selectEmployee.name === undefined || props.selectEmployee.name === null ||
      props.selectEmployee.name === " " || props.selectEmployee.name == "" || props.selectEmployee.name == " ") {
      setEmplEditValidator({ ...emplEditValidator, empName: false })

    } else if (props.selectEmployee.cnicNum === "" || props.selectEmployee.cnicNum === undefined || props.selectEmployee.cnicNum === null ||
      props.selectEmployee.cnicNum === " " || props.selectEmployee.cnicNum == "" || props.selectEmployee.cnicNum == " ") {
      setEmplEditValidator({ ...emplEditValidator, cnicNum: false })


    } else if (props.selectEmployee.fatherName === "" || props.selectEmployee.fatherName === undefined || props.selectEmployee.fatherName === null ||
      props.selectEmployee.fatherName === " " || props.selectEmployee.fatherName == "" || props.selectEmployee.fatherName == " ") {
      setEmplEditValidator({ ...emplEditValidator, fatherName: false })


    } else if (props.selectEmployee.address === "" || props.selectEmployee.address === undefined || props.selectEmployee.address === null ||
      props.selectEmployee.address === " " || props.selectEmployee.address == "" || props.selectEmployee.address == " ") {
      setEmplEditValidator({ ...emplEditValidator, address: false })


    } else if (props.selectEmployee.phoneNum1 === "" || props.selectEmployee.phoneNum1 === undefined || props.selectEmployee.phoneNum1 === null ||
      props.selectEmployee.phoneNum1 === " " || props.selectEmployee.phoneNum1 == "" || props.selectEmployee.phoneNum1 == " ") {
      setEmplEditValidator({ ...emplEditValidator, phoneNumber: false })

      // } else if (props.selectEmployee.employeeCnicFront === "" || props.selectEmployee.employeeCnicFront === undefined || props.selectEmployee.employeeCnicFront === null ||
      //   props.selectEmployee.employeeCnicFront === " " || props.selectEmployee.employeeCnicFront == "" || props.selectEmployee.employeeCnicFront == " ") {
      //   setEmplEditValidator({ ...emplEditValidator, cnicFront: false })

      // } else if (props.selectEmployee.employeeCnicBsck === "" || props.selectEmployee.employeeCnicBsck === undefined || props.selectEmployee.employeeCnicBsck === null ||
      //   props.selectEmployee.employeeCnicBsck === " " || props.selectEmployee.employeeCnicBsck == "" || props.selectEmployee.employeeCnicBsck == " ") {
      //   setEmplEditValidator({ ...emplEditValidator, cnicBack: false })

      // } else if (props.selectEmployee.employeePic1 === "" || props.selectEmployee.employeePic1 === undefined || props.selectEmployee.employeePic1 === null ||
      //   props.selectEmployee.employeePic1 === " " || props.selectEmployee.employeePic1 == "" || props.selectEmployee.employeePic1 == " ") {
      //   setEmplEditValidator({ ...emplEditValidator, empPic1: false })

      // } else if (props.selectEmployee.employeePic2 === "" || props.selectEmployee.employeePic2 === undefined || props.selectEmployee.employeePic2 === null ||
      //   props.selectEmployee.employeePic2 === " " || props.selectEmployee.employeePic2 == "" || props.selectEmployee.employeePic2 == " ") {
      //   setEmplEditValidator({ ...emplEditValidator, empPic2: false })


    } else {

      if (props.selectEmployee.salary === "" || props.selectEmployee.salary === undefined || props.selectEmployee.salary === null ||
        props.selectEmployee.salary === " " || props.selectEmployee.salary == "" || props.selectEmployee.salary == " ") {
        props.updateEmployeeClouds("SalaryNot");
      } else {
        props.updateEmployeeClouds();
      }


      setEmplEditValidator(emplEditValidatorInitialState);
    }


  }
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <>
        {" "}
        <div className="x_panel mb-0">
          <div className="x_title">
          <h2 className="pl-2 pt-2">   <i className='fa fa-edit'></i>&nbsp;Edit Employee</h2>
            <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
              <li>
                <a className="close-link">
                  <i className="fa fa-close" onClick={props.onHide} />
                </a>
              </li>
            </ul>
            <div className="clearfix" />
          </div>
          <div className="x_content mb-2 mt-2 ">
            <form>
              <div className="col-md-7">
                <div className="field item form-group  ">
                  <label className="col-form-label col-md-5 col-sm-3  label-align ">
                    Name{" "}
                    {props.isEmplEditModeOn ? (
                      <span className="required">*</span>
                    ) : (
                      <>
                        <strong>:</strong>
                      </>
                    )}
                  </label>
                  <div className="col-md-7 col-sm-7 pr-0 ">
                    <input
                      name="nanr"
                      placeholder="ex. Ali A.Khan"
                      className={`${props.isEmplEditModeOn ? (emplEditValidator.empName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                      value={props.selectEmployee.name}
                      disabled={!props.isEmplEditModeOn}
                      onChange={(e) => {
                        setEmplEditValidator(emplEditValidatorInitialState)
                        props.setEmployeeToUpdate({
                          ...props.selectEmployee,
                          name: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-5 label-align ">
                    CNIC{" "}
                    {props.isEmplEditModeOn ? (
                      <span className="required">*</span>
                    ) : (
                      <>
                        <strong>:</strong>
                      </>
                    )}
                  </label>
                  <div className="col-md-7 pr-0 ">
                    <input
                      name="nanr"
                      type="number"
                      placeholder="without Dashes Ex, 3310567889234"
                      onInput={(er) =>
                        (er.target.value = er.target.value.slice(0, 13))
                      }
                      // className={`${props.isEmplEditModeOn
                      //     ? "form-control"
                      //     : "form-control form-control-remove"
                      //   }`}
                      className={`${props.isEmplEditModeOn ? (emplEditValidator.cnicNum ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}

                      value={props.selectEmployee.cnicNum}
                      // value={props.addNewEmployee.cnicNum && Math.max(0, props.addNewEmployee.cnicNum)}
                      onChange={(e) => {
                        setEmplEditValidator(emplEditValidatorInitialState)
                        props.setEmployeeToUpdate({
                          ...props.selectEmployee,
                          cnicNum: e.target.value,
                        });
                      }}
                      disabled={!props.isEmplEditModeOn}
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-5 col-sm-5  label-align">
                    Father Name{" "}
                    {props.isEmplEditModeOn ? (
                      <span className="required">*</span>
                    ) : (
                      <>
                        <strong>:</strong>
                      </>
                    )}
                  </label>
                  <div className="col-md-7 col-sm-7 pr-0">
                    <input
                      name="f-Name"
                      placeholder="ex. Abubakar A.Khan"
                      required="required"
                      className={`${props.isEmplEditModeOn ? (emplEditValidator.fatherName ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}

                      value={props.selectEmployee.fatherName}
                      onChange={(e) => {
                        setEmplEditValidator(emplEditValidatorInitialState)
                        props.setEmployeeToUpdate({
                          ...props.selectEmployee,
                          fatherName: e.target.value,
                        });
                      }}
                      disabled={!props.isEmplEditModeOn}
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-5 col-sm-5  label-align">
                    Address{" "}
                    {props.isEmplEditModeOn ? (
                      <span className="required">*</span>
                    ) : (
                      <>
                        <strong>:</strong>
                      </>
                    )}
                  </label>
                  <div className="col-md-7 col-sm-7 pr-0">
                    <input
                      name="address"
                      placeholder="ex. Street 22 ,City Pakistan 39000"
                      required="required"
                      className={`${props.isEmplEditModeOn ? (emplEditValidator.address ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}

                      value={props.selectEmployee.address}
                      onChange={(e) => {
                        setEmplEditValidator(emplEditValidatorInitialState)
                        props.setEmployeeToUpdate({
                          ...props.selectEmployee,
                          address: e.target.value,
                        });
                      }}
                      disabled={!props.isEmplEditModeOn}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-5 h-100 ">
                <div className="row px-2 mr-3 pr-5   ">
                  <div
                    className="col-md-6  "

                  >
                    {props.selectEmployee.employeePic1 === undefined ||
                      props.selectEmployee.employeePic1 === "" ||
                      props.selectEmployee.employeePic1 === null ? (
                      <></>
                    ) : (
                      <>
                        <img
                          src={`${url}${props.selectEmployee.employeePic1.replace(
                            /['"]+/g,
                            ""
                          )}`}
                          alt="not found"
                          width="140"
                          height="140"
                          style={{ borderRadius: "7px" }}
                        />
                      </>
                    )}
                    <div className="row my-1">
                      <div className="col-md-1 px-0">
                        {" "}
                        {props.isEmplEditModeOn ? (
                          <span className="required">*</span>
                        ) : (
                          <></>
                        )}{" "}
                      </div>
                      <div className="col-md-10 px-0">
                        {props.isEmplEditModeOn ? (
                          <>
                            <input
                              className={`${props.isEmplEditModeOn ? (emplEditValidator.empPic1 ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                              // className={props.employeeListValidator.employeeCnicBsck ? "form-control " : "form-control requiredValidateInput"}
                              id="formFileSm"
                              type="file"
                              style={{ height: "33px" }}
                              disabled={props.disableSubmitForUpdatePhoto ? true : false}
                              onChange={props.fileHandle1ForUpdate}
                            />{" "}
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6  ">
                    {props.selectEmployee.employeePic2 === undefined ||
                      props.selectEmployee.employeePic2 === "" ||
                      props.selectEmployee.employeePic2 === null ? (
                      <></>
                    ) : (
                      <>
                        <img
                          src={`${url}${props.selectEmployee.employeePic2.replace(
                            /['"]+/g,
                            ""
                          )}`}
                          alt="not found"
                          width="140"
                          height="140"
                          style={{ borderRadius: "7px" }}
                        />
                      </>
                    )}

                    <div className="row my-1">
                      <div className="col-md-1 px-0 ">
                        {props.isEmplEditModeOn ? (
                          <span className="required">*</span>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-md-10 px-0 ">
                        {props.isEmplEditModeOn ? (
                          <>
                            <input
                              className={`${props.isEmplEditModeOn ? (emplEditValidator.empPic2 ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}
                              // className={props.employeeListValidator.employeeCnicBsck ? "form-control " : "form-control requiredValidateInput"}
                              id="formFileSm"
                              type="file"
                              style={{ height: "33px" }}
                              disabled={props.disableSubmitForUpdatePhoto ? true : false}
                              onChange={props.fileHandle2ForUpdate}
                            />{" "}
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Phone Numbers{" "}
                    {props.isEmplEditModeOn ? (
                      <span className="required">*</span>
                    ) : (
                      <>
                        <strong>:</strong>
                      </>
                    )}
                  </label>
                  <div className="col-md-8 col-sm-8">
                    <div class="row">
                      <div className="col-md-6 pl-0">
                        <input
                          name="number"
                          placeholder="without Dashes Ex, 03045678976"
                          onInput={(er) =>
                            (er.target.value = er.target.value.slice(0, 11))
                          }
                          type="number"
                          className={`${props.isEmplEditModeOn ? (emplEditValidator.phoneNumber ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}

                          value={props.selectEmployee.phoneNum1}
                          onChange={(e) => {
                            setEmplEditValidator(emplEditValidatorInitialState)
                            props.setEmployeeToUpdate({
                              ...props.selectEmployee,
                              phoneNum1: e.target.value,
                            });
                          }}
                          disabled={!props.isEmplEditModeOn}
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          className={`${props.isEmplEditModeOn
                            ? "form-control"
                            : "form-control form-control-remove"
                            }`}
                          name="number"
                          placeholder="Phone Number 2 (Optional)"
                          type="number"
                          // onInput={(er) => er.target.value = er.target.value.slice(0, 11)}

                          value={props.selectEmployee.phoneNum2}
                          onChange={(e) => {
                            props.setEmployeeToUpdate({
                              ...props.selectEmployee,
                              phoneNum2: e.target.value,
                            });
                          }}
                          disabled={!props.isEmplEditModeOn}
                        />
                      </div>
                    </div>
                    <div class="row mt-3">
                      <div className="col-md-6 pl-0">
                        <input
                          className={`${props.isEmplEditModeOn
                            ? "form-control"
                            : "form-control form-control-remove"
                            }`}
                          name="number"
                          type="number"
                          // onInput={(er) => er.target.value = er.target.value.slice(0, 11)}
                          placeholder="Phone Number 3 (Optional)"
                          value={props.selectEmployee.phoneNum3}
                          onChange={(e) => {
                            props.setEmployeeToUpdate({
                              ...props.selectEmployee,
                              phoneNum3: e.target.value,
                            });
                          }}
                          disabled={!props.isEmplEditModeOn}
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          className={`${props.isEmplEditModeOn
                            ? "form-control"
                            : "form-control form-control-remove"
                            }`}
                          name="number"
                          type="number"
                          // onInput={(er) => er.target.value = er.target.value.slice(0, 11)}
                          placeholder="Home Phone (Optional)"
                          value={props.selectEmployee.homePhoneNum}
                          onChange={(e) => {
                            props.setEmployeeToUpdate({
                              ...props.selectEmployee,
                              homePhoneNum: e.target.value,
                            });
                          }}
                          disabled={!props.isEmplEditModeOn}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Reference Name
                  </label>
                  <div className="col-md-4 col-sm-8 pl-0">
                    <input
                      className={`${props.isEmplEditModeOn
                        ? "form-control"
                        : "form-control form-control-remove"
                        }`}
                      name="address"
                      placeholder="ex. Azim Maalic"
                      required="required"
                      value={props.selectEmployee.referenceName}
                      onChange={(e) => {
                        props.setEmployeeToUpdate({
                          ...props.selectEmployee,
                          referenceName: e.target.value,
                        });
                      }}
                      disabled={!props.isEmplEditModeOn}
                    />
                  </div>
                  <div className="col-md-4 col-sm-8">
                    <input
                      className={`${props.isEmplEditModeOn
                        ? "form-control"
                        : "form-control form-control-remove"
                        }`}
                      name="Phone "
                      placeholder="Reference Phone "
                      type="number"
                      // onInput={(er) => er.target.value = er.target.value.slice(0, 11)}
                      value={props.selectEmployee.referencePhoneNum}
                      onChange={(e) => {
                        props.setEmployeeToUpdate({
                          ...props.selectEmployee,
                          referencePhoneNum: e.target.value,
                        });
                      }}
                      disabled={!props.isEmplEditModeOn}
                    />
                  </div>
                </div>

                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Job Status{" "}
                    {props.isEmplEditModeOn ? (
                      <span className="required">*</span>
                    ) : (
                      <>
                        <strong>:</strong>
                      </>
                    )}
                  </label>
                  <div className="col-md-3 col-sm-8 pl-0">
                    <div className="form-group row ml-1-2">
                      <Select
                        required
                        className="basic-single"
                        classNamePrefix="select"
                        value={props.selectEmployee.jobStatusValueUpdate} // {jobStatusValue} setJobStatusValue
                        onChange={(value) => {
                          props.setEmployeeToUpdate({
                            ...props.selectEmployee,
                            jobStatusValueUpdate: {
                              label: value.label,
                              value: value.value,
                            },
                          });
                        }}
                        isSearchable={true}
                        isDisabled={!props.isEmplEditModeOn}
                        name="color"
                        options={props.jobStatus}
                        styles={
                          !props.isEmplEditModeOn
                            ? customStylesBorderRemove
                            : customStyles
                        }
                      />
                    </div>
                  </div>
                  <label className="col-form-label col-md-2 col-sm-3  label-align">
                    Designation{" "}
                    {props.isEmplEditModeOn ? (
                      <span className="required">*</span>
                    ) : (
                      <>
                        <strong>:</strong>
                      </>
                    )}
                  </label>
                  <div className="col-md-3 col-sm-8">
                    <Creatable
                      isClearable={false}
                      options={props.designation}
                      value={props.selectEmployee.designationValueUpdate}
                      isDisabled={!props.isEmplEditModeOn}
                      styles={
                        !props.isEmplEditModeOn
                          ? customStylesBorderRemove
                          : customStyles
                      }
                      onChange={(value) => {
                        props.setEmployeeToUpdate({
                          ...props.selectEmployee,
                          designationValueUpdate: {
                            label: value.label,
                            value: value.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Recruitment Type
                    {props.isEmplEditModeOn ? (
                      <span className="required">*</span>
                    ) : (
                      <>
                        <strong>:</strong>
                      </>
                    )}
                  </label>
                  <div className="col-md-3 col-sm-8 pl-0">
                    <div className="form-group row ml-1-2">
                      <Select
                        required

                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={"Monthly"}
                        value={props.selectEmployee.recruitmentTypeValueUpdate} // {jobStatusValue} setJobStatusValue
                        onChange={(value) => {
                          props.setEmployeeToUpdate({
                            ...props.selectEmployee,
                            recruitmentTypeValueUpdate: {
                              label: value.label,
                              value: value.value,
                            },
                          });
                        }}
                        isSearchable={true}
                        name="color"
                        isDisabled={!props.isEmplEditModeOn}
                        options={props.recruitmentType}
                        styles={
                          !props.isEmplEditModeOn
                            ? customStylesBorderRemove
                            : customStyles
                        }
                      />
                    </div>
                  </div>
                  {props.selectEmployee.recruitmentTypeValueUpdate === undefined || props.selectEmployee.recruitmentTypeValueUpdate.label === "Weekly" ? (
                    <>
                      <label className="col-form-label col-md-2 col-sm-3  label-align">
                        Weekly Salary{" "}
                        {props.isEmplEditModeOn ? (
                          <></>
                        ) : (
                          <>
                            <strong>:</strong>
                          </>
                        )}
                      </label>
                      <div className="col-md-3 col-sm-8">
                        <div>
                          <input
                            className={`${props.isEmplEditModeOn ? (emplEditValidator.salary ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}

                            name="name"
                            type="number"
                            onKeyPress={(e) => preventMinus(e)}
                            min="0"
                            placeholder="ex. 20000"
                            value={props.selectEmployee.salary}
                            onChange={(e) => {
                              setEmplEditValidator(emplEditValidatorInitialState)
                              props.setEmployeeToUpdate({
                                ...props.selectEmployee,
                                salary: e.target.value,
                              });
                            }}
                            disabled={!props.isEmplEditModeOn}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <label className="col-form-label col-md-2 col-sm-3  label-align">
                        Salary{" "}
                        {props.isEmplEditModeOn ? (
                          <></>
                        ) : (
                          <>
                            <strong>:</strong>
                          </>
                        )}
                      </label>
                      <div className="col-md-3 col-sm-8">
                        <div>
                          <input
                            className={`${props.isEmplEditModeOn ? (emplEditValidator.salary ? "form-control" : "form-control requiredValidateInput") : "form-control form-control-remove"}`}

                            name="name"
                            type="number"
                            onKeyPress={(e) => preventMinus(e)}
                            min="0"
                            placeholder="ex. 20000"
                            value={props.selectEmployee.salary}
                            onChange={(e) => {
                              setEmplEditValidator(emplEditValidatorInitialState)
                              props.setEmployeeToUpdate({
                                ...props.selectEmployee,
                                salary: e.target.value,
                              });
                            }}
                            disabled={!props.isEmplEditModeOn}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {/* --- */}
                <div className="field item form-group">
                  <div className="col-md-3 text-right ">
                    CNIC Photos{" "}
                    {props.isEmplEditModeOn ? (
                      <span className="required">*</span>
                    ) : (
                      <>
                        <strong>:</strong>
                      </>
                    )}{" "}
                  </div>
                  <div className="col-md-9 p-0">
                    <div
                      className="col-md-5 "
                      style={{ height: "135px" }}
                    >
                      {props.selectEmployee.employeeCnicFront === undefined ||
                        props.selectEmployee.employeeCnicFront === "" ||
                        props.selectEmployee.employeeCnicFront === null ? (
                        <></>
                      ) : (
                        <>
                          <img
                            src={`${url}${props.selectEmployee.employeeCnicFront.replace(
                              /['"]+/g,
                              ""
                            )}`}
                            alt="not found"
                            width="262 "
                            height="126"
                            style={{ borderRadius: "2px" }}
                          />
                        </>
                      )}
                      <div className="row">
                        <div className="col-md-1 pl-3 mt-2">
                          {" "}
                          {props.isEmplEditModeOn ? (
                            <span className="required">*</span>
                          ) : (
                            <> </>
                          )}{" "}
                        </div>
                        <div className="col-md-11">
                          {props.isEmplEditModeOn ? (
                            <>
                              <input
                                className={`form-control  my-2 w-75`}
                                // className={props.employeeListValidator.employeeCnicBsck ? "form-control " : "form-control requiredValidateInput"}
                                id="formFileSm"
                                type="file"
                                style={{ height: "33px" }}
                                onChange={props.fileHandle3ForUpdate}
                                disabled={props.disableSubmitForUpdatePhoto ? true : false}
                              />{" "}
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md-5 "
                      style={{ height: "135px" }}
                    >
                      {props.selectEmployee.employeeCnicBsck === undefined ||
                        props.selectEmployee.employeeCnicBsck === "" ||
                        props.selectEmployee.employeeCnicBsck === null ? (
                        <></>
                      ) : (
                        <>
                          <img
                            src={`${url}${props.selectEmployee.employeeCnicBsck.replace(
                              /['"]+/g,
                              ""
                            )}`}
                            alt="not found"
                            width="262 "
                            height="126"
                            style={{ borderRadius: "2px" }}
                          />
                        </>
                      )}

                      <div className="row">
                        <div className="col-md-1 mt-3 pl-3" >
                          {" "}
                          {props.isEmplEditModeOn ? (
                            <span className="required  ">*</span>
                          ) : (
                            <> </>
                          )}{" "}
                        </div>
                        <div className="col-md-11">
                          {props.isEmplEditModeOn ? (
                            <>
                              <input
                                className={`form-control my-2 w-75`}
                                id="formFileSm"
                                type="file"
                                style={{ height: "33px" }}
                                onChange={props.fileHandle4ForUpdate}
                                disabled={props.disableSubmitForUpdatePhoto ? true : false}
                              />{" "}
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- */}
              </div>

              {/* {props.disableSubmitForUpdatePhoto ? <div className="text-center">Uploading Image Please wait ...</div> :*/}
              <>
                {" "}
                {props.isEmplEditModeOn ? (
                  <div className="form-group mt-2 ">
                    <div className="col-md-6 offset-md-3 pb-2 " style={{ marginTop: "28px " }}>

                      {
                        !props.disableSubmitForUpdatePhoto ?
                          <>  <button

                            className="btn btn-primary btn-sm px-4  mt-3"
                            onClick={(e) => updateFunct(e)}
                          >
                            Submit
                          </button></> : <div className="text-center"><span className="pr-3">Uploading Image Please wait ...</span>

                            <div class="spinner-border spinner-border-sm pr-2" role="status">
                              <span class="sr-only ">Loading...</span>
                            </div>
                            <div class="spinner-grow spinner-grow-sm" role="status">
                              <span class="sr-only">Loading...</span>
                            </div>
                          </div>
                      }




                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
              {/*   } */}
            </form>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default MyVerticallyCenteredModalView;
