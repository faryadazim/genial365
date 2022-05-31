import React, { useState, useEffect } from "react";
import Creatable from "react-select/creatable";
import Select from "react-select";

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
const WeavingProductionFormStepTwo = ({
  shiftOptions,
  weaverEmployeeOptions,
  nativingEmployeeOptions,
  loomDetail,
  ratePerBorderTempState,
  // ........
  updateGrandTotalValue,
  reRender,
  shiftTotalState,
  updateShift,
  updateWeaverNAme,
  updateNoOfBorders,
  updateBGradePiece,
  updateExtraAmountDesc,
  updateExtraAmountAmount,
  updateNativingName,
  updateFaults,
  faultOptions,
  grandFinalTotal,
  setShiftTotalState,
  isLoadingStepTwo,
}) => {
  useEffect(() => {
    updateGrandTotalValue();
  }, [reRender]);

  return (

    <>
      {shiftTotalState.map((shiftTable, i) => {
        return (
          <div className="x_panel" key={i}>
            <div className="x_content">
              <div
                className="table-responsive"
                style={{ overflowX: "unset" }}
              >
                <table
                  className="table   jambo_table bulk_action "
                  style={{ height: "135px" }}
                >
                  <thead>
                    {/* */}
                    <tr className="headings-for-Production-Form-Shif ">
                      <th
                        className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                                         removeLeftBorder  removeTopBorder text-center"
                        style={{ width: "8%" }}
                      >
                        <div className=" py-1 d-flex justify-content-center ">
                          {" "}
                          Shift
                        </div>
                      </th>

                      <th
                        className="column-title     border border-primary removePadding   border-bottom-color removeTopBorder  text-center"
                        style={{ width: "14%" }}
                      >
                        <div className=" py-1">Weaver Name </div>
                      </th>
                      <th
                        className="column-title     border border-primary removePadding   border-bottom-color removeTopBorder  text-center"
                        style={{ width: "10%" }}
                      >
                        <div className=" py-1">No.of Border </div>
                      </th>
                      <th
                        className="column-title  text-center   border border-primary removePadding   border-bottom-color removeTopBorder"
                        style={{ width: "12%" }}
                      >
                        <div className=" py-1 paddingXaxisTable">
                          Total Piece
                        </div>{" "}
                      </th>
                      <th
                        className="column-title  text-center   border border-primary removePadding   border-bottom-color removeTopBorder"
                        style={{ width: "8%" }}
                      >
                        <div className=" py-1 paddingXaxisTable">
                          B Grade Piece
                        </div>{" "}
                      </th>
                      <th
                        className="column-title  text-center   border border-primary removePadding   border-bottom-color removeTopBorder"
                        style={{ width: "8%" }}
                      >
                        <div className=" py-1 paddingXaxisTable">
                          A Grade Piece
                        </div>{" "}
                      </th>
                      <th
                        className="column-title  text-center   border border-primary removePadding   border-bottom-color removeTopBorder"
                        style={{ width: "4%" }}
                      >
                        <div className=" py-1 paddingXaxisTable">
                          Rate/Border
                        </div>{" "}
                      </th>
                      <th
                        className="column-title pileSize  border border-primary removePadding   border-bottom-color removeTopBorder  text-center"
                        style={{ width: "23%" }}
                      >
                        <div>
                          <div className="col-md-12 py-1">Extra Amount</div>
                          <div className="col-md-7 border border-primary removeLeftBorder removeRightBorder removeBottomBorder  py-1 ">
                            Description
                          </div>
                          <div className="col-md-5 border  border-primary removeRightBorder removeBottomBorder py-1">
                            Amount
                          </div>
                        </div>
                      </th>

                      <th
                        className="column-title  text-center  border border-primary 
                                        removeLeftBorder removeTopBorder removeRight Border   border-bottom-color "
                        style={{ width: "4%" }}
                      >
                        Total Amount
                      </th>
                      <th
                        className="column-title  text-center  border border-primary 
                                        removeLeftBorder removeTopBorder removeRight Border   border-bottom-color "
                        style={{ width: "12%" }}
                      >
                        Nativing
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="headings-for-Production-Form-Shif ">
                      <td
                        className="column-title   
                                     text-center p-0 px-1"
                        style={{ width: "11%" }}
                      >
                        <div className=" py-1 d-flex justify-content-center ">
                          <Select
                            required
                            className="basic-single"
                            classNamePrefix="select"
                            value={shiftTotalState[i].shiftSelectorValue}
                            onChange={(e) => {
                              updateShift(i, e.value, e.label);
                            }}
                            isSearchable={true}
                            name="color"
                            options={shiftOptions}
                            styles={shiftTotalState[i].shiftValidation.shiftNameValidate ? customStyles : customStylesDanger}
                          />
                        </div>
                      </td>

                      <td
                        className="column-title      text-center  p-0 px-1"
                        style={{ width: "14%" }}
                      >
                        <div className=" py-1">
                          <Select
                            required
                            className="basic-single"
                            classNamePrefix="select"
                            value={shiftTotalState[i].weaverSelectorValue}
                            onChange={(e) =>
                              updateWeaverNAme(i, e.value, e.label)
                            }
                            isSearchable={true}
                            name="color"
                            options={weaverEmployeeOptions}
                            styles={shiftTotalState[i].shiftValidation.weaverNameValidate ? customStyles : customStylesDanger}
                          />
                        </div>
                      </td>
                      <td
                        className="column-title     text-center  p-0 px-1"
                        style={{
                          width: "10%",
                          paddingRight: "2px",
                          paddingLeft: "2px",
                        }}
                      >
                        <div className=" py-1">
                          <input
                            type="number"
                            className={shiftTotalState[i].shiftValidation.noOfBorderValidate ? "form-control" : "form-control requiredValidateInput"}

                            placeholder="no. of borders"
                            value={shiftTotalState[i].noOfBorder}
                            onChange={(e) =>
                              updateNoOfBorders(i, e.target.value)
                            }
                          />
                        </div>
                      </td>
                      <td
                        className="column-title  text-center    removeTopBorder  p-0 px-1 "
                        style={{ width: "12%" }}
                      >
                        <div className=" py-1 paddingXaxisTable">
                          {shiftTotalState[i].totalPiece === null ||
                            shiftTotalState[i].totalPiece === undefined ||
                            shiftTotalState[i].totalPiece === ""
                            ? "--"
                            : shiftTotalState[i].totalPiece}
                        </div>{" "}
                      </td>
                      <td
                        className="column-title  text-center    p-0 px-1 "
                        style={{
                          width: "8%",
                          paddingRight: "2px",
                          paddingLeft: "2px",
                        }}
                      >
                        <div className=" py-1 paddingXaxisTable">
                          <input
                            type="number"
                            className={shiftTotalState[i].shiftValidation.bGradePiece ? "form-control" : "form-control requiredValidateInput"}
                            value={shiftTotalState[i].bGradePiece}
                            onChange={(e) =>
                              updateBGradePiece(i, e.target.value)
                            }
                            placeholder="ex. 34.."
                          />
                        </div>{" "}
                      </td>
                      <td
                        className="column-title  text-center   p-0 px-1 "
                        style={{ width: "8%" }}
                      >
                        <div className=" py-1 paddingXaxisTable">
                          {shiftTotalState[i].aGradePieces == null ||
                            shiftTotalState[i].aGradePieces == undefined ||
                            shiftTotalState[i].aGradePieces == ""
                            ? "--"
                            : shiftTotalState[i].aGradePieces}
                        </div>{" "}
                      </td>
                      <td
                        className="column-title  text-center    p-0 px-1 "
                        style={{ width: "13%" }}
                      >
                        <div className=" py-1 paddingXaxisTable">
                          {shiftTotalState[i].ratePerBorder}
                        </div>{" "}
                      </td>
                      <td
                        className="column-title pileSize   text-center  p-0 px-1"
                        style={{ width: "8%" }}
                      >
                        <div>
                          <div className="col-md-7    py-1 px-0 pr-1">
                            <textarea
                              className={shiftTotalState[i].shiftValidation.extraAmountDescValidate ? "form-control" : "form-control requiredValidateInput"}

                              placeholder="Ex. issues"
                              rows={1}
                              id="floatingTextarea2"
                              value={shiftTotalState[i].extraAmount.desc}
                              onChange={(e) =>
                                updateExtraAmountDesc(i, e.target.value)
                              }
                            />
                          </div>
                          <div className="col-md-5  py-1 px-0 pl-1">
                            <input
                              type="number"
                              className={shiftTotalState[i].shiftValidation.extraAmountAmountValidate ? "form-control" : "form-control requiredValidateInput"}

                              placeholder="ex. 500/- RS"
                              value={shiftTotalState[i].extraAmount.amount}
                              onChange={(e) =>
                                updateExtraAmountAmount(i, e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </td>

                      <td
                        className="column-title  text-center    p-0 px-1"
                        style={{ width: "4%" }}
                      >
                        {shiftTotalState[i].totalAmount}
                      </td>
                      <td
                        className="column-title  text-center   p-0 px-1 "
                        style={{ width: "8%" }}
                      >
                        <Select
                          required
                          className="basic-single"
                          classNamePrefix="select"
                          value={shiftTotalState[i].nativingSelectorValue}
                          onChange={(e) =>
                            updateNativingName(i, e.value, e.label)
                          }
                          isSearchable={true}
                          name="color"
                          options={nativingEmployeeOptions}
                          styles={shiftTotalState[i].shiftValidation.nativingValidate ? customStyles : customStylesDanger}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        colspan="10"
                        className="p-0 px-1 ss "
                        style={{ height: "34px" }}
                      >
                        <div className="row  " style={{ marginTop: "2px" }}>
                          <div className="col-md-2  my-auto  text-secondary text-right">
                            {" "}
                            Add Fault (Creatable)
                          </div>
                          <div className="col-md-8">
                            {" "}
                            <div className=" d-flex customAutoWidth ">
                              <Creatable
                                placeholder={
                                  <div>
                                    Ex. plug issue, machine header fault
                                  </div>
                                }
                                className="w-100 text-left"
                                isClearable={false}
                                onChange={(value) => updateFaults(i, value)}
                                isMulti={true}
                                value={shiftTotalState[i].knownFaultsIds}
                                options={faultOptions}
                                styles={customStyles}
                              />
                            </div>
                          </div>
                          <div className="col-md-2 text-right">
                            <i className="fa fa-close mt-1 mr-2"></i>

                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      })}
      <div className="addNewButtonDiv  row mt-5">
        <div className="col-md-9">
          <div className="x_panel ">
            <div className="x_content">
              <div className="table-responsive">
                <table className="table table-striped jambo_table bulk_action">
                  <thead>
                    <tr className="headings">
                      <th className="column-title"> Total </th>
                      <th className="column-title">Borders </th>
                      <th className="column-title"> Piece</th>
                      <th className="column-title">B Grade</th>
                      <th className="column-title">A Grade</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="even pointer">
                      <td
                        style={{
                          backgroundColor: "#f79c74",
                          color: "#fff",
                        }}
                      >
                        . . .
                      </td>
                      <td className=" ">{grandFinalTotal.totalBorders}</td>
                      <td className=" ">{grandFinalTotal.totalPiece}</td>
                      <td className=" ">{grandFinalTotal.totalBGrade}</td>
                      <td className=" "> {grandFinalTotal.totalAGrade}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 text-right mt-auto pb-3 pr-3">
          <button
            className="btn btn-sm btn-danger AddShiftBorderRadius"
            onClick={() =>
              setShiftTotalState([
                ...shiftTotalState,
                {
                  shiftName: "",
                  weaverName: "",
                  noOfBorder: 0,
                  totalPiece: 0,
                  bGradePiece: 0,
                  aGradePieces: 0,
                  ratePerBorder: parseInt(ratePerBorderTempState),
                  extraAmount: { desc: "", amount: 0 },
                  totalAmount: 0,
                  nativing: "",
                  // -------------- Selector Current Value Management 
                  shiftSelectorValue: {},
                  weaverSelectorValue: {},
                  nativingSelectorValue: {},
                  // ----------------ShiftValidation
                  shiftValidation: {
                    shiftNameValidate: true, weaverNameValidate: true, noOfBorderValidate: true,
                    bGradePiece: true, extraAmountDescValidate: true, extraAmountAmountValidate: true,
                    nativingValidate: true
                  }
                },
              ])
            }
          >
            {" "}
            Add Shift <i className="ml-2 fa fa-plus-circle"></i>{" "}
          </button>
        </div>
      </div>{" "}

    </>
  );
};

export default WeavingProductionFormStepTwo;
