import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./LittleLoader.css";

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
    fontSize: "11px",
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

const WeavingProductionFormStepOne = ({
  isLoading , loomDetail ,rollDetail ,FetchListSelector , updateNumbOfPieceInBorderFunc,
  loomDetailsUpdate,setrollDetail , loomListOptions ,setLoomDetailsUpdate,
  updateLoomDetails ,borderQualityOptions ,  setUpdateNumberOfPieceOneBorderInput ,
  updateNumberOfPieceOneBorderInput ,borderSizeOptions
}) => {
  // const url = localStorage.getItem("authUser");
  // var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
  // var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
  // var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
  // const dateToday = `${year}-${month}-${day}`;
  // const [isLoading, setisLoading] = useState(true);
  //state that will further modified and used in loomTable
  // const [allLoomLists, setAllLoomLists] = useState([]);
  //state for DropDownSearchableSelector
  // const [loomListOptions, setLoomListOptions] = useState([]);
  // const [borderQualityOptions, setBorderQualityOptions] = useState([]);
  // const [borderSizeOptions, setBorderSizeOptions] = useState([]);
  // // state to store form data in database
  // const [rollDetail, setrollDetail] = useState({
  //   rollNo: "",
  //   date: dateToday,
  //   rollWeight: "",
  //   loomNumber: "",
  //   Quality: "",
  //   Size: "",
  //   programNumber: "",
  // });

  // const [loomDetailsUpdate, setLoomDetailsUpdate] = useState(false);

  // // state to show data in loom detail table
  // const [loomDetail, setLoomDetail] = useState({
  //   loomSize: "Auto Define",
  //   jacquard: "Auto Define",
  //   drawBox: "Auto Define",
  //   NumOfPieceOneBorder: "Auto Define",
  // });
  // //  state for update Function Number of Border in Loom Detail table
  // const [
  //   updateNumberOfPieceOneBorderInput,
  //   setUpdateNumberOfPieceOneBorderInput,
  // ] = useState({ QualityId: "", BorderSizeId: "", LoomSize: "" });

  // const FetchListSelector = () => {
  //   // Fetching loom list number
  //   fetch(url + "api/LoomListsCore", {
  //     method: "GET",
  //     headers: {
  //       // Authorization: "bearer" + " " + e,
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setAllLoomLists(data);
  //       var arrForLoom = [];
  //       data.map((item) => {
  //         arrForLoom.push({
  //           label: item.loomNumber,
  //           value: item.loom_id,
  //         });
  //       });

  //       setLoomListOptions(arrForLoom);
  //     });
  //   // fetching BorderSize

  //   fetch(url + "api/BorderQuality", {
  //     method: "GET",
  //     headers: {
  //       // Authorization: "bearer" + " " + e,
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       var arrForBorderQuality = [];
  //       data.map((item) => {
  //         arrForBorderQuality.push({
  //           label: item.borderQuality1,
  //           value: item.borderQuality_id,
  //         });
  //       });

  //       setBorderQualityOptions(arrForBorderQuality);
  //     });
  //   fetch(url + "api/BorderSizes", {
  //     method: "GET",
  //     headers: {
  //       // Authorization: "bearer" + " " + e,
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       var arrForBorderSize = [];
  //       data.map((item) => {
  //         arrForBorderSize.push({
  //           label: item.borderSize1,
  //           value: item.borderSize_id,
  //         });
  //       });
  //       console.log("done fetch apisfsdfsdfdsfsdf");
  //       setBorderSizeOptions(arrForBorderSize);
  //       setisLoading(false);
  //     });
  // };
  // const updateLoomDetails = (loomNumber) => {
  //   var loomFinder = allLoomLists.filter((eachLoom) => {
  //     return eachLoom.loom_id == loomNumber;
  //   });
  //   const selectedLoom = loomFinder[0];

  //   setLoomDetail({
  //     ...loomDetail,
  //     loomSize: selectedLoom.loomSize,
  //     jacquard: selectedLoom.jacquard,
  //     drawBox: selectedLoom.drawBox,
  //   });
  //   setUpdateNumberOfPieceOneBorderInput({
  //     ...updateNumberOfPieceOneBorderInput,
  //     LoomSize: selectedLoom.loomSize,
  //   });
  // };
  // const updateNumbOfPieceInBorderFunc = (QualityId, BorderSizeId, LoomSize) => {
  //   if (
  //     updateNumberOfPieceOneBorderInput.BorderSizeId == "" ||
  //     updateNumberOfPieceOneBorderInput.QualityId == "" ||
  //     updateNumberOfPieceOneBorderInput.LoomSize == ""
  //   ) {
  //     console.log(
  //       "unable to fetch rate of border due to unavailability of required credientials"
  //     );
  //   } else { 
  //     fetch(
  //       `${url}api/loomDetailWPF?LoomSize=${updateNumberOfPieceOneBorderInput.LoomSize}&BorderSizeId=${updateNumberOfPieceOneBorderInput.BorderSizeId}&BorderQualityId=${updateNumberOfPieceOneBorderInput.QualityId}`,
  //       {
  //         method: "GET",
  //         // headers: {
  //         //   Authorization:
  //         //     JSON.parse(localStorage.getItem("authUser")).token_type +
  //         //     " " +
  //         //     JSON.parse(localStorage.getItem("authUser")).access_token,
  //         //   "Content-Type": "application/x-www-form-urlencoded",
  //         // },
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((noOfPieceInOneBorder) => {
  //         console.log(noOfPieceInOneBorder);
  //         if (
  //           noOfPieceInOneBorder == null ||
  //           noOfPieceInOneBorder == "" ||
  //           noOfPieceInOneBorder == undefined
  //         ) {
  //           console.log("not available");
  //           setLoomDetail({ ...loomDetail, NumOfPieceOneBorder: "--" });
  //         } else {
  //           setLoomDetail({
  //             ...loomDetail,
  //             NumOfPieceOneBorder: noOfPieceInOneBorder.noOfPieceInOneBorder,
  //           });
  //         }
  //       })
  //       .catch((error) => console.log("error", error));
  //   }
  // };
  useEffect(() => {
    FetchListSelector();
    console.log(rollDetail);
    
  }, []);

  useEffect(() => {
    updateNumbOfPieceInBorderFunc();
  }, [loomDetailsUpdate]);

  // useEffect(() => {
  //   updateNumbOfPieceInBorderFunc();
  // }, [updateNumberOfPieceOneBorderInput]);

  return (
    <>
      {isLoading ? (
        <div>
          <div class="lds-dual-ring "></div>
        </div>
      ) : (
        <>
          <div className="row my-2">
            <div className="col-md-6 text-left">
              <div className="x_content">
                <form>
                  <div className="field item form-group">
                    <label className="col-form-label col-md-4 col-sm-4  label-align">
                      Roll Number <span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6">
                      <input
                        className="form-control"
                        name="name"
                        type="number"
                        placeholder="ex. 45/67  "
                        value={rollDetail.rollNo}
                        onChange={(e) =>
                          setrollDetail({
                            ...rollDetail,
                            rollNo: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="field item form-group">
                    <label className="col-form-label col-md-4 col-sm-4  label-align">
                      Date <span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6">
                      <input
                        className="form-control"
                        type="date"
                        value={rollDetail.date}
                        onChange={(e) => {
                          setrollDetail({
                            ...rollDetail,
                            date: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="field item form-group">
                    <label className="col-form-label col-md-4 col-sm-4  label-align">
                      Roll Weight/KG<span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6">
                      <input
                        className="form-control"
                        name="name"
                        placeholder="ex. 45/67  "
                        value={rollDetail.rollWeight}
                        onChange={(e) =>
                          setrollDetail({
                            ...rollDetail,
                            rollWeight: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="field item form-group">
                    <label className="col-form-label col-md-4 col-sm-4  label-align">
                      Loom Number<span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6">
                      <Select
                        required
                        className="basic-single"
                        classNamePrefix="select"
                        // value={itemNameValue.value}
                        // onChange={(value) => {
                        //   props.setAddNewProduct({
                        //     ...props.AddNewProduct,
                        //     itemName: value.value,
                        //   });
                        // }}
                        isSearchable={true}
                        name="color"
                        options={loomListOptions}
                        styles={customStyles}
                        onChange={(e) => {
                          setrollDetail({ ...rollDetail, loomNumber: e.value });
                          setLoomDetailsUpdate(!loomDetailsUpdate)
                          updateLoomDetails(e.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="field item form-group">
                    <label className="col-form-label col-md-4 col-sm-4  label-align">
                      Quality (Border){" "}
                    </label>
                    <div className="col-md-6 col-sm-6">
                      <Select
                        required
                        className="basic-single"
                        classNamePrefix="select"
                        // value={itemNameValue.value}
                        // onChange={(value) => {
                        //   props.setAddNewProduct({
                        //     ...props.AddNewProduct,
                        //     itemName: value.value,
                        //   });
                        // }}
                        isSearchable={true}
                        name="color"
                        options={borderQualityOptions}
                        styles={customStyles}
                        onChange={(e) => {
                          setrollDetail({ ...rollDetail, Quality: e.value });
                          setLoomDetailsUpdate(!loomDetailsUpdate)
                          setUpdateNumberOfPieceOneBorderInput({
                            ...updateNumberOfPieceOneBorderInput,
                            QualityId: e.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="field item form-group">
                    <label className="col-form-label col-md-4 col-sm-4  label-align">
                      Border Size<span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6">
                      <Select
                        required
                        className="basic-single"
                        classNamePrefix="select"
                        // value={itemNameValue.value}
                        // onChange={(value) => {
                        //   props.setAddNewProduct({
                        //     ...props.AddNewProduct,
                        //     itemName: value.value,
                        //   });
                        // }}
                        isSearchable={true}
                        name="color"
                        options={borderSizeOptions}
                        styles={customStyles}
                        onChange={(e) => {
                          setrollDetail({ ...rollDetail, Size: e.value });
                          setLoomDetailsUpdate(!loomDetailsUpdate)
                          setUpdateNumberOfPieceOneBorderInput({
                            ...updateNumberOfPieceOneBorderInput,
                            BorderSizeId: e.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="field item form-group">
                    <label className="col-form-label col-md-4 col-sm-4  label-align">
                      Program Number<span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6">
                      <input
                        className="form-control"
                        type="number"
                        name="name"
                        placeholder="ex. 45/67  "
                        value={rollDetail.programNumber}
                        onChange={(e) =>
                          setrollDetail({
                            ...rollDetail,
                            programNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6   ">
              <div className="x_panel mt-4">
                <div className="x_content">
                  <div className="table-responsive">
                    <table className="table table-striped jambo_table bulk_action">
                      <thead>
                        <tr className="headings">
                          <th className="column-title" colspan="2">
                            {" "}
                            Loom Details{" "}
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr className="even pointer">
                          <td className=" "> Loom Size </td>
                          <td className=" ">{loomDetail.loomSize}</td>
                        </tr>
                        <tr className="even pointer">
                          <td className=" ">Jacquard </td>
                          <td className=" ">{loomDetail.jacquard}</td>
                        </tr>
                        <tr className="even pointer">
                          <td className=" ">Draw Box </td>
                          <td className=" ">{loomDetail.drawBox}</td>
                        </tr>
                        <tr className="even pointer">
                          <td className=" ">Number of Piece In Border</td>
                          <td className=" ">
                            {loomDetail.NumOfPieceOneBorder}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* <button
                  className="btn btn-success btn-sm"
                  onClick={() => {
                    console.log(rollDetail);
                  }}
                >
                  sjow
                </button> */}
          </div>
        </>
      )}
    </>
  );
};

export default WeavingProductionFormStepOne;
