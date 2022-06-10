import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Layout/Loader/Loader";
import { endPoint } from "../../../config/Config";
import { setNavSm, updateCurrentId } from "../../../store/actions/NavState";
import { useLocation, useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
import Select from "react-select";
import JVReportReciept from "./JVReportReciept";
import UpdateJVReport from "./UpdateJVReport";
import { toast } from "react-toastify";
import '../financeStyle.css'
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
const JVReport = () => {

  const { state } = useLocation();
  
  const notify = () => toast("Select Employee Or Date correctly!");
  const [JVReportData, setJVReportData] = useState({
    financeMainId: "",
    weaverName: "",
    date: "",
    Voucherinv: "",
    desciption: "",
    createdBy: "",
    credit: "",
    debit: ""
    
  })
  
  const [dontShowuntillselect, setdontShowuntillselect] = useState(false)
  const [stateToShowReportResult, setStateToShowReportResult] = useState(false)
  const componentRef = useRef();
  const showNavMenu = useSelector((state) => state.NavState);
  const dispatch = useDispatch();
  var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
  var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
  var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
  const dateToday = `${year}-${month}-${day}`;
  const [dateFrom, setdateFrom] = useState(dateToday);
  const [dateTo, setdateTo] = useState(dateToday);

  const [weaverOptions, setWeaverOptions] = useState([]);
  const [weaverValue, setWeaverValue] = useState({ label: "", value: "" });
  const [JVHistoryRecord, setJVHistoryRecord] = useState([])
  const [modalShowForUpdate, setModalShowForUpdate] = useState(false);
  const [backupValueOfUpdate, setbackupValueOfUpdate] = useState({})
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
  const fetchHistory = (e) => {

    let responseStatus;
    fetch(
      // /JVReportHistory?dateFrom=2011-12-12T12%3A12%3A00&dateTo=2025-12-12T12%3A12%3A00
      `${endPoint}api/JVReportHistory?dateFrom=${dateFrom}T00:00:00&dateTo=${dateTo}T00:00:00`,
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
          setJVHistoryRecord(data)
        
          setdontShowuntillselect(true)
        } else {
          notify("Something Went wrong Try Again")

        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  const generateReportOfSpecificId = (e , weaverIdInput) => {
    console.log("e", e ,weaverIdInput);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${endPoint}api/JVReport?weaverId=${weaverIdInput}&financeMainId=${e}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const data = JSON.parse(result)
        console.log(data , "---------");
        setJVReportData({
          financeMainId: e,
          weaverName: data.weaverName,
          date: data.date,
          Voucherinv: data.Voucherinv,
          description: data.description,
          createdBy: data.cretedBy,
          credit: data.credit,
          debit: data.debit
        })
      })
      .catch(error => console.log('error', error));

  }
  
  useEffect(() => {
    fetchWeaverOptions()
    if (state !== null) {


      setJVReportData({
        financeMainId: state.financeMainId,
        weaverName: state.weaverName,
        date: state.date,
        Voucherinv: state.voucherInv,
        description: state.description,
        createdBy: state.createdBy,
        credit: state.credit,
        debit: state.debit
      })
       setStateToShowReportResult(true)
       setWeaverValue({label:state.weaverName , value: state.weaverId})
    }
    
  }, []);

  return (
    <>
      <div
        className={`right_col  h-10 heightFixForFAult  ${showNavMenu == false ? "right_col-margin-remove" : " "
          } `}
        role="main"
      >
        {" "}
        <div className="row">
          <div className="col-md-4 ">
            <div className="x_panel">
              <div className="x_title">
                <h2 className="pl-2 pt-2">JV Report Generator</h2>
                <ul className="nav navbar-right panel_toolbox d-flex justify-content-end"></ul>
                <div className="clearfix" />
              </div>
              <div className="x_content  ">
                {/* <span className="section">Personal Info</span> */}
                {/* <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4  label-align px-0">
                    Select Employee
                  </label>
                  <div className="col-md-8 col-sm-8">
                    <Select
                      required
                      className="basic-single"
                      classNamePrefix="select"
                      value={weaverValue}
                      onChange={(e) => {
                        setWeaverValue({ label: e.label, value: e.value });

                      }}
                      isSearchable={true}
                      name="color"
                      options={weaverOptions}
                      styles={customStyles}
                    />
                  </div>
                </div> */}
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Date From
                  </label>
                  <div className="col-md-8 col-sm-6">
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
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                    Date To
                  </label>
                  <div className="col-md-8 col-sm-6">
                    <input
                      className="form-control"
                      type="date"
                      value={dateTo}
                      onChange={(e) => {
                        setdateTo(e.target.value);
                      }}
                    />
                    <div className="text-right">
                      <button
                        className="btn btn-customOrange btn-sm px-3 mt-2 mr-0"
                        onClick={(e) => {

                          fetchHistory(e);
                        }}
                      >
                        Search <i className="ml-2 fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <>
              {" "}
              {
                dontShowuntillselect ? <>
                  <div className="x_panel ">
                    <div className="x_content tableforHistryinProductionReport">
                      <div className="table-responsive">
                        <table className="table table-striped jambo_table bulk_action">
                          <thead>
                            <tr className="headings positionFixed">
                              <th className="column-title fontStyleForHistoryHead"> Vouch.Date</th>
                              <th className="column-title text-center fontStyleForHistoryHead">Vouch.Inv</th>
                              <th className="column-title text-center">
                                <div className="col-md-6 fontStyleForHistoryHead">Dr</div>
                                <div className="col-md-6 fontStyleForHistoryHead">Cr</div>
                              </th>
                        

                            </tr>
                          </thead>
                          <tbody>
                            {
                              JVHistoryRecord.length == 0 ? <>

                                <tr className="even pointer">

                                  <td
                                    width="100%"
                                    className="a-right a-right     text-center"
                                    colSpan="3"
                                  >
                                    No Data Available
                                  </td>
                                </tr>
                              </> : <>

                                {
                                  JVHistoryRecord.map((eachRecord) => {
                                    return <>
                                      <tr className="even pointer">
                                        <td
                                          className=" "
                                          onClick={() => { 
                                            setWeaverValue({label:"just",value:eachRecord.weaverId } )
                                            generateReportOfSpecificId(eachRecord.jvId ,eachRecord.weaverId );
                                            setStateToShowReportResult(true)
                                          }}
                                        >


                                          {`${eachRecord.date.slice(
                                            8,
                                            10
                                          )}-${eachRecord.date.slice(
                                            5,
                                            7
                                          )}-${eachRecord.date.slice(0, 4)}`}



                                        </td>
                                        <td
                                          className=" text-center   "
                                          onClick={() => {
                                            setWeaverValue({label:"just",value:eachRecord.weaverId } )
                                            generateReportOfSpecificId(
                                              eachRecord.jvId , eachRecord.weaverId 
                                            );
                                            setStateToShowReportResult(true)
                                          }}
                                        >
                                          {eachRecord.Voucherinv}
                                        </td>
                                        <th className="column-title text-center">
                                <div className="col-md-6 text-success "> {(eachRecord.debit).toFixed(2)}</div>
                                <div className="col-md-6  text-danger "> {(eachRecord.credit).toFixed(2)}</div>
                              </th>

                                      </tr>
                                    </>
                                  })
                                }
                              </>
                            }


                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div></> : <></>
              }



            </>

          </div>

          {/* Report section  */}
          


              {stateToShowReportResult ? <>
                <>
                  <div className="col-md-8">
                    <div className="x_panel">
                      <div className="x_title">
                        <h2 className="pl-2 pt-2">Journal Voucher Report</h2>
                        <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
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
                          <li>
                            <button
                              className="btn btn-sm btn-customOrange my-2 pt-1 borderRadiusRound"
                              onClick={() => {
                                
                                setModalShowForUpdate(true)
                                setbackupValueOfUpdate(JVReportData)
                              }}
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                          </li>
                        </ul>
                        <div className="clearfix" />
                      </div>

                      <JVReportReciept ref={componentRef}
                        JVReportData={JVReportData}

                      />
                    </div>
                  </div>
                </></> : <></>}



           
 
          <UpdateJVReport
            show={modalShowForUpdate}
            JVReportData={JVReportData}
            setJVReportData={setJVReportData}
            weaverValue={weaverValue}
            setModalShowForUpdate={setModalShowForUpdate}
            onHide={() => {
              setJVReportData(backupValueOfUpdate)
              setModalShowForUpdate(false)
            

            }}
          />











        </div>
      </div>{" "}
    </>
  );
};

export default JVReport;
