import React, { useState } from "react";
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
const WeavingProductionFormStepThird = () => {
    const [perPieceDetails, setperPieceDetails] = useState({
        pileToPileLength:"" ,  pileToPileWidth:"" ,  cutPieceSize:"" ,  cutPieceWeight:"" , 
})
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
                    value={perPieceDetails.pileToPileLength}
                    onChange={(e)=>setperPieceDetails({...perPieceDetails ,pileToPileLength:e.target.value })}
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
                    name="name"    value={perPieceDetails.pileToPileWidth}
                    onChange={(e)=>setperPieceDetails({...perPieceDetails ,pileToPileWidth:e.target.value })}
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
                    value={perPieceDetails.cutPieceSize}
                    onChange={(e)=>setperPieceDetails({...perPieceDetails ,cutPieceSize:e.target.value })}
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
                    value={perPieceDetails.cutPieceWeight}
                    onChange={(e)=>setperPieceDetails({...perPieceDetails ,cutPieceWeight:e.target.value })}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-7">
          <div className="x_panel ">
            <div className="x_content">
              <div className="table-responsive">
                <table className="table table-striped jambo_table bulk_action">
                  <thead>
                    <tr className="headings">
                      <th className="column-title">
                        <div className="row mb-2 borderBottomForTableHeader">
                          <div className="col-md-12 pb-2">Per PieceDetail</div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">Current</div>
                          <div className="col-md-4">Reuried</div>
                          <div className="col-md-4">Difference</div>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="even pointer">
                      <td>
                        <div className="col-md-4">Total Weight-Cut Piece</div>
                        <div className="col-md-4">Define By PC</div>
                        <div className="col-md-4">Auto</div>
                      </td>
                    </tr>
                    <tr className="even pointer">
                      <td>
                        <div className="col-md-4">Length Pile to Pile</div>
                        <div className="col-md-4">{perPieceDetails.pileToPileLength}</div>
                        <div className="col-md-4">Auto</div>
                      </td>
                    </tr>
                    <tr className="even pointer">
                      <td>
                        <div className="col-md-4">Width Pile to Pile</div>
                        <div className="col-md-4">{perPieceDetails.pileToPileWidth}</div>
                        <div className="col-md-4">Auto</div>
                      </td>
                    </tr>
                    <tr className="even pointer">
                      <td>
                        <div className="col-md-4">B Grade %</div>
                        <div className="col-md-4">Null</div>
                        <div className="col-md-4">--</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row  customPaddingForRemarks my-1">
        <div className="w-100 text-left ">
          {/* <label htmlFor="message" className="pl-2">Message (20 chars min, 100 max) :</label> */}
          <textarea
            id="message"
            required="required"
            className="form-control px-2"
            style={{height:"100px" , fontSize:"15px" , fontWeight:"500"}}
            name="message"
            data-parsley-trigger="keyup"
            data-parsley-minlength={20}
            data-parsley-maxlength={100}
            data-parsley-minlength-message="Come on! You need to enter at least a 20 caracters long comment.."
            data-parsley-validation-threshold={100}
            defaultValue={""}
            placeholder="Remarks"
          />
        </div>
      </div>
    </>
  );
};

export default WeavingProductionFormStepThird;
