import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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

const JournalVoucher = () => {
  const showNavMenu = useSelector((state) => state.NavState);
  const [weaverOptions, setWeaverOptions] = useState([]);
  const [weaverValue, setWeaverValue] = useState({ label: "", value: "" });
  const [LadgerBalanceState, setLadgerBalanceState] = useState(0);
  var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
  var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
  var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
  const dateToday = `${year}-${month}-${day}`;
  const [dateSelected, setDateSelected] = useState(dateToday);
  const [lodgerBalanceDontShowAtStart, setLodgerBalanceDontShowAtStart] =
    useState(true);
  const [jvFormBody, setjvFormBody] = useState({
    description: "",
    debit: 0,
    credit: 0,
  });

  const fetchWeaverOptions = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${endPoint}api/employeeWeaverListWithName`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        var arrForWeaverEmployee = [];
        JSON.parse(result).map((item) => {
          arrForWeaverEmployee.push({
            value: item.employeeId,
            label: item.employeeName,
          });
        });
        setWeaverOptions(arrForWeaverEmployee);
      })
      .catch((error) => console.log("error", error));
  };

  const fetchLadgerBalance = (e) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer  ${JSON.parse(localStorage.getItem("access_token")).access_token}`
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${endPoint}api/LadgerBalance?weaverId=${e}`, requestOptions)
      .then((response) => response.text())
      .then((result) => setLadgerBalanceState(JSON.parse(result).ladgerBalance))
      .catch((error) => console.log("error", error));
  };
  const saveJVForm = () => {
    console.log(weaverValue,  parseFloat(jvFormBody.debit), "actuall data");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      date: `${dateSelected}T00:00:00.000Z`,
      description: jvFormBody.description,
      debit: parseFloat(jvFormBody.debit),
      credit: parseFloat(jvFormBody.credit),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${endPoint}api/PostJV?weaverId=${weaverValue.value}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setjvFormBody({
          description: "",
          debit: 0,
          credit: 0,
        });
        fetchLadgerBalance(weaverValue.value);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    fetchWeaverOptions();
  }, []);

  return (
    <div
      role="main"
      className={`top_nav bg-light p-1 px-3 heightForJV ${
        showNavMenu == false ? "right_col-margin-remove" : " "
      }  `}
    >
      <div className="x_panel p ">
        <div className="x_title">
          <h2 className="pl-2 pt-2">Journal Voucher</h2>
          <ul className="nav navbar-right panel_toolbox d-flex justify-content-end"></ul>
          <div className="clearfix" />
        </div>
        <div className="x_content my-3">
          <form>
            <div className="row">
              <div className="col-md-4 px-0  ">
                <label className="col-form-label col-md-3 col-sm-3  offset-md-1 label-align">
                  Voucher Inv
                </label>
                <div className="col-md-8 col-sm-8">
                  <input
                    className="form-control form-control-sm"
                    value="RL-2022-04"
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-5 px-0  ">
                {" "}
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4  label-align">
                    Select Weaver
                  </label>
                  <div className="col-md-8 col-sm-8">
                    <Select
                      required
                      className="basic-single"
                      classNamePrefix="select"
                      value={weaverValue}
                      onChange={(e) => {
                        setWeaverValue({ label: e.label, value: e.value });
                        fetchLadgerBalance(e.value);
                        setLodgerBalanceDontShowAtStart(false);
                      }}
                      isSearchable={true}
                      name="color"
                      options={weaverOptions}
                      styles={customStyles}
                    />
                  </div>
                </div>
              </div>

              {!lodgerBalanceDontShowAtStart ? (
                <div className="col-md-3 px-0  ">
                  <div className="field item form-group">
                    <label className="col-form-label col-md-12 col-sm-12 text-left label-align">
                      Ladger Balance{" "}
                      <strong className="text-dark">
                        {" "}
                        {LadgerBalanceState < 0
                          ? `${ Math.abs(( LadgerBalanceState))  }  Cr
                          `
                          : `${Math.abs(LadgerBalanceState)} Dr` }
                      </strong>
                    </label>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="row">
              <div className="col-md-4 px-0  ">
                <label className="col-form-label col-md-3 col-sm-3  offset-md-1 label-align">
                  Date
                </label>
                <div className="col-md-8 col-sm-8">
                  <input
                    className="form-control form-control-sm"
                    type="date"
                    value={dateSelected}
                    onChange={(e) => {
                      setDateSelected(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/* <div className="col-md-5 px-0  ">
                {" "}
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4  label-align">
                    Write Description
                  </label>
                  <div className="col-md-8 col-sm-8">
                    <textarea
                      class="form-control form-control-sm py-1"
                      id="exampleFormControlTextarea3"
                      rows="1"
                    ></textarea>
                  </div>
                </div>
              </div> */}
            </div>

            {/* date  */}
            {/* <div className="field item form-group e">
              <label className="col-form-label col-md-4 col-sm-4  label-align">
                Date
              </label>
              <div className="col-md-6 col-sm-6">
                <input
                  className="form-control"
                  type="date"
                  value={dateSelected}
                  onChange={(e) => {
                    setDateSelected(e.target.value);
                  }}
                />
              </div>
            </div> */}
          </form>

          {/* ---------------table */}
          
            <div className="x_content mt-2">
              <div
                className="table-responsive px-2"
                style={{ overflowX: "unset" }}
              >
                <table
                  className="table   jambo_table bulk_action "
                  // style={{ height: "129px" }}
                >
                  <thead>
                    {/* */}
                    <tr className="headings-for-Production-Form-Shif ">
                      <th
                        className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                                         removeLeftBorder  removeTopBorder text-center fontWeight300"
                        style={{ width: "40%" }}
                      >
                        <div className=" py-1 d-flex justify-content-center ">
                          Description
                        </div>
                      </th>
                      <th
                        className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                                         removeLeftBorder  removeTopBorder text-center fontWeight300"
                        style={{ width: "20%" }}
                      >
                        <div className=" py-1 d-flex justify-content-center ">
                          Debit
                        </div>
                      </th>
                      <th
                        className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                                         removeLeftBorder  removeTopBorder text-center fontWeight300"
                        style={{ width: "20%" }}
                      >
                        <div className=" py-1 d-flex justify-content-center ">
                          Credit
                        </div>
                      </th>
                      <th
                        className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                                         removeLeftBorder  removeTopBorder text-center fontWeight300"
                        style={{ width: "20%" }}
                      >
                        <div className=" py-1 d-flex justify-content-center ">
                          Balance
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="headings-for-Production-Form-Shif ">
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
                            className="form-control"
                            type="text"
                            value={jvFormBody.description}
                            onChange={(e) => {
                              setjvFormBody({
                                ...jvFormBody,
                                description: e.target.value,
                              });
                            }}
                            placeholder="Desc. Here....."
                          />
                        </div>
                      </td>
                      <td
                        className="column-title     text-center  p-0 px-1"
                        style={{
                          paddingRight: "2px",
                          paddingLeft: "2px",
                        }}
                      >
                        <div className=" py-1">
                          <input
                            className="form-control"
                            type="number"
                            value={jvFormBody.debit}
                            onChange={(e) => {
                              setjvFormBody({
                                ...jvFormBody,
                                debit: e.target.value,
                                credit: 0,
                              });
                            }}
                            placeholder="Debit Ex.3456...."
                          />
                        </div>
                      </td>
                      <td
                        className="column-title     text-center  p-0 px-1"
                        style={{
                          paddingRight: "2px",
                          paddingLeft: "2px",
                        }}
                      >
                        <div className=" py-1">
                          <input
                            className="form-control"
                            type="number"
                            value={jvFormBody.credit}
                            onChange={(e) => {
                              setjvFormBody({
                                ...jvFormBody,
                                credit: e.target.value,
                                debit: 0,
                              });
                            }}
                            placeholder="Credit Ex.3456...."
                          />
                        </div>
                      </td>
                      <td
                        className="column-title     text-center  p-0 px-1"
                        style={{
                          paddingRight: "2px",
                          paddingLeft: "2px",
                        }}
                      >
                        <div className=" py-1">
                          <input
                            className="form-control"
                            type="text"
                            // {LadgerBalanceState < 0
                            //   ? `${ Math.abs(( LadgerBalanceState))  }  Cr
                            //   `
                            //   : `${Math.abs(LadgerBalanceState)} Dr` }
                              value={
                                parseFloat(LadgerBalanceState) -
                                parseFloat(jvFormBody.credit) +  parseFloat(jvFormBody.debit)  <
                                0
                                 ? 
                                `${ 
                                  Math.abs(parseFloat(LadgerBalanceState) -
                                    parseFloat(jvFormBody.credit) +  parseFloat(jvFormBody.debit) )
                                    
                                   } Cr `:
                                   `${ 
                                    Math.abs(parseFloat(LadgerBalanceState) -
                                    parseFloat(jvFormBody.credit) +  parseFloat(jvFormBody.debit) )
                                    
                                   } Dr `
                            } 
                            disabled={true}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="row">
                  <div className="col-md-12 text-right my-2">
                    <button
                      className="btn btn-sm btn-primary  "
                      style={{ width: "155px" }}
                      onClick={() => {
                        saveJVForm();
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
      
        </div>
      </div>
    </div>
  );
};

export default JournalVoucher;
