import React from "react";
import { numberWithCommas } from "../../../config/commaSeperated";

const WeaverWiseReportReciept = React.forwardRef(
  ({ WeaverWiseReportData, summaryFinal, weaverDataForPrint }, ref) => {
    return (
      <div>
        <div className="x_content mb-3" ref={ref}>

          {/* weaverName:employeeWeaverValue.label,
                              dateFrom:dateFrom,
                              dateTo:dateTo */}


          <div className="displayPropertyForPrint">

            <h2 className="text-dark text-center font-weight-bold  ">Weaver Wise Report</h2>
            <div className="row pb-2">
              <div className="col-md-4 col-4 pl-5 text-dark  text-center"> Weaver Name : <strong className=" text-dark  font-weight-bold "> {weaverDataForPrint.weaverName}</strong></div>
              <div className="col-md-4 col-4 text-dark text-center ">  Date From: <strong className="text-dark  font-weight-bold ">  {weaverDataForPrint.dateFrom}</strong> </div>
              <div className="col-md-4 col-4 text-dark  text-center">  Date To :  <strong className="text-dark  font-weight-bold ">  {weaverDataForPrint.dateTo}</strong> </div>
            </div>
          </div>




          <div className="row mx-3  reportTableHead ">
            <div className="col-md-3 col-3 px-0 my-auto  ">
              <div className=" col-md-4 col-4 px-0 text-center font-size-12  right-border-1  h-100 my-1 ">
                Date
              </div>
              <div className=" col-md-5 col-5 right-border-1 h-100 my-1 font-size-12 text-center">
                Roll #
              </div>
              <div className=" col-md-3 col-3 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
                Shift
              </div>
            </div>

            <div className="col-md-2 col-2 px-0 my-auto">
              <div className=" col-md-12 col-12   right-border-1 h-100  my-1 font-size-12 text-center">
                Product
              </div>
              {/* <div className=" col-md-3 col-sm-3 col-3 col-xl-4   right-border-1 h-100 my-1 font-size-12 text-center">
                Size
              </div>
              <div className=" col-md-3 col-sm-3 col-3 col-xl-4   right-border-1 my-1 font-size-12 text-center">
                Border
              </div> */}
            </div>

            <div className=" col-md-4  col-4 px-0">
              <div className=" col-md-3 col-3 px-0  right-border-1 my-1 font-size-12  text-center">
                B Pics
              </div>
              <div className=" col-md-3 col-3 px-0 right-border-1  my-1 font-size-12  text-center">
                A Pics
              </div>
              <div className=" col-md-3 col-3 px-0  right-border-1  my-1 font-size-12  text-center">
                Rate/Border
              </div>
              <div className=" col-md-3 col-3 px-0  right-border-1  my-1 font-size-12  text-center">
                Amount
              </div>
            </div>
            <div className="col-md-3 col-3 px-0">
              <div className=" col-md-6 col-6 px-0  right-border-1  my-1 font-size-12  text-center">
                Extra Amount
              </div>
              <div className=" col-md-6 col-6 px-0    my-1 font-size-12  text-center">
                Total Amount
              </div>
            </div>
          </div>

          {/* ---------------- */}

          {WeaverWiseReportData.length == 0 ? (
            <>
              {" "}
              <div className="row mx-3  reportTableBody bottom-border-2">
                <div className=" col-md-12 col-12 px-0 right-border-1 h-100 text-center font-size-12 right-border-2 py-1 h-100 left-border-2 d-flex justify-content-center align-items-center">
                  No Data Available
                </div>
              </div>
            </>
          ) : (
            <>
              <>
                {WeaverWiseReportData.map((weaverWiseReportItem, index) => {
                  return (
                    <div className="row mx-3  reportTableBody bottom-border-2">
                      <div className="col-md-3 col-3 right-border-1 px-0">
                        <div className=" col-md-4 col-4  left-border-2 text-center font-size-12 right-border-2 py-1 h-100  d-flex justify-content-center align-items-center">
                          {`${weaverWiseReportItem.productDate.slice(
                            8,
                            10
                          )}-${weaverWiseReportItem.productDate.slice(
                            5,
                            7
                          )}-${weaverWiseReportItem.productDate.slice(2, 4)}`}
                        </div>
                        <div className="col-md-5 col-5 right-border-2 h-100  py-1 font-size-12 text-center d-flex justify-content-center align-items-center px-0">
                          {weaverWiseReportItem.rollNumber}
                        </div>
                        <div className=" col-md-3 col-3 px-0 right-border-1 h-100 text-center font-size-12 right-border-2 py-1 h-100  d-flex justify-content-center align-items-center">
                          {weaverWiseReportItem.shiftName.slice(6)}
                        </div>
                      </div>

                      <div className="col-md-2 col-2 px-0 py-auto">
                        <div className="col-md-12   col-12   right-border-2 h-100   py-1 font-size-12 text-center    d-flex justify-content-center align-items-center ">
                          {weaverWiseReportItem.border}-
                          {weaverWiseReportItem.size}
                        </div>
                        {/* <div className=" col-md-4 col-sm-4 col-3 col-xl-4   right-border-2 h-100 py-1 font-size-12    d-flex justify-content-end align-items-center ">
                          {weaverWiseReportItem.size}
                        </div>
                        <div className=" col-md-4 col-sm-4 col-3 col-xl-4   right-border-2   py-1 font-size-12 text-center h-100   d-flex justify-content-start align-items-center ">
                         
                        </div> */}
                      </div>

                      <div className=" col-md-4 col-4 px-0">
                        <div className=" col-md-3 col-3 px-0  right-border-2 h-100  py-1 font-size-12     d-flex justify-content-end align-items-center pr-1">
                          {weaverWiseReportItem.bGradePiece}
                        </div>
                        <div className=" col-md-3 col-3 px-0 right-border-2  h-100  py-1 font-size-12   d-flex justify-content-end align-items-center  pr-1">
                          {weaverWiseReportItem.aGradePieces}
                        </div>
                        <div className=" col-md-3 col-3 px-0  right-border-2 h-100  py-1 font-size-12    d-flex justify-content-end align-items-center pr-1 ">
                          {weaverWiseReportItem.ratePerBorder.toFixed(2)}
                        </div>
                        <div className=" col-md-3 col-3 px-0  right-border-2  h-100  py-1 font-size-12      d-flex justify-content-end align-items-center pr-1 ">
                          {(
                            weaverWiseReportItem.totalAmount -
                            weaverWiseReportItem.extraAmount
                          ).toFixed(2)}
                        </div>
                      </div>
                      <div className="col-md-3 col-3 px-0">
                        <div className=" col-md-6 col-6 px-0  right-border-2  h-100  py-1 font-size-12      d-flex justify-content-end align-items-center pr-1 ">
                          {" "}
                          {weaverWiseReportItem.extraAmount.toFixed(2)}
                        </div>
                        <div className=" col-md-6 col-6 px-0  right-border-2  h-100  py-1 font-size-12      d-flex justify-content-end align-items-center pr-1 ">
                          {" "}
                          {weaverWiseReportItem.totalAmount.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="row mx-3  reportTableBody">
                  <div className="col-md-8  col-8  right-border-2"></div>

                  <div className="col-md-2 col-2 bottom-border-1 font-size-12    main_container  text-light    right-border-2  text-center py-1   d-flex justify-content-center align-items-center ">
                    Grand Total{" "}
                  </div>
                  <div className="col-md-2 col-2   bottom-border-2  font-size-12    py-1  right-border-2   d-flex justify-content-end align-items-center ">
                    {numberWithCommas(summaryFinal.grandTotal.toFixed(2))} /-
                  </div>
                </div>
                <div className="row mx-3  reportTableBody">
                  <div className="col-md-8  col-8  right-border-2"></div>

                  <div className="col-md-2 col-2 bottom-border-1 font-size-12   main_container  text-light    right-border-2  text-center py-1   d-flex justify-content-center align-items-center ">
                    Paid Amount
                  </div>
                  <div className="col-md-2 col-2   bottom-border-2  font-size-12  text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                    {/* {summaryFinal.paidAmount} /- Rs */} --
                  </div>
                </div>
                <div className="row mx-3  reportTableBody">
                  <div className="col-md-8  col-8  right-border-2"></div>

                  <div className="col-md-2 col-2  font-size-12    main_container  text-light    right-border-2  text-center py-1   d-flex justify-content-center align-items-center ">
                    Balance
                  </div>
                  <div className="col-md-2 col-2   bottom-border-2  font-size-12  text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                    {/* {summaryFinal.grandTotal - summaryFinal.paidAmount} /- Rs */}{" "}
                    --
                  </div>
                </div>
              </>
            </>
          )}
        </div>
      </div>
    );
  }
);

export default WeaverWiseReportReciept;
