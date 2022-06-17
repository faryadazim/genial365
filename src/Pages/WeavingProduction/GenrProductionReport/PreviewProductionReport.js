import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const PreviewProductionReport = (props) => {
  useEffect(() => {
    console.log(props.selectedProductionData);
  }, []);

  return (
    <div className="marginForModel">
      {props.isLoadingIdGenerated ? (
        <>
          {" "}
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ width: "1400px", margin: "0px" }}
          >
            <>loading</>
          </Modal>
        </>
      ) : (
        <>
          {" "}
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ width: "1400px", margin: "0px" }}
          >
            <>
              {" "}
              <div className="x_panel mb-0">
                <div className="x_title mb-0">
                  <h2 className="pl-2 pt-2">Production Report Preview</h2>
                  <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
                    <li></li>
                  </ul>
                  <div className="clearfix" />
                  <div className="x_content"></div>
                </div>
                <div>
                  <div className="x_content">
                    <div className="row my-2 ">
                      <div className=" col-md-6 col-sm-6 col-6 col-xl-6 col-sm-6 col-6 col-xl-6 px-5 text-customBlue font-weight-400 mb-2  bg- ">
                        <div className="row">
                          <div className="col-md-12   col-sm-12 col-12 col-xl-12 text-center   font-weight-600">
                            <div className="my-0 text-center perPieceDetailHeadingProductionReport">
                              Roll Detail
                            </div>
                          </div>
                          <div className="col-md-12 col-sm-12 col-12 col-xl-12">
                            <div className=" col-md-6 col-sm-6 col-6 col-xl-6 font-weight-500">
                              Roll Number
                            </div>
                            <div className=" col-md-6 col-sm-6 col-6 col-xl-6 text-right">
                              <b>{props.selectedProductionData.roll_no}</b>{" "}
                            </div>
                          </div>
                          <div className="col-md-12 col-md-12 col-sm-12 col-12 col-xl-12">
                            <div className=" col-md-6 col-sm-6 col-6 col-xl-6">
                              Date
                            </div>
                            <div className=" col-md-6 col-sm-6 col-6 col-xl-6 text-right">
                              {props.selectedProductionData.production_date.slice(
                                0,
                                10
                              )}
                            </div>
                          </div>
                          <div className="col-md-12 col-sm-12 col-12 col-xl-12">
                            <div className=" col-md-6 col-sm-6 col-6 col-xl-6">
                              Role Weight
                            </div>
                            <div className=" col-md-6 col-sm-6 col-6 col-xl-6 text-right">
                              {" "}
                              {props.selectedProductionData.roll_weight.toFixed(
                                2
                              )}
                            </div>
                          </div>

                          <div className="col-md-12 col-sm-12 col-12 col-xl-12">
                            <div className=" col-md-6 col-sm-6 col-6 col-xl-6">
                              Quality{" "}
                            </div>
                            <div className=" col-md-6 col-sm-6 col-6 col-xl-6 text-right">
                              {props.selectedProductionData.borderQualityLabelId
                                .label == null
                                ? "--"
                                : props.selectedProductionData
                                    .borderQualityLabelId.label}
                            </div>
                          </div>
                          <div className="col-md-12 col-sm-12 col-12 col-xl-12">
                            <div className=" col-md-6 col-sm-6 col-6 col-xl-6">
                              Size{" "}
                            </div>
                            <div className=" col-md-6 col-sm-6 col-6 col-xl-6 text-right">
                              {props.selectedProductionData.borderSizeLabelId
                                .label == null
                                ? "--"
                                : props.selectedProductionData.borderSizeLabelId
                                    .label}
                            </div>
                          </div>
                          <div className="col-md-12 col-md-12 col-sm-12 col-12 col-xl-12">
                            <div className=" col-md-6 col-sm-6 col-6 col-xl-6">
                              Program Number{" "}
                            </div>
                            <div className=" col-md-6 col-sm-6 col-6 col-xl-6 text-right">
                              {" "}
                              {props.selectedProductionData.programm_no ==
                                null ||
                              props.selectedProductionData.programm_no ==
                                undefined ||
                              props.selectedProductionData.programm_no == ""
                                ? "--"
                                : props.selectedProductionData.programm_no}
                            </div>
                          </div>
                        </div>{" "}
                      </div>
                      <div className=" col-md-6 col-sm-6 col-6 col-xl-6  col-md-6 col-sm-6 col-6 col-xl-6 col-sm-6 col-6 col-xl-6 px-5 text-customBlue mb-2  ">
                        <div className="row">
                          <div className="col-md-12 col-sm-12 col-12 col-xl-12 text-center   font-weight-600">
                            <div className="my-0 text-center perPieceDetailHeadingProductionReport">
                              Loom Detail
                            </div>
                          </div>
                          <div className="col-md-12 col-sm-12 col-12 col-xl-12">
                            <div className=" col-md-6 col-sm-6 col-6 col-xl-6">
                              Loom Number
                            </div>
                            <div className=" col-md-6 col-sm-6 col-6 col-xl-6 text-right">
                              {" "}
                              {props.selectedProductionData.loomLabelId
                                .label === null
                                ? "--"
                                : props.selectedProductionData.loomLabelId
                                    .label}
                            </div>
                          </div>
                          <div className="col-md-12 col-md-12 col-sm-12 col-12 col-xl-12">
                            <div className=" col-md-6 col-sm-6 col-6 col-xl-6">
                              Loom Size
                            </div>
                            <div className=" col-md-6 col-sm-6 col-6 col-xl-6 text-right">
                              {props.selectedProductionData.loomLabelId
                                .loomSize === null
                                ? "--"
                                : props.selectedProductionData.loomLabelId
                                    .loomSize}
                            </div>
                          </div>
                          <div className="col-md-12 col-sm-2 col-12 col-xl-12">
                            <div className=" col-md-6 col-sm-6 col-6 col-xl-6">
                              Jacquad
                            </div>
                            <div className=" col-md-6 col-sm-6 col-6 col-xl-6 text-right">
                              {" "}
                              {props.selectedProductionData.loomLabelId
                                .loomJacquard === null
                                ? "--"
                                : props.selectedProductionData.loomLabelId
                                    .loomJacquard}
                            </div>
                          </div>
                          <div className="col-md-12 col-sm-12 col-12 col-xl-12">
                            <div className=" col-md-6 col-sm-6 col-6 col-xl-6">
                              DrawBox
                            </div>
                            <div className=" col-md-6 col-sm-6 col-6 col-xl-6 text-right">
                              {" "}
                              {props.selectedProductionData.loomLabelId
                                .loomDrawBox === null
                                ? "--"
                                : props.selectedProductionData.loomLabelId
                                    .loomDrawBox}
                            </div>
                          </div>
                          <div className="col-md-12 col-sm-12 col-12 col-xl-12">
                            <div className=" col-md-6 col-sm-6 col-6 col-xl-6">
                              Piece in a Border{" "}
                            </div>
                            <div className=" col-md-6 col-sm-6 col-6 col-xl-6 text-right">
                              {props.selectedProductionData
                                .piece_in_one_border === null
                                ? "--"
                                : props.selectedProductionData
                                    .piece_in_one_border}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mx-3  reportTableHead">
                      <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1 right-border-1 px-0 my-auto">
                        <div className=" col-md-5 col-sm-5 col-5 col-xl-5 px-0 right-border-1 h-100 text-center font-size-12 ">
                          Sr
                        </div>
                        <div className=" col-md-7 col-sm-7 col-7 col-xl-7 px-0 text-center font-size-12">
                          Shift
                        </div>
                      </div>

                      <div className="col-md-4 col-md-4 col-sm-4 col-4 col-xl-4 px-0 my-auto">
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 right-border-1 h-100 my-1 font-size-12 text-center">
                          Weaver
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3   right-border-1 h-100  my-1 font-size-12 text-center">
                          No.Border
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3   right-border-1 h-100 my-1 font-size-12 text-center">
                          Total.Piece
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3   right-border-1 my-1 font-size-12 text-center">
                          B.G.Piece
                        </div>
                      </div>

                      <div className=" col-md-5 col-sm-5 col-5 col-xl-5 px-0">
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0  right-border-1 my-1 font-size-12  text-center">
                          A grade Pieces
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 right-border-1  my-1 font-size-12  text-center">
                          Rate/Border
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0  right-border-1  my-1 font-size-12  text-center">
                          Ex.Amount Desc
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0  right-border-1  my-1 font-size-12  text-center">
                          Ex. Amount
                        </div>
                      </div>

                      <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1  font-size-12   right-border-1  text-center  my-1">
                        Total
                      </div>
                      <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1    font-size-12  text-center  my-1  right-border-2">
                        Nativing
                      </div>
                    </div>
                    {props.selectedProductionData.shiftData.map(
                      (item, index) => {
                        return (
                          <>
                            <div className="row mx-3  reportTableBody bottom-border-2">
                              <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1 right-border-1 px-0">
                                <div className=" col-md-5 col-sm-5 col-5 col-xl-5 px-0 right-border-1 h-100 text-center font-size-12 right-border-2 py-1 h-100 left-border-2 d-flex justify-content-center align-items-center">
                                  {index + 1}
                                </div>
                                <div className=" col-md-7 col-sm-7 col-7 col-xl-7  text-center font-size-12 right-border-2 py-1 h-100  d-flex justify-content-center align-items-center">
                                  {item.shift_name.slice(6)}
                                </div>
                              </div>

                              <div className="col-md-4 col-md-4 col-sm-4 col-4 col-xl-4 px-0 py-auto">
                                <div className="col-md-4 col-md-4 col-sm-4 col-4 col-xl-4 right-border-2 h-100  py-1 font-size-12 text-center d-flex justify-content-center align-items-center">
                                  {item.weaver_EmployeeDNameId.label === null
                                    ? "--"
                                    : item.weaver_EmployeeDNameId.label}
                                </div>

                                <div className="col-md-2 col-md-2 col-sm-2 col-2 col-xl-2   right-border-2 h-100   py-1 font-size-12 text-center    d-flex justify-content-center align-items-center ">
                                  {item.no_of_border}
                                </div>
                                <div className=" col-md-3 col-sm-3 col-3 col-xl-3   right-border-2 h-100 py-1 font-size-12 text-center   d-flex justify-content-center align-items-center ">
                                  {item.total_pieces}
                                </div>
                                <div className=" col-md-3 col-sm-3 col-3 col-xl-3   right-border-2   py-1 font-size-12 text-center h-100   d-flex justify-content-center align-items-center ">
                                  {item.b_grade_piece}
                                </div>
                              </div>

                              <div className=" col-md-5 col-sm-5 col-5 col-xl-5 px-0">
                                <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0  right-border-2 h-100  py-1 font-size-12  text-center   d-flex justify-content-center align-items-center ">
                                  {item.a_grade_piece}
                                </div>
                                <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 right-border-2  h-100  py-1 font-size-12   d-flex justify-content-center align-items-center ">
                                  {(item.rate_per_border).toFixed(2)}
                                </div>
                                <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0  right-border-2 h-100  py-1 font-size-12  text-center   d-flex justify-content-center align-items-center ">
                                  {item.extra_des}
                                </div>
                                <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0  right-border-2  h-100  py-1 font-size-12  text-center   d-flex justify-content-center align-items-center ">
                                  {(item.extra_amt).toFixed(2)}
                                </div>
                              </div>

                              <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1  font-size-12     right-border-2  text-center py-1   d-flex justify-content-center align-items-center ">
                                {(item.total_amt).toFixed(2)}
                              </div>
                              <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
                                {item.natting_EmployeeNameId == null
                                  ? "--"
                                  : item.natting_EmployeeNameId.label}
                              </div>
                            </div>

                            <div className="row mx-3  reportTableBody bottom-border-2">
                              <div className="  col-md-12 col-sm-12 col-12 col-xl-12  font-size-12  left-border-2    right-border-2  text-center py-1   d-flex justify-content-start align-items-center ">
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
                      }
                    )}
                    <div className="px-4 mb-0 mt-3">
                      <div className="row mb-3 customPaddingForProductionReport bottom-border-2  top-border-2  py-1">
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 text-customBlue font-weight-600 py-0123">
                          Pile To Pile Length:
                          <span className="font-weight-500 ">
                            &nbsp;
                            {props.selectedProductionData.pile_to_pile_length}
                          </span>
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 text-customBlue  font-weight-600 py-0123">
                          Pile to Pile Width:
                          <span className="font-weight-500 ">
                            {" "}
                            &nbsp;
                            {props.selectedProductionData.pile_to_pile_width}
                          </span>
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3  text-customBlue font-weight-600  py-0123">
                          Cut Piece Size:
                          <span className="font-weight-500 ">
                            &nbsp;
                            {props.selectedProductionData.cut_piece_size}
                          </span>
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 text-customBlue  font-weight-600  py-0123">
                          {" "}
                          Cut Piece Weight:
                          <span className="font-weight-500 ">
                            &nbsp;
                            {props.selectedProductionData.cut_piece_weight}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 mb-1">
                      <div className="my-2 text-center perPieceDetailHeadingProductionReport">
                        Grand Total
                      </div>
                      <div className="row mb-3 customPaddingForProductionReport bottom-border-2  top-border-2  py-1">
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 text-customBlue font-weight-600 py-0123">
                          Border:&nbsp;
                          <span className="font-weight-500 ">
                            {props.selectedProductionData.total_border}
                          </span>
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 text-customBlue  font-weight-600 py-0123">
                          Pieces:&nbsp;
                          <span className="font-weight-500 ">
                            {props.selectedProductionData.total_pieces}
                          </span>
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3  text-customBlue font-weight-600 py-0123">
                          A Grade Pieces:&nbsp;
                          <span className="font-weight-500 ">
                            {props.selectedProductionData.a_grade_pieces}
                          </span>
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 text-customBlue  font-weight-600  py-0123">
                          {" "}
                          B Grade Pieces:&nbsp;
                          <span className="font-weight-500 ">
                            {props.selectedProductionData.b_grade_pieces}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="my-2 text-center perPieceDetailHeadingProductionReport">
                      Per Piece Detail
                    </div>
                    <div className="row mx-3  reportTableHead ">
                      <div className=" col-md-3 col-sm-3 col-3 col-xl-3 right-border-1 px-0 my-auto text-center py-1 ">
                        Label
                      </div>

                      <div className=" col-md-3 col-sm-3 col-3 col-xl-3  font-size-12   right-border-1  text-center  my-1  py-1">
                        Current
                      </div>
                      <div className=" col-md-3 col-sm-3 col-3 col-xl-3  font-size-12   right-border-1  text-center  my-1  py-1">
                        Required
                      </div>
                      <div className=" col-md-3 col-sm-3 col-3 col-xl-3    font-size-12  text-center  my-1  right-border-2  py-1">
                        Difference
                      </div>
                    </div>

                    <>
                      <div className="row mx-3  reportTableBody bottom-border-2">
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto left-border-2 right-border-2 bg-for-step-three-product-report   px-2 bottom-border-1 top-border-1 py-1">
                          Total Weight/Cut Piece
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto right-border-2  py-1  text-right px-2">
                          {" "}
                          {props.selectedProductionData.current_per_piece_a_weight.toFixed(
                            2
                          )}
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto right-border-2  py-1  text-right px-2">
                          {props.selectedProductionData.required_per_piece_a_weight.toFixed(
                            2
                          )}{" "}
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto right-border-2  py-1  text-right px-2">
                          {" "}
                          {(
                            props.selectedProductionData
                              .required_per_piece_a_weight -
                            props.selectedProductionData
                              .current_per_piece_a_weight
                          ).toFixed(2)}
                        </div>
                      </div>
                      <div className="row mx-3  reportTableBody bottom-border-2">
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto left-border-2 right-border-2 bg-for-step-three-product-report  bottom-border-1 px-2  py-1">
                          Length Pile to Pile
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto right-border-2  py-1  text-right px-2">
                          {props.selectedProductionData.pile_to_pile_length}
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto right-border-2  py-1  text-right px-2">
                          {props.selectedProductionData.required_length_p_to_p}
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto right-border-2  py-1  text-right px-2">
                          {props.selectedProductionData.required_length_p_to_p -
                            props.selectedProductionData
                              .pile_to_pile_length}{" "}
                        </div>
                      </div>
                      <div className="row mx-3  reportTableBody bottom-border-2">
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto left-border-2 right-border-2 bg-for-step-three-product-report bottom-border-1  px-2  py-1">
                          Width Pile to Pile
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto right-border-2  py-1  text-right px-2">
                          {props.selectedProductionData.pile_to_pile_width}
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto right-border-2  py-1  text-right px-2">
                          {props.selectedProductionData.required_width_p_to_p}
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto right-border-2  py-1  text-right px-2">
                          {props.selectedProductionData.required_width_p_to_p -
                            props.selectedProductionData
                              .pile_to_pile_width}{" "}
                        </div>
                      </div>
                      <div className="row mx-3  reportTableBody bottom-border-2 mb-4">
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto left-border-2 right-border-2 bg-for-step-three-product-report  px-2  py-1">
                          B Grade
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto right-border-2  py-1  text-right px-2">
                          {(
                            (props.selectedProductionData.b_grade_pieces *
                              100) /
                            props.selectedProductionData.a_grade_pieces
                          ).toFixed(3)}
                          %
                        </div>
                        <div className=" col-md-6 col-sm-6 col-6 col-xl-6 px-0 py-auto right-border-2  py-1  text-right px-2">
                          {" "}
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </>
          </Modal>
        </>
      )}
    </div>
  );
};

export default PreviewProductionReport;
