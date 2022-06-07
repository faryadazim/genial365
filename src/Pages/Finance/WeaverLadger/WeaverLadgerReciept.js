import React from "react";

const WeaverLadgerReciept = React.forwardRef(({ LadgerData , grandTotal   }, ref) => {
  return (
    <div>
      <div className="x_content mb-3" ref={ref}>
        <div className="row mx-3  reportTableHead bottom-border-1">
          <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1  font-size-12   right-border-1  text-center  my-1">
            Sr #
          </div>
          <div className="  col-md-2 col-sm-2 col-2 col-xl-2    font-size-12  right-border-1  text-center  my-1">
            Date
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
          <> <div className="row mx-3  reportTableBody bottom-border-2 ">
          <div className="col-md-6 col-sm-6 col-6 col-xl-6  right-border-2   left-border-2  px-0 py-1 text-center"></div>
          <div className="col-md-4 col-sm-4 col-4 col-xl-4  right-border-2  main_container text-light  bottom-border-1  px-0 py-1 text-center">
            Opening Balance Account
          </div>
          <div className="col-md-2  col-sm-2 col-2 col-xl-2   right-border-2     px-0 py-1 text-center">
            {LadgerData.openingBalance > 0 ? (
              <> {LadgerData.openingBalance} Cr</>
            ) : (
              <>{Math.abs(LadgerData.openingBalance)} Dr</>
            )}
          </div>
        </div></>
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
                    <div className="col-md-1 col-sm-1 col-1 col-xl-1   right-border-2   left-border-2  px-0 py-1 text-center">
                      {index + 1}
                    </div>
                    <div className="col-md-2  col-sm-2 col-2 col-xl-2   right-border-2 py-1 text-center">
                 
                     {`${eachLadgerItem.date.slice(
                            8,
                            10
                          )}-${eachLadgerItem.date.slice(
                            5,
                            7
                          )}-${eachLadgerItem.date.slice(0, 4)}`}

                    </div>
                    <div className="col-md-3  col-sm-3 col-3 col-xl-3  right-border-2 py-1 text-center">
               {eachLadgerItem.description}
                    </div>
                    <div className="col-md-2  col-sm-2 col-2 col-xl-2  right-border-2 py-1 text-center">
               {eachLadgerItem.debit}
                    </div>
                    <div className="col-md-2  col-sm-2 col-2 col-xl-2  right-border-2 py-1 text-center">
                  {eachLadgerItem.credit}
                    </div>
                    <div className="col-md-2  col-sm-2 col-2 col-xl-2  right-border-2 py-1 text-center">
                    {eachLadgerItem.debit-eachLadgerItem.credit}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="row mx-3  reportTableBody">
              <div className="  col-md-3 col-sm-3 col-3 col-xl-3  right-border-2"></div>

              <div className="col-md-3  col-sm-3 col-3 col-xl-3 bottom-border-2 font-size-12  py-1  main_container  text-light    right-border-2  text-center py-1   d-flex justify-content-center align-items-center ">
                Grand Total{" "}
              </div>
              <div className="col-md-2 col-md-2 col-sm-2 col-2 col-xl-2   bottom-border-2  font-size-12 py-1 text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
              {grandTotal.grandTotalDebit} /- Rs
              </div>
              <div className="col-md-2 col-md-2 col-sm-2 col-2 col-xl-2   bottom-border-2  font-size-12 py-1 text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
              {grandTotal.grandTotalCredit}    /- Rs
              </div>
              <div className="col-md-2 col-md-2 col-sm-2 col-2 col-xl-2   bottom-border-2  font-size-12 py-1 text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
              {(grandTotal.grandTotalDebit -grandTotal.grandTotalCredit)>0?<>
                {grandTotal.grandTotalDebit -grandTotal.grandTotalCredit} Cr</>:<>{Math.abs(grandTotal.grandTotalDebit -grandTotal.grandTotalCredit)} Dr</>}  
              </div>
            </div>
          </>


// {LadgerData.openingBalance > 0 ? (
//   <> {LadgerData.openingBalance} Cr</>
// ) : (
//   <>{Math.abs(LadgerData.openingBalance)} Dr</>
// )}



        )}
      </div>
    </div>
  );
});

export default WeaverLadgerReciept;
