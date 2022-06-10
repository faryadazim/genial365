import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Layout/Loader/Loader";
import { endPoint } from "../../../config/Config";
import { setNavSm, updateCurrentId } from "../../../store/actions/NavState";
import { useNavigate } from "react-router-dom";
import ProductionReportReciept from "./ProductionReportReciept";
import ReactToPrint from "react-to-print";

const ProductionReport = () => {

  const componentRef = useRef();
  const showNavMenu = useSelector((state) => state.NavState);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const currentID = useSelector((state) => state.IdToBeUpdate);
  const [isLoading, setisLoading] = useState(true);
  const [isLoaderSelectedProductionData, setisLoaderSelectedProductionData] =
    useState(true);
  var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
  var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
  var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
  const dateToday = `${year}-${month}-${day}`;
  const [dateFrom, setdateFrom] = useState(dateToday);
  const [dateTo, setdateTo] = useState(dateToday);
  const [prdouctionItems, setprdouctionItems] = useState([{}, {}, {}]);
  const [selectedProductionData, setSelectedProductionData] = useState({});

  const fetchHistory = () => {
    let responseStatus;
    fetch(
      `${endPoint}api/ProductionHistory?dateFrom=${dateFrom}T00:00:00&dateTo=${dateTo}T00:00:00`,
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
          setprdouctionItems(data);
          setisLoading(false);
        } else {
          console.log("ja ja turrja");
          setprdouctionItems([]);
          setisLoading(true);
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
 
  const generateReportOfSpecificId = (id) => {
    fetch(`${endPoint}api/GetProductById?id=${id}`, {
      method: "GET",
      headers: {
        Authorization:
          `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSelectedProductionData(data);

        console.log(data, "histroy fetch  ----------------------");

        setisLoaderSelectedProductionData(false);
      })
      .catch((err) => {
        console.log(err, "err");
      });
    console.log(dateTo);
  };

  useEffect(() => {
    dispatch(setNavSm());
  }, []);

  return (
    <>
      {" "}
      <div
        className={`right_col  h-10 heightFixForFAult  ${showNavMenu == false ? "right_col-margin-remove" : " "
          } `}
        role="main"
      >
        {" "}
        <div className="row">
          <div className="col-md-3 ">
            <div className="x_panel">
              <div className="x_title">
                <h2 className="pl-2 pt-2">Production Report Generator</h2>
                <ul className="nav navbar-right panel_toolbox d-flex justify-content-end"></ul>
                <div className="clearfix" />
              </div>
              <div className="x_content  ">
                {/* <span className="section">Personal Info</span> */}
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4   label-align">
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
                  <label className="col-form-label col-md-4 col-sm-4   label-align">
                    Date From
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

            {isLoading ? (
              <>...</>
            ) : (
              <>
                {" "}
                <div className="x_panel ">
                  <div className="x_content tableforHistryinProductionReport">
                    <div className="table-responsive">
                      <table className="table table-striped jambo_table bulk_action">
                        <thead>
                          <tr className="headings positionFixed">
                            <th className="column-title"  style={{fontWeight:'400'}}> Pro.Date</th>
                            <th className="column-title"  style={{fontWeight:'400'}}>Roll Name</th>
                            <th
                              className="column-title text-center"
                              width="20%" style={{fontWeight:'400'}}
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>


{
  prdouctionItems.length==0? <> 
  <tr className="even pointer">
          <td
            className=" text-center"
          colSpan={3}
          >
          No Data Available </td>
         
        </tr>
    </> :<>
    {prdouctionItems.map((item) => {
                            return (
                              <tr className="even pointer">
                                <td
                                  className=" "
                                  onClick={() => {
                                    generateReportOfSpecificId(
                                      item.productionId
                                    );
                                  }}
                                >
                                  {item.productionDate.slice(0, 10)}
                                </td>
                                <td
                                  className=" "
                                  onClick={() => {
                                    generateReportOfSpecificId(
                                      item.productionId
                                    );
                                  }}
                                >
                                  {" "}
                                  {item.rollName}{" "}
                                </td>
                                <td
                                  width="20%"
                                  className="a-right a-right     text-center"
                                >
                                  <i
                                    className="fa fa-edit pl-3"
                                    onClick={() => {

                                      dispatch(
                                        updateCurrentId(
                                          item.productionId
                                        )
                                      );
                                      navigateTo("/WeavingProductionForm");
                                    }}
                                  ></i>
                                </td>
                              </tr>
                            );
                          })}
    </>
 
}

                        
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Report section  */}

          {isLoaderSelectedProductionData ? (
            <>
              {" "}
              <div className="col-md-9"> </div>{" "}
            </>
          ) : (
            <>
              <div className="col-md-9">
                <div className="x_panel">
                  <div className="x_title">
                    <h2 className="pl-2 pt-2">Production Report</h2>
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
                            dispatch(
                              updateCurrentId(
                                selectedProductionData.production_id
                              )
                            );
                            navigateTo("/WeavingProductionForm");
                          }}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                      </li>
                    </ul>
                    <div className="clearfix" />
                  </div>

                  <ProductionReportReciept ref={componentRef}
                    selectedProductionData={selectedProductionData}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>{" "}
    </>
  );
};

export default ProductionReport;
