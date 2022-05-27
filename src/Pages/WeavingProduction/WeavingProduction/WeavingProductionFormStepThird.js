import React, { useState  , } from "react";
import Creatable from "react-select/creatable";
import Select from "react-select";

const customStyles = {
  // control: base => ({
  //   ...base,
  //   // This line disable the blue border

  // })
  control: (provided, state, base) => ({
    ...provided,
    background: "#fff",
    borderColor: "#d9e4e8",
    borderRadius: "none",
    minHeight: "30px",
    height: "30px",
    border: "none",
    // boxShadow: state.isFocused ? null : null,
    ...base,
    boxShadow: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px  #003a4d",
    color: state.isSelected ? "#f79c74" : "#003a4d",
    background: "#fff",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: "30px",
    padding: "0 6px",
    // background: '#fff',
  }),

  input: (provided, state) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "30px",
  }),
};
const WeavingProductionFormStepThird = ({
  finalStepRequired, grandFinalTotal
}) => {

  // const [reRenderedState, setreRenderedState] = useState(false)
  const [finalStepInput, setfinalStepInput] = useState({
    pileToPileLength: "",
    pileToPileWidth: "",
    cutPieceSize: "",
    cutPieceWeight: "",
    remarks: ""
  });

  // const [finalStepDifference, setFinalStepDifference] = useState({
  //   totalWeightCutPiece: "", pileToPileWidth: "", pileToPileLength: "", bGradePercentage: ""

  // })

  // const differenceFinder = () => {
  //   setFinalStepDifference({

  //     totalWeightCutPiece: finalStepRequired.requirePerPieceWeight * parseInt(grandFinalTotal.totalAGrade) - 0  , //here zero will be replace with current value of input /cuurent     
  //     pileToPileWidth: finalStepInput.pileToPileWidth   ,   
  //     pileToPileLength: finalStepRequired.requireLengthpp - finalStepInput.pileToPileLength  ,    
  //     bGradePercentage: "2%"
  //   })
  //   setreRenderedState(!reRenderedState)
  // }
 
  

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
                    className="form-control"
                    name="name"
                    type="number"
                    value={finalStepInput.pileToPileLength}
                    onChange={(e) => {
                      setfinalStepInput({ ...finalStepInput, pileToPileLength: parseInt(e.target.value) })
                      // differenceFinder()
                    }}
                    placeholder="Define By User"
                  />
                </div>
              </div>

              <div className="field item form-group">
                <label className="col-form-label col-md-5 col-sm-5  label-align">
                  Pile To Pile width<span className="required">*</span>
                </label>
                <div className="col-md-7 col-sm-7">
                  <input
                    className="form-control"
                    type="number"
                    value={finalStepInput.pileToPileWidth}
                    onChange={(e) => {
                      setfinalStepInput({ ...finalStepInput, pileToPileWidth: parseInt(e.target.value) })
                      // differenceFinder()
                    }}
                    placeholder="ex. 45/67  "
                  />
                </div>
              </div>

              <div className="field item form-group">
                <label className="col-form-label col-md-5 col-sm-5  label-align">
                  Cut Piece Size<span className="required">*</span>
                </label>
                <div className="col-md-7 col-sm-7">
                  <input
                    className="form-control"
                    type="number"
                    name="name"
                    placeholder="ex. 45/67  "
                    value={finalStepInput.cutPieceSize}
                    onChange={(e) => {
                      setfinalStepInput({ ...finalStepInput, cutPieceSize: parseInt(e.target.value) })
                      // differenceFinder()
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
                    className="form-control"
                    type="number"
                    name="name"
                    placeholder="ex. 45/67  "
                    value={finalStepInput.cutPieceWeight}
                    onChange={(e) => {
                      setfinalStepInput({ ...finalStepInput, cutPieceWeight: parseInt(e.target.value) })
                      // differenceFinder()
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
                          <div className="col-md-12 pb-2">Per Piece Detail</div>
                        </div>
                        <div className="row">
                          <div className="col-md-3">Label</div>
                          <div className="col-md-3">Current</div>
                          <div className="col-md-3">Requried</div>
                          <div className="col-md-3">Difference</div>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="even pointer">
                      <td className="p-0">
                        <div className="col-md-3 customPaddingForTableInWPFStepThree colorManagement text-left"  >Total Weight - Cut Piece</div>
                        <div className="col-md-3 customPaddingForTableInWPFStepThree text-right">
                          
{

grandFinalTotal.totalPiece * finalStepRequired.requirePerPieceWeight

}

                        </div>
                        <div className="col-md-3 customPaddingForTableInWPFStepThree  text-right">
                          {finalStepRequired.requirePerPieceWeight * parseInt(grandFinalTotal.totalAGrade)} </div>
                        <div className="col-md-3 customPaddingForTableInWPFStepThree text-right">
                          {/* {finalStepDifference.totalWeightCutPiece} */}
                          {
                          
                          grandFinalTotal.totalPiece * finalStepRequired.requirePerPieceWeight - 
                          
                          finalStepRequired.requirePerPieceWeight * parseInt(grandFinalTotal.totalAGrade) }

                        </div>
                      </td>
                    </tr>
                    <tr className="even pointer">
                      <td className="p-0">
                        <div className="col-md-3 customPaddingForTableInWPFStepThree colorManagement text-left"  >Length Pile to Pile</div>
                        <div className="col-md-3 customPaddingForTableInWPFStepThree text-right" >
                          {finalStepInput.pileToPileLength}

                        </div>
                        <div className="col-md-3 customPaddingForTableInWPFStepThree text-right">
                          {finalStepRequired.requireLengthpp}</div>
                        <div className="col-md-3 customPaddingForTableInWPFStepThree text-right">
                          {/* {finalStepDifference.pileToPileLength} */}
                          { finalStepRequired.requireLengthpp-   finalStepInput.pileToPileLength}
                       
                        </div>
                      </td>
                    </tr>
                    <tr className="even pointer">
                      <td className="p-0">
                        <div className="col-md-3 customPaddingForTableInWPFStepThree  text-left colorManagement"  >Width Pile to Pile</div>
                        <div className="col-md-3 customPaddingForTableInWPFStepThree text-right">
                          {finalStepInput.pileToPileWidth}
                        </div>
                        <div className="col-md-3 customPaddingForTableInWPFStepThree text-right">
                          {finalStepRequired.requireWidthpp}
                        </div>
                        <div className="col-md-3 customPaddingForTableInWPFStepThree text-right">
                          {/* {finalStepDifference.pileToPileWidth} */}
                          { finalStepRequired.requireWidthpp -finalStepInput.pileToPileWidth}
                        </div>
                      </td>
                    </tr>
                    <tr className="even pointer">
                      <td className="p-0">
                        <div className="col-md-3 customPaddingForTableInWPFStepThree colorManagement text-left"  >B Grade %</div>
                        <div className="col-md-3 customPaddingForTableInWPFStepThree text-right"> {((grandFinalTotal.totalBGrade * 100) / grandFinalTotal.totalAGrade ).toFixed(10)}%</div>
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
          {/* <label htmlFor="message" className="pl-2">Message (20 chars min, 100 max) :</label> */}
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
