import { Modal, Button } from "react-bootstrap";
import Creatable from "react-select/creatable";
import Select from "react-select";
import { endPoint } from "../../../config/Config";

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
    minHeight: "30px",
    height: "30px",
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
const customStylesDanger = {
  // control: base => ({
  //   ...base,
  //   // This line disable the blue border

  // })
  control: (provided, state, base) => ({
    ...provided,
    background: "#fff",
    borderColor: "red",
    borderRadius: "none",
    minHeight: "30px",
    height: "30px",
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
            <h2 className="pl-2 pt-2">Employee Detail </h2>
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
                      className={`${
                        props.isEmplEditModeOn
                          ? "form-control"
                          : "form-control form-control-remove"
                      }`}
                      value={props.selectEmployee.name}
                      disabled={!props.isEmplEditModeOn}
                      onChange={(e) => {
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
                      className={`${
                        props.isEmplEditModeOn
                          ? "form-control"
                          : "form-control form-control-remove"
                      }`}
                      value={props.selectEmployee.cnicNum}
                      // value={props.addNewEmployee.cnicNum && Math.max(0, props.addNewEmployee.cnicNum)}
                      onChange={(e) => {
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
                      className={`${
                        props.isEmplEditModeOn
                          ? "form-control"
                          : "form-control form-control-remove"
                      }`}
                      value={props.selectEmployee.fatherName}
                      onChange={(e) => {
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
                      className={`${
                        props.isEmplEditModeOn
                          ? "form-control"
                          : "form-control form-control-remove"
                      }`}
                      value={props.selectEmployee.address}
                      onChange={(e) => {
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
                <div className="row px-2 mr-3 pr-5  ">
                  <div
                    className="col-md-6    "
                    style={{ width: "40px", height: "155px" }}
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
                          width="100px"
                        />
                      </>
                    )}
                    <div className="row">
                      <div className="col-md-2">
                        {" "}
                        {props.isEmplEditModeOn ? (
                          <span className="required">*</span>
                        ) : (
                          <></>
                        )}{" "}
                      </div>
                      <div className="col-md-10">
                        {props.isEmplEditModeOn ? (
                          <>
                            <input
                              className={`form-control form-control-sm`}
                              // className={props.employeeListValidator.employeeCnicBsck ? "form-control " : "form-control requiredValidateInput"}
                              id="formFileSm"
                              type="file"
                              style={{ height: "33px" }}
                           
                              onChange={props.fileHandle1ForUpdate}
                            />{" "}
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6  bg-warning">
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
                          width="100px"
                        />
                      </>
                    )}

                    <div className="row">
                      <div className="col-md-2">
                        {props.isEmplEditModeOn ? (
                          <span className="required">*</span>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-md-10">
                        {props.isEmplEditModeOn ? (
                          <>
                            <input
                              className={`form-control`}
                              // className={props.employeeListValidator.employeeCnicBsck ? "form-control " : "form-control requiredValidateInput"}
                              id="formFileSm"
                              type="file"
                              style={{ height: "33px" }}
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
                          className={`${
                            props.isEmplEditModeOn
                              ? "form-control"
                              : "form-control form-control-remove"
                          }`}
                          value={props.selectEmployee.phoneNum1}
                          onChange={(e) => {
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
                          className={`${
                            props.isEmplEditModeOn
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
                          className={`${
                            props.isEmplEditModeOn
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
                          className={`${
                            props.isEmplEditModeOn
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
                      className={`${
                        props.isEmplEditModeOn
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
                      className={`${
                        props.isEmplEditModeOn
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
                        // recruitmentTypeValue={recruitmentTypeValue}
                        // setrecruitmentTypeValue={setrecruitmentTypeValue}
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
                  {props.selectEmployee.recruitmentType == "Weekly" ? (
                    <>
                      <label className="col-form-label col-md-2 col-sm-3  label-align">
                        Weekly Salary{" "}
                        {props.isEmplEditModeOn ? (
                          <span className="required">*</span>
                        ) : (
                          <>
                            <strong>:</strong>
                          </>
                        )}
                      </label>
                      <div className="col-md-3 col-sm-8">
                        <div>
                          <input
                            className={`${
                              props.isEmplEditModeOn
                                ? "form-control"
                                : "form-control form-control-remove"
                            }`}
                            name="nanr"
                            type="number"
                            placeholder="ex. 20000"
                            required="required"
                            value={props.selectEmployee.salary}
                            onChange={(e) => {
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
                          <span className="required">*</span>
                        ) : (
                          <>
                            <strong>:</strong>
                          </>
                        )}
                      </label>
                      <div className="col-md-3 col-sm-8">
                        <div>
                          <input
                            className={`${
                              props.isEmplEditModeOn
                                ? "form-control"
                                : "form-control form-control-remove"
                            }`}
                            name="nanr"
                            type="number"
                            placeholder="ex. 20000"
                            required="required"
                            value={props.selectEmployee.salary}
                            onChange={(e) => {
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
                      className="col-md-5 bg-warning"
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
                            width="100px"
                          />
                        </>
                      )}
                      <div className="row">
                        <div className="col-md-1">
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
                                className={`form-control`}
                                // className={props.employeeListValidator.employeeCnicBsck ? "form-control " : "form-control requiredValidateInput"}
                                id="formFileSm"
                                type="file"
                                style={{ height: "33px" }}
                                onChange={props.fileHandle3ForUpdate}
                              />{" "}
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md-5 bg-danger"
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
                            width="100px"
                          />
                        </>
                      )}

                      <div className="row">
                        <div className="col-md-1">
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
                                className={`form-control`}
                                // className={props.employeeListValidator.employeeCnicBsck ? "form-control " : "form-control requiredValidateInput"}
                                id="formFileSm"
                                type="file"
                                style={{ height: "33px" }}
                                onChange={props.fileHandle4ForUpdate}
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
                    <div className="col-md-6 offset-md-3 pb-2  ">
                      <button
                        // disabled={props.isDisableSubmitButton }

                        className="btn btn-primary btn-sm px-4"
                        onClick={(e) => {
                          e.preventDefault();

                          props.updateEmployeeClouds();
                        }}
                      >
                        Update
                      </button>
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
