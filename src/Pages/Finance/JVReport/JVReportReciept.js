import React from "react";

// const ProductionReportReciept = ({
const JVReportReciept = React.forwardRef(({ JVReportData }, ref) => {
  return (
    <div>
      <div className="x_content" ref={ref}>
        <div className="displayPropertyForPrint pb-2"> 
          <h2 className="text-dark text-center font-weight-bold  ">Journal Voucher Report</h2></div>
        <div className="row">
          <div
            className="col-md-6 col   col-6  text-dark px-4 "
            style={{ fontSize: "13px", fontWeight: "500" }}
          >
            <div className="col-md-5  col-5">Voucher Inv</div>
            <div className="col-md-7  col-7">
              {" "}
              <strong> {JVReportData.Voucherinv}</strong>
            </div>
          </div>
          <div className="col-md-2   col-2 "> </div>
          <div
            className="col-md-4  col-4 text-dark px-4 "
            style={{ fontSize: "13px", fontWeight: "500" }}
          >
            {" "}
            Date : <strong>
              {`${JVReportData.date.slice(
                8,
                10
              )}-${JVReportData.date.slice(
                5,
                7
              )}-${JVReportData.date.slice(0, 4)}`}



            </strong>
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-6 col-6 text-dark px-4 "
            style={{ fontSize: "13px", fontWeight: "500" }}
          >
            <div className="col-md-5 col-5"> Weaver Name :</div>
            <div className="col-md-7 col-7">

              <strong>{JVReportData.weaverName}</strong>
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-6 col-6 text-dark px-4 "
            style={{ fontSize: "13px", fontWeight: "500" }}
          >
            <div className="col-md-5 col-5"> Created By :</div>
            <div className="col-md-7 col-7">
              {JVReportData.createdBy}
            </div>
          </div>
        </div>

        <div className="row mx-3  reportTableHead mt-2 ">
          <div className=" col-md-8  col-8 font-size-12   right-border-1  text-center  my-1  py-1">
            Particulars
          </div>
          <div className=" col-md-4  col-4   font-size-12  text-center  my-1  right-border-2  py-1">
            Amount
          </div>
        </div>

        <>
          <div className="row mx-3  reportTableBody mb-3">
            <div className=" col-md-8 col-8 left-border-2 px-0 py-auto right-border-2  bottom-border-2   py-1  text-left px-2">
              Description:{
                JVReportData.description
              }
            </div>
            <div className="col-md-4 col-4 px-0">
              <div className=" col-md-8 col-8  px-0 py-auto right-border-2  bottom-border-2  py-1  text-right px-2">
                {(JVReportData.debit)}
              </div>
              <div className=" col-md-4 col-4 px-0 py-auto right-border-2  bottom-border-2  py-1  text-center px-2">
                Dr
              </div>
              <div className=" col-md-8 col-8  px-0 py-auto right-border-2  bottom-border-2  py-1  text-right px-2">
                {(JVReportData.credit)}
              </div>
              <div className=" col-md-4 col-4 px-0 py-auto right-border-2  bottom-border-2  py-1  text-center px-2">
                Cr
              </div>
            </div>

          </div>

        </>
      </div>
    </div>
  );
});

export default JVReportReciept;
