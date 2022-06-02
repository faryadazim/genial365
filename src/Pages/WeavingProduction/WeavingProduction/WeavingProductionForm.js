import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentId } from "../../../store/actions/NavState";
import WeavingProductionFormStepOne from "./WeavingProductionFormStepOne";
import WeavingProductionFormStepThird from "./WeavingProductionFormStepThird";
import WeavingProductionFormStepTwo from "./WeavingProductionFormStepTwo";

 

const WeavingProductionForm = () => {
  const dispatch = useDispatch();
  const url = localStorage.getItem("authUser");
  const userId = localStorage.getItem("loginId");
  // Parent Personal State
  const showNavMenu = useSelector((state) => state.NavState);
  const currentID = useSelector((state) => state.IdToBeUpdate);
  const [firstStep, setFirstStep] = useState("active");
  const [secondStep, setSecondStep] = useState("disable");
  const [thirdStep, setThirdStep] = useState("disable");
  const [userDraftBox, setUserDraftBox] = useState([])
  const [idToUpdateProductionTable , setIdToUpdateProductionTable] = useState(null)

  // Step One State  ------------------------    One   --------------
const [roleNameBackEnd ,setRoleNameBackEnd]=useState("")
  var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
  var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
  var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
  const dateToday = `${year}-${month}-${day}`;
  const [isLoading, setisLoading] = useState(true);
  const [allLoomLists, setAllLoomLists] = useState([]);



  //state for DropDownSearchableSelector
  const [loomListOptions, setLoomListOptions] = useState([]);
  const [loomListValue, setLoomListValue] = useState({})
  const [borderQualityOptions, setBorderQualityOptions] = useState([]);
  const [borderQualityValue, setborderQualityValue] = useState({})
  const [borderSizeOptions, setBorderSizeOptions] = useState([]);
  const [borderSizeValue, setBorderSizeValue] = useState({})
  // state to store form data in database    
  const [rollDetail, setrollDetail] = useState({
    //rollNo: "85",
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
    grayProductId: ""
  });
  //  state for update Function Number of Border in Loom Detail table
  const [
    updateNumberOfPieceOneBorderInput,
    setUpdateNumberOfPieceOneBorderInput,
  ] = useState({ QualityId: "", BorderSizeId: "", LoomSize: "" });
  const stepOneValidatorInitialValue = {
    rollWeightValidate: true, loomNumberValidate: true,
    qualityValidate: true, sizeValidate: true, programNumberValidate: true
  };
  const [stepOneValidator, setStepOneValidator] = useState(stepOneValidatorInitialValue)


  const postUserDraft = () => {
    const draftActualJson = {
      rollDetail,
      loomListValue, borderQualityValue, borderSizeValue,
      shiftTotalState,
      grandFinalTotal,
      finalStepRequired,
      finalStepInput,
      loomDetail: loomDetail,
      //stepStates
      firstStep, secondStep, thirdStep,

    }
    const object = {
      user_id: userId,
      page_name: "productionForm",
      draft_json: JSON.stringify(draftActualJson),
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object),
    };
    fetch(url + "/api/userDraft", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("draft data added", data);
        FetchListSelector()

        // .............
        setLoomListValue({})
        setborderQualityValue({})
        setBorderSizeValue({})
        // setStepOneValidator(stepOneValidatorInitialValue)
        setrollDetail({
          // rollNo: "",
          date: dateToday,
          rollWeight: "",
          loomNumber: "",
          Quality: "",
          Size: "",
          programNumber: "",
        });
        setLoomDetail({
          loomSize: "Auto Define",
          jacquard: "Auto Define",
          drawBox: "Auto Define",
          NumOfPieceOneBorder: "Auto Define",
          grayProductId: ""
        });
        setratePerBorderTempState("");
        setUpdateNumberOfPieceOneBorderInput({ QualityId: "", BorderSizeId: "", LoomSize: "" });
        setShiftTotalState(totalShiftInitialState);
        setGrandFinalTotal({
          totalBorders: 0,
          totalPiece: 0,
          totalBGrade: 0,
          totalAGrade: 0,
        });
        setStepOneValidator(stepOneValidatorInitialValue)

        setfinalStepRequired({
          requireLengthpp: 0,
          requireWidthpp: 0,
          requirePerPieceWeight: 0,
        });
        setfinalStepInput({
          pileToPileLength: "",
          pileToPileWidth: "",
          cutPieceSize: "",
          cutPieceWeight: "",
          remarks: ""
        });



        setFirstStep("active");
        setSecondStep("disable");
        setThirdStep("disable");
        // ..........
      })
      .catch((err) => {
        console.log("err", err);
      });

  }

  const deleteDraft = (e) => {

    fetch(`${url}api/userDraft?id=${e}`, {
      method: "DELETE",
      // headers: {
      //   Authorization:
      //     JSON.parse(localStorage.getItem("authUser")).token_type +
      //     " " +
      //     JSON.parse(localStorage.getItem("authUser")).access_token,
      //   "Content-Type": "application/x-www-form-urlencoded",
      // },
    })
      .then((response) => {
        FetchListSelector()
      })
      .catch((error) => console.log("error", error));
  };
  const setDraftDataIntoForm = (draftData, draftId) => {

    setborderQualityValue(draftData.borderQualityValue) //
    setBorderSizeValue(draftData.borderSizeValue)   //
    setfinalStepInput(draftData.finalStepInput) //
    setfinalStepRequired(draftData.finalStepRequired)   //
    setFirstStep(draftData.firstStep)  //
    setSecondStep(draftData.secondStep)//
    setThirdStep(draftData.thirdStep)//
    setGrandFinalTotal(draftData.grandFinalTotal) //
    setLoomDetail(draftData.loomDetail)    //
    setLoomListValue(draftData.loomListValue)   //
    setrollDetail(draftData.rollDetail)//
    setShiftTotalState(draftData.shiftTotalState)
    setReRender(!reRender)
    // deleting draft after reading 
    deleteDraft(draftId)

  }
  // Function of First Step
  const fetchNewRoleName = ()=>{
    fetch(url + "api/RoleName", {
      method: "GET",
      headers: {
        "Authorization":
          "bearer XRuIpUQo72izREUQ52zPC59IpINxX402zEAyJToI1hBhjpUvK4t4awHAmUnUs9VEx1bFL84-azlxZxJbRElDDdvDjlH1xiyI4UaDcQko4cSBM0TRklE0vl6J61aSo2zJiJ3YJKaJ939lHky6rnQ3xkov_RhsLhmCgQBlXeijIIrPkCEaDCuWURqnFX9HwxDLX-nha-sAvt2dnsOohdsFDEHaLG2T7KZfdlWe46OYVFcBzVLrnJcpiekmSeqf9LRZL9kqhgBlDx-0YBETgdeNmQ1_JgXKJ9NACwsS6Ex97Rm52HxhmaG6-dep1GDW7giwWQ_vZy0q31V3ad85kR_KT4jTZJTkzBpYS5WDhMeipR8Ovw3xh-IEVgJtd-qwhJ-t2P8oIkLPUWxZulCY0ZVd1G1YP5qIHbQJsSfMXEmMUFgLNefq5rS90Jj8HWSZR_Wnzo2d8z03XIp_bb3YSoXgjWYXwle67zlSphI8-nWzoiLoW8h8azO5SvDVfymXMbfUmw-93j_tIV7llT6EwHYt3g",
        "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data , "Role name----------------------");
        setRoleNameBackEnd(data)
       
      });

  }
  const FetchListSelector =async () => {
    // Fetching loom list number
    

    // fetching and setting loom name 
   

   await   fetchNewRoleName()
   if (currentID!==null) {
     setIdToUpdateProductionTable(currentID)
     await generateReportOfSpecificId(currentID)
     dispatch(updateCurrentId(null))
   }
  
    // Step One Dropdown List fetching from api/backend
    fetch(url + "api/LoomListsCore", {
      method: "GET",
      headers: {
        Authorization: "bearer XRuIpUQo72izREUQ52zPC59IpINxX402zEAyJToI1hBhjpUvK4t4awHAmUnUs9VEx1bFL84-azlxZxJbRElDDdvDjlH1xiyI4UaDcQko4cSBM0TRklE0vl6J61aSo2zJiJ3YJKaJ939lHky6rnQ3xkov_RhsLhmCgQBlXeijIIrPkCEaDCuWURqnFX9HwxDLX-nha-sAvt2dnsOohdsFDEHaLG2T7KZfdlWe46OYVFcBzVLrnJcpiekmSeqf9LRZL9kqhgBlDx-0YBETgdeNmQ1_JgXKJ9NACwsS6Ex97Rm52HxhmaG6-dep1GDW7giwWQ_vZy0q31V3ad85kR_KT4jTZJTkzBpYS5WDhMeipR8Ovw3xh-IEVgJtd-qwhJ-t2P8oIkLPUWxZulCY0ZVd1G1YP5qIHbQJsSfMXEmMUFgLNefq5rS90Jj8HWSZR_Wnzo2d8z03XIp_bb3YSoXgjWYXwle67zlSphI8-nWzoiLoW8h8azO5SvDVfymXMbfUmw-93j_tIV7llT6EwHYt3g",
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

        setNativingEmployeeOptions(arrForNativingEmployee);

      });
    // /...............
    fetch(url + "api/ShiftFaults", {
      method: "GET",
      headers: {
        // Authorization: "bearer" + " " + e,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((shiftFault) => {
        var arrForShiftFault = [];
        shiftFault.map((item) => {
          arrForShiftFault.push({
            label: item.fault_title,
            value: item.fault_id,
          });
        });
        setFaultOptions(arrForShiftFault);
      });
    // --------  
    fetch(`${url}/api/userDraft?userId=${userId}`, {
      method: "GET",
      headers: {
        // Authorization: "bearer" + " " + e,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((userDraftTable) => {
        console.log("draft data --------> ", userDraftTable);
        setUserDraftBox(userDraftTable)
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

          if (result == null || result == "" || result == undefined) {
            console.log("not available");
            setLoomDetail({ ...loomDetail, NumOfPieceOneBorder: "--" });
          } else {
            setLoomDetail({
              ...loomDetail,
              NumOfPieceOneBorder: result.noOfPieceInOneBorder,
              grayProductId: result.grayProductId
            });
            console.log(result, "its for testing in wpf");
            console.log("number odf pieceec dup akisdfaf", loomDetail);
            if (loomDetail.drawBox == "Yes") {
              setratePerBorderTempState(result.rateDrawBox);
              console.log("testing why result is zero");
              // setting required value of config table for step3
              setfinalStepRequired({
                requireLengthpp: result.pileToPileLength,
                requireWidthpp: result.pileToPileWidth,
                requirePerPieceWeight: result.perPieceWeightInGrams,
              });

              var arrDataForAllState = shiftTotalState;
              shiftTotalState.map((eachShiftState, i) => {
                arrDataForAllState[i].ratePerBorder = parseInt(
                  result.rateDrawBox
                );
              });
              setShiftTotalState(arrDataForAllState);
              setReRender(!reRender);

              //   console.log("with draw box" , result.rateDrawBox);
              console.log("yesss draw box available");
            } else if (loomDetail.drawBox === "No") {
              console.log("no draw box");
              setratePerBorderTempState(result.rateWithoutDrawBox);

              var arrDataForAllState = shiftTotalState;
              shiftTotalState.map((eachShiftState, i) => {
                arrDataForAllState[i].ratePerBorder = parseInt(
                  result.rateWithoutDrawBox
                );
              });
              setShiftTotalState(arrDataForAllState);
              setReRender(!reRender);

              //   console.log("nooooooooooooooo draw box" , result.rateWithoutDrawBox);
            } else {
              console.log("nothing value in draw box");
            }
            setisLoadingStepTwo(false);
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  const stepOneValidationFunct = () => {
    if (rollDetail.rollWeight == "") {
      setStepOneValidator({ ...stepOneValidator, rollWeightValidate: false })
    } else if (rollDetail.loomNumber == "") {
      setStepOneValidator({ ...stepOneValidator, loomNumberValidate: false })
    } else if (rollDetail.Quality == "") {
      setStepOneValidator({ ...stepOneValidator, qualityValidate: false })
    } else if (rollDetail.Size == "") {
      setStepOneValidator({ ...stepOneValidator, sizeValidate: false })
    } else if (rollDetail.programNumber == "") {
      setStepOneValidator({ ...stepOneValidator, programNumberValidate: false })

    } else {
      setSecondStep("active");
      setFirstStep("done");
    }

  }
  // Step Two State  ------------------------    Two   --------------
  const shiftOptions = [
    { label: "Shift A", value: 1 },
    { label: "Shift B", value: 2 },
    { label: "Shift C", value: 3 },
  ];
  const [weaverEmployeeOptions, setWeaverEmployeeOptions] = useState([]);
  const [nativingEmployeeOptions, setNativingEmployeeOptions] = useState([]);
  const [ratePerBorderTempState, setratePerBorderTempState] = useState("");
  const [isLoadingStepTwo, setisLoadingStepTwo] = useState(true);
  const totalShiftInitialState = [
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

      // -------------- Selector Current Value Management 
      shiftSelectorValue: {},
      weaverSelectorValue: {},
      nativingSelectorValue: {},
      // ----------------ShiftValidation
      shiftValidation: {
        shiftNameValidate: true, weaverNameValidate: true, noOfBorderValidate: true,
        bGradePiece: true, extraAmountDescValidate: true, extraAmountAmountValidate: true,
        nativingValidate: true
      }
    },
  ]
  const [shiftTotalState, setShiftTotalState] = useState(totalShiftInitialState);

  const [reRender, setReRender] = useState(false);
  const [grandFinalTotal, setGrandFinalTotal] = useState({
    totalBorders: 0,
    totalPiece: 0,
    totalBGrade: 0,
    totalAGrade: 0,
  });
  const [faultOptions, setFaultOptions] = useState({})

  // step two functions

  function updateNoOfBorders(i, value) {
    console.log("border test");

    var arr_data = shiftTotalState;
    arr_data[i].noOfBorder = parseInt(value);
    arr_data[i].totalPiece = parseInt(loomDetail.NumOfPieceOneBorder * value);

    setShiftTotalState(arr_data);

    setReRender(!reRender);
  }
  function updateWeaverNAme(i, value, label) {
    console.log("weaver test");

    var arr_data = shiftTotalState;

    arr_data[i].weaverSelectorValue = { label: label, value: value };
    arr_data[i].weaverName = value;
    setShiftTotalState(arr_data);
    setReRender(!reRender);
  }
  function updateNativingName(i, value, label) {
    console.log("nativing test");
    var arr_data = shiftTotalState;
    arr_data[i].nativingSelectorValue = { label: label, value: value };
    arr_data[i].nativing = value;
    setShiftTotalState(arr_data);
    setReRender(!reRender);
  }
  function updateShift(i, value, label) {
    console.log("shift test");

    var arr_data = shiftTotalState;
    arr_data[i].shiftName = value;
    arr_data[i].shiftSelectorValue = { label: label, value: value };

    setShiftTotalState(arr_data);
    setReRender(!reRender);
  }
  function updateBGradePiece(i, value) {
    console.log("b garade testing");
    var arr_data = shiftTotalState;
    arr_data[i].bGradePiece = parseInt(value);
    arr_data[i].aGradePieces = parseInt(shiftTotalState[i].totalPiece - value);


    //  arr_data[i].totalAmount = parseInt((parseInt(shiftTotalState[i].ratePerBorder) / 
    // parseInt(loomDetail.NumOfPieceOneBorder)) * (parseInt(shiftTotalState[i].totalPiece -(value))) + parseInt(shiftTotalState[i].updateExtraAmountAmount));
    arr_data[i].totalAmount = (((shiftTotalState[i].ratePerBorder) / (loomDetail.NumOfPieceOneBorder)) * (parseInt(shiftTotalState[i].totalPiece - (value))) + shiftTotalState[i].extraAmount.amount).toFixed(2);

     




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
    arr_data[i].totalAmount = parseInt((shiftTotalState[i].ratePerBorder / loomDetail.NumOfPieceOneBorder) * shiftTotalState[i].aGradePieces + parseInt(value)
    );
    setShiftTotalState(arr_data);
    setReRender(!reRender);
  }
  const updateFaults = (i, arrayOfSelectOftions) => {




    //  console.log(commaSplitStringOfFaults);
    //   // //
    var arr_data = shiftTotalState;
    arr_data[i].knownFaultsIds = arrayOfSelectOftions;
    setShiftTotalState(arr_data);
    setReRender(!reRender);
  }

  function updateGrandTotalValue() {
    let totalNumberofBorders = 0;
    let totalPiece = 0;
    let totalBGrade = 0;
    let totalAGrade = 0;

    shiftTotalState.map((eachShift, index) => {
      totalNumberofBorders = totalNumberofBorders + eachShift.noOfBorder;
      totalPiece = totalPiece + eachShift.totalPiece;
      totalBGrade = totalBGrade + eachShift.bGradePiece;
      totalAGrade = totalAGrade + eachShift.aGradePieces;
    });

    setGrandFinalTotal({
      totalBorders: totalNumberofBorders,
      totalPiece: totalPiece,
      totalBGrade: totalBGrade,
      totalAGrade: totalAGrade,
    });
  }

  const stepTwoValidationFunct = async () => {

    await shiftTotalState.map((eachShift, i) => {
      var arr_data = shiftTotalState;

      // ShiftName Validation --------- 
      if (arr_data[i].shiftName == "") {
        arr_data[i].shiftValidation.shiftNameValidate = false;
        setShiftTotalState(arr_data);
        setReRender(!reRender);
      } else {
        arr_data[i].shiftValidation.shiftNameValidate = true;
        setShiftTotalState(arr_data);
        setReRender(!reRender);
      }
      // Weaver Validation --------- 
      if (arr_data[i].weaverName == "") {
        arr_data[i].shiftValidation.weaverNameValidate = false;
        setShiftTotalState(arr_data);
        setReRender(!reRender);
      } else {
        arr_data[i].shiftValidation.weaverNameValidate = true;
        setShiftTotalState(arr_data);
        setReRender(!reRender);
      }
      // Nativing Validation --------- 
      if (arr_data[i].nativing == "") {
        arr_data[i].shiftValidation.nativingValidate = false;
        setShiftTotalState(arr_data);
        setReRender(!reRender);
      } else {
        arr_data[i].shiftValidation.nativingValidate = true;
        setShiftTotalState(arr_data);
        setReRender(!reRender);
      }
      // Border no Validation --------- 
      if (arr_data[i].noOfBorder == "" || arr_data[i].noOfBorder === 0) {
        arr_data[i].shiftValidation.noOfBorderValidate = false;
        setShiftTotalState(arr_data);
        setReRender(!reRender);
      } else {
        arr_data[i].shiftValidation.noOfBorderValidate = true;
        setShiftTotalState(arr_data);
        setReRender(!reRender);
      }
      // b rade piece  Validation --------- 
      if (arr_data[i].bGradePiece == "" || arr_data[i].bGradePiece === 0) {
        arr_data[i].shiftValidation.bGradePiece = false;
        setShiftTotalState(arr_data);
        setReRender(!reRender);
      } else {
        arr_data[i].shiftValidation.bGradePiece = true;
        setShiftTotalState(arr_data);
        setReRender(!reRender);
      }
      // extraAmount  Desc   Validate Validation --------- 
      if (arr_data[i].extraAmount.desc == "") {
        arr_data[i].shiftValidation.extraAmountDescValidate = false;
        setShiftTotalState(arr_data);
        setReRender(!reRender);
      } else {
        arr_data[i].shiftValidation.extraAmountDescValidate = true;
        setShiftTotalState(arr_data);
        setReRender(!reRender);
      }
      // extraAmount     Validate Validation --------- 
      if (arr_data[i].extraAmount.amount == "" || arr_data[i].extraAmount.amount === 0) {
        arr_data[i].shiftValidation.extraAmountAmountValidate = false;
        setShiftTotalState(arr_data);
        setReRender(!reRender);
      } else {
        arr_data[i].shiftValidation.extraAmountAmountValidate = true;
        setShiftTotalState(arr_data);
        setReRender(!reRender);
      }
    })

    let condition = false;
    let testVar = true;
    await shiftTotalState.forEach(SingleState => {

      // ShiftName Validation --------- 
      if (SingleState.shiftValidation.shiftNameValidate === false ||
        SingleState.shiftValidation.weaverNameValidate === false ||
        SingleState.shiftValidation.noOfBorderValidate === false ||
        SingleState.shiftValidation.bGradePiece === false ||
        SingleState.shiftValidation.extraAmountDescValidate === false ||
        SingleState.shiftValidation.extraAmountAmountValidate === false ||
        SingleState.shiftValidation.nativingValidate === false) {
        testVar = false;
        condition = false;
      } else if (SingleState.shiftValidation.shiftNameValidate === true &&
        SingleState.shiftValidation.weaverNameValidate === true &&
        SingleState.shiftValidation.noOfBorderValidate === true &&
        SingleState.shiftValidation.extraAmountDescValidate === true &&
        SingleState.shiftValidation.extraAmountAmountValidate === true &&
        SingleState.shiftValidation.bGradePiece === true &&
        SingleState.shiftValidation.nativingValidate === true) {
        condition = true;
      }
    });
    if (condition === true && testVar === true) {
      console.log("Go Next");
      setThirdStep("active");
      setSecondStep("done");
    } else {
      console.log("Cannt Go Next ");
    }




  }

  // Step Three State

  const [finalStepRequired, setfinalStepRequired] = useState({
    requireLengthpp: 0,
    requireWidthpp: 0,
    requirePerPieceWeight: 0,
  });

  const [finalStepInput, setfinalStepInput] = useState({
    pileToPileLength: "",
    pileToPileWidth: "",
    cutPieceSize: "",
    cutPieceWeight: "",
    remarks: ""
  });

  const [stepThirdValidator, setStepThirdValidator] = useState({
    pileToPileLengthValidate: true, pileToPileWidthValidate: true,
    cutPieceSizeValidate: true, cutPieceWeightValidate: true
  })
  // Step Three Functions 

  const knownFaultsIdsFunction =   (i) => {

    const faultIdsForTotalShiftsArray = shiftTotalState.map((eachShift) => {
      return eachShift.knownFaultsIds
    })


    let stringArrayForKnownFaults = [];
    if (faultIdsForTotalShiftsArray[i]===null ||faultIdsForTotalShiftsArray[i]===undefined) {
      stringArrayForKnownFaults.push(null)
    } else {
         faultIdsForTotalShiftsArray[i].map(( (eachKnownFaultObject) => {
      if (eachKnownFaultObject.__isNew__ == true) {
        console.log("new"); 
          stringArrayForKnownFaults.push(`${eachKnownFaultObject.label} `)
      } else {
        stringArrayForKnownFaults.push((eachKnownFaultObject.value).toString())
      }


    }))
    }
   

    return stringArrayForKnownFaults.toString()
  }

  const saveWeavingProductionForm = () => {
    if (finalStepInput.pileToPileLength === "" || finalStepInput.pileToPileLength === 0 || isNaN(finalStepInput.pileToPileLength)) {
      setStepThirdValidator({ ...stepThirdValidator, pileToPileLengthValidate: false })
    } else if (finalStepInput.pileToPileWidth === "" || finalStepInput.pileToPileWidth === 0 || isNaN(finalStepInput.pileToPileWidth)) {
      setStepThirdValidator({ ...stepThirdValidator, pileToPileWidthValidate: false })
    } else if (finalStepInput.cutPieceSize === "" || finalStepInput.cutPieceSize === 0 || isNaN(finalStepInput.cutPieceSize)) {
      setStepThirdValidator({ ...stepThirdValidator, cutPieceSizeValidate: false })
    } else if (finalStepInput.cutPieceWeight === "" || finalStepInput.cutPieceWeight === 0 || isNaN(finalStepInput.cutPieceWeight)) {
      setStepThirdValidator({ ...stepThirdValidator, cutPieceWeightValidate: false })
    } else {






  //     const objectToBeSentToProductionApi = {
  //       roll_no: roleNameBackEnd,
  //       production_date: `${rollDetail.date}T00:00:00`,  //dateFrom   rollDetail.date
  //       roll_weight: parseInt(rollDetail.rollWeight),
  //       loom_id: rollDetail.loomNumber,
  //       borderSize_id: rollDetail.Size,
  //       borderQuality_id: rollDetail.Quality,
  //       programm_no: (rollDetail.programNumber),
  //       grayProduct_id: loomDetail.grayProductId,
  //       pile_to_pile_length: finalStepInput.pileToPileLength,
  //       pile_to_pile_width: finalStepInput.pileToPileWidth,
  //       cut_piece_size: finalStepInput.cutPieceSize,
  //       cut_piece_weight: finalStepInput.cutPieceWeight,
  //       remarks: finalStepInput.remarks,
  //       total_border: grandFinalTotal.totalBorders,
  //       total_pieces: grandFinalTotal.totalPiece,
  //       b_grade_pieces: grandFinalTotal.totalBGrade,
  //       a_grade_pieces: grandFinalTotal.totalAGrade,
  //       current_per_piece_a_weight: grandFinalTotal.totalPiece * finalStepRequired.requirePerPieceWeight,   //custom formulaa
  //       required_length_p_to_p: finalStepRequired.requireLengthpp,
  //       required_width_p_to_p: finalStepRequired.requireWidthpp,
  //       required_per_piece_a_weight: finalStepRequired.requirePerPieceWeight,
  //       shifts: shiftTotalState.map((eachShift, i) => {
  //         return {
  //           shift_name: eachShift.shiftSelectorValue.label,
  //           weaver_employee_Id: eachShift.weaverSelectorValue.value,
  //           no_of_border: eachShift.noOfBorder,
  //           total_pieces: eachShift.totalPiece,
  //           b_grade_piece: eachShift.bGradePiece,
  //           a_grade_piece: eachShift.aGradePieces,
  //           rate_per_border: eachShift.ratePerBorder,
  //           extra_amt: eachShift.extraAmount.amount,
  //           extra_desc: eachShift.extraAmount.desc,
  //           total_amt: eachShift.totalAmount,
  //           natting_employee_Id: eachShift.nativingSelectorValue.value,
  //           known_faults_ids: knownFaultsIdsFunction(i)
  //         }
  //       })
  //     }


  //  console.log("------" ,objectToBeSentToProductionApi );
      const requestOptions = {
        method: "POST",
        headers: {
          "Authorization":
            "bearer XRuIpUQo72izREUQ52zPC59IpINxX402zEAyJToI1hBhjpUvK4t4awHAmUnUs9VEx1bFL84-azlxZxJbRElDDdvDjlH1xiyI4UaDcQko4cSBM0TRklE0vl6J61aSo2zJiJ3YJKaJ939lHky6rnQ3xkov_RhsLhmCgQBlXeijIIrPkCEaDCuWURqnFX9HwxDLX-nha-sAvt2dnsOohdsFDEHaLG2T7KZfdlWe46OYVFcBzVLrnJcpiekmSeqf9LRZL9kqhgBlDx-0YBETgdeNmQ1_JgXKJ9NACwsS6Ex97Rm52HxhmaG6-dep1GDW7giwWQ_vZy0q31V3ad85kR_KT4jTZJTkzBpYS5WDhMeipR8Ovw3xh-IEVgJtd-qwhJ-t2P8oIkLPUWxZulCY0ZVd1G1YP5qIHbQJsSfMXEmMUFgLNefq5rS90Jj8HWSZR_Wnzo2d8z03XIp_bb3YSoXgjWYXwle67zlSphI8-nWzoiLoW8h8azO5SvDVfymXMbfUmw-93j_tIV7llT6EwHYt3g",
          "Content-Type": "application/json" },
        body: JSON.stringify({
          "roll_no": roleNameBackEnd,
          "production_date": `${rollDetail.date}T00:00:00.928Z`,
          "roll_weight": parseFloat(rollDetail.rollWeight),
          "loom_id": rollDetail.loomNumber,
          "borderSize_id": rollDetail.Size,
          "borderQuality_id": rollDetail.Quality,
          "programm_no": (rollDetail.programNumber),
          "grayProduct_id": loomDetail.grayProductId,
          "pile_to_pile_length":  finalStepInput.pileToPileLength,
          "pile_to_pile_width": finalStepInput.pileToPileWidth,
          "cut_piece_size": finalStepInput.cutPieceSize,
          "cut_piece_weight":finalStepInput.cutPieceWeight,
          "remarks": finalStepInput.remarks,
          "total_border": grandFinalTotal.totalBorders,
          "total_pieces":grandFinalTotal.totalPiece,
          "b_grade_pieces": grandFinalTotal.totalBGrade,
          "a_grade_pieces": grandFinalTotal.totalAGrade,
          "current_per_piece_a_weight": grandFinalTotal.totalPiece * finalStepRequired.requirePerPieceWeight,   //custom formulaa
          "required_length_p_to_p": finalStepRequired.requireLengthpp,
          "required_width_p_to_p":finalStepRequired.requireWidthpp,
          "required_per_piece_a_weight": finalStepRequired.requirePerPieceWeight,
          "piece_in_one_border": loomDetail.NumOfPieceOneBorder,
          "shifts": shiftTotalState.map((eachShift , i)=>{
            return {
              "shift_name":  eachShift.shiftSelectorValue.label,
              "weaver_employee_Id":eachShift.weaverSelectorValue.value,
              "no_of_border": eachShift.noOfBorder,
              "total_pieces":  eachShift.totalPiece,
              "b_grade_piece": eachShift.bGradePiece,
              "a_grade_piece": eachShift.aGradePieces,
              "rate_per_border":eachShift.ratePerBorder,
              "extra_amt":  eachShift.extraAmount.amount,
              "extra_desc":  eachShift.extraAmount.desc,
              "total_amt": eachShift.totalAmount,
              "natting_employee_Id": eachShift.nativingSelectorValue.value,
              "known_faults_ids":  knownFaultsIdsFunction(i),
              "known_faults_names": "string"
          }
          })
              
          
      }),
      };
  
      console.log(requestOptions);
      fetch(url + "api/Production", requestOptions)
        .then((response) => response.json())
        .then((data) => {
 
          // ----------------- Setting Component To initial State
          setLoomListValue({})
          setborderQualityValue({})
          setBorderSizeValue({})
          // setStepOneValidator(stepOneValidatorInitialValue)
          setrollDetail({
            // rollNo: "",
            date: dateToday,
            rollWeight: "",
            loomNumber: "",
            Quality: "",
            Size: "",
            programNumber: "",
          });
          setLoomDetail({
            loomSize: "Auto Define",
            jacquard: "Auto Define",
            drawBox: "Auto Define",
            NumOfPieceOneBorder: "Auto Define",
            grayProductId: ""
          });
          setratePerBorderTempState("");
          setUpdateNumberOfPieceOneBorderInput({ QualityId: "", BorderSizeId: "", LoomSize: "" });
          setShiftTotalState(totalShiftInitialState);
          setGrandFinalTotal({
            totalBorders: 0,
            totalPiece: 0,
            totalBGrade: 0,
            totalAGrade: 0,
          });
          setStepOneValidator(stepOneValidatorInitialValue)
  
          setfinalStepRequired({
            requireLengthpp: 0,
            requireWidthpp: 0,
            requirePerPieceWeight: 0,
          });
          setfinalStepInput({
            pileToPileLength: "",
            pileToPileWidth: "",
            cutPieceSize: "",
            cutPieceWeight: "",
            remarks: ""
          });
  
  fetchNewRoleName()
  
          setFirstStep("active");
          setSecondStep("disable");
          setThirdStep("disable");


          // ---------
        })
        .catch((err) => {
          console.log("err in appi fettching", err);
        });

    }
  }
  const generateReportOfSpecificId = (id) => {
    console.log("babbbb");
    fetch(`${url}api/GetProductById?id=${id}`, {
      method: "GET",
      headers: {
        Authorization:
          "bearer XRuIpUQo72izREUQ52zPC59IpINxX402zEAyJToI1hBhjpUvK4t4awHAmUnUs9VEx1bFL84-azlxZxJbRElDDdvDjlH1xiyI4UaDcQko4cSBM0TRklE0vl6J61aSo2zJiJ3YJKaJ939lHky6rnQ3xkov_RhsLhmCgQBlXeijIIrPkCEaDCuWURqnFX9HwxDLX-nha-sAvt2dnsOohdsFDEHaLG2T7KZfdlWe46OYVFcBzVLrnJcpiekmSeqf9LRZL9kqhgBlDx-0YBETgdeNmQ1_JgXKJ9NACwsS6Ex97Rm52HxhmaG6-dep1GDW7giwWQ_vZy0q31V3ad85kR_KT4jTZJTkzBpYS5WDhMeipR8Ovw3xh-IEVgJtd-qwhJ-t2P8oIkLPUWxZulCY0ZVd1G1YP5qIHbQJsSfMXEmMUFgLNefq5rS90Jj8HWSZR_Wnzo2d8z03XIp_bb3YSoXgjWYXwle67zlSphI8-nWzoiLoW8h8azO5SvDVfymXMbfUmw-93j_tIV7llT6EwHYt3g",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
      
        console.log(data, "histroy fetch  ----------------------");

 
      })
      .catch((err) => {
        console.log(err, "err");
      }); 
  };

  // ----------------------------------
  useEffect(() => {
    console.log(currentID , "MMMMMM");
   }, [finalStepRequired]);

  return (
    <>
      <div
        role="main"
        className={`top_nav  bg-light  px-4 py-4 pt-5 ${showNavMenu == false ? "right_col-margin-remove" : " "}  `}   >
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
                      className={`step_no ${firstStep == "active" ? "bg-customBlue" : "bg"} ${firstStep == "done" ? "bg-customOrange" : "bg"} `}
                    // onClick={() => onclickOnFirstStep()}
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
                      className={`step_no ${secondStep == "active" ? "bg-customBlue" : "bg"}     ${secondStep == "done" ? "bg-customOrange" : "bg"}`}
                    // onClick={() => onclickOnSecondStep()}
                    > 2
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
                      className={`step_no ${thirdStep == "active" ? "bg-customBlue" : "bg"}    ${thirdStep == "done" ? "bg-customOrange" : "bg"} `}>
                      3
                    </span>
                    <span className="step_descr">
                      Step 3<br />
                      <small> Finalization </small>
                    </span>
                  </a>
                </li>
              </ul>
              <div>
                {firstStep == "active" ? (
                  <div className="container text-center px-5 mt-5  ">
                    <div className=" ">
                      <WeavingProductionFormStepOne
                        isLoading={isLoading}
                        loomDetail={loomDetail}
                        FetchListSelector={FetchListSelector}
                        updateNumbOfPieceInBorderFunc={updateNumbOfPieceInBorderFunc}
                        rollDetail={rollDetail}
                        loomDetailsUpdate={loomDetailsUpdate}
                        setrollDetail={setrollDetail}
                        loomListOptions={loomListOptions}
                        setLoomDetailsUpdate={setLoomDetailsUpdate}
                        updateLoomDetails={updateLoomDetails}
                        borderQualityOptions={borderQualityOptions}
                        setUpdateNumberOfPieceOneBorderInput={setUpdateNumberOfPieceOneBorderInput}
                        updateNumberOfPieceOneBorderInput={updateNumberOfPieceOneBorderInput}
                        borderSizeOptions={borderSizeOptions}
                        loomListValue={loomListValue} setLoomListValue={setLoomListValue}
                        borderQualityValue={borderQualityValue} setborderQualityValue={setborderQualityValue}
                        borderSizeValue={borderSizeValue} setBorderSizeValue={setBorderSizeValue}
                        stepOneValidator={stepOneValidator}    roleNameBackEnd={roleNameBackEnd}
                      />
                    </div>
                    <div className="text-right   pt-2  ">
                  
                  {
                    idToUpdateProductionTable==null?<button className="btn btn-secondary btn-sm  text-light px-4 mb-0"
                    onClick={() => { postUserDraft() }}>
                    Draft <i className="fa fa-stack-exchange pl-2"> </i>
                  </button>:<></>
                  }
                  
                      
                      <button
                        className="btn btn-success btn-sm m-0 px-4"
                        onClick={() => stepOneValidationFunct()}   >
                        Next
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {secondStep == "active" ? (
                  <div className="container text-center px-2 mt-5">
                    <div className=" ">
                      <WeavingProductionFormStepTwo
                        shiftOptions={shiftOptions}
                        weaverEmployeeOptions={weaverEmployeeOptions}
                        loomDetail={loomDetail}
                        ratePerBorderTempState={ratePerBorderTempState}
                        nativingEmployeeOptions={nativingEmployeeOptions}
                        updateGrandTotalValue={updateGrandTotalValue}
                        reRender={reRender}
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
                        Prev
                      </button>
                      <button className="btn btn-secondary btn-sm  text-light px-4 "
                        onClick={() => { postUserDraft() }}>
                        Draft <i className="fa fa-stack-exchange pl-2"> </i>
                      </button>
                      <button
                        className="btn btn-success btn-sm  px-4"
                        onClick={() => stepTwoValidationFunct()} >
                        Next
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}  {thirdStep == "active" ? (
                  <div className="container text-center px-2   my-5  ">
                    <div className=" ">
                      <WeavingProductionFormStepThird
                        finalStepRequired={finalStepRequired}
                        grandFinalTotal={grandFinalTotal}
                        finalStepInput={finalStepInput} setfinalStepInput={setfinalStepInput}
                        stepThirdValidator={stepThirdValidator}
                      />
                    </div>
                    <div className="text-right px-2 pt-3 ">
                      <button
                        className="btn btn-primary btn-sm  px-4 "
                        onClick={() => {
                          setThirdStep("done");
                          setSecondStep("active");
                        }}
                      >
                        <i className="fa fa-backward pr-2"></i>
                        Prev
                      </button>

                      <button className="btn btn-secondary btn-sm  text-light px-4 "
                        onClick={() => { postUserDraft() }}>
                        Draft <i className="fa fa-stack-exchange pl-2"> </i>
                      </button>
                      <button className="btn btn-success btn-sm  px-4   " onClick={() => saveWeavingProductionForm()}>

                        Save <i className="fa fa-save pl-2 "> </i>
                      </button>
                      <button className="btn btn-danger btn-sm  px-4  ">
                        Print <i className="fa fa-print pl-2"> </i>
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="text-left px-2 mb-1">



            {firstStep == "active" ?
              (userDraftBox.map((eachDraft) => {
                return <div key={eachDraft.draft_id} className="btn btn-sm btn-light border-secondary border text-secondary">
                  <span className="text-secondary mouseHandeMade" onClick={() => { setDraftDataIntoForm(JSON.parse(eachDraft.draft_json), eachDraft.draft_id) }}>{eachDraft.draft_name}</span>
                  <span className="mouseRemoveMade">
                    <i className="fa fa-close ml-2" onClick={() => deleteDraft(eachDraft.draft_id)}></i>
                  </span>
                </div>
              })) : ""
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default WeavingProductionForm;
