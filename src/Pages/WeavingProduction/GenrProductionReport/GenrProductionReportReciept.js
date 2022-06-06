import React from "react";

const GenrProductionReportReciept = React.forwardRef(
  ({ GenrProductionReportData }, ref) => {
    return (
      <div className="x_content mb-3 " ref={ref}>
        <div className="row mx-3  reportTableHead ">
          <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1  px-0 my-auto  ">
            <div className=" col-md-12 col-sm-12 col-12 col-xl-12 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              Loom Number
            </div>
          </div>

          <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1 px-0 my-auto">
            <div className=" col-md-12 col-sm-12 col-12 col-xl-12 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              Weaver Name
            </div>
          </div>
          <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1 px-0 my-auto">
            <div className=" col-md-12 col-sm-12 col-12 col-xl-12 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              Prog #
            </div>
          </div>
          <div className="col-md-2 col-md-2 col-sm-2 col-2 col-xl-2 px-0 my-auto">
            <div className=" col-md-4 col-sm-4 col-4 col-xl-4 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              Product
            </div>
            <div className=" col-md-4 col-sm-4 col-4 col-xl-4 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              Size
            </div>
            <div className=" col-md-4 col-sm-4 col-4 col-xl-4 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              Roll #
            </div>
          </div>

          <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1 px-0 my-auto">
            <div className=" col-md-12 col-sm-12 col-12 col-xl-12 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              Req. W.t
            </div>
          </div>
          <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1 px-0 my-auto">
            <div className=" col-md-12 col-sm-12 col-12 col-xl-12 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              Per Pcs W.t
            </div>
          </div>
          <div className="col-md-3 col-md-3 col-sm-3 col-3 col-xl-3 px-0 my-auto">
            <div className=" col-md-2 col-sm-2 col-2 col-xl-2 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              Roll w.t
            </div>
            <div className=" col-md-2 col-sm-2 col-2 col-xl-2 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              B%
            </div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              Total Pcs
            </div>
            <div className=" col-md-2 col-sm-2 col-2 col-xl-2 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              B Pcs
            </div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              A Pcs
            </div>
          </div>

          <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1  font-size-12   right-border-1  text-center  my-1">
            Amount
          </div>
          <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1    font-size-12  text-center  my-1  right-border-2">
            Detail
          </div>
        </div>

        {GenrProductionReportData.length == 0 ? (
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
              {GenrProductionReportData.map((item) => {
                return (
                  <>
                    <div className="row mx-3  reportTableBody bottom-border-2">
                      <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1  font-size-12  left-border-2   right-border-2  text-center py-1   d-flex justify-content-center align-items-center ">
                        {item.loomNumber}
                      </div>
                      <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                        {item.weaverName}
                      </div>
                      <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                        {item.programNumber}
                      </div>
                      <div className="col-md-2 col-md-2 col-sm-2 col-2 col-xl-2 p-0   font-size-12  text-center    d-flex justify-content-center align-items-center ">
                        <div className="   col-md-4 col-sm-4 col-4 col-xl-4 right-border-2 p-0  py-1 h-100">
                          {item.product}
                        </div>
                        <div className="    col-md-4 col-sm-4 col-4 col-xl-4  right-border-2 p-0  py-1 h-100">
                          {item.size}
                        </div>
                        <div className="    col-md-4 col-sm-4 col-4 col-xl-4  right-border-2 p-0  py-1 h-100">
                          {item.rollNumber}
                        </div>
                      </div>
                      <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                        {item.reqWeight}
                      </div>
                      <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                        {item.perPieceWeight}
                      </div>
                      <div className="col-md-3 col-md-3 col-sm-3 col-3 col-xl-3 p-0   font-size-12  text-center    d-flex justify-content-center align-items-center ">
                        <div className="   col-md-2 col-sm-2 col-2 col-xl-2  h-100 right-border-2 p-0  py-1">
                          {item.rollWeight}
                        </div>
                        <div className="    col-md-2 col-sm-2 col-2 col-xl-2 h-100  right-border-2 p-0  py-1">
                          {item.bGradePercentage.toFixed(2)}
                        </div>
                        <div className="    col-md-2 col-sm-2 col-2 col-xl-2 h-100  right-border-2 p-0  py-1">
                          {item.totalPieces}
                        </div>
                        <div className="    col-md-3 col-sm-3 col-3 col-xl-3  h-100 right-border-2 p-0  py-1">
                          {item.bGradePieces}
                        </div>
                        <div className="    col-md-3 col-sm-3 col-3 col-xl-3  h-100 right-border-2 p-0  py-1">
                          {item.aGradePieces}
                        </div>
                      </div>
                      <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                        {item.amount}
                      </div>
                      <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                        {item.detail}
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          </>
        )}
      </div>
    );
  }
);

export default GenrProductionReportReciept;
