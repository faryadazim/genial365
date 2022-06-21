import React, { useState } from "react";
import { endPoint } from "../../../config/Config.js";

import PreviewProductionReport from "./PreviewProductionReport.js";
const GenrProductionReportReciept = React.forwardRef(
  ({ GenrProductionReportData, GenrProductionGrandTotal }, ref) => {
    const [modalShow, setModalShow] = useState(false);
    const [productionIdForPreview, setProductionIdForPreview] = useState("");
    const [selectedProductionData, setSelectedProductionData] = useState("");
    const [isLoadingIdGenerated, setIsLoadingIdGenerated] = useState(true);

    const generateReportOfSpecificId = (id) => {
      fetch(`${endPoint}api/GetProductById?id=${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("access_token")).access_token
          }`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then(async (data) => {
          await setSelectedProductionData(data);
          await setIsLoadingIdGenerated(false);
          await setModalShow(true);
        })
        .catch((err) => {
          console.log(err, "err");
        });
    };

    return (
      <div className="x_content mb-3 " ref={ref}>
        <PreviewProductionReport
          show={modalShow}
          onHide={() => setModalShow(false)}
          productionIdForPreview={productionIdForPreview}
          selectedProductionData={selectedProductionData}
          isLoadingIdGenerated={isLoadingIdGenerated}
        />
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
                      <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1  font-size-12  left-border-2   right-border-2   py-1   d-flex justify-content-start align-items-center ">
                        {item.loomNumber}
                      </div>
                      <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-start align-items-center ">
                        {item.weaverName}
                      </div>
                      <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                        {item.programNumber === null ||
                        item.programNumber === undefined ||
                        item.programNumber === ""
                          ? "--"
                          : item.programNumber}
                      </div>
                      <div className="col-md-2 col-md-2 col-sm-2 col-2 col-xl-2 p-0   font-size-12  text-center    d-flex justify-content-center align-items-center ">
                        <div className="   col-md-4 col-sm-4 col-4 col-xl-4 right-border-2 p-0  py-1 h-100">
                          {item.product}
                        </div>
                        <div className="    col-md-4 col-sm-4 col-4 col-xl-4  right-border-2 p-0  py-1 h-100  text-right pr-1">
                          {item.size}
                        </div>
                        <div className="    col-md-4 col-sm-4 col-4 col-xl-4  right-border-2 p-0  py-1 h-100 text-right pr-1">
                          {item.rollNumber}
                        </div>
                      </div>
                      <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-end align-items-center ">
                        {item.reqWeight.toFixed(2)}
                      </div>
                      <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-end align-items-center ">
                        {item.perPieceWeight.toFixed(2)}
                      </div>
                      <div className="col-md-3 col-md-3 col-sm-3 col-3 col-xl-3 p-0   font-size-12  text-center    d-flex justify-content-center align-items-center ">
                        <div className="   col-md-2 col-sm-2 col-2 col-xl-2  h-100 right-border-2 p-0  py-1  text-right pr-1">
                          {item.rollWeight.toFixed(2)}
                        </div>
                        <div className="    col-md-2 col-sm-2 col-2 col-xl-2 h-100  right-border-2 p-0  py-1  text-right pr-1">
                          {item.bGradePercentage.toFixed(2)}
                        </div>
                        <div className="    col-md-3 col-sm-3 col-3 col-xl-3 h-100  right-border-2 p-0  py-1 text-right pr-1">
                          {item.totalPieces}
                        </div>
                        <div className="    col-md-2 col-sm-2 col-2 col-xl-2  h-100 right-border-2 p-0  py-1 text-right pr-1">
                          {item.bGradePieces}
                        </div>
                        <div className="    col-md-3 col-sm-3 col-3 col-xl-3  h-100 right-border-2 p-0  py-1 text-right pr-1">
                          {item.aGradePieces}
                        </div>
                      </div>
                      <div className="col-md-2 px-0">
                        <div className="col-md-5  col-md-5 col-sm-5 col-5 col-xl-5    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-end align-items-center ">
                          {item.amount.toFixed(2)}
                        </div>
                        <div className="col-md-5 col-md-5 col-sm-5 col-5 col-xl-5    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                          {item.detail === null ||
                          item.detail === undefined ||
                          item.detail === ""
                            ? "--"
                            : item.detail}
                        </div>
                        <div className="col-md-2 col-md-2 col-sm-2 col-2 col-xl-2   h-100 font-size-12  text-center  py-1  right-border-2   d-flex justify-content-start align-items-center ">
                          <i
                            class="fa fa-eye hoverBgColorView"
                            onClick={async () => {
                              await generateReportOfSpecificId(
                                item.productionId
                              );
                              setProductionIdForPreview(item.productionId);
                            }}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
            <div className="row mx-3  reportTableBody bottom-border-2">
              <div className="col-md-12 px-0">
                <div className="col-md-7 left-border-2     h-100  font-size-12  text-center  py-2  right-border-2   d-flex justify-content-end align-items-center ">
                &nbsp;
                </div>
                <div className="col-md-3 px-0    h-100  font-size-12  text-center  py-0 right-border-2   d-flex justify-content-center align-items-center ">
                  <div className="col-md-4  h-100  right-border-2 py-2"> 
                    <strong style={{ fontWeight: "800" }}> Grand Total </strong>
                  </div>
                  <div className="col-md-3 px-0  h-100  right-border-2  py-2 "> 
               {  GenrProductionGrandTotal.totalPieces}
                  </div>
                  <div className="col-md-2 px-0  h-100  right-border-2  py-2 "> 
       {   GenrProductionGrandTotal.totalBGradePieces}
                  </div>
                  <div className="col-md-3 px-0 h-100  py-2 "> 
         {     GenrProductionGrandTotal.totalAGradePieces}
                  </div>
                </div>
                <div className="col-md-2 px-0    px-0 py-2    h-100  font-size-12  text-center  py-0 right-border-2   d-flex justify-content-center align-items-center ">
                {   GenrProductionGrandTotal.totalAmount!==undefined && GenrProductionGrandTotal.totalAmount.toFixed(2)}
                </div>
                {/* <div className="col-md-2     h-100 font-size-12  text-center  py-1  right-border-2   d-flex justify-content-start align-items-center ">
                  asdasd
                </div> */}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
);

export default GenrProductionReportReciept;
