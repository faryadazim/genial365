import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { endPoint } from "../../../../config/Config";

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
  const [weaverOptions , setWeaverOptions] = useState([])
  const [weaverValue , setWeaverValue] = useState({label:"" , value:""})
  const [LadgerBalanceState  , setLadgerBalanceState ] = useState(0)
  var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
  var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
  var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
  const dateToday = `${year}-${month}-${day}`;
  const [dateSelected,setDateSelected] = useState(dateToday)
  const [jvFormBody , setjvFormBody ] = useState({
    "description": "",
  "debit":0,
  "credit": 0})

const fetchWeaverOptions = ()=>{
  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch( `${endPoint}api/employeeWeaverListWithName` , requestOptions)
  .then(response => response.text())
  .then(result => {
    
    var arrForWeaverEmployee = [];
    (JSON.parse(result)).map((item) => {
      arrForWeaverEmployee.push({
        value: item.employeeId,
        label: item.employeeName,
      });
    });
    setWeaverOptions(arrForWeaverEmployee);
  })
  .catch(error => console.log('error', error));
}

const fetchLadgerBalance =(e)=>{
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

  fetch( `${endPoint}api/LadgerBalance?weaverId=${e}`, requestOptions)
    .then((response) => response.text())
    .then((result) =>setLadgerBalanceState(JSON.parse(result)))
    .catch((error) => console.log("error", error));
  }
  const saveJVForm =()=>{
console.log(  weaverValue , jvFormBody , "actuall data")
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "date": `${dateSelected}T00:00:00.000Z`, 
  "description": jvFormBody.description,
  "debit":jvFormBody.debit,
  "credit": jvFormBody.credit
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`http://localhost:63145/api/PostJV?weaverId=${weaverValue.value}`, requestOptions)
  .then(response => response.text())
  .then(result =>{ console.log(result)
  setjvFormBody({
    "description": "",
  "debit":0,
  "credit": 0})}
  )
  .catch(error => console.log('error', error));


  }
  useEffect(() => {
    fetchWeaverOptions() 
  }, [])
  
  return (
    <div
      role="main"
      className={`top_nav bg-light p-1 px-3 ${
        showNavMenu == false ? "right_col-margin-remove" : " "
      }  `}
    >
      <div className="x_panel p">
        <div className="x_title">
          <h2 className="pl-2 pt-2">Journal Voucher</h2>
          <ul className="nav navbar-right panel_toolbox d-flex justify-content-end"></ul>
          <div className="clearfix" />
        </div>
        <div className="x_content my-3">
          <form>
            <div className="field item form-group">
              <label className="col-form-label col-md-4 col-sm-4  label-align">
               Select Weaver
              </label>
              <div className="col-md-6 col-sm-6">
                <Select
                  required
                  className="basic-single"
                  classNamePrefix="select"
                  value={weaverValue}
                              onChange={(e) =>
                                {
                                  setWeaverValue({label:e.label, value:e.value})
                                  fetchLadgerBalance(e.value)}
                              }
 
                  isSearchable={true}
                  name="color"
                  options={weaverOptions}
                  styles={customStyles}
                />
              </div>
            </div>
            <div className="field item form-group">
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
            </div>
            <div className="field item form-group">
              <label className="col-form-label col-md-4 col-sm-4  label-align">
                Ladger Balance
              </label>
              <div className="col-md-6 col-sm-6">
                <input
                  className="form-control form-control-sm"
                  value={LadgerBalanceState<0?`${Math.abs(LadgerBalanceState)} Dr`:`${(LadgerBalanceState)} Cr`}
                  disabled={true}
                />
              </div>
            </div>
          </form>

          {/* ---------------table */}
          <div className="x_panel">
            <div className="x_content">
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
                        {/* jvFormBody , setjvFormBody */}
                        <div className=" py-1">
                          <input
                            className="form-control"
                            type="text"
                            value={jvFormBody.description}
                            onChange={(e)=>{setjvFormBody({...jvFormBody , description:e.target.value})}}
                            placeholder="Desc. Here....."
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
                            className="form-control"
                            type="number" 
                            value={jvFormBody.debit}
                            onChange={(e)=>{setjvFormBody({...jvFormBody , debit:e.target.value})}}
                            
                            placeholder="Debit Ex.3456...."
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
                            className="form-control"
                            type="number"
                            value={jvFormBody.credit}
                            onChange={(e)=>{setjvFormBody({...jvFormBody , credit:e.target.value})}}
                            
                            placeholder="Credit Ex.3456...."
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
                            className="form-control"
                            type="text"
                       //     value={parseInt(LadgerBalanceState)+parseInt(jvFormBody.debit)-parseInt(jvFormBody.credit)}
                           value= {parseInt(LadgerBalanceState)+parseInt(jvFormBody.debit)-parseInt(jvFormBody.credit)<0?`${Math.abs(parseInt(LadgerBalanceState)+parseInt(jvFormBody.debit)-parseInt(jvFormBody.credit))} Dr`:`${(parseInt(LadgerBalanceState)+parseInt(jvFormBody.debit)-parseInt(jvFormBody.credit))} Cr`}
                            placeholder="Desc. Here....."
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
                      onClick={()=>{saveJVForm()}}
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
    </div>
  );
};

export default JournalVoucher;
