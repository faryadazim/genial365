import React, { useState, } from "react";
import { preventMinus } from "../../../config/oreventMinus";


const WeavingProductionFormStepThird = ({
  finalStepRequired, grandFinalTotal,rollDetail,
  finalStepInput, setfinalStepInput ,stepThirdValidator
}) => {

  return (
    <>
      <div className="row">
        <div className="col-md-5  m-auto  pl-5">
          <div className="x_content">
            <form>
              <div className="field item form-group">
                <label className="col-form-label col-md-5 col-sm-5  label-align">
                  Pile To Pile Length <span className="required">*</span>
                </label>
                <div className="col-md-7 col-sm-7">
                  <input
                    className={stepThirdValidator.pileToPileLengthValidate?"form-control":"form-control requiredValidateInput"}
                    name="name"
                    type="number"
                    onKeyPress={(e) => preventMinus(e)}
                    min="0"
                    value={finalStepInput.pileToPileLength}
                    onChange={(e) => {
                      setfinalStepInput({ ...finalStepInput, pileToPileLength: parseInt(e.target.value) })
                    }}
                    placeholder="Unit (Length)"
                  />
                </div>
              </div>

              <div className="field item form-group">
                <label className="col-form-label col-md-5 col-sm-5  label-align">
                  Pile To Pile width<span className="required">*</span>
                </label>
                <div className="col-md-7 col-sm-7">
                  <input
                       className={stepThirdValidator.pileToPileWidthValidate?"form-control":"form-control requiredValidateInput"}
                       type="number"
                       onKeyPress={(e) => preventMinus(e)}
                       min="0"
                    value={finalStepInput.pileToPileWidth}
                    onChange={(e) => {
                      setfinalStepInput({ ...finalStepInput, pileToPileWidth: parseInt(e.target.value) })
                    }}
                    placeholder="Unit (Width) "
                  />
                </div>
              </div>

              <div className="field item form-group">
                <label className="col-form-label col-md-5 col-sm-5  label-align">
                  Cut Piece Size<span className="required">*</span>
                </label>
                <div className="col-md-7 col-sm-7">
                  <input
               className={stepThirdValidator.cutPieceSizeValidate?"form-control":"form-control requiredValidateInput"}
                    type="number"
                    name="name"
                    placeholder="Unit (Size)"
                    onKeyPress={(e) => preventMinus(e)}
                    min="0"
                    value={finalStepInput.cutPieceSize   }
                    onChange={(e) => {
                      setfinalStepInput({ ...finalStepInput, cutPieceSize: parseFloat(e.target.value) })
                    }}
                  />
                </div>
              </div>

              <div className="field item form-group">
                <label className="col-form-label col-md-5 col-sm-5  label-align">
                  Cut Piece Weight<span className="required">*</span>
                </label>
                <div className="col-md-7 col-sm-7">
                  <input
               className={stepThirdValidator.cutPieceWeightValidate?"form-control":"form-control requiredValidateInput"}
                   
                    type="number"
                    name="name"
                    onKeyPress={(e) => preventMinus(e)}
                    min="0"
                    placeholder="Unit (KG)"
                    value={finalStepInput.cutPieceWeight  }
                    onChange={(e) => {
                      setfinalStepInput({ ...finalStepInput, cutPieceWeight: parseFloat(e.target.value) })
                    }}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-7 pr-5">
          <div className="x_panel ">
            <div className="x_content">
              <div className="table-responsive">
                <table className="table table-striped jambo_table bulk_action">
                  <thead>
                    <tr className="headings">
                      <th className="column-title">
                        <div className="row mb-2 borderBottomForTableHeader">
                          <div className="col-md-12 pb-2"  style={{fontWeight:"400"}}>Per Piece Detail</div>
                        </div>
                        <div className="row">
                          <div className="col-md-3"  style={{fontWeight:"400"}}>Label</div>
                          <div className="col-md-3"  style={{fontWeight:"400"}}>Current</div>
                          <div className="col-md-3"  style={{fontWeight:"400"}}>Requried</div>
                          <div className="col-md-3"  style={{fontWeight:"400"}}>Difference</div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="even pointer">
                      <td className="p-0">
                        <div className="col-md-3 customPaddingForTableInWPFStepThree main_container text-light text-left"  >Total Weight - Cut Piece</div>
                        <div className="col-md-3 customPaddingForTableInWPFStepThree text-right">
     
        {((rollDetail.rollWeight - (finalStepInput.cutPieceWeight) )/grandFinalTotal.totalPiece).toFixed(3)}               {/* {grandFinalTotal.totalPiece * finalStepRequired.requirePerPieceWeight}   */}
                       
                        </div>
                        <div className="col-md-3 customPaddingForTableInWPFStepThree  text-right">
                {finalStepRequired.requirePerPieceWeight } </div>
                        <div className="col-md-3 customPaddingForTableInWPFStepThree text-right">
                        {(finalStepRequired.requirePerPieceWeight-((rollDetail.rollWeight - (finalStepInput.cutPieceWeight) )/grandFinalTotal.totalPiece) ).toFixed(3)}                {/* {grandFinalTotal.totalPiece * finalStepRequired.requirePerPieceWeight}   */}
                       
                   
                        </div>
                      </td>
                    </tr>
                    <tr className="even pointer">
                      <td className="p-0">
                        <div className="col-md-3 customPaddingForTableInWPFStepThree  main_container text-light text-left"  >Length Pile to Pile</div>
                        <div className="col-md-3 customPaddingForTableInWPFStepThree text-right" >
                          {finalStepInput.pileToPileLength}

                        </div>
                        <div className="col-md-3 customPaddingForTableInWPFStepThree text-right">
                          {finalStepRequired.requireLengthpp}</div>
                        <div className="col-md-3 customPaddingForTableInWPFStepThree text-right">
                          {finalStepRequired.requireLengthpp - finalStepInput.pileToPileLength}

                        </div>
                      </td>
                    </tr>
                    <tr className="even pointer">
                      <td className="p-0">
                        <div className="col-md-3 customPaddingForTableInWPFStepThree  text-left    main_container text-light"  >Width Pile to Pile</div>
                        <div className="col-md-3 customPaddingForTableInWPFStepThree text-right">
                          {finalStepInput.pileToPileWidth}
                        </div>
                        <div className="col-md-3 customPaddingForTableInWPFStepThree text-right">
                          {finalStepRequired.requireWidthpp}
                        </div>
                        <div className="col-md-3 customPaddingForTableInWPFStepThree text-right">
                          {finalStepRequired.requireWidthpp - finalStepInput.pileToPileWidth}
                        </div>
                      </td>
                    </tr>
                    <tr className="even pointer">
                      <td className="p-0">
                        <div className="col-md-3 customPaddingForTableInWPFStepThree   text-left  main_container text-light"  >B Grade %</div>
                        <div className="col-md-3 customPaddingForTableInWPFStepThree text-right"> {((grandFinalTotal.totalBGrade * 100) / grandFinalTotal.totalAGrade).toFixed(3)}%</div>
                        <div className="col-md-3 customPaddingForTableInWPFStepThree text-right">     </div>
                        <div className="col-md-3 customPaddingForTableInWPFStepThree">
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row  customPaddingForRemarks my-1 pt-2">
        <div className="w-100 text-left ">
          <textarea
            id="message"
            required="required"
            className="form-control px-2"
            style={{ height: "100px", fontSize: "15px", fontWeight: "500" }}
            name="message"
            data-parsley-trigger="keyup"
            data-parsley-minlength={20}
            data-parsley-maxlength={100}
            data-parsley-minlength-message="Come on! You need to enter at least a 20 caracters long comment.."
            data-parsley-validation-threshold={100}
            defaultValue={""}
            value={finalStepInput.remarks}
            onChange={(e) => setfinalStepInput({ ...finalStepInput, remarks: e.target.value })}
            placeholder="Remarks"
          />
        </div>
      </div>
    </>
  );
};

export default WeavingProductionFormStepThird;
