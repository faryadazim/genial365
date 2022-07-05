import React from "react";
import { numberWithCommas } from "../../../config/commaSeperated";

const SalaryReportReciept = React.forwardRef(
  ({ salaryDetailReport, notDataAvailable, dataToPrint }, ref) => {
    return (
      <div>
        <div className="x_content mb-3" ref={ref}>
          {notDataAvailable ? (
            <>not data</>
          ) : (
            <>
              <div className="displayPropertyForPrint">
                <h2 className="text-dark text-center font-weight-bold  ">
                  Salary Report
                </h2>
                <div className="row pb-2">
                  <div className="col-md-6 col-6 text-dark text-center ">
                    Date From:
                    <strong className="text-dark  font-weight-bold ">
                      {dataToPrint.dateFrom}
                    </strong>
                  </div>
                  <div className="col-md-6 col-6 text-dark  text-center">
                    Date To :
                    <strong className="text-dark  font-weight-bold ">
                      {dataToPrint.dateTo}
                    </strong>
                  </div>
                </div>
              </div>
              {salaryDetailReport.map((eachPersonSummary) => {
                return (
                  <div className="mb-3">
                    <div className="row mx-3   ">
                      <div className="col-md-4 col-4 reportTableHead bottom-border-1">
                        <div className="col-md-11  col-11 px-0 my-auto  ">
                          <div className=" col-md-4 col-4 px-0 text-center font-size-12  right-border-1  h-100 my-1 ">
                            Weaver Name
                          </div>
                          <div className=" col-md-5 col-5   h-100 my-1 font-size-12 text-center">
                            {eachPersonSummary.weaverName}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mx-3  reportTableHead ">
                      <div className="col-md-3 col-3  px-0 my-auto  ">
                        <div className=" col-md-4 col-4 px-0 text-center font-size-12  right-border-1  h-100 my-1 ">
                          Date
                        </div>
                        <div className=" col-md-5 col-5 right-border-1 h-100 my-1 font-size-12 text-center">
                          Roll #
                        </div>
                        <div className=" col-3 col-md-3 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
                          Shift
                        </div>
                      </div>

                      <div className="col-md-2 col-2 px-0 my-auto">
                        <div className=" col-md-12 col-12 right-border-1 h-100  my-1 font-size-12 text-center">
                          Product
                        </div>
                        {/* <div className=" col-md-3 col-sm-3 col-3 col-xl-4   right-border-1 h-100 my-1 font-size-12 text-center">
                          Size
                        </div> */}
                        {/* <div className=" col-md-3 col-sm-3 col-3 col-xl-4   right-border-1 my-1 font-size-12 text-center">
                          Border
                        </div> */}
                      </div>

                      <div className=" col-md-4 col-4 px-0">
                        <div className=" col-md-3 col-3 px-0  right-border-1 my-1 font-size-12  text-center">
                          B Pieces
                        </div>
                        <div className=" col-md-3 col-3 px-0 right-border-1  my-1 font-size-12  text-center">
                          A Pieces
                        </div>
                        <div className=" col-md-3 col-3 px-0  right-border-1  my-1 font-size-12  text-center">
                          Rate/Border
                        </div>
                        <div className=" col-md-3 col-3 px-0  right-border-1  my-1 font-size-12  text-center">
                          Amount
                        </div>
                      </div>
                      <div className="col-md-3 col-3 px-0">
                        <div className=" col-md-6  col-6 px-0  right-border-1  my-1 font-size-12  text-center">
                          Extra Amount
                        </div>
                        <div className=" col-md-6  col-6 px-0   my-1 font-size-12  text-center">
                          Total Amount
                        </div>
                      </div>
                    </div>

                    {eachPersonSummary.productionData.length === 0 ? (
                      <>
                        <div className="row mx-3  reportTableBody bottom-border-2">
                          <div className=" col-md-12 col-12 px-0 right-border-1 h-100 text-center font-size-12 right-border-2 py-1 h-100 left-border-2 d-flex justify-content-center align-items-center">
                            No Data Available
                          </div>
                        </div>
                      </>
                    ) : (
                      <> </>
                    )}

                    {eachPersonSummary.productionData.map(
                      (eachShiftData, index) => {
                        return (
                          <>
                            {
                              <div className="row mx-3  reportTableBody bottom-border-2">
                                <div className="col-md-3 col-3 right-border-1 px-0">
                                  <div className=" col-md-4 col-4 left-border-2  text-center font-size-12 right-border-2 py-1 h-100  d-flex justify-content-center align-items-center">
                                    {`${eachShiftData.date.slice(
                                      8,
                                      10
                                    )}-${eachShiftData.date.slice(
                                      5,
                                      7
                                    )}-${eachShiftData.date.slice(2, 4)}`}
                                  </div>
                                  <div className="col-md-5 col-5 col-xl-5 right-border-2 h-100  py-1 font-size-12 text-center d-flex justify-content-center align-items-center px-0">
                                    {eachShiftData.rollNumber}
                                  </div>
                                  <div className=" col-md-3 col-3 px-0 right-border-1 h-100 text-center font-size-12 right-border-2 py-1 h-100  d-flex justify-content-center align-items-center">
                                    {eachShiftData.shiftName.slice(6)}
                                  </div>
                                </div>

                                <div className="col-md-2 col-2 px-0 py-auto">
                                  <div className="col-md-12 col-12   right-border-2 h-100   py-1 font-size-12 text-center    d-flex justify-content-center align-items-center ">
                                    {eachShiftData.size} -{eachShiftData.border}
                                  </div>
                                  {/* <div className=" col-md-4 col-sm-4 col-3 col-xl-4   right-border-2 h-100 py-1 font-size-12 text-center   d-flex justify-content-end align-items-center ">
                                    
                                  </div>
                                  <div className=" col-md-4 col-sm-4 col-3 col-xl-4   right-border-2   py-1 font-size-12 text-center h-100   d-flex justify-content-start align-items-center ">
                                 
                                  </div> */}
                                </div>

                                <div className=" col-md-4 col-4 px-0">
                                  <div className=" col-md-3 col-sm-3 col-3 col-xl-3    right-border-2 h-100  py-1 font-size-12  text-center   d-flex justify-content-end align-items-center ">
                                    {numberWithCommas(eachShiftData.bGradePieces)}
                                  </div>
                                  <div className=" col-md-3 col-sm-3 col-3 col-xl-3   right-border-2  h-100  py-1 font-size-12   d-flex justify-content-end align-items-center ">
                                    {numberWithCommas(eachShiftData.aGradePieces)}
                                  </div>
                                  <div className=" col-md-3 col-sm-3 col-3 col-xl-3    right-border-2 h-100  py-1 font-size-12    d-flex justify-content-end align-items-center ">
                                    {numberWithCommas(eachShiftData.ratePerBorder.toFixed(2))}
                                  </div>
                                  <div className=" col-md-3 col-sm-3 col-3 col-xl-3    right-border-2  h-100  py-1 font-size-12   d-flex justify-content-end align-items-center ">
                                    {numberWithCommas((
                                      eachShiftData.totalAmount -
                                      eachShiftData.extraAmount
                                    ).toFixed(2))}
                                  </div>
                                </div>

                                <div className=" col-md-3  col-3   px-0">
                                  <div className=" col-md-6 col-6  right-border-2 h-100  py-1 font-size-12  text-center   d-flex justify-content-end align-items-center ">
                                    {numberWithCommas(eachShiftData.extraAmount.toFixed(2))}
                                  </div>

                                  <div className=" col-md-6 col-6  right-border-2 h-100  py-1 font-size-12  text-center   d-flex justify-content-end align-items-center ">
                                    {numberWithCommas(eachShiftData.totalAmount.toFixed(2))}
                                  </div>
                                </div>
                              </div>
                            }
                          </>
                        );
                      }
                    )}

                    {eachPersonSummary.productionData.length === 0 ? (
                      <> </>
                    ) : (
                      <>
                        <>
                          <div className="row mx-3  reportTableBody">
                            <div className="col-md-8  col-8  right-border-2"></div>

                            <div className="col-md-2 col-2 bottom-border-1 font-size-12    main_container  text-light    right-border-2  text-center py-1   d-flex justify-content-center align-items-center ">
                              Grand Total
                            </div>
                            <div className="col-md-2 col-2   bottom-border-2  font-size-12  text-center  py-1  right-border-2   d-flex justify-content-end align-items-center ">
                              {    numberWithCommas   (eachPersonSummary.grandFinalSumary.grandTotal.toFixed(
                                2
                              ))}
                            
                            </div>
                          </div>
                          <div className="row mx-3  reportTableBody">
                            <div className="col-md-8  col-8  right-border-2"></div>

                            <div className="col-md-2 col-2 bottom-border-1 font-size-12   main_container  text-light    right-border-2  text-center py-1   d-flex justify-content-center align-items-center ">
                              Paid Amount
                            </div>
                            <div className="col-md-2 col-2   bottom-border-2  font-size-12  text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                              {/* {eachPersonSummary.grandFinalSumary.paidAmount} /- Rs */}
                              --
                            </div>
                          </div>
                          <div className="row mx-3  reportTableBody">
                            <div className="col-md-8  col-8  right-border-2"></div>

                            <div className="col-md-2 col-2 col-xl-2  font-size-12    main_container  text-light    right-border-2  text-center py-1   d-flex justify-content-center align-items-center ">
                              Balance
                            </div>
                            <div className="col-md-2 col-2 col-xl-2   bottom-border-2  font-size-12  text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                              {/* {eachPersonSummary.grandFinalSumary.grandTotal -
                             eachPersonSummary.grandFinalSumary.paidAmount} */}
                              --
                              {/* /- Rs/ */}
                            </div>
                          </div>
                        </>
                      </>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    );
  }
);

export default SalaryReportReciept;
