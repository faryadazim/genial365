import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNavSm } from "../../../store/actions/NavState";
import { endPoint } from "../../../config/Config";
import Select from "react-select";
import ReactToPrint from "react-to-print";
import WeaverLadgerReciept from "./WeaverLadgerReciept";
const customStyles = {
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
const customStylesDanger = {
  // control: base => ({
  //   ...base, 
  //   // This line disable the blue border

  // })
  control: (provided, state, base) => ({
    ...provided,
    background: '#fff',
    borderColor: 'red',
    borderRadius: "none",
    minHeight: '30px',
    height: '30px',

    ...base, boxShadow: 'none'
  }),
  option: (provided, state) => ({
    ...provided,

    borderBottom: "1px  #003a4d",
    color: state.isSelected ? "#f79c74" : "#003a4d",
    background: '#fff',

  }),
  valueContainer: (provided, state) => ({
    ...provided, fontSize: "11px",
    height: '30px',
    padding: '0 6px',
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
const WeaverLadger = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const showNavMenu = useSelector((state) => state.NavState);
  var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
  var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
  var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
  const dateToday = `${year}-${month}-${day}`;
  const [dateFrom, setdateFrom] = useState(dateToday);
  const [dateTo, setdateTo] = useState(dateToday);
  const [isLoadingSelector, setIsLoadingSelector] = useState(true);

  const [employeeWeaverOptions, setEmployeeWeaverOptions] = useState([]);
  const [employeeWeaverValue, setEmployeeWeaverValue] = useState({
    label: "",
    value: "",
  });

  const [ selectValidation , setSelectorValidation] = useState(true)
  const [LadgerData, setLadgerData] = useState({})
const [grandTotal , setGrandTotal] = useState({grandTotalDebit:"" , grandTotalCredit:""}) 
  const fetchWeaverList = () => {
    fetch(endPoint + "api/employeeWeaverListWithName", {
      method: "GET",
      headers: {
        // Authorization: "bearer" + " " + e,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        var arrForWeaverEmployee = [];
        data.map((item) => {
          arrForWeaverEmployee.push({
            value: item.employeeId,
            label: item.employeeName,
          });
        });
        setEmployeeWeaverOptions(arrForWeaverEmployee);
        setIsLoadingSelector(false);
      });
  };

  const fetchLadger = () => {
if (employeeWeaverValue.value===null ||employeeWeaverValue.value===undefined ||employeeWeaverValue.value==="") {
  setSelectorValidation(false)
  console.log("select first");
} else {
  


    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
       `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
    );
    myHeaders.append("Content-Type", "application/json");
 
    var requestOptions = {
      method: "GET",
      headers: myHeaders, 
      redirect: "follow",
    };

    fetch(
      `${endPoint}api/Ladger?dateFrom=${dateFrom}T00:00:00&dateTo=${dateTo}T00:00:00&empId=${employeeWeaverValue.value}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => { 
        setLadgerData(JSON.parse(result))
        var grandTotalDebit = 0;
        (JSON.parse(result).ladgerData).map((eachTotalAmount)=>{
            grandTotalDebit= grandTotalDebit+eachTotalAmount.debit 
     
          
        })

        var grandTotalCredit = 0;
        (JSON.parse(result).ladgerData).map((eachTotalAmount)=>{
          grandTotalCredit= grandTotalCredit+eachTotalAmount.credit 
      
          
        }) 
   setGrandTotal({grandTotalDebit:grandTotalDebit , grandTotalCredit:grandTotalCredit})
      })
      .catch((error) => console.log("error", error));}
  };
  useEffect(() => {
    // dispatch(setNavSm());
    fetchWeaverList();
  }, []);

  return (
    <>
      <div
        className={`right_col  h-10 heightFixForFAult  ${
          showNavMenu == false ? "right_col-margin-remove" : " "
        } `}
        role="main"
      >
        <div className="row">
          <div className="col-md-4">
            <div className="x_panel">
              <div className="x_title">
                <h2 className="pl-2 pt-2">Weaver Ladger Generator</h2>
                <ul className="nav navbar-right panel_toolbox d-flex justify-content-end"></ul>
                <div className="clearfix" />
              </div>
              <div className="x_content">
                <div className="row  pr-4">
                  <label className="col-form-label col-md-4 col-sm-4  label-align px-0">
                    Select Weaver
                  </label>
                  <div className="col-md-8 col-sm-8 ">
                    {isLoadingSelector ? (
                      <>. . .</>
                    ) : (
                      <>
                        <Select
                          required
                          className="basic-single"
                          classNamePrefix="select"
                          value={employeeWeaverValue}
                          onChange={(e) =>
                          { setSelectorValidation(true)
                              setEmployeeWeaverValue({
                              label: e.label,
                              value: e.value,
                            })}
                          }
                         
                          isSearchable={true}
                          name="color"
                          options={employeeWeaverOptions}
                          styles={selectValidation?customStyles:customStylesDanger}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="row  pr-4">
                  <div className="col-md-12 px-0">
                    <label className="col-form-label col-md-4 col-sm-4  label-align px-0">
                      Date From
                    </label>
                    <div className="col-md-8 col-sm-8">
                      <input
                        className="form-control"
                        type="date"
                        value={dateFrom}
                        onChange={(e) => {
                          setdateFrom(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row  pr-4">
                  <div className="col-md-12 px-0">
                    <label className="col-form-label col-md-4 col-sm-4  label-align px-0">
                      Date To
                    </label>
                    <div className="col-md-8 col-sm-8">
                      <input
                        className="form-control"
                        type="date"
                        value={dateTo}
                        onChange={(e) => {
                          setdateTo(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row px-4 mb-2">
                  <div className="col-md-12 text-right pr-2 mt-1">
                    <button
                      className="btn btn-sm btn-customOrange pl-3"
                      onClick={(e) => {
                        e.preventDefault();
                      
                        fetchLadger()
                      }}
                    >
                      Search <i className="fa fa-search pl-3 pr-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 px-0">
            <div className="x_panel">
              <div className="x_title">
                <h2 className="pl-2 pt-2">Weaver Ladger</h2>
                <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
                  <li>
                    <ReactToPrint
                      trigger={() => {
                        return (
                          <button className="btn btn-sm btn-success my-2 pt-1 borderRadiusRound">
                            <i className="fa fa-print"></i>
                          </button>
                        );
                      }}
                      content={() => componentRef.current}
                      documentTitle="new docs"
                      pageStyle="print"
                    />
                  </li>
                  <li>
                    <button
                      className="btn btn-sm btn-primary my-2 pt-1 borderRadiusRound"
                      onClick={() => console.log("print")}
                    >
                      <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                    </button>
                  </li>
                </ul>
                <div className="clearfix" />
              </div>
              <WeaverLadgerReciept ref={componentRef} LadgerData={LadgerData} 
              grandTotal={grandTotal} selectValidation ={selectValidation}  
              /> *
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeaverLadger;
