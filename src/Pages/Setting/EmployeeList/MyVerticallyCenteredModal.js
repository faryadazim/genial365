
import { Modal, Button } from "react-bootstrap";
import Creatable from "react-select/creatable";
import Select from "react-select";
import { preventMinus } from "../../../config/oreventMinus";
import { customStyles ,customStylesDanger } from "../../../config/react-select-style";
 

const MyVerticallyCenteredModal = (props) => {
  const url = localStorage.getItem("authUser");
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <>
        {" "}
        <div className="x_panel mb-0">
          <div className="x_title">
          <h2 className="pl-2 pt-2">   <i className='fa fa-edit'></i>&nbsp;Add Employee</h2>
            <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
              <li>
                <a className="close-link">
                  <i className="fa fa-close" onClick={() => {
                    props.onHide()
                    props.setdisableSubmitForUpdatePhoto()
                  }} />
                </a>
              </li>
            </ul>
            <div className="clearfix" />
          </div>
          <div className="x_content mb-2 mt-2">
            <form>
              {/* <span className="section">Personal Info</span> */}
              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">
                  Name<span className="required">*</span>
                </label>
                <div className="col-md-8 col-sm-8">
                  <input
                    className={props.employeeListValidator.name ? "form-control" : "form-control requiredValidateInput"}
                    name="nanr"
                    placeholder="ex. Ali A.Khan"
                    value={props.addNewEmployee.name}
                    onChange={
                      (e) => {
                        props.setEmployeeListValidator({ ...props.employeeListValidator, name: true })
                        props.setAddNewEmployee({ ...props.addNewEmployee, name: e.target.value })

                      }
                    }
                  />
                </div>
              </div>
              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">
                  CNIC<span className="required">*</span>
                </label>
                <div className="col-md-8 col-sm-8">
                  <input
                    className={props.employeeListValidator.cnicNum ? "form-control" : "form-control requiredValidateInput"}
                    name="nanr"
                    type="number"
                    placeholder="without Dashes Ex, 3310567889234"
                    onInput={(er) => er.target.value = er.target.value.slice(0, 13)}
                    value={props.addNewEmployee.cnicNum && Math.max(0, props.addNewEmployee.cnicNum)}
                    onChange={(e) => {
                      props.setEmployeeListValidator({ ...props.employeeListValidator, cnicNum: true })
                      props.setAddNewEmployee({
                        ...props.addNewEmployee,
                        cnicNum: e.target.value,
                      })
                    }
                    }
                  />
                </div>
              </div>
              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">
                  Father Name<span className="required">*</span>
                </label>
                <div className="col-md-8 col-sm-8">
                  <input
                    className={props.employeeListValidator.fatherName ? "form-control" : "form-control requiredValidateInput"}
                    name="f-Name"
                    placeholder="ex. Abubakar A.Khan"
                    required="required"
                    value={props.addNewEmployee.fatherName}
                    onChange={(e) => {
                      props.setEmployeeListValidator({ ...props.employeeListValidator, fatherName: true })
                      props.setAddNewEmployee({
                        ...props.addNewEmployee,
                        fatherName: e.target.value,
                      })
                    }
                    }
                  />
                </div>
              </div>

              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">
                  Phone Numbers<span className="required">*</span>
                </label>
                <div className="col-md-8 col-sm-8">
                  <div class="row">
                    <div className="col-md-6">
                      <input
                        className={props.employeeListValidator.phoneNum1 ? "form-control" : "form-control requiredValidateInput"}
                        name="number"
                        placeholder="without Dashes Ex, 03045678976"
                        onInput={(er) => er.target.value = er.target.value.slice(0, 11)}
                        type="number"

                        value={props.addNewEmployee.phoneNum1 && Math.max(0, props.addNewEmployee.phoneNum1)}

                        onChange={(e) => {
                          props.setEmployeeListValidator({ ...props.employeeListValidator, phoneNum1: true })
                          props.setAddNewEmployee({
                            ...props.addNewEmployee,
                            phoneNum1: e.target.value,
                          })
                        }
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        name="number"
                        placeholder="Phone Number 2 (Optional)"
                        type="number"
                        onInput={(er) => er.target.value = er.target.value.slice(0, 11)}
                        value={props.addNewEmployee.phoneNum2 && Math.max(0, props.addNewEmployee.phoneNum2)}
                        onChange={(e) =>
                          props.setAddNewEmployee({
                            ...props.addNewEmployee,
                            phoneNum2: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        name="number"
                        type="number"
                        onInput={(er) => er.target.value = er.target.value.slice(0, 11)}
                        placeholder="Phone Number 3 (Optional)"
                        value={props.addNewEmployee.phoneNum3 && Math.max(0, props.addNewEmployee.phoneNum3)}
                        onChange={(e) => {
                          props.setAddNewEmployee({
                            ...props.addNewEmployee,
                            phoneNum3: e.target.value,
                          })
                        }
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        name="number"
                        type="number"
                        onInput={(er) => er.target.value = er.target.value.slice(0, 11)}
                        placeholder="Home Phone (Optional)"
                        value={props.addNewEmployee.homePhoneNum && Math.max(0, props.addNewEmployee.homePhoneNum)}
                        onChange={(e) => {
                          props.setAddNewEmployee({
                            ...props.addNewEmployee,
                            homePhoneNum: e.target.value,
                          })
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">
                  Address<span className="required">*</span>
                </label>
                <div className="col-md-8 col-sm-8">
                  <input
                    className={props.employeeListValidator.address ? "form-control" : "form-control requiredValidateInput"}
                    name="address"
                    placeholder="ex. Street 22 ,City Pakistan 39000"
                    required="required"
                    value={props.addNewEmployee.address}
                    onChange={(e) => {
                      props.setEmployeeListValidator({ ...props.employeeListValidator, address: true })
                      props.setAddNewEmployee({
                        ...props.addNewEmployee,
                        address: e.target.value,
                      })
                    }
                    }
                  />
                </div>
              </div>
              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">
                  Reference Name
                </label>
                <div className="col-md-4 col-sm-8">
                  <input
                    className="form-control"
                    name="address"
                    placeholder="ex. Azim Maalic"
                    required="required"
                    value={props.addNewEmployee.referenceName}
                    onChange={(e) => {
                      props.setAddNewEmployee({
                        ...props.addNewEmployee,
                        referenceName: e.target.value,
                      })
                    }
                    }
                  />
                </div>
                <div className="col-md-4 col-sm-8">
                  <input
                    className="form-control"
                    name="Phone "
                    placeholder="Reference Phone "
                    type="number"
                    onInput={(er) => er.target.value = er.target.value.slice(0, 11)}
                    value={props.addNewEmployee.referencePhoneNum && Math.max(0, props.addNewEmployee.referencePhoneNum)}
                    onChange={(e) => {
                      props.setAddNewEmployee({
                        ...props.addNewEmployee,
                        referencePhoneNum: e.target.value,
                      })
                    }
                    }
                  />
                </div>
              </div>

              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">
                  Job Status<span className="required">*</span>
                </label>
                <div className="col-md-3 col-sm-8">
                  <div className="form-group row ml-1-2">
                    <Select
                      required
                      className="basic-single"
                      classNamePrefix="select"
                      value={props.jobStatusValue}       // {jobStatusValue} setJobStatusValue
                      onChange={(value) => {
                        props.setEmployeeListValidator({ ...props.employeeListValidator, jobStatus: true })
                        props.setJobStatusValue({ label: value.label, value: value.value })
                        props.setAddNewEmployee({
                          ...props.addNewEmployee,
                          jobStatus: value.value,
                        });
                      }}
                      isSearchable={true}
                      name="color"
                      options={props.jobStatus}
                      styles={props.employeeListValidator.jobStatus ? customStyles : customStylesDanger}
                    />

                  </div>
                </div>
                <label className="col-form-label col-md-2 col-sm-3  label-align">
                  Designation <span className="required">*</span>
                </label>
                <div className="col-md-3 col-sm-8">


                  <Creatable
                    isClearable={false}

                    onChange={(value) => {
                      props.setEmployeeListValidator({ ...props.employeeListValidator, designation: true })
                      props.handleChange(
                        "Designation",
                        value,
                        props.designationValue
                      )
                    }}
                    options={props.designation}
                    value={props.designationValue.value}
                    styles={props.employeeListValidator.designation ? customStyles : customStylesDanger}
                  />



                </div>
              </div>
              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">
                  Recruitment Type
                  <span className="required">*</span>
                </label>
                <div className="col-md-3 col-sm-8">
                  <div className="form-group row ml-1-2">

                    <Select
                      required
                      className="basic-single"
                      classNamePrefix="select"
                      value={props.recruitmentTypeValue}

                      onChange={(value) => {
                        props.setEmployeeListValidator({ ...props.employeeListValidator, recruitmentType: true })
                        props.setrecruitmentTypeValue({ label: value.label, value: value.value })
                        props.setAddNewEmployee({
                          ...props.addNewEmployee,
                          recruitmentType: value.value,
                        });
                      }}
                      isSearchable={true}
                      name="color"
                      options={props.recruitmentType}
                      styles={props.employeeListValidator.recruitmentType ? customStyles : customStylesDanger}
                    />
                  </div>
                </div>
                {
                  props.recruitmentTypeValue.value == "Weekly" ? <> <label className="col-form-label col-md-2 col-sm-3  label-align">
                    Weekly Salary
                  </label>
                    <div className="col-md-3 col-sm-8">
                      <div>
                        <input
                          className={props.employeeListValidator.monthlySalary ? "form-control" : "form-control requiredValidateInput"}
                          name="name"
                          type="number"
                          onKeyPress={(e) => preventMinus(e)}
                          min="0"
                          placeholder="ex. 20000"
                          value={props.addNewEmployee.monthlySalary}
                          onChange={(e) => {
                            props.setEmployeeListValidator({ ...props.employeeListValidator, monthlySalary: true })

                            props.setAddNewEmployee({
                              ...props.addNewEmployee,
                              monthlySalary: e.target.value,
                            })
                          }
                          }
                        />
                      </div>
                    </div>
                  </> : <>
                    <label className="col-form-label col-md-2 col-sm-3  label-align">
                      {props.recruitmentTypeValue.value}  Salary
                    </label>
                    <div className="col-md-3 col-sm-8">
                      <div>
                        <input
                          className={props.employeeListValidator.monthlySalary ? "form-control" : "form-control requiredValidateInput"}
                          name="name"
                          type="number"
                          onKeyPress={(e) => preventMinus(e)}
                          min="0"
                          placeholder="ex. 20000"
                          value={props.addNewEmployee.monthlySalary}
                          onChange={(e) => {
                            props.setEmployeeListValidator({ ...props.employeeListValidator, monthlySalary: true })
                            props.setAddNewEmployee({
                              ...props.addNewEmployee,
                              monthlySalary: e.target.value,
                            })
                          }
                          }
                        />
                      </div>
                    </div>
                  </>
                }







              </div>
              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">
                  Picture 1  <span className="required">*</span>
                </label>
                <div className="col-md-3 col-sm-8">
                  <div>
                    <input
                      className={props.employeeListValidator.employeePic1 ? "form-control " : "form-control requiredValidateInput"}
                      id="formFileSm"
                      name="employeePic1"
                      type="file"
                      style={{ height: "33px" }}
                      onChange={(e) => {
                        props.setEmployeeListValidator({ ...props.employeeListValidator, employeePic1: true })
                        props.fileHandle1(e)
                      }}
                      disabled={props.disableSubmitForUpdatePhoto ? true : false}
                    />
                  </div>
                </div>

                <label className="col-form-label col-md-2 col-sm-3  label-align">
                  Picture 2   <span className="required">*</span>
                </label>
                <div className="col-md-3 col-sm-8">
                  <div>
                    <input
                      className={props.employeeListValidator.employeePic2 ? "form-control " : "form-control requiredValidateInput"}
                      id="formFileSm"
                      type="file"
                      style={{ height: "33px" }}
                      onChange={(e) => {
                        props.setEmployeeListValidator({ ...props.employeeListValidator, employeePic2: true })
                        props.fileHandle2(e)
                      }}
                      disabled={props.disableSubmitForUpdatePhoto ? true : false}
                    />
                  </div>
                </div>
              </div>
              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">
                  CNIC Front   <span className="required">*</span>
                </label>
                <div className="col-md-3 col-sm-8">
                  <div>
                    <input
                      className={props.employeeListValidator.employeeCnicFront ? "form-control " : "form-control requiredValidateInput"}
                      id="formFileSm"
                      type="file"
                      style={{ height: "33px" }}
                      onChange={(e) => {
                        props.setEmployeeListValidator({ ...props.employeeListValidator, employeeCnicFront: true })
                        props.fileHandle3(e)
                      }}
                      disabled={props.disableSubmitForUpdatePhoto ? true : false}
                    />
                  </div>
                </div>

                <label className="col-form-label col-md-2 col-sm-3  label-align">
                  CNIC Back   <span className="required">*</span>
                </label>
                <div className="col-md-3 col-sm-8">
                  <div>
                    <input
                      className={props.employeeListValidator.employeeCnicBsck ? "form-control " : "form-control requiredValidateInput"}
                      id="formFileSm"
                      type="file"
                      style={{ height: "33px" }}
                      onChange={(e) => {
                        props.setEmployeeListValidator({ ...props.employeeListValidator, employeeCnicBsck: true })
                        props.fileHandle4(e)
                      }}
                      disabled={props.disableSubmitForUpdatePhoto ? true : false}
                    />
                  </div>
                </div>
              </div>
              {props.disableSubmitForUpdatePhoto ? <div className="text-center"><span className="pr-3">Uploading Image Please wait ...</span>

                <div class="spinner-border spinner-border-sm pr-2" role="status">
                  <span class="sr-only ">Loading...</span>
                </div>
                <div class="spinner-grow spinner-grow-sm" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div> : <>   <div className="form-group mt-2 ">
                <div className="col-md-6 offset-md-3 pb-2  ">
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm px-4"
                    onClick={(e) => {
                      props.setdisableSubmitForUpdatePhoto()
                      props.AddNewEmployeeServer(e)
                    }}  >  Submit
                  </button>
                </div>
              </div></>
              }

            </form>
          </div>
        </div>
      </>
    </Modal>
  );
}



export default MyVerticallyCenteredModal;