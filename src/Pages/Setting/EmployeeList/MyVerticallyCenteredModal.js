
import { Modal, Button } from "react-bootstrap";
import Creatable from "react-select/creatable";
import Select from "react-select";

const customStyles = {
  // control: base => ({
  //   ...base, 
  //   // This line disable the blue border
 
  // })
  control: (provided, state , base) => ({
    ...provided,
    background: '#fff',
    borderColor: '#d9e4e8',
    borderRadius:"none",
    minHeight: '30px',
    height: '30px',
    // boxShadow: state.isFocused ? null : null,
    ...base,    boxShadow: 'none'
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
    padding: '0 6px' ,  
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
const  MyVerticallyCenteredModal=(props)=> {
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
              <h2 className="pl-2 pt-2">Add Employee</h2>
              <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
                <li>
                  <a className="close-link">
                    <i className="fa fa-close" onClick={props.onHide} />
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
                      className="form-control"
                      name="nanr"
                      placeholder="ex. Ali A.Khan"
                      required
                      value={props.addNewEmployee.name}
                      onChange={
                      
                        (e) => 
                       { 
                            //  props.changeSubmitButtonCondition()
                          props.setAddNewEmployee({
                          ...props.addNewEmployee,
                          name: e.target.value,
                        })}
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
                      className="form-control"
                      name="nanr"
                      placeholder="ex. 33103-4578234-5"
                      required="required"
                      value={props.addNewEmployee.cnicNum}
                      onChange={(e) =>
                       {   
                        //    props.changeSubmitButtonCondition()
                          props.setAddNewEmployee({
                          ...props.addNewEmployee,
                          cnicNum: e.target.value,
                        })}
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
                      className="form-control"
                      name="f-Name"
                      placeholder="ex. Abubakar A.Khan"
                      required="required"
                      value={props.addNewEmployee.fatherName}
                      onChange={(e) =>
                      {   
                        //   props.changeSubmitButtonCondition()
                          props.setAddNewEmployee({
                          ...props.addNewEmployee,
                          fatherName: e.target.value,
                        })}
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
                          className="form-control"
                          name="number"
                          placeholder="Phone Number 1"
                          value={props.addNewEmployee.phoneNum1}
                          onChange={(e) =>
                           { 
                                //  props.changeSubmitButtonCondition()
                              props.setAddNewEmployee({
                              ...props.addNewEmployee,
                              phoneNum1: e.target.value,
                            })}
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          className="form-control"
                          name="number"
                          placeholder="Phone Number 2 (Optional)"
                          value={props.addNewEmployee.phoneNum2}
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
                          placeholder="Phone Number 3 (Optional)"
                          value={props.addNewEmployee.phoneNum3}
                          onChange={(e) =>
                           {   
                            //    props.changeSubmitButtonCondition()
                              props.setAddNewEmployee({
                              ...props.addNewEmployee,
                              phoneNum3: e.target.value,
                            })}
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          className="form-control"
                          name="number"
                          placeholder="Home Phone (Optional)"
                          value={props.addNewEmployee.homePhoneNum}
                          onChange={(e) =>
                           {  
                                // props.changeSubmitButtonCondition()
                              props.setAddNewEmployee({
                              ...props.addNewEmployee,
                              homePhoneNum: e.target.value,
                            })}
                          }
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
                      className="form-control"
                      name="address"
                      placeholder="ex. Street 22 ,City Pakistan 39000"
                      required="required"
                      value={props.addNewEmployee.address}
                      onChange={(e) =>
                       {  
                            // props.changeSubmitButtonCondition()
                          props.setAddNewEmployee({
                          ...props.addNewEmployee,
                          address: e.target.value,
                        })}
                      }
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Reference Name<span className="required">*</span>
                  </label>
                  <div className="col-md-4 col-sm-8">
                    <input
                      className="form-control"
                      name="address"
                      placeholder="ex. Azim Maalic"
                      required="required"
                      value={props.addNewEmployee.referenceName}
                      onChange={(e) =>
                       {  
                            // props.changeSubmitButtonCondition()
                          props.setAddNewEmployee({
                          ...props.addNewEmployee,
                          referenceName: e.target.value,
                        })}
                      }
                    />
                  </div>
                  <div className="col-md-4 col-sm-8">
                    <input
                      className="form-control"
                      name="Phone "
                      placeholder="Reference Phone "
                      value={props.addNewEmployee.referencePhoneNum}
                      onChange={(e) =>
                    //   {   props.changeSubmitButtonCondition()
                         { props.setAddNewEmployee({
                          ...props.addNewEmployee,
                          referencePhoneNum: e.target.value,
                        })}
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
                        defaultValue={"Active"}
                        value={props.roleValue}
                        onChange={(value) => {
                          //  props.setRoleVAlue(value.value) ,
                        //   props.changeSubmitButtonCondition()
                          props.setAddNewEmployee({
                            ...props.addNewEmployee,
                            jobStatus: value.value,
                          });
                        }} 
                        isSearchable={true}
                        name="color"
                        options={props.jobStatus}
                        styles={customStyles}
                      />
                      {/* <select
                        className="form-control"
                        onChange={(e) =>
                          props.setAddNewEmployee({
                            ...props.addNewEmployee,
                            jobStatus: e.target.value,
                          })
                        }
                      >
                        <option value={"Active"}>Active</option>
                        <option value={"Left"}>Left</option>
                      </select> */}
                    </div>
                  </div>
                  <label className="col-form-label col-md-2 col-sm-3  label-align">
                    Designation <span className="required">*</span>
                  </label>
                  <div className="col-md-3 col-sm-8">
            
  
                    <Creatable
                      isClearable={false}
                   
                      onChange={(value) =>
                       {   
                          props.handleChange(
                          "Designation",
                          value,
                          props.designationValue
                        )}
                      }
                      defaultValue="Not"
                      options={props.designation}
                      value={props.designationValue.value}
                      styles={customStyles}
                    />
  
   
  
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Select RecruitmentType Type{" "}
                    <span className="required">*</span>
                  </label>
                  <div className="col-md-3 col-sm-8">
                    <div className="form-group row ml-1-2">
                     
                          <Select
                      required
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={"Monthly"}
                        value={props.recruitmentTypeValue.value}
                        onChange={(value) => { 
                          props.setAddNewEmployee({
                            ...props.addNewEmployee,
                            recruitmentType: value.value,
                          });
                        }} 
                        isSearchable={true}
                        name="color"
                        options={props.recruitmentType}
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  <label className="col-form-label col-md-2 col-sm-3  label-align">
                    Monthly Salary <span className="required">*</span>
                  </label>
                  <div className="col-md-3 col-sm-8">
                    <div>
                      <input
                        className="form-control"
                        name="nanr"
                        placeholder="ex. 20000"
                        required="required"
                        value={props.addNewEmployee.monthlySalary}
                        onChange={(e) =>
                          {   
                            //   props.changeSubmitButtonCondition()
                            props.setAddNewEmployee({
                            ...props.addNewEmployee,
                            monthlySalary: e.target.value,
                          })}
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Picture 1
                  </label>
                  <div className="col-md-3 col-sm-8">
                    <div>
                      <input
                        className="form-control form-control-sm"
                        id="formFileSm"
                        name="employeePic1"
                        type="file"
                        style={{ height: "33px" }}
                        onChange={ props.fileHandle1 }
                      />
                    </div>
                  </div>
  
                  <label className="col-form-label col-md-2 col-sm-3  label-align">
                    Picture 2
                  </label>
                  <div className="col-md-3 col-sm-8">
                    <div>
                      <input
                        className="form-control form-control-sm"
                        id="formFileSm"
                        type="file"
                        style={{ height: "33px" }}
                        onChange={ props.fileHandle2}
                      />
                    </div>
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    CNIC Front
                  </label>
                  <div className="col-md-3 col-sm-8">
                    <div>
                      <input
                        className="form-control form-control-sm"
                        id="formFileSm"
                        type="file"
                        style={{ height: "33px" }}
                        onChange={ props.fileHandle3 }
                      />
                    </div>
                  </div>
  
                  <label className="col-form-label col-md-2 col-sm-3  label-align">
                    CNIC Back
                  </label>
                  <div className="col-md-3 col-sm-8">
                    <div>
                      <input
                        className="form-control form-control-sm"
                        id="formFileSm"
                        type="file"
                        style={{ height: "33px" }}
                        onChange={ props.fileHandle4}
                      />
                    </div>
                  </div>
                </div>
  
                <div className="form-group mt-2 ">
                  <div className="col-md-6 offset-md-3 pb-2  ">
                    <button
                      type="submit"
                      disabled={props.isDisableSubmitButton}
                      className="btn btn-primary btn-sm px-4"
                      onClick={(e) => props.AddNewEmployeeServer(e)}
                    >
                      Submit
                    </button>
                  
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      </Modal>
    );
  }
  


  export default MyVerticallyCenteredModal;