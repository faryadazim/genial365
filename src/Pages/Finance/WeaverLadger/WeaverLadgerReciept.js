import React from "react";

const WeaverLadgerReciept = React.forwardRef(
  ({ LadgerData, grandTotal }, ref) => {
    return (
      <div>
        <div className="x_content mb-3" ref={ref}>
          <div className="row mx-3  reportTableHead bottom-border-1 ">
            <div className="col-md-3 col-md-3 col-sm-3 col-3 col-xl-3  font-size-12      text-center  my-1 px-0">
              <div className="col-md-5 col-md-5 col-sm-5 col-5 col-xl-5  font-size-12   right-border-1  text-center   px-0">
                Date
              </div>
              <div className="col-md-7 col-md-7 col-sm-7 col-7 col-xl-7  font-size-12   right-border-1  text-center  px-0 ">
                Voucher Inv
              </div>
            </div>

            <div className="  col-md-3 col-sm-3 col-3 col-xl-3    font-size-12  right-border-1  text-center  my-1">
              Description
            </div>
            <div className="  col-md-2 col-sm-2 col-2 col-xl-2    font-size-12  right-border-1  text-center  my-1">
              Debit
            </div>
            <div className="  col-md-2 col-sm-2 col-2 col-xl-2    font-size-12   right-border-1  text-center  my-1">
              Credit
            </div>
            <div className="  col-md-2 col-sm-2 col-2 col-xl-2  right-border-2  font-size-12   right-border-1  text-center  my-1">
              Balance
            </div>
            {/* ---------- */}
          </div>

          {LadgerData.ladgerData == undefined ||
            LadgerData.ladgerData.length == 0 ? (
            <></>
          ) : (
            <>
              {" "}
              <div className="row mx-3  reportTableBody bottom-border-2 ">
                <div className="col-md-6 col-sm-6 col-6 col-xl-6  right-border-2   left-border-2  px-0 py-1 text-center"></div>
                <div className="col-md-4 col-sm-4 col-4 col-xl-4  right-border-2     bottom-border-1  px-0 py-1 text-center">
                  <strong>   Opening Balance Account</strong>
                </div>
                {/* <div className="col-md-2  col-sm-2 col-2 col-xl-2   right-border-2     px-0 py-1 text-center ">
                  {LadgerData.openingBalance > 0 ? (
                    <> {LadgerData.openingBalance} Cr</>
                  ) : (
                    <div><div className="col-md-8  px-0 right-border-2 py-1   text-right pr-2">
                      {Math.abs(LadgerData.openingBalance)}</div>
                      <div className="col-md-4 px-0 text-center">    Dr</div> </div>
                  )}
                </div> */}
                 <div className="col-md-2  col-sm-2 col-2 col-xl-2  py-  right-border-2   ">
                        {/* {} */}
                        {LadgerData.openingBalance> 0 ? (
                          <>
                            <div className="col-md-8 px-0 right-border-2  py-1   text-right pr-2">
                              {LadgerData.openingBalance} </div>
                            <div className="col-md-4 px-0 text-center">   Cr</div>

                          </>
                        ) : (
                          <>
                            <div className="col-md-8  px-0 right-border-2 py-1   text-right pr-2">{Math.abs(LadgerData.openingBalance)}</div>
                            <div className="col-md-4 px-0 text-center">     Dr</div>

                          </>
                        )}
                      </div>
              </div>
            </>
          )}

          {LadgerData.ladgerData == undefined ||
            LadgerData.ladgerData.length == 0 ? (
            <>
              <div className="row mx-3  reportTableBody bottom-border-2">
                <div className=" col-md-12 col-sm-12 col-12 col-xl-12 px-0 right-border-1 h-100 text-center font-size-12 right-border-2 py-1 h-100 left-border-2 d-flex justify-content-center align-items-center">
                  No Data Available
                </div>
              </div>
            </>
          ) : (
            <>
              {LadgerData.ladgerData.map((eachLadgerItem, index) => {
                return (
                  <div key={index}>
                    <div className="row mx-3  reportTableBody bottom-border-2">
                      <div className="col-md-3  col-sm-2 col-3 col-xl-3 left-border-2 p-0 m-0 right-border-2  text-center px-0">
                        <div className="col-md-5  py-1 px-0">
                          {`${eachLadgerItem.date.slice(
                            8,
                            10
                          )}-${eachLadgerItem.date.slice(
                            5,
                            7
                          )}-${eachLadgerItem.date.slice(0, 4)}`}
                        </div>
                        <div className="col-md-7   left-border-2   py-1 px-0 ">
                          {eachLadgerItem.vocherInv}
                        </div>
                      </div>
                      <div className="col-md-3  col-sm-3 col-3 col-xl-3  right-border-2 py-1 text-left">
                        {eachLadgerItem.description}
                      </div>
                      <div className="col-md-2  col-sm-2 col-2 col-xl-2  right-border-2 py-1 text-right pr-2">
                        {eachLadgerItem.debit}
                      </div>
                      <div className="col-md-2  col-sm-2 col-2 col-xl-2  right-border-2 py-1 text-right pr-2">
                        {eachLadgerItem.credit}
                      </div>
                      <div className="col-md-2  col-sm-2 col-2 col-xl-2  py-  right-border-2   ">
                        {/* {} */}
                        {eachLadgerItem.debit - eachLadgerItem.credit > 0 ? (
                          <>
                            <div className="col-md-8 px-0 right-border-2  py-1   text-right pr-2">
                              {eachLadgerItem.debit - eachLadgerItem.credit} </div>
                            <div className="col-md-4 px-0 text-center">   Cr</div>

                          </>
                        ) : (
                          <>
                            <div className="col-md-8  px-0 right-border-2 py-1   text-right pr-2">{Math.abs(eachLadgerItem.debit - eachLadgerItem.credit)}</div>
                            <div className="col-md-4 px-0 text-center">     Dr</div>

                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="row mx-3  reportTableBody">
                <div className="  col-md-3 col-sm-3 col-3 col-xl-3 bottom-border-2  font-size-12 py-1 text-center  py-1  right-border-2 left-border-2  d-flex justify-content-center align-items-center">
                  {" "}
                </div>

                <div className="col-md-3  col-sm-3 col-3 col-xl-3 bottom-border-2 font-size-12  py-1         right-border-2  text-center py-1   d-flex justify-content-center align-items-center ">
                  <strong> Grand Total{" "}</strong>
                </div>
                <div className="col-md-2 col-md-2 col-sm-2 col-2 col-xl-2   bottom-border-2  font-size-12 py-1 text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                  <strong> {grandTotal.grandTotalDebit}</strong>
                </div>
                <div className="col-md-2 col-md-2 col-sm-2 col-2 col-xl-2   bottom-border-2  font-size-12 py-1 text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                  <strong>{grandTotal.grandTotalCredit}</strong>
                </div>
                <div className="col-md-2 col-md-2 col-sm-2 col-2 col-xl-2   bottom-border-2  font-size-12 py-1 text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                  --
                </div>
              </div>
              <div className="row mx-3  reportTableBody">
                <div className="  col-md-12 col-sm-12 col-12 col-xl-12 bottom-border-2  font-size-12 py-1  py-1  right-border-2 left-border-2  d-flex   ">
                  Weaver Closing Balance Account at Date&nbsp;
                  {/* {LadgerData.ladgerData[LadgerData.ladgerData.length -1].date} */}
                  <u className="text-customOrange">
                    {`${LadgerData.ladgerData[
                      LadgerData.ladgerData.length - 1
                    ].date.slice(8, 10)}-${LadgerData.ladgerData[
                      LadgerData.ladgerData.length - 1
                    ].date.slice(5, 7)}-${LadgerData.ladgerData[
                      LadgerData.ladgerData.length - 1
                    ].date.slice(0, 4)}`}
                  </u>
                  &nbsp; is { } : &nbsp;
                  <strong className="text-customBlue">
                    {LadgerData.closingBalance > 0 ? (
                      <> {LadgerData.closingBalance} Cr</>
                    ) : (
                      <>{Math.abs(LadgerData.closingBalance)} Dr</>
                    )}
                  </strong>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);

export default WeaverLadgerReciept;
