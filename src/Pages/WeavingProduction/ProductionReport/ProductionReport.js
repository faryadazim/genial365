import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Layout/Loader/Loader";
import { endPoint } from "../../../config/Config";
import { setNavSm, updateCurrentId } from "../../../store/actions/NavState";
import { useNavigate } from "react-router-dom";

const ProductionReport = () => {
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
  // const deleteProductionData = () => {
  //   console.log(selectedProductionData.production_id, "delete this ");
  //   fetch(
  //     `${endPoint}api/DeleteProduction?id=${selectedProductionData.production_id}`,
  //     {
  //       method: "DELETE",
  //       headers: {
  //         Authorization:
  //           "bearer XRuIpUQo72izREUQ52zPC59IpINxX402zEAyJToI1hBhjpUvK4t4awHAmUnUs9VEx1bFL84-azlxZxJbRElDDdvDjlH1xiyI4UaDcQko4cSBM0TRklE0vl6J61aSo2zJiJ3YJKaJ939lHky6rnQ3xkov_RhsLhmCgQBlXeijIIrPkCEaDCuWURqnFX9HwxDLX-nha-sAvt2dnsOohdsFDEHaLG2T7KZfdlWe46OYVFcBzVLrnJcpiekmSeqf9LRZL9kqhgBlDx-0YBETgdeNmQ1_JgXKJ9NACwsS6Ex97Rm52HxhmaG6-dep1GDW7giwWQ_vZy0q31V3ad85kR_KT4jTZJTkzBpYS5WDhMeipR8Ovw3xh-IEVgJtd-qwhJ-t2P8oIkLPUWxZulCY0ZVd1G1YP5qIHbQJsSfMXEmMUFgLNefq5rS90Jj8HWSZR_Wnzo2d8z03XIp_bb3YSoXgjWYXwle67zlSphI8-nWzoiLoW8h8azO5SvDVfymXMbfUmw-93j_tIV7llT6EwHYt3g",
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       fetchHistory();
  //       setisLoaderSelectedProductionData(true);
  //     })
  //     .catch((err) => {
  //       console.log(err, "err");
  //     });
  // };
  useEffect(() => {
    dispatch(setNavSm());
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
          <div className="col-md-3 ">
            <div className="x_panel">
              <div className="x_title">
                <h2 className="pl-2 pt-2">Report Generator</h2>
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
              </>
            )}
          </div>

          {/* Report section  */}

          {isLoaderSelectedProductionData ? (
            <>
              {" "}
              <div className="col-md-9"> Product Report Show here</div>{" "}
            </>
          ) : (
            <>
              <div className="col-md-9">
                <div className="x_panel">
                  <div className="x_title">
                    <h2 className="pl-2 pt-2">Production Report</h2>
                    <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
                      <li>
                        <button
                          className="btn btn-sm btn-success my-2"
                          onClick={() => console.log("print")}
                        >
                          <i className="fa fa-print"></i>
                        </button>
                      </li>
                      <li>
                        <button
                          className="btn btn-sm btn-primary my-2"
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

                  <div className="x_content">
                    <div className="row my-2 ">
                      <div className="col-md-6 px-5 text-customBlue font-weight-400 mb-2  bg- ">
                        <div className="row">
                          <div className="col-md-12 text-center   font-weight-600">
                          <div className="my-2 text-center perPieceDetailHeadingProductionReport">Roll Detail</div>
                          </div>
                          <div className="col-md-12">
                            <div className="col-md-6 font-weight-500">
                              Roll Number
                            </div>
                            <div className="col-md-6 text-right">
                           <b>
                              {selectedProductionData.roll_no}
                           </b> </div>
                          </div>
                          <div className="col-md-12">
                            <div className="col-md-6">Date</div>
                            <div className="col-md-6 text-right">
                              {" "}
                              {selectedProductionData.production_date}
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="col-md-6">Role Weight</div>
                            <div className="col-md-6 text-right">
                              {" "}
                              {selectedProductionData.roll_weight}
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="col-md-6">Quality </div>
                            <div className="col-md-6 text-right">
                              {selectedProductionData.borderQualityLabelId
                                .label == null
                                ? "--"
                                : selectedProductionData.borderQualityLabelId
                                    .label}
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="col-md-6">Size </div>
                            <div className="col-md-6 text-right">
                              {" "}
                              {selectedProductionData.borderSizeLabelId.label ==
                              null
                                ? "--"
                                : selectedProductionData.borderSizeLabelId
                                    .label}
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="col-md-6">Program Number </div>
                            <div className="col-md-6 text-right">
                              {" "}
                              {selectedProductionData.programm_no}
                            </div>
                          </div>
                        </div>{" "}
                      </div>
                      <div className="col-md-6  px-5 text-customBlue mb-2  ">
                        <div className="row">
                        <div className="col-md-12 text-center   font-weight-600">
                          <div className="my-2 text-center perPieceDetailHeadingProductionReport">Loom Detail</div>
                          </div>
                          <div className="col-md-12">
                            <div className="col-md-6">Loom Number</div>
                            <div className="col-md-6 text-right">
                              {" "}
                              {selectedProductionData.loomLabelId.label === null
                                ? "--"
                                : selectedProductionData.loomLabelId.label}
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="col-md-6">Loom Size</div>
                            <div className="col-md-6 text-right">
                              {selectedProductionData.loomLabelId.loomSize ===
                              null
                                ? "--"
                                : selectedProductionData.loomLabelId.loomSize}
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="col-md-6">Jacquad</div>
                            <div className="col-md-6 text-right">
                              {" "}
                              {selectedProductionData.loomLabelId
                                .loomJacquard === null
                                ? "--"
                                : selectedProductionData.loomLabelId
                                    .loomJacquard}
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="col-md-6">DrawBox</div>
                            <div className="col-md-6 text-right">
                              {" "}
                              {selectedProductionData.loomLabelId
                                .loomDrawBox === null
                                ? "--"
                                : selectedProductionData.loomLabelId
                                    .loomDrawBox}
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="col-md-6">Piece in a Border </div>
                            <div className="col-md-6 text-right">
                              {" "}
                              {selectedProductionData.piece_in_one_border ===
                              null
                                ? "--"
                                : selectedProductionData.piece_in_one_border}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mx-3  reportTableHead">
                      <div className="col-md-1 right-border-1 px-0 my-auto">
                        <div className="col-md-5 px-0 right-border-1 h-100 text-center font-size-12 ">
                          Sr
                        </div>
                        <div className="col-md-7 px-0 text-center font-size-12">
                          Shift
                        </div>
                      </div>

                      <div className="col-md-4 px-0 my-auto">
                        <div className="col-md-3 right-border-1 h-100 my-1 font-size-12 text-center">
                          Weaver
                        </div>
                        <div className="col-md-3   right-border-1 h-100  my-1 font-size-12 text-center">
                          No.Border
                        </div>
                        <div className="col-md-3   right-border-1 h-100 my-1 font-size-12 text-center">
                          Total.Piece
                        </div>
                        <div className="col-md-3   right-border-1 my-1 font-size-12 text-center">
                          B.G.Piece
                        </div>
                      </div>

                      <div className="col-md-5 px-0">
                        <div className="col-md-3 px-0  right-border-1 my-1 font-size-12  text-center">
                          A grade Pieces
                        </div>
                        <div className="col-md-3 px-0 right-border-1  my-1 font-size-12  text-center">
                          Rate/Border
                        </div>
                        <div className="col-md-3 px-0  right-border-1  my-1 font-size-12  text-center">
                          Ex.Amount Desc
                        </div>
                        <div className="col-md-3 px-0  right-border-1  my-1 font-size-12  text-center">
                          Ex. Amount
                        </div>
                      </div>

                      <div className="col-md-1  font-size-12   right-border-1  text-center  my-1">
                        Total
                      </div>
                      <div className="col-md-1    font-size-12  text-center  my-1  right-border-2">
                        Nativing
                      </div>
                    </div>
                    {selectedProductionData.shiftData.map((item, index) => {
                      return (
                        <>
                          <div className="row mx-3  reportTableBody bottom-border-2">
                            <div className="col-md-1 right-border-1 px-0">
                              <div className="col-md-5 px-0 right-border-1 h-100 text-center font-size-12 right-border-2 py-1 h-100 left-border-2 d-flex justify-content-center align-items-center">
                                {" "}
                                {index + 1}
                              </div>
                              <div className="col-md-7  text-center font-size-12 right-border-2 py-1 h-100  d-flex justify-content-center align-items-center">
                                {" "}
                                {item.shift_name.slice(6)}
                              </div>
                            </div>

                            <div className="col-md-4 px-0 py-auto">
                              <div className="col-md-4 right-border-2 h-100  py-1 font-size-12 text-center d-flex justify-content-center align-items-center">
                                {item.weaver_EmployeeDNameId.label === null
                                  ? "--"
                                  : item.weaver_EmployeeDNameId.label}
                              </div>

                              <div className="col-md-2   right-border-2 h-100   py-1 font-size-12 text-center    d-flex justify-content-center align-items-center ">
                                {item.no_of_border}
                              </div>
                              <div className="col-md-3   right-border-2 h-100 py-1 font-size-12 text-center   d-flex justify-content-center align-items-center ">
                                {item.total_pieces}
                              </div>
                              <div className="col-md-3   right-border-2   py-1 font-size-12 text-center h-100   d-flex justify-content-center align-items-center ">
                                {item.b_grade_piece}
                              </div>
                            </div>

                            <div className="col-md-5 px-0">
                              <div className="col-md-3 px-0  right-border-2 h-100  py-1 font-size-12  text-center   d-flex justify-content-center align-items-center ">
                                {item.a_grade_piece}
                              </div>
                              <div className="col-md-3 px-0 right-border-2  h-100  py-1 font-size-12   d-flex justify-content-center align-items-center ">
                                {item.rate_per_border}
                              </div>
                              <div className="col-md-3 px-0  right-border-2 h-100  py-1 font-size-12  text-center   d-flex justify-content-center align-items-center ">
                                {item.extra_des}
                              </div>
                              <div className="col-md-3 px-0  right-border-2  h-100  py-1 font-size-12  text-center   d-flex justify-content-center align-items-center ">
                                {item.extra_amt}
                              </div>
                            </div>

                            <div className="col-md-1  font-size-12     right-border-2  text-center py-1   d-flex justify-content-center align-items-center ">
                              {item.total_amt}
                            </div>
                            <div className="col-md-1    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                              {item.natting_EmployeeNameId.label === null
                                ? "--"
                                : item.natting_EmployeeNameId.label}
                            </div>
                          </div>

                          <div className="row mx-3  reportTableBody bottom-border-2">
                            <div className="col-md-12  font-size-12  left-border-2    right-border-2  text-center py-1   d-flex justify-content-start align-items-center ">
                              <span className="text-danger pl-4">
                                {" "}
                                Shift faults: &nbsp;{" "}
                              </span>{" "}
                              {item.known_faults_ids
                                .split(",")
                                .map((eachFault) => {
                                  return <span>{eachFault}, </span>;
                                })}
                            </div>
                          </div>
                        </>
                      );
                    })}
                    <div className="px-4 mb-0 mt-3">
                      <div className="row mb-3 customPaddingForProductionReport bottom-border-2  top-border-2  py-1">
                        <div className="col-md-3 text-customBlue font-weight-600 py-0123">
                          Pile To Pile Length:
                          <span className="font-weight-500 ">
                            &nbsp;
                            {selectedProductionData.pile_to_pile_length}
                          </span>
                        </div>
                        <div className="col-md-3 text-customBlue  font-weight-600 py-0123">
                          Pile to Pile Width:
                          <span className="font-weight-500 ">
                            {" "}
                            &nbsp;
                            {selectedProductionData.pile_to_pile_width}
                          </span>
                        </div>
                        <div className="col-md-3  text-customBlue font-weight-600  py-0123">
                          Cut Piece Size:
                          <span className="font-weight-500 ">
                            &nbsp;
                            {selectedProductionData.cut_piece_size}
                          </span>
                        </div>
                        <div className="col-md-3 text-customBlue  font-weight-600  py-0123">
                          {" "}
                          Cut Piece Weight:
                          <span className="font-weight-500 ">
                            &nbsp;
                            {selectedProductionData.cut_piece_weight}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 mb-1">
                    <div className="my-2 text-center perPieceDetailHeadingProductionReport">Grand Total</div>
                      <div className="row mb-3 customPaddingForProductionReport bottom-border-2  top-border-2  py-1">
                        <div className="col-md-3 text-customBlue font-weight-600 py-0123">
                          Border:&nbsp;
                          <span className="font-weight-500 ">
                            {selectedProductionData.total_border}
                          </span>
                        </div>
                        <div className="col-md-3 text-customBlue  font-weight-600 py-0123">
                          Pieces:&nbsp;
                          <span className="font-weight-500 ">
                            {selectedProductionData.total_pieces}
                          </span>
                        </div>
                        <div className="col-md-3  text-customBlue font-weight-600 py-0123">
                          A Grade Pieces:&nbsp;
                          <span className="font-weight-500 ">
                            {selectedProductionData.a_grade_pieces}
                          </span>
                        </div>
                        <div className="col-md-3 text-customBlue  font-weight-600  py-0123">
                          {" "}
                          B Grade Pieces:&nbsp;
                          <span className="font-weight-500 ">
                            {selectedProductionData.b_grade_pieces}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="my-2 text-center perPieceDetailHeadingProductionReport">Per Piece Detail</div>
                    <div className="row mx-3  reportTableHead ">
                      <div className="col-md-3 right-border-1 px-0 my-auto text-center py-1 ">
                       Label
                      </div>

                      <div className="col-md-3  font-size-12   right-border-1  text-center  my-1  py-1">
                     Current
                      </div>
                      <div className="col-md-3  font-size-12   right-border-1  text-center  my-1  py-1">
                      Required
                      </div>
                      <div className="col-md-3    font-size-12  text-center  my-1  right-border-2  py-1">
                     Difference
                      </div>
                    </div>

                    <>
                      <div className="row mx-3  reportTableBody bottom-border-2">
                        <div className="col-md-3 px-0 py-auto left-border-2 right-border-2 bg-for-step-three-product-report   px-2 bottom-border-1 top-border-1 py-1">Total Weight/Cut Piece</div>
                        <div className="col-md-3 px-0 py-auto right-border-2  py-1  text-right px-2">     {selectedProductionData.current_per_piece_a_weight}</div>
                        <div className="col-md-3 px-0 py-auto right-border-2  py-1  text-right px-2">{selectedProductionData.required_per_piece_a_weight}   </div>
                        <div className="col-md-3 px-0 py-auto right-border-2  py-1  text-right px-2"> {selectedProductionData.required_per_piece_a_weight - selectedProductionData.current_per_piece_a_weight}</div>
                      </div>
                      <div className="row mx-3  reportTableBody bottom-border-2">
                        <div className="col-md-3 px-0 py-auto left-border-2 right-border-2 bg-for-step-three-product-report  bottom-border-1 px-2  py-1">Length Pile to Pile</div>
                        <div className="col-md-3 px-0 py-auto right-border-2  py-1  text-right px-2">{selectedProductionData.pile_to_pile_length}</div>
                        <div className="col-md-3 px-0 py-auto right-border-2  py-1  text-right px-2">{selectedProductionData.required_length_p_to_p}</div>
                        <div className="col-md-3 px-0 py-auto right-border-2  py-1  text-right px-2">{selectedProductionData.required_length_p_to_p-selectedProductionData.pile_to_pile_length}  </div>
                      </div>
                      <div className="row mx-3  reportTableBody bottom-border-2">
                        <div className="col-md-3 px-0 py-auto left-border-2 right-border-2 bg-for-step-three-product-report bottom-border-1  px-2  py-1">
                          Width Pile to Pile 
                        </div>
                        <div className="col-md-3 px-0 py-auto right-border-2  py-1  text-right px-2">{selectedProductionData.pile_to_pile_width}</div>
                        <div className="col-md-3 px-0 py-auto right-border-2  py-1  text-right px-2">{selectedProductionData.required_width_p_to_p}</div>
                        <div className="col-md-3 px-0 py-auto right-border-2  py-1  text-right px-2">{selectedProductionData.required_width_p_to_p-selectedProductionData.pile_to_pile_width}  </div>
                      </div>
                      <div className="row mx-3  reportTableBody bottom-border-2 mb-4">
                        <div className="col-md-3 px-0 py-auto left-border-2 right-border-2 bg-for-step-three-product-report  px-2  py-1">B Grade</div>
                        <div className="col-md-3 px-0 py-auto right-border-2  py-1  text-right px-2">{((selectedProductionData.b_grade_pieces*100)/selectedProductionData.a_grade_pieces).toFixed(3)}%</div>
                        <div className="col-md-6 px-0 py-auto right-border-2  py-1  text-right px-2"> </div>
                   
                      </div>
                    </>
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
