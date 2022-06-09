import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNavSm } from "../../../store/actions/NavState";
import { endPoint } from "../../../config/Config";
import Select from "react-select";
import ReactToPrint from "react-to-print";
import SalaryReportReciept from "./SalaryReportReciept";

const SalaryReport = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const showNavMenu = useSelector((state) => state.NavState);
  var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
  var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
  var year = new Date().toLocaleDateString(undefined, { year: "numeric" });

  const [displaySalaryReportReciept, setSalaryReportReciept] = useState(false)
  const dateToday = `${year}-${month}-${day}`;
  const [dateFrom, setdateFrom] = useState(dateToday);
  const [dateTo, setdateTo] = useState(dateToday);
  const [salaryDetailReport, setSalaryDetailReport] = useState({
    weaverName: "",
    productionData: [],
    grandFinalSumary: { grandTotal: "", paidAmount: "" }
  })

  const [notDataAvailable, setNotDataAvailable] = useState(true)
  const fetchReportData = () => {
    let responseStatus;
    fetch(
      `${endPoint}api/DetailSalaryReport?dateFrom=${dateFrom}&dateTo=${dateTo}`,

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
          var arrForSummary = [];
          data.map((eachWeaverSumary) => {
            var grandTotal = 0;
            eachWeaverSumary.productionData.map((eachTotalAmount) => {
              grandTotal = grandTotal + eachTotalAmount.totalAmount

            })




            var paidAmount = 0;
            eachWeaverSumary.productionData.map((eachTotalAmount) => {
              paidAmount = paidAmount + eachTotalAmount.paidAmount

            })
            arrForSummary.push({
              weaverName: eachWeaverSumary.weaverName,
              productionData: eachWeaverSumary.productionData,
              grandFinalSumary: { grandTotal: grandTotal, paidAmount: paidAmount }
            })
          })
          setSalaryDetailReport(arrForSummary);
          setNotDataAvailable(false)
          setSalaryReportReciept(true)


        } else {
          console.log("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  useEffect(() => {
    dispatch(setNavSm());
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
                <h2 className="pl-2 pt-2">Salary Report</h2>
                <ul className="nav navbar-right panel_toolbox d-flex justify-content-end"></ul>
                <div className="clearfix" />
              </div>
              <div className="x_content">
                <form>
                  {/* <span className="section">Personal Info</span> */}
                  <div className="field item form-group">

                    <div className="col-md-12 px-0  ">

                      <div className="col-md-4 px-0">
                      </div>

                      <div className="col-md-3 px-0 text-right">
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
                      <div className="col-md-3 px-0 text-right">
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
                      <div className="col-md-2 text-right pr-2   ">
                        <button
                          className="btn btn-sm btn-customOrange pl-3"
                          onClick={(e) => {
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
              <>
              <div className={` col-md-12 px-0 ${displaySalaryReportReciept?"d-block" :"d-none"}`} >

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

                <SalaryReportReciept ref={componentRef}
                  salaryDetailReport={salaryDetailReport} notDataAvailable={notDataAvailable}
                />

              </div></>
            </div>
          </div>
        </div>


      </div>
    </>
  );
};

export default SalaryReport;
