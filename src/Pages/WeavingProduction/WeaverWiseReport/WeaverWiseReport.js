import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNavSm } from "../../../store/actions/NavState";
import Loader from "../../../Layout/Loader/Loader";
import { endPoint } from "../../../config/Config";
import Select from "react-select";
import WeaverWiseReportReciept from './WeaverWiseReportReciept'
import ReactToPrint from "react-to-print";
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
const WeaverWiseReport = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const showNavMenu = useSelector((state) => state.NavState);
  var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
  var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
  var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
  const dateToday = `${year}-${month}-${day}`;
  const [dateFrom, setdateFrom] = useState(dateToday);
  const [dateTo, setdateTo] = useState(dateToday);
  const [isLoadingSelector, setIsLoadingSelector] = useState(true)
  const [summaryFinal, setSummaryFinal] = useState({})

  const [employeeWeaverOptions, setEmployeeWeaverOptions] = useState([])
  const [employeeWeaverValue, setEmployeeWeaverValue] = useState({ label: "", value: "" })
  const [WeaverWiseReportData, setWeaverWiseReportData] = useState([])
const [weaverValueValidator , setWeaverValueValidator] = useState(true)
const [weaverDataForPrint ,setWeaverDataForPrint ] = useState({})

  const fetchWeaverList = () => {
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
        setEmployeeWeaverOptions(arrForWeaverEmployee);
        setIsLoadingSelector(false)
      })
      .catch((error) => console.log("error", error));






  }




  const fetchReportData = () => {
if (employeeWeaverValue.value==0 ||employeeWeaverValue.value==undefined ||employeeWeaverValue.value==null ) {
  setWeaverValueValidator(false) 
} else {
   
    let responseStatus;
    fetch(
      `${endPoint}api/WeaverWiseReport?w_id=${employeeWeaverValue.value}&dateFrom=${dateFrom}T00:00:00&dateTo=${dateTo}T00:00:00`,

      {
        method: "GET",
        headers: {
          Authorization:
            "bearer" +
            " " +
            JSON.parse(localStorage.getItem("access_token")).access_token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((response) => {
        responseStatus = response.status;
        return response.json();
      })
      .then((data) => {
        if (responseStatus == 200) {
          console.log(data, "histroy fetch  ----------------------");
          setWeaverWiseReportData(data)

          var grandTotal = 0;
          data.map((eachTotalAmount) => {
            grandTotal = grandTotal + eachTotalAmount.totalAmount

          })

          var paidAmount = 0;
          data.map((eachTotalAmount) => {
            paidAmount = paidAmount + eachTotalAmount.paidAmount

          })
          setSummaryFinal({ grandTotal: grandTotal, paidAmount: grandTotal })
          setWeaverValueValidator(true)
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });

    }
  };
  useEffect(() => {
    dispatch(setNavSm());
    fetchWeaverList()
  }, [])

  return (
    <> 
      <div
        className={`right_col  h-10 heightFixForFAult  ${showNavMenu == false ? "right_col-margin-remove" : " "
          } `}
        role="main"
      >
        <div className="row">
          <div className="col-md-12">
            <div className="x_panel">
              <div className="x_title">
                <h2 className="pl-2 pt-2">Weaver Wise Report</h2>
                <ul className="nav navbar-right panel_toolbox d-flex justify-content-end"></ul>
                <div className="clearfix" />
              </div>
              <div className="x_content">
                <form>
                  {/* <span className="section">Personal Info</span> */}
                  <div className="field item form-group">
                    <div className="col-md-5">
                      <label className="col-form-label col-md-4 col-sm-4  label-align">
                        Select Weaver<span className="required">*</span>
                      </label>
                      <div className="col-md-8 col-sm-8 px-0">

                        {
                          isLoadingSelector ? <>. . .</> : <>
                            <Select
                              required
                              className="basic-single"
                              classNamePrefix="select"
                              value={employeeWeaverValue}
                              onChange={(e) =>
                                setEmployeeWeaverValue({ label: e.label, value: e.value })
                              }
                              isSearchable={true}
                              name="color"
                              options={employeeWeaverOptions}
                              styles={weaverValueValidator?customStyles:customStylesDanger}
                            /></>
                        }


                      </div>
                    </div>
                    <div className="col-md-7 px-0">
                      <div className="col-md-6 px-0">
                        <label className="col-form-label col-md-3 col-sm-3  label-align px-0">
                          Date From
                        </label>
                        <div className="col-md-9 col-sm-9">
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
                      <div className="col-md-6 px-0">
                        <label className="col-form-label col-md-3 col-sm-3  label-align px-0">
                          Date To
                        </label>
                        <div className="col-md-9 col-sm-9">
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
                      <div className="col-md-12 text-right pr-2 mt-1">
                        <button
                          className="btn btn-sm btn-customOrange pl-3"
                          onClick={(e) => {
                            setWeaverDataForPrint({
                              weaverName:employeeWeaverValue.label,
                              dateFrom:dateFrom,
                              dateTo:dateTo
                            })
                            e.preventDefault();
                            fetchReportData() 
                          }}
                      
                        >
                          Search <i className="fa fa-search pl-3 pr-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-12 px-0">
          <ul className="nav navbar-right panel_toolbox d-flex justify-content-end px-3">
            <li>
              <ReactToPrint
                trigger={() => {
                  return (
                    <button
                      className="btn btn-sm btn-success my-2 pt-1 borderRadiusRound"
                    >
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


          <WeaverWiseReportReciept ref={componentRef}
            WeaverWiseReportData={WeaverWiseReportData}
            summaryFinal={summaryFinal}  weaverDataForPrint={weaverDataForPrint}
          />
        </div>
            </div>
          </div>
        </div>

       
      </div>
    </>
  );
};

export default WeaverWiseReport;
