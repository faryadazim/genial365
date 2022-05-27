import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import WeavingProductionFormStepOne from "./WeavingProductionFormStepOne";
import WeavingProductionFormStepThird from "./WeavingProductionFormStepThird";
import WeavingProductionFormStepTwo from "./WeavingProductionFormStepTwo";
const WeavingProductionForm = () => {
  const url = localStorage.getItem("authUser"); 
  // Parent Personal State 
  const showNavMenu = useSelector((state) => state.NavState);
  const [firstStep, setFirstStep] = useState("active");
  const [secondStep, setSecondStep] = useState("disable");
  const [thirdStep, setThirdStep] = useState("disable");

  const onclickOnSecondStep = () => {
    if (secondStep == "disable") {
      console.log("cannot move ");
    } else if (thirdStep == "disable") {
      setFirstStep("done");
      setSecondStep("active");
    } else {
      setSecondStep("active");
      setFirstStep("done");
      setThirdStep("done");
    }
  };
  const onclickOnFirstStep = () => {
    if (secondStep !== "disable") {
      setFirstStep("active");
      setSecondStep("done");
    } else if (thirdStep !== "disable") {
      setFirstStep("active");
      setSecondStep("done");
      setThirdStep("done");
    } else {
      setFirstStep("active");
      setSecondStep("done");
      setThirdStep("done");
    }
  };
  // Step One State  ------------------------    One   --------------

  var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
  var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
  var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
  const dateToday = `${year}-${month}-${day}`;
  const [isLoading, setisLoading] = useState(true);
  const [allLoomLists, setAllLoomLists] = useState([]);
  //state for DropDownSearchableSelector
  const [loomListOptions, setLoomListOptions] = useState([]);
  const [borderQualityOptions, setBorderQualityOptions] = useState([]);
  const [borderSizeOptions, setBorderSizeOptions] = useState([]);
  // state to store form data in database
  const [rollDetail, setrollDetail] = useState({
    // rollNo: "",
    date: dateToday,
    rollWeight: "",
    loomNumber: "",
    Quality: "",
    Size: "",
    programNumber: "",
  });
  const [loomDetailsUpdate, setLoomDetailsUpdate] = useState(false);
  // state to show data in loom detail table
  const [loomDetail, setLoomDetail] = useState({
    loomSize: "Auto Define",
    jacquard: "Auto Define",
    drawBox: "Auto Define",
    NumOfPieceOneBorder: "Auto Define",
  });
  //  state for update Function Number of Border in Loom Detail table
  const [
    updateNumberOfPieceOneBorderInput,
    setUpdateNumberOfPieceOneBorderInput,
  ] = useState({ QualityId: "", BorderSizeId: "", LoomSize: "" });
  // Function of First Step 
  const FetchListSelector = () => {
    // Fetching loom list number
    // Step One Dropdown List fetching from api/backend 
    fetch(url + "api/LoomListsCore", {
      method: "GET",
      headers: {
        // Authorization: "bearer" + " " + e,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllLoomLists(data);
        var arrForLoom = [];
        data.map((item) => {
          arrForLoom.push({
            label: item.loomNumber,
            value: item.loom_id,
          });
        });

        setLoomListOptions(arrForLoom);
      });
    // fetching BorderSize

    fetch(url + "api/BorderQuality", {
      method: "GET",
      headers: {
        // Authorization: "bearer" + " " + e,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        var arrForBorderQuality = [];
        data.map((item) => {
          arrForBorderQuality.push({
            label: item.borderQuality1,
            value: item.borderQuality_id,
          });
        });

        setBorderQualityOptions(arrForBorderQuality);
      });
    fetch(url + "api/BorderSizes", {
      method: "GET",
      headers: {
        // Authorization: "bearer" + " " + e,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        var arrForBorderSize = [];
        data.map((item) => {
          arrForBorderSize.push({
            label: item.borderSize1,
            value: item.borderSize_id,
          });
        });
        console.log("done fetch apisfsdfsdfdsfsdf");
        setBorderSizeOptions(arrForBorderSize);

      });

    // Step Two Dropdown List fetching from api/backend 
    fetch(url + "api/employeeWeaverListWithName", {
      method: "GET",
      headers: {
        // Authorization: "bearer" + " " + e,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        var arrForWeaverEmployee = [];
        data.map((item) => {
          arrForWeaverEmployee.push({
            value: item.employeeId,
            label: item.employeeName,
          });
        });
        console.log("done fetch apisfsdfsdfdsfsdf");
        setWeaverEmployeeOptions(arrForWeaverEmployee);

      });
    fetch(url + "api/employeeNativingListWithName", {
      method: "GET",
      headers: {
        // Authorization: "bearer" + " " + e,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        var arrForNativingEmployee = [];
        data.map((item) => {
          arrForNativingEmployee.push({
            value: item.employeeId,
            label: item.employeeName,
          });
        });
        console.log("done fetch apisfsdfsdfdsfsdf");
        setNativingEmployeeOptions(arrForNativingEmployee);
        setisLoading(false);
      });

  };
  const updateLoomDetails = (loomNumber) => {
    var loomFinder = allLoomLists.filter((eachLoom) => {
      return eachLoom.loom_id == loomNumber;
    });
    const selectedLoom = loomFinder[0];

    setLoomDetail({
      ...loomDetail,
      loomSize: selectedLoom.loomSize,
      jacquard: selectedLoom.jacquard,
      drawBox: selectedLoom.drawBox,
    });
    setUpdateNumberOfPieceOneBorderInput({
      ...updateNumberOfPieceOneBorderInput,
      LoomSize: selectedLoom.loomSize,
    });



  };
  const updateNumbOfPieceInBorderFunc = (QualityId, BorderSizeId, LoomSize) => {
    if (
      updateNumberOfPieceOneBorderInput.BorderSizeId == "" ||
      updateNumberOfPieceOneBorderInput.QualityId == "" ||
      updateNumberOfPieceOneBorderInput.LoomSize == ""
    ) {
      console.log(
        "unable to fetch rate of border due to unavailability of required credientials"
      );
    } else {
      fetch(
        `${url}api/loomDetailWPF?LoomSize=${updateNumberOfPieceOneBorderInput.LoomSize}&BorderSizeId=${updateNumberOfPieceOneBorderInput.BorderSizeId}&BorderQualityId=${updateNumberOfPieceOneBorderInput.QualityId}`,
        {
          method: "GET",
          // headers: {
          //   Authorization:
          //     JSON.parse(localStorage.getItem("authUser")).token_type +
          //     " " +
          //     JSON.parse(localStorage.getItem("authUser")).access_token,
          //   "Content-Type": "application/x-www-form-urlencoded",
          // },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);

          if (
            result == null ||
            result == "" ||
            result == undefined
          ) {
            console.log("not available");
            setLoomDetail({ ...loomDetail, NumOfPieceOneBorder: "--" });
          } else {
            setLoomDetail({
              ...loomDetail,
              NumOfPieceOneBorder: result.noOfPieceInOneBorder,
            });
            console.log(result, "its for testing in wpf");
            console.log("number odf pieceec dup akisdfaf", loomDetail);
            if (loomDetail.drawBox == "Yes") {
              setratePerBorderTempState(result.rateDrawBox)


              // setting required value of config table for step3
              setfinalStepRequired({
                requireLengthpp: parseInt(result.pileToPileLength),
                requireWidthpp: parseInt(result.pileToPileWidth),
                requirePerPieceWeight: parseInt(result.perPieceWeightInGrams)
              })




              var arrDataForAllState = shiftTotalState;
              shiftTotalState.map((eachShiftState, i) => {
                arrDataForAllState[i].ratePerBorder = parseInt(result.rateDrawBox);
              })
              setShiftTotalState(arrDataForAllState);
              setReRender(!reRender);


              //   console.log("with draw box" , result.rateDrawBox);
              console.log("yesss draw box available");
            } else if (loomDetail.drawBox === "No") {
              console.log("no draw box");
              setratePerBorderTempState(result.rateWithoutDrawBox)



              var arrDataForAllState = shiftTotalState;
              shiftTotalState.map((eachShiftState, i) => {
                arrDataForAllState[i].ratePerBorder = parseInt(result.rateWithoutDrawBox);
              })
              setShiftTotalState(arrDataForAllState);
              setReRender(!reRender);





              //   console.log("nooooooooooooooo draw box" , result.rateWithoutDrawBox);
            } else {
              console.log("nothing value in draw box");
            }
            setisLoadingStepTwo(false)
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  // Step Two State  ------------------------    Two   --------------
  const shiftOptions = [
    { label: "Shift A", value: 1 },
    { label: "Shift B", value: 2 },
    { label: "Shift C", value: 3 },
  ];
  const [weaverEmployeeOptions, setWeaverEmployeeOptions] = useState([]);
  const [nativingEmployeeOptions, setNativingEmployeeOptions] = useState([]);
  const [ratePerBorderTempState, setratePerBorderTempState] = useState("")
  const [isLoadingStepTwo, setisLoadingStepTwo] = useState(true); 
  const [shiftTotalState, setShiftTotalState] = useState([
    {
      shiftName: "",
      weaverName: "",
      noOfBorder: 0,
      totalPiece: 0,
      bGradePiece: 0,
      aGradePieces: 0,
      ratePerBorder: parseInt(ratePerBorderTempState),
      extraAmount: { desc: "", amount: 0 },
      totalAmount: 0,
      knownFaultsIds: "",
      nativing: "",

    },
  ]);

  const [reRender, setReRender] = useState(false);
  const [grandFinalTotal, setGrandFinalTotal] = useState({
    totalBorders: 0, totalPiece: 0, totalBGrade: 0, totalAGrade: 0
  })



  const faultOptions = [
    {
      label: "Machine Header Break",
      value: 1,
    },
    {
      label: "Wires Brokes",
      value: 2,
    },
    {
      label: "Shift Issue",
      value: 3,
    },
  ];



  // step two functions 

  function updateNoOfBorders(i, value) {
    console.log("border test");

    var arr_data = shiftTotalState;
    arr_data[i].noOfBorder = parseInt(value);
    arr_data[i].totalPiece = parseInt(loomDetail.NumOfPieceOneBorder * value);

    setShiftTotalState(arr_data);

    setReRender(!reRender);
  }
  function updateWeaverNAme(i, value) {
    console.log("weaver test");

    var arr_data = shiftTotalState;
    arr_data[i].weaverName = value;
    setShiftTotalState(arr_data);
    setReRender(!reRender);
  }
  function updateNativingName(i, value) {
    console.log("nativing test");

    var arr_data = shiftTotalState;
    arr_data[i].nativing = value;
    setShiftTotalState(arr_data);
    setReRender(!reRender);
  }
  function updateShift(i, value) {
    console.log("shift test");

    var arr_data = shiftTotalState;
    arr_data[i].shiftName = value;
    setShiftTotalState(arr_data);
    setReRender(!reRender);
  }
  function updateBGradePiece(i, value) {
    console.log("b garade testing");
    var arr_data = shiftTotalState;
    arr_data[i].bGradePiece = parseInt(value);
    arr_data[i].aGradePieces = parseInt(shiftTotalState[i].totalPiece - value);
    setShiftTotalState(arr_data);
    setReRender(!reRender);
  }

  function updateExtraAmountDesc(i, value) {
    var arr_data = shiftTotalState;
    arr_data[i].extraAmount.desc = value;
    setShiftTotalState(arr_data);
    setReRender(!reRender);
  }
  function updateExtraAmountAmount(i, value) {
    var arr_data = shiftTotalState;
    arr_data[i].extraAmount.amount = parseInt(value);
    arr_data[i].totalAmount = parseInt(
      (shiftTotalState[i].ratePerBorder / loomDetail.NumOfPieceOneBorder) * shiftTotalState[i].aGradePieces + parseInt(value)

      // shiftTotalState[i].ratePerBorder * shiftTotalState[i].noOfBorder +
      //   shiftTotalState[i].extraAmount.amount
    );
    setShiftTotalState(arr_data);
    setReRender(!reRender);
  }
  function updateFaults(i, arrayOfSelectOftions) {
    var commaSplitStringOfFaults = "";
    arrayOfSelectOftions.map((item) => {
      commaSplitStringOfFaults = item.value + "," + commaSplitStringOfFaults;
    })



    //
    var arr_data = shiftTotalState;
    arr_data[i].knownFaultsIds = commaSplitStringOfFaults;

    setShiftTotalState(arr_data);

    setReRender(!reRender);
  }

  function updateGrandTotalValue() {
    // let totalNumberofBorders=grandFinalTotal.totalBorders;
    // let totalPiece=grandFinalTotal.totalPiece;
    // let totalBGrade=grandFinalTotal.totalBorders;
    // let totalAGrade=grandFinalTotal.totalAGrade;

    let totalNumberofBorders = 0;
    let totalPiece = 0;
    let totalBGrade = 0;
    let totalAGrade = 0;

    shiftTotalState.map((eachShift, index) => {
      totalNumberofBorders = totalNumberofBorders + eachShift.noOfBorder;
      totalPiece = totalPiece + eachShift.totalPiece;
      totalBGrade = totalBGrade + eachShift.bGradePiece;
      totalAGrade = totalAGrade + eachShift.aGradePieces;

    })

    setGrandFinalTotal({
      totalBorders: totalNumberofBorders, totalPiece: totalPiece,
      totalBGrade: totalBGrade, totalAGrade: totalAGrade
    })
  }

  // Step Three State

  const [finalStepRequired, setfinalStepRequired] = useState({
    requireLengthpp: 0,
    requireWidthpp: 0,
    requirePerPieceWeight: 0
  })
  // Step Three Functions 


  useEffect(() => {

  }, [finalStepRequired])



  return (
    <>
      <div
        role="main"
        className={`top_nav  bg-light  px-4 py-4 pt-5 ${showNavMenu == false ? "right_col-margin-remove" : " "
          }  `}
      >
        <div className="x_panel mt-2">

          <div className="x_title">
            <h2 className="mt-3 ml-2">Weaving Production Form</h2>

            <div className="clearfix" />
          </div>
          <div className="x_content mb-3">



            <div id="wizard" className="form_wizard wizard_horizontal">
              {/* ---------   Navigation Of Form Steps ---------- */}
              <ul className="wizard_steps my-4">
                <li>
                  <a>
                    <span
                      className={`step_no ${firstStep == "active" ? "bg-customBlue" : "bg"
                        }   
          ${firstStep == "done" ? "bg-customOrange" : "bg"} `}
                      onClick={() => onclickOnFirstStep()}
                    >
                      1
                    </span>
                    <span className="step_descr">
                      Step 1<br />
                      <small>Roll & Loom Details</small>
                    </span>
                  </a>
                </li>
                <li>
                  <a>
                    <span
                      className={`step_no ${secondStep == "active" ? "bg-customBlue" : "bg"
                        } 
             ${secondStep == "done" ? "bg-customOrange" : "bg"}`}
                      onClick={() => onclickOnSecondStep()}
                    >
                      2
                    </span>
                    <span className="step_descr ">
                      Step 2<br />
                      <small>Shifts Details</small>
                    </span>
                  </a>
                </li>
                <li>
                  <a>
                    <span
                      className={`step_no ${thirdStep == "active" ? "bg-customBlue" : "bg"
                        }
             ${thirdStep == "done" ? "bg-customOrange" : "bg"} `}
                    >
                      3
                    </span>
                    <span className="step_descr">
                      Step 3<br />
                      <small> Finalization </small>
                    </span>
                  </a>
                </li>
              </ul>


              {/* drop drilling approuach is using here due redux unavalibility  */}
              <div>

                {/* First Step Of Production Form ----------- */}
                {firstStep == "active" ? (
                  <div className="container text-center px-5 mt-5  ">
                    <div className=" ">
                      <WeavingProductionFormStepOne
                        isLoading={isLoading} loomDetail={loomDetail} FetchListSelector={FetchListSelector}
                        updateNumbOfPieceInBorderFunc={updateNumbOfPieceInBorderFunc} rollDetail={rollDetail}
                        loomDetailsUpdate={loomDetailsUpdate} setrollDetail={setrollDetail}
                        loomListOptions={loomListOptions}
                        setLoomDetailsUpdate={setLoomDetailsUpdate} updateLoomDetails={updateLoomDetails}
                        borderQualityOptions={borderQualityOptions} setUpdateNumberOfPieceOneBorderInput={setUpdateNumberOfPieceOneBorderInput}
                        updateNumberOfPieceOneBorderInput={updateNumberOfPieceOneBorderInput}
                        borderSizeOptions={borderSizeOptions}

                      />
                    </div>

                    <div className="text-right   pt-2  ">
                      <button
                        className="btn btn-success btn-sm m-0 px-4"
                        onClick={() => {
                          setSecondStep("active");
                          setFirstStep("done");
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {/* Second Step Of Production Form ----------- */}
                {secondStep == "active" ? (
                  <div className="container text-center px-2 mt-5">
                    <div className=" ">
                      <WeavingProductionFormStepTwo
                        shiftOptions={shiftOptions} weaverEmployeeOptions={weaverEmployeeOptions}
                        loomDetail={loomDetail} ratePerBorderTempState={ratePerBorderTempState}
                        nativingEmployeeOptions={nativingEmployeeOptions}
                        updateGrandTotalValue={updateGrandTotalValue} reRender={reRender}
                        shiftTotalState={shiftTotalState}
                        isLoadingStepTwo={isLoadingStepTwo}
                        updateShift={updateShift}
                        updateWeaverNAme={updateWeaverNAme}
                        updateNoOfBorders={updateNoOfBorders}
                        updateBGradePiece={updateBGradePiece}
                        updateExtraAmountDesc={updateExtraAmountDesc}
                        updateExtraAmountAmount={updateExtraAmountAmount}
                        updateNativingName={updateNativingName}
                        updateFaults={updateFaults}
                        faultOptions={faultOptions}
                        grandFinalTotal={grandFinalTotal}
                        setShiftTotalState={setShiftTotalState}
                      />
                    </div>
                    <div className="text-right px-2 pt-2 ">
                      <button
                        className="btn btn-primary btn-sm  px-4"
                        onClick={() => {
                          setSecondStep("done");
                          setFirstStep("active");
                        }}
                      >
                        {" "}
                        Prev{" "}
                      </button>
                      <button
                        className="btn btn-success btn-sm  px-4"
                        onClick={() => {
                          setThirdStep("active");
                          setSecondStep("done");
                        }}
                      >
                        {" "}
                        Next{" "}
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {/* Third Step Of Production Form ----------- */}
                {thirdStep == "active" ? (
                  <div className="container text-center px-2   my-5  ">
                    <div className=" ">
                      <WeavingProductionFormStepThird
                        finalStepRequired={finalStepRequired}
                        grandFinalTotal={grandFinalTotal}
                      />
                    </div>
                    <div className="text-right px-2 pt-3 ">
                      <button
                        className="btn btn-primary btn-sm  px-4 py-1"
                        onClick={() => {
                          setThirdStep("done");
                          setSecondStep("active");
                        }}
                      >
                        {" "}
                        <i className="fa fa-backward pr-2"></i>
                        Prev
                      </button>

                      <button className="btn btn-success btn-sm  px-4 py-1">
                        {" "}
                        Draft <i className="fa fa-stack-exchange pl-2"> </i>
                      </button>
                      <button className="btn btn-success btn-sm  px-4 py-1">
                        {" "}
                        Print <i className="fa fa-print pl-2"> </i>
                      </button>
                      <button className="btn btn-danger btn-sm  px-4 py-1">
                        {" "}
                        Save <i className="fa fa-save pl-2 "> </i>
                      </button>
                    </div>

                    {/*  */}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeavingProductionForm;
