import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Layout/Loader/Loader";
import { endPoint } from "../../../config/Config";
import { updateCurrentId } from "../../../store/actions/NavState";
import { useNavigate } from "react-router-dom";


const ProductionReport = () => {
  const showNavMenu = useSelector((state) => state.NavState);
  const dispatch = useDispatch();
  const navigateTo = useNavigate()
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

  const fetchHistory = (e) => {
    e.preventDefault();
    let responseStatus;
    fetch(
      `${endPoint}api/ProductionHistory?dateFrom=${dateFrom}T00:00:00&dateTo=${dateTo}T00:00:00`,
      {
        method: "GET",
        headers: {
          Authorization:
            "bearer XRuIpUQo72izREUQ52zPC59IpINxX402zEAyJToI1hBhjpUvK4t4awHAmUnUs9VEx1bFL84-azlxZxJbRElDDdvDjlH1xiyI4UaDcQko4cSBM0TRklE0vl6J61aSo2zJiJ3YJKaJ939lHky6rnQ3xkov_RhsLhmCgQBlXeijIIrPkCEaDCuWURqnFX9HwxDLX-nha-sAvt2dnsOohdsFDEHaLG2T7KZfdlWe46OYVFcBzVLrnJcpiekmSeqf9LRZL9kqhgBlDx-0YBETgdeNmQ1_JgXKJ9NACwsS6Ex97Rm52HxhmaG6-dep1GDW7giwWQ_vZy0q31V3ad85kR_KT4jTZJTkzBpYS5WDhMeipR8Ovw3xh-IEVgJtd-qwhJ-t2P8oIkLPUWxZulCY0ZVd1G1YP5qIHbQJsSfMXEmMUFgLNefq5rS90Jj8HWSZR_Wnzo2d8z03XIp_bb3YSoXgjWYXwle67zlSphI8-nWzoiLoW8h8azO5SvDVfymXMbfUmw-93j_tIV7llT6EwHYt3g",
          "Content-Type": "application/json",
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
    console.log(dateTo);
  };

  const generateReportOfSpecificId = (id) => {
    fetch(`${endPoint}api/GetProductById?id=${id}`, {
      method: "GET",
      headers: {
        Authorization:
          "bearer XRuIpUQo72izREUQ52zPC59IpINxX402zEAyJToI1hBhjpUvK4t4awHAmUnUs9VEx1bFL84-azlxZxJbRElDDdvDjlH1xiyI4UaDcQko4cSBM0TRklE0vl6J61aSo2zJiJ3YJKaJ939lHky6rnQ3xkov_RhsLhmCgQBlXeijIIrPkCEaDCuWURqnFX9HwxDLX-nha-sAvt2dnsOohdsFDEHaLG2T7KZfdlWe46OYVFcBzVLrnJcpiekmSeqf9LRZL9kqhgBlDx-0YBETgdeNmQ1_JgXKJ9NACwsS6Ex97Rm52HxhmaG6-dep1GDW7giwWQ_vZy0q31V3ad85kR_KT4jTZJTkzBpYS5WDhMeipR8Ovw3xh-IEVgJtd-qwhJ-t2P8oIkLPUWxZulCY0ZVd1G1YP5qIHbQJsSfMXEmMUFgLNefq5rS90Jj8HWSZR_Wnzo2d8z03XIp_bb3YSoXgjWYXwle67zlSphI8-nWzoiLoW8h8azO5SvDVfymXMbfUmw-93j_tIV7llT6EwHYt3g",
        "Content-Type": "application/json",
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
  const deleteProductionData = () => {
   
    console.log( selectedProductionData.production_id , "delete this ");
    fetch(`${endPoint}api/DeleteProduction?id=${selectedProductionData.production_id}`, {
      method: "DELETE",
      headers: {
        Authorization:
          "bearer XRuIpUQo72izREUQ52zPC59IpINxX402zEAyJToI1hBhjpUvK4t4awHAmUnUs9VEx1bFL84-azlxZxJbRElDDdvDjlH1xiyI4UaDcQko4cSBM0TRklE0vl6J61aSo2zJiJ3YJKaJ939lHky6rnQ3xkov_RhsLhmCgQBlXeijIIrPkCEaDCuWURqnFX9HwxDLX-nha-sAvt2dnsOohdsFDEHaLG2T7KZfdlWe46OYVFcBzVLrnJcpiekmSeqf9LRZL9kqhgBlDx-0YBETgdeNmQ1_JgXKJ9NACwsS6Ex97Rm52HxhmaG6-dep1GDW7giwWQ_vZy0q31V3ad85kR_KT4jTZJTkzBpYS5WDhMeipR8Ovw3xh-IEVgJtd-qwhJ-t2P8oIkLPUWxZulCY0ZVd1G1YP5qIHbQJsSfMXEmMUFgLNefq5rS90Jj8HWSZR_Wnzo2d8z03XIp_bb3YSoXgjWYXwle67zlSphI8-nWzoiLoW8h8azO5SvDVfymXMbfUmw-93j_tIV7llT6EwHYt3g",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  useEffect(() => {
    console.log(currentID , "Kehne mein harj kya hy????");
  }, []);

  return (
    <>
      {" "}
      <div
        className={`right_col  h-10 heightFixForFAult  ${
          showNavMenu == false ? "right_col-margin-remove" : " "
        } `}
        role="main"
      >
        {" "}
        <div className="row">
          <div className="col-md-4 ">
            <div className="x_panel">
              <div className="x_title">
                <h2 className="pl-2 pt-2">Report Generator</h2>
                <ul className="nav navbar-right panel_toolbox d-flex justify-content-end"></ul>
                <div className="clearfix" />
              </div>
              <div className="x_content  ">
                <form>
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
                          className="btn btn-success btn-sm px-3 mt-2"
                          onClick={(e) => {
                            fetchHistory(e);
                          }}
                        >
                          Generate <i className="fa fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {isLoaderSelectedProductionData ? (
            <> <div className="col-md-8">loading</div> </>
          ) : (
            <>
              {" "}
              <div className="col-md-8">
                <div className="x_panel">
                  <div className="x_title">
                    <h2 className="pl-2 pt-2">History</h2>
                    <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
                      <li>
                        <button
                          className="btn btn-sm btn-danger my-2"
                          onClick={() => deleteProductionData()}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </li>
                      <li>
                        <button className="btn btn-sm btn-primary my-2"
                        onClick={ ()=>{ dispatch(updateCurrentId(selectedProductionData.production_id))
                          navigateTo("/WeavingProductionForm")
                        }}>
                          <i className="fa fa-edit"></i>
                        </button>
                      </li>
                    </ul>
                    <div className="clearfix" />
                  </div>
                  <div className="x_content">
                    <form>
                      {/* <span className="section">Personal Info</span> */}
                      <div className="col-md-6">
                        <div className="field item form-group">
                          {selectedProductionData.a_grade_pieces} <br />
                          {selectedProductionData.b_grade_pieces} <br />
                          {
                            selectedProductionData.current_per_piece_a_weight
                          }{" "}
                          <br />
                          {selectedProductionData.cut_piece_weight} <br />
                          {selectedProductionData.grayProduct_id} <br />
                          {selectedProductionData.loom_id} <br />
                          {selectedProductionData.pile_to_pile_length} <br />
                          {selectedProductionData.pile_to_pile_width} <br />
                          {selectedProductionData.production_date} <br />
                          {selectedProductionData.remarks} <br />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}

          {isLoading ? (
            <>...</>
          ) : (
            <>
              {" "}
              <div className="col-md-4">
                <div className="x_panel">
                  <div className="x_content">
                    <div className="table-responsive">
                      <table className="table table-striped jambo_table bulk_action">
                        <thead>
                          <tr className="headings">
                            <th className="column-title"> Pro.Date</th>
                            <th className="column-title">Roll Name</th>
                            <th
                              className="column-title text-center"
                              width="20%"
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {prdouctionItems.map((item) => {
                            return (
                              <tr className="even pointer">
                                <td className=" ">
                                  {item.productionDate.slice(0, 10)}
                                </td>
                                <td className=" "> {item.rollName} </td>
                                <td
                                  width="20%"
                                  className="a-right a-right     text-center"
                                  onClick={() => {
                                    generateReportOfSpecificId(
                                      item.productionId
                                    );
                                  }}
                                >
                                  <i className="fa fa-eye pl-3"></i>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
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
