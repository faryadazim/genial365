import React, { useState } from "react";
import { endPoint } from "../../../config/Config.js";
import { numberWithCommas } from "../../../config/commaSeperated.js";
import PreviewProductionReport from "./PreviewProductionReport.js";
const GenrProductionReportReciept = React.forwardRef(
  ({ GenrProductionReportData, GenrProductionGrandTotal, dataForPrint }, ref) => {
    const [modalShow, setModalShow] = useState(false);
    const [productionIdForPreview, setProductionIdForPreview] = useState("");
    const [selectedProductionData, setSelectedProductionData] = useState("");
    const [isLoadingIdGenerated, setIsLoadingIdGenerated] = useState(true);

    const generateReportOfSpecificId = (id) => {
      fetch(`${endPoint}api/GetProductById?id=${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token
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
    console.log(dataForPrint, "data to print");
    return (
      <div className="x_content mb-3 " ref={ref}>
        <PreviewProductionReport
          show={modalShow}
          onHide={() => setModalShow(false)}
          productionIdForPreview={productionIdForPreview}
          selectedProductionData={selectedProductionData}
          isLoadingIdGenerated={isLoadingIdGenerated}
        />


        <div className="displayPropertyForPrint">

          <h2 className="text-dark text-center font-weight-bold  ">General Production Report</h2>
          <div className="row pb-2">
            <div className="col-md-4 col-3 text-dark  text-center">  Shift :  <strong className="text-dark  font-weight-bold ">  {dataForPrint.shiftValue === undefined ? null : dataForPrint.shiftValue.label}</strong> </div>
            <div className="col-md-4 col-3  text-dark  text-center"> Product: <strong className=" text-dark  font-weight-bold "> {dataForPrint.productName}</strong></div>
            <div className="col-md-4 col-3 text-dark text-center ">  Date From: <strong className="text-dark  font-weight-bold ">  {dataForPrint.dateFrom}</strong> </div>
            <div className="col-md-4 col-3 text-dark  text-center">  Date To :  <strong className="text-dark  font-weight-bold ">  {dataForPrint.dateEnd}</strong> </div>
          </div>
        </div>




        <div className="row mx-3  reportTableHead ">
          <div className="col-md-1 col-1  px-0 my-auto  ">
            <div className=" col-md-12 col-12 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              Loom Num
            </div>
          </div>

          <div className="col-md-1 col-1  px-0 my-auto">
            <div className=" col-md-12 col-12 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              Weaver Name
            </div>
          </div>
          <div className="col-md-1 col-1 px-0 my-auto">
            <div className=" col-md-12 col-12 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              Prog #
            </div>
          </div>
          <div className="col-md-2 col-2 px-0 my-auto">
            <div className=" col-md-8 col-8 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              Product
            </div>
            {/* <div className=" col-md-4 col-sm-4 col-4 col-xl-4 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              Size
            </div> */}
            <div className=" col-md-4 col-4 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              Roll #
            </div>
          </div>

          <div className="col-md-1 col-1 px-0 my-auto">
            <div className=" col-md-12 col-12 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              Req. W.t
            </div>
          </div>
          <div className="col-md-1 col-1  px-0 my-auto">
            <div className=" col-md-12 col-12 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              Per Pcs W.t
            </div>
          </div>
          <div className="col-md-3 col-3   px-0 my-auto">
            <div className=" col-md-2 col-2 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              Roll w.t
            </div>
            <div className=" col-md-2 col-2 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              B%
            </div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              Total Pcs
            </div>
            <div className=" col-md-2 col-2 px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              B Pcs
            </div>
            <div className=" col-md-3 col-3  px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              A Pcs
            </div>
          </div>
          <div className="col-md-2 col-2 px-0 my-auto">
            <div className=" col-md-8 col-8   px-0 right-border-1 h-100 text-center font-size-12  h-100 my-1 ">
              Amount{" "}
            </div>
            <div className=" col-md-4 col-4   px-0   h-100 text-center font-size-12  h-100 my-1 removeInPrintMedia ">
              {" "}
              Action{" "}
            </div>
          </div>
        </div>

        {GenrProductionReportData.length == 0 ? (
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
              {GenrProductionReportData.map((item) => {
                return (
                  <>
                    <div className="row mx-3  reportTableBody bottom-border-2">
                      <div className="col-md-1 col-1  font-size-12  left-border-2-bolder   right-border-2   py-1   d-flex justify-content-center align-items-center ">
                        {item.loomNumber}
                      </div>
                      <div className="col-md-1 col-1    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-start align-items-center ">
                        {item.weaverName}
                      </div>
                      <div className="col-md-1 col-1    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                        {item.programNumber === null ||
                          item.programNumber === undefined ||
                          item.programNumber === ""
                          ? "--"
                          : item.programNumber}
                          
                      </div>
                      <div className="col-md-2 col-2 p-0   font-size-12  text-center    d-flex justify-content-center align-items-center ">
                        <div className="   col-md-8 col-8 right-border-2 p-0  py-1 h-100">
                          {item.product}
                        </div>
                        {/* <div className="    col-md-4 col-sm-4 col-4 col-xl-4  right-border-2 p-0  py-1 h-100  text-right pr-1">
                          {item.size}
                        </div> */}
                        <div className="    col-md-4 col-4  right-border-2 p-0  py-1 h-100 text-right pr-1">
                          {item.rollNumber}
                        </div>
                      </div>
                      <div className="col-md-1 col-1    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-end align-items-center ">
                        {item.reqWeight.toFixed(2)}
                      </div>
                      <div className="col-md-1 col-1    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-end align-items-center ">
                        {item.perPieceWeight.toFixed(2)}
                      </div>
                      <div className="col-md-3 col-3 p-0   font-size-12  text-center    d-flex justify-content-center align-items-center ">
                        <div className="   col-md-2 col-2  h-100 right-border-2 p-0  py-1  text-right pr-1">
                          {item.rollWeight.toFixed(2)}
                        </div>
                        <div className="    col-md-2 col-2 h-100  right-border-2 p-0  py-1  text-right pr-1">
                          {item.bGradePercentage.toFixed(2)}
                        </div>
                        <div className="    col-3 h-100  right-border-2 p-0  py-1 text-right pr-1">
                          {item.totalPieces}
                        </div>
                        <div className="    col-md-2 col-2  h-100 right-border-2 p-0  py-1 text-right pr-1">
                          {item.bGradePieces}
                        </div>
                        <div className="    col-3  h-100 right-border-2 p-0  py-1 text-right pr-1">
                          {item.aGradePieces}
                        </div>
                      </div>
                      <div className="col-md-2 col-2 px-0">
                        <div className="col-md-8   col-8    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-end align-items-center ">
                          {item.amount.toFixed(2)}
                        </div>
                        {/* <div className="col-md-5 col-md-5 col-sm-5 col-5 col-xl-5    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                          {item.detail === null ||
                          item.detail === undefined ||
                          item.detail === ""
                            ? "--"
                            : item.detail}
                        </div> */}
                        <div className="col-md-4  col-4    h-100 font-size-12  text-center  py-1  right-border-2-bolder   d-flex justify-content-center align-items-center  ">
                          <i
                            class="fa fa-eye hoverBgColorView  removeInPrintMedia"
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

                    {/* fault line row  */}
                    <div className="row mx-3  reportTableBody bottom-border-2-bolder ">
                      <div className="col-md-1 col-1  font-size-12  left-border-2-bolder   right-border-2   py-1   d-flex justify-content-center align-items-center ">
                        <strong className="text-danger">  Faults List</strong>
                      </div>
                      <div className="col-md-5 col-5    font-size-12  text-left  py-1  right-border-2   d-flex justify-content-start align-items-center ">
                     {item.faults}
                                  
                      </div>

                      {/* <div className="col-md-1 col-1    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-end align-items-center ">
                        <strong>Difference</strong>
                      </div> */}


                      <div className="col-md-2 col-2   font-size-12    py-1  right-border-2   d-flex justify-content-start align-items-center ">
                        <strong> Width Difference :</strong>  {item.widthDiffrerence}
                      </div>
                      <div className="col-md-2 col-2   font-size-12    py-1  right-border-2   d-flex justify-content-start align-items-center ">
                        <strong>  Length Difference :</strong> {item.lengthDiffrerence}
                      </div>
                      <div className="col-md-2 col-2   font-size-12    py-1  right-border-2-bolder   d-flex justify-content-start align-items-center ">
                        <strong> Weight Difference :</strong>  {item.weighthDiffrerence}
                      </div>

                    </div>
                    {/* fault line row  */}



                  </>
                );
              })}
            </>
            <div className="row mx-3  reportTableBody bottom-border-2-bolder top-border-2  ">
              <div className="col-md-12 col-12 px-0">
                <div className="col-md-2 col-2 left-border-2-bolder    h-100  font-size-12  text-center  py-2  right-border-2-bolder      d-flex justify-content-end align-items-center ">
                  <div className="col-md-12 col-12 h-100         ">
                    <strong> Total Productions :</strong>{" "}
                    {numberWithCommas(
                      GenrProductionGrandTotal.totalProductions
                    )}
                  </div>
                </div>
                <div className="col-md-5  col-5 h-100  font-size-12  text-center  py-2   right-border-2-bolder    d-flex justify-content-end align-items-center ">
                  &nbsp;
                </div>
                <div className="col-md-3 px-0 col-3   h-100  font-size-12  text-center  py-0   d-flex justify-content-center align-items-center ">
                  <div className="col-md-4 col-4 h-100 col-4   py-2  right-border-2-bolder  ">
                    <strong style={{ fontWeight: "900" }}> Total </strong>
                  </div>
                  <div className="col-md-3 px-0 col-3 h-100  py-2 text-right pr-1  right-border-2-bolder ">
                    <strong>
                      {" "}
                      {numberWithCommas(GenrProductionGrandTotal.totalPieces)}
                    </strong>
                  </div>
                  <div className="col-md-2 col-2 px-0 col-2 h-100  py-2     text-right pr-1  right-border-2-bolder ">
                    <strong>
                      {" "}
                      {numberWithCommas(
                        GenrProductionGrandTotal.totalBGradePieces
                      )}
                    </strong>
                  </div>
                  <div className="col-md-3 col-3 px-0 h-100  py-2 pr-1  text-right  right-border-2-bolder ">
                    <strong>
                      {" "}
                      {numberWithCommas(
                        GenrProductionGrandTotal.totalAGradePieces
                      )}
                    </strong>
                  </div>
                </div>
                <div className="col-md-2 col-2 px-0    px-0      h-100  font-size-12  text-center  py-0 right-border-2-bolder   d-flex justify-content-center align-items-center ">
                  {/* {GenrProductionGrandTotal.totalAmount !== undefined &&
                    GenrProductionGrandTotal.totalAmount.toFixed(2)} */}

                  <div className="col-md-8   col-8    font-size-12  text-center  py-2  d-flex justify-content-end align-items-center ">
                    <strong>
                      {" "}
                      {numberWithCommas(
                        GenrProductionGrandTotal.totalAmount !== undefined &&
                        GenrProductionGrandTotal.totalAmount.toFixed(2)
                      )}
                    </strong>
                  </div>
                  <div className="col-md-4   col-4    font-size-12  text-center   py-2   left-border-2-bolder    d-flex justify-content-end align-items-center ">
                    &nbsp;
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
);

export default GenrProductionReportReciept;
