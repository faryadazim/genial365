import React from "react";

const WeaverWiseReportReciept = React.forwardRef(
  ({ WeaverWiseReportData, summaryFinal }, ref) => {
    return (
      <div>
        <div className="x_content mb-3" ref={ref}>
          <div className="row mx-3  reportTableHead ">
            <div className="col-md-3 col-md-3 col-sm-3 col-3 col-xl-3  px-0 my-auto  ">
              <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
                Sr
              </div>
              <div className=" col-md-4 col-sm-4 col-4 col-xl-4 px-0 text-center font-size-12  right-border-1  h-100 my-1 ">
                Date
              </div>
              <div className=" col-md-5 col-sm-5 col-5 col-xl-5 right-border-1 h-100 my-1 font-size-12 text-center">
                Roll #
              </div>
            </div>

            <div className="col-md-3 col-md-3 col-sm-3 col-3 col-xl-3 px-0 my-auto">
              <div className=" col-md-3 col-sm-3 col-3 col-xl-4   right-border-1 h-100  my-1 font-size-12 text-center">
                Product
              </div>
              <div className=" col-md-3 col-sm-3 col-3 col-xl-4   right-border-1 h-100 my-1 font-size-12 text-center">
                Size
              </div>
              <div className=" col-md-3 col-sm-3 col-3 col-xl-4   right-border-1 my-1 font-size-12 text-center">
                Border
              </div>
            </div>

            <div className=" col-md-4 col-sm-4 col-4 col-xl-4 px-0">
              <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0  right-border-1 my-1 font-size-12  text-center">
                B Pieces
              </div>
              <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 right-border-1  my-1 font-size-12  text-center">
                A Pieces
              </div>
              <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0  right-border-1  my-1 font-size-12  text-center">
                Rate Per Border
              </div>
              <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0  right-border-1  my-1 font-size-12  text-center">
                Amount
              </div>
            </div>

            <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1  font-size-12   right-border-1  text-center  my-1">
              Extra Amount
            </div>
            <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1    font-size-12  text-center  my-1  right-border-2">
              Total Amount
            </div>
          </div>

          {/* ---------------- */}

          {WeaverWiseReportData.length == 0 ? (
            <>
              {" "}
              <div className="row mx-3  reportTableBody bottom-border-2">
                <div className=" col-md-12 col-sm-12 col-12 col-xl-12 px-0 right-border-1 h-100 text-center font-size-12 right-border-2 py-1 h-100 left-border-2 d-flex justify-content-center align-items-center">
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
                      <div className="col-md-3 col-md-3 col-sm-3 col-3 col-xl-3 right-border-1 px-0">
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 right-border-1 h-100 text-center font-size-12 right-border-2 py-1 h-100 left-border-2 d-flex justify-content-center align-items-center">
                          {index + 1}
                        </div>
                        <div className=" col-md-4 col-sm-4 col-4 col-xl-4  text-center font-size-12 right-border-2 py-1 h-100  d-flex justify-content-center align-items-center">
                          {`${weaverWiseReportItem.productDate.slice(
                            8,
                            10
                          )}-${weaverWiseReportItem.productDate.slice(
                            5,
                            7
                          )}-${weaverWiseReportItem.productDate.slice(0, 4)}`}
                        </div>
                        <div className="col-md-5 col-md-5 col-sm-5 col-4 col-xl-5 right-border-2 h-100  py-1 font-size-12 text-center d-flex justify-content-center align-items-center px-0">
                          {weaverWiseReportItem.rollNumber}
                        </div>
                      </div>

                      <div className="col-md-3 col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto">
                        <div className="col-md-4   col-sm-4 col-4 col-xl-4   right-border-2 h-100   py-1 font-size-12 text-center    d-flex justify-content-center align-items-center ">
                          {weaverWiseReportItem.product}
                        </div>
                        <div className=" col-md-4 col-sm-4 col-3 col-xl-4   right-border-2 h-100 py-1 font-size-12    d-flex justify-content-end align-items-center ">
                          {weaverWiseReportItem.size}
                        </div>
                        <div className=" col-md-4 col-sm-4 col-3 col-xl-4   right-border-2   py-1 font-size-12 text-center h-100   d-flex justify-content-start align-items-center ">
                          {weaverWiseReportItem.border}
                        </div>
                      </div>

                      <div className=" col-md-4 col-sm-4 col-4 col-xl-4 px-0">
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0  right-border-2 h-100  py-1 font-size-12     d-flex justify-content-end align-items-center pr-1">
                          {weaverWiseReportItem.bGradePiece}
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 right-border-2  h-100  py-1 font-size-12   d-flex justify-content-end align-items-center  pr-1">
                          {weaverWiseReportItem.aGradePieces}
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0  right-border-2 h-100  py-1 font-size-12    d-flex justify-content-end align-items-center pr-1 ">
                          {(weaverWiseReportItem.ratePerBorder).toFixed(2)}
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0  right-border-2  h-100  py-1 font-size-12      d-flex justify-content-end align-items-center pr-1 ">
                          {(weaverWiseReportItem.totalAmount -
                            weaverWiseReportItem.extraAmount).toFixed(2)}
                        </div>
                      </div>

                      <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1  font-size-12     right-border-2  text-center py-1   d-flex justify-content-end align-items-center ">
                        {(weaverWiseReportItem.extraAmount).toFixed(2)}
                      </div>
                      <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-end align-items-center ">
                        {(weaverWiseReportItem.totalAmount).toFixed(2)}
                      </div>
                    </div>
                  );
                })}

                <div className="row mx-3  reportTableBody">
                  <div className="col-md-8  col-md-8 col-sm-2 col-8 col-xl-8  right-border-2"></div>

                  <div className="col-md-2 col-md-2 col-sm-2 col-2 col-xl-2 bottom-border-1 font-size-12    main_container  text-light    right-border-2  text-center py-1   d-flex justify-content-center align-items-center ">
                    Grand Total{" "}
                  </div>
                  <div className="col-md-2 col-md-2 col-sm-2 col-2 col-xl-2   bottom-border-2  font-size-12    py-1  right-border-2   d-flex justify-content-end align-items-center ">
                    {(summaryFinal.grandTotal).toFixed(2)} /- 
                  </div>
                </div>
                <div className="row mx-3  reportTableBody">
                  <div className="col-md-8  col-md-8 col-sm-2 col-8 col-xl-8  right-border-2"></div>

                  <div className="col-md-2 col-md-2 col-sm-2 col-2 col-xl-2 bottom-border-1 font-size-12   main_container  text-light    right-border-2  text-center py-1   d-flex justify-content-center align-items-center ">
                    Paid Amount
                  </div>
                  <div className="col-md-2 col-md-2 col-sm-2 col-2 col-xl-2   bottom-border-2  font-size-12  text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                    {/* {summaryFinal.paidAmount} /- Rs */}  --
                  </div>
                </div>
                <div className="row mx-3  reportTableBody">
                  <div className="col-md-8  col-md-8 col-sm-2 col-8 col-xl-8  right-border-2"></div>

                  <div className="col-md-2 col-md-2 col-sm-2 col-2 col-xl-2  font-size-12    main_container  text-light    right-border-2  text-center py-1   d-flex justify-content-center align-items-center ">
                    Balance
                  </div>
                  <div className="col-md-2 col-md-2 col-sm-2 col-2 col-xl-2   bottom-border-2  font-size-12  text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                    {/* {summaryFinal.grandTotal - summaryFinal.paidAmount} /- Rs */}   --
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
