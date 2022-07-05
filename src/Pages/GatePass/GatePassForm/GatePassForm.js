import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { endPoint } from "../../../config/Config";
import axios from "axios";
import { preventMinus } from "../../../config/oreventMinus";
import Loader from "../../../Layout/Loader/Loader";
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
    minHeight: "28px",
    height: "28px",
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
    height: "28px",
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
    height: "28px",
  }),
};
const customStylesDanger = {
  control: (provided, state, base) => ({
    ...provided,
    background: "#fff",
    borderColor: "red",
    borderRadius: "none",
    minHeight: "28px",
    height: "28px",
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
    height: "28px",
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
    height: "28px",

  }),
};
const GatePassForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const notify = () => toast("Voucher Created Successfully");
  const showNavMenu = useSelector((state) => state.NavState);
  var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
  var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
  var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
  const dateToday = `${year}-${month}-${day}`;
  const [reRenderApp, setReRenderApp] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [dateSelected, setDateSelected] = useState(dateToday);
  const [reRenderGatePass, setReRenderGatePass] = useState(false);
  const gatePassMainStateInitial = {
    gate_pass_no: "",
    party_id: "",
    party_name: "",
    party_address: "",
    party_cell: "",
    total_rolls: 0,
    total_pieces: 0,
    total_weight: 0,
    total_sharing_weight: 0,
    color: 11,
    dying_process: "",
    total_dying_weight: 0,
    remarks: "",
    driver_name: "",
    vehicle_no: "",
    time: dateToday,
  };
  const gatePassValidationInitialValue = {
    partyName: true,
    product: true,
    driver: true
  }
  const [gatePassValidation, setGatePassValidation] = useState(gatePassValidationInitialValue)
  const [isUpdatingState, setIsUpdatingState] = useState(false)
  const [partyDataFetched, setPartyDataFetched] = useState([])
  const [gatePassMainState, setGatePassMainState] = useState(gatePassMainStateInitial);
  const [productListOptions, setProductListOptions] = useState([]);
  const [gatePassEntriesState, setGatePassEntriesState] = useState([
    {
      avalaibleRoll: [],
      productListValue: { label: "", value: "" },
      avalaibleRollValue: { label: "", value: "" },
      pieces: 0,
      weight: 0,
    },
  ]);
  const [gatePassIdForUpdate, setGatePassIdForUpdate] = useState(null)
  // fetchProductListSelector ,

  const [partySelectionOptions, setPartySelectionOptions] = useState([])
  const [partySelectionValue, setPartySelectionValue] = useState({})
  const [colorOptions, setColorOptions] = useState([])
  const [colorValue, setColorValue] = useState([])
  const fetchProductListSelector = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${endPoint}api/ProductList`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        var selectOptionsArr = [];
        result.map((eachProduct) => {
          selectOptionsArr.push({
            label: eachProduct.productName,
            value: eachProduct.productId,
          });
        });
        setProductListOptions(selectOptionsArr);

        setReRenderApp(!reRenderApp);
      })
      .catch((error) => console.log("error", error));
  };

  const TotalWeightPiecesFinder = async (arr_data) => {
    let totalWeight = 0;
    let totalPieces = 0;
    let totalRoll = 0;
    arr_data.map((eachItem, i) => {
      totalWeight = totalWeight + eachItem.weight;
      totalPieces = totalPieces + eachItem.pieces;
    });

    setGatePassMainState({
      ...gatePassMainState,
      total_weight: totalWeight,
      total_pieces: totalPieces,
    });
  };

  const fetchGetPO = async () => {
    var config = {
      method: "get",
      url: `${endPoint}api/GatePassNo`,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token
          }`,
      },
    };

    const poNum = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    setGatePassMainState({ ...gatePassMainStateInitial, gate_pass_no: poNum });

    fetchPartyColor()

    // setPartySelectionOptions







  };


  const fetchPartyColor = async () => {
    var configForParty = {
      method: 'get',
      url: `${endPoint}api/GetPartyList`,
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
      }
    };

    const parties = await axios(configForParty)
      .then(function (response) {
        var arrForPartyOptions = []
        response.data.map((eachParty) => {
          arrForPartyOptions.push({ label: eachParty.party_name, value: eachParty.party_id })
        })
        setPartySelectionOptions(arrForPartyOptions)
        setPartyDataFetched(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });



    var configColor = {
      method: 'get',
      url: `${endPoint}api/GetColor `,
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
      }
    };
    await axios(configColor)
      .then(function (response) {
        const arrForColorOptions = []
        response.data.map((eachColor) => {
          arrForColorOptions.push({ label: eachColor.color_name, value: eachColor.color_name })
        })
        setColorOptions(arrForColorOptions)
        setIsLoading(false)
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  const fetchRollAvailable = async (borderID, sizeID, index) => {
    var config = {
      method: "get",
      url: `${endPoint}api/GetAvailableRoll?borderID=${borderID}&sizeID=${sizeID}`,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token
          }`,
      },
    };

    const availableRollFetch = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    var selectOptionsArr = [];
    availableRollFetch.map((eachRoll) => {
      selectOptionsArr.push({
        label: eachRoll.rollNo,
        value: eachRoll.productionId,
      });
    });
    //   setAvailableRoll(selectOptionsArr)
    //   "rollNo": "220634",
    //   "productionId": 5099
    var arr_data = gatePassEntriesState;
    arr_data[index].avalaibleRoll = selectOptionsArr;
    setGatePassEntriesState(arr_data);

    setReRenderGatePass(!reRenderGatePass);
  };
  const removeItem = (i) => {
    var arr_data = gatePassEntriesState.filter((eachItem) => {
      return gatePassEntriesState.indexOf(eachItem) !== i;
    });

    // console.log("array to remove -- " ,arr_data);
    setGatePassEntriesState(arr_data);
    setReRenderGatePass(!reRenderGatePass);
    TotalWeightPiecesFinder(arr_data);
  };
  const fetchProductionRollDetail = async (prID, i) => {
    var config = {
      method: "get",
      url: `${endPoint}api/GatePassProduction?prID=${prID}`,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token
          }`,
      },
    };

    const productionData = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    var arr_data = gatePassEntriesState;

    arr_data[i].pieces = productionData.pieces;
    arr_data[i].weight = productionData.totalWeight;
    setGatePassEntriesState(arr_data);
    setReRenderGatePass(!reRenderGatePass);
  };
  const postGatePassReciept = async () => {


    var gatePassEntries = [];
    gatePassEntriesState.map((eachEntry) => {
      var splitedProductValues = eachEntry.productListValue.value.split("-"); //border - size id
      gatePassEntries.push({
        borderSize_id: splitedProductValues[1],
        borderQuality_id: splitedProductValues[0],
        roll_no: eachEntry.avalaibleRollValue.value,
        pieces: eachEntry.pieces,
        weight: eachEntry.weight,
      });
    });


console.log("---" , gatePassMainState.total_weight);

    var data = JSON.stringify({
      gate_pass_no: gatePassMainState.gate_pass_no,
      party_id: gatePassMainState.party_id,
      total_rolls: gatePassEntriesState.length,
      total_pieces: gatePassMainState.total_pieces,
      total_sharing_weight: gatePassMainState.total_sharing_weight,
      color: colorValue.value,
      dying_process: gatePassMainState.dying_process,
      total_dying_weight: gatePassMainState.total_dying_weight,
      remarks: gatePassMainState.remarks,
      driver_name: gatePassMainState.driver_name,
      vehicle_no: gatePassMainState.vehicle_no,
      time: gatePassMainState.time,
      gatePassEntries: gatePassEntries,
      total_weight: gatePassMainState.total_weight
    });

    var config = {
      method: "post",
      url: `${endPoint}api/GatePass`,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token
          }`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const gate_pass_id = await axios(config)
      .then(function (response) {
        console.log(response);
        setGatePassEntriesState([
          {
            avalaibleRoll: [],
            productListValue: { label: "", value: "" },
            avalaibleRollValue: { label: "", value: "" },
            pieces: 0,
            weight: 0,
          },
        ]);
        setGatePassMainState(gatePassMainStateInitial);
        fetchGetPO();
        setColorValue({ label: "", value: "" })
        setPartySelectionValue({ label: "", value: "" })
        return response.data.gate_pass_id;
      })
      .catch(function (error) {
        console.log(error);
      });
    return gate_pass_id;
  };
  const updateGatePass = () => {


    var gatePassEntries = [];
    gatePassEntriesState.map((eachEntry) => {
      var splitedProductValues = eachEntry.productListValue.value.split("-"); //border - size id
      gatePassEntries.push({
        borderSize_id: splitedProductValues[1],
        borderQuality_id: splitedProductValues[0],
        roll_no: eachEntry.avalaibleRollValue.value,
        pieces: eachEntry.pieces,
        weight: eachEntry.weight,
      });
    });

    var data = JSON.stringify({
      "gate_pass_no": "string", //its doesnot change
      "party_id": gatePassMainState.party_id,
      "total_rolls": gatePassEntriesState.length,
      "total_pieces": gatePassMainState.total_pieces,
      "total_sharing_weight": gatePassMainState.total_sharing_weight,
      "color": colorValue.value,
      "dying_process": gatePassMainState.dying_process,
      "total_dying_weight": gatePassMainState.total_dying_weight,
      "remarks": gatePassMainState.remarks,
      "driver_name": gatePassMainState.driver_name,
      "vehicle_no": gatePassMainState.vehicle_no,
      "time": gatePassMainState.time,
      "gatePassEntries": gatePassEntries
    });

    var config = {
      method: 'put',
      url: `${endPoint}api/UpdateGatePass?id=${gatePassIdForUpdate}`,
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token
          }`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  useEffect(() => {
    // write here async func  
    fetchProductListSelector();


    if (state !== null) {

      const doThis = async () => {
        setIsUpdatingState(true)
        await fetchPartyColor()
        setGatePassIdForUpdate(state.data.gatePassID)
        setColorValue({ label: state.data.color, value: state.data.color })
        // const colorValueObj = await colorOptions.filter((eachColor) => {
        //   return eachColor.label === state.data.color
        // });
        // console.log(colorValueObj[0]); 

        let entriesToBeUpdated = [];
        state.data.entires.map((EachEntry) => {
          entriesToBeUpdated.push({
            avalaibleRoll: [],
            productListValue: { label: `${EachEntry.border}-${EachEntry.size}`, value: `${EachEntry.borderQuality_id}-${EachEntry.borderSize_id}` },
            avalaibleRollValue: EachEntry.rollNo,
            pieces: EachEntry.pieces,
            weight: EachEntry.weight,
          })
        })

        setGatePassEntriesState(entriesToBeUpdated)

        setPartySelectionValue({ label: state.data.partyName, value: state.data.partyId })




        setGatePassMainState({
          gate_pass_no: state.data.poNo,
          total_weight:   state.data.totalWeight,
          party_id: state.data.partyId,
          party_name: state.data.partyName,
          party_address: state.data.partyAddress,
          party_cell: state.data.partyCell,
          total_rolls: state.data.totalRolls,
          total_pieces: state.data.totalPieces, 
          total_sharing_weight: state.data.totalSharingWeight,
          color: colorValue,
          dying_process: state.data.dyingProceess,
          total_dying_weight: state.data.dyingWeight,
          remarks: state.data.remarks,
          driver_name: state.data.driverName,
          vehicle_no: state.data.vehicleNumb,
          time: state.data.time,
        })

        setIsLoading(false)

      }

      doThis()

    } else {
      fetchGetPO();
    }

    fetchProductListSelector()




  }, []);
  // useEffect(() => {

  // }, [gatePassEntriesState]);

  return (




    <div
      role="main"
      className={`top_nav bg-light p-1 px-3 heightForGatePassForm ${showNavMenu == false ? "right_col-margin-remove" : " "
        }  `}
    >

      {
        isLoading ? <> <Loader />  </> : <>
          <div className="x_panel p ">
            <div className="x_title">
              <h2 className="pl-2 pt-2">Gate Pass Form</h2>
              <ul className="nav navbar-right panel_toolbox d-flex justify-content-end"></ul>
              <div className="clearfix" />
            </div>
            <div className="x_content my-3">
              <form>
                <div className="row">
                  <div className="col-md-3 px-0  ">
                    <label className="col-form-label col-md-3 col-sm-3  offset-md-1 label-align">
                      PO#
                    </label>
                    <div className="col-md-8 col-sm-8">
                      <input
                        className="form-control form-control-sm"
                        value={gatePassMainState.gate_pass_no}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-5 px-0  ">
                    {" "}
                    <div className="field item form-group">
                      <label className="col-form-label col-md-4 col-sm-4  label-align">
                        Select Party
                      </label>
                      <div className="col-md-8 col-sm-8">
                        {/* <input
                      type="text"
                      className="form-control"
                      placeholder="Mecio Textile ..."
                      value={gatePassMainState.party_name}
                      onChange={(e) => {
                        setGatePassMainState({
                          ...gatePassMainState,
                          party_name: e.target.value,
                        });
                      }}
                    /> */}
                        <Select
                          required
                          className="basic-single"
                          classNamePrefix="select"
                          value={partySelectionValue}
                          onChange={(e) => {
                            setGatePassValidation({ ...gatePassValidation, partyName: true })
                            const selectedParty = partyDataFetched.filter((eachParty) => {
                              return eachParty.party_id === e.value;
                            })
                            setGatePassMainState({
                              ...gatePassMainState, party_address: selectedParty[0].party_address, party_cell: selectedParty[0].party_cell, party_id: e.value, party_name: e.label,
                            })

                            setPartySelectionValue(e)


                          }}
                          isSearchable={true}
                          name="color"
                          options={partySelectionOptions}
                          styles={gatePassValidation.partyName ? customStyles : customStylesDanger}

                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 px-0">
                    <div className="field item form-group">
                      <label className="col-form-label col-md-2 col-sm-2  label-align">
                        Cell #
                      </label>
                      <div className="col-md-9 col-sm-9">
                        <input
                          disabled
                          type="number"
                          className="form-control"
                          placeholder="Auto Select e-g 034567832"
                          onKeyPress={(e) => preventMinus(e)}
                          min="0"
                          onInput={(er) =>
                            (er.target.value = er.target.value.slice(0, 11))
                          }
                          value={gatePassMainState.party_cell}
                          onChange={(e) => {
                            setGatePassMainState({
                              ...gatePassMainState,
                              party_cell: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 px-0  ">
                    <div className="col-md-1 text-right  ">
                      <label className="col-form-label   offset-md-1 label-align">
                        Address
                      </label>
                    </div>
                    <div className="col-md-11 col-sm-11 pr-5 ">
                      <input
                        className="form-control form-control-sm w-100  "
                        type="text"
                        placeholder="Auto Select e-g. Faisalabad Sadar Pubjab Pakistan"
                        value={gatePassMainState.party_address}
                        onChange={(e) => {



                          setGatePassMainState({
                            ...gatePassMainState,
                            party_address: e.target.value,
                          });
                        }}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </form>

              {/* ---------------table */}

              <div className="x_content mt-2">
                <div
                  className="table-responsive px-2"
                  style={{ overflowX: "unset" }}
                >
                  <table className="table   jambo_table bulk_action ">
                    <thead>
                      {" "}
                      <tr className="headings-for-Production-Form-Shif ">
                        <th
                          className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                                         removeLeftBorder  removeTopBorder text-center fontWeight300"
                          style={{ width: "5%" }}
                        >
                          <div className="  d-flex justify-content-center ">
                            Sr
                          </div>
                        </th>
                        <th
                          className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                                         removeLeftBorder  removeTopBorder text-center fontWeight300"
                          style={{ width: "25%" }}
                        >
                          <div className="  d-flex justify-content-center ">
                            Select Product
                          </div>
                        </th>
                        <th
                          className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                                         removeLeftBorder  removeTopBorder text-center fontWeight300"
                          style={{ width: "25%" }}
                        >
                          <div className="  d-flex justify-content-center ">
                            Select Roll
                          </div>
                        </th>
                        <th
                          className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                                         removeLeftBorder  removeTopBorder text-center fontWeight300"
                          style={{ width: "20%" }}
                        >
                          <div className="  d-flex justify-content-center ">
                            Pieces
                          </div>
                        </th>
                        <th
                          className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                                         removeLeftBorder  removeTopBorder text-center fontWeight300"
                          style={{ width: "20%" }}
                        >
                          <div className="  d-flex justify-content-center ">
                            Weight
                          </div>
                        </th>
                        <th
                          className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                                         removeLeftBorder  removeTopBorder text-center fontWeight300"
                          style={{ width: "5%" }}
                        >
                          <div className="  d-flex justify-content-center ">
                            Action
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {gatePassEntriesState.map((eachEntry, i) => {
                        return (
                          <tr className="headings-for-Production-Form-Shif ">
                            <td
                              className="column-title     text-center  p-0 px-1"
                              style={{
                                paddingRight: "2px",
                                paddingLeft: "2px",
                              }}
                            >
                              <div className="  text-center">
                                <input
                                  value={i + 1}
                                  className="form-control text-right"
                                  type="number"
                                  placeholder="Pieces"
                                  disabled={true}
                                />
                              </div>
                            </td>
                            <td
                              className="column-title     text-center  p-0 px-1"
                              style={{
                                width: "10%",
                                paddingRight: "2px",
                                paddingLeft: "2px",
                              }}
                            >
                              <div className=" ">
                                <Select
                                  className="basic-single"
                                  classNamePrefix="select"
                                  setProductListValue
                                  value={gatePassEntriesState[i].productListValue}
                                  onChange={(value) => {
                                    setGatePassValidation({ ...gatePassValidation, product: true })
                                    //  setProductListValue({label:value.label ,value:value.value })

                                    var arr_data = gatePassEntriesState;
                                    arr_data[i].productListValue = {
                                      label: value.label,
                                      value: value.value,
                                    };
                                    arr_data[i].avalaibleRollValue = {
                                      label: "",
                                      value: "",
                                    };
                                    arr_data[i].pieces = 0;
                                    arr_data[i].weight = 0;

                                    setGatePassEntriesState(arr_data);
                                    setReRenderApp(!reRenderApp);
                                    var splitedProductValues =
                                      value.value.split("-"); //border - size id
                                    fetchRollAvailable(
                                      splitedProductValues[0],
                                      splitedProductValues[1],
                                      i
                                    );

                                    // TotalWeightPiecesFinder();
                                  }}
                                  isSearchable={true}
                                  options={productListOptions}
                                  styles={gatePassValidation.product ? customStyles : customStylesDanger}
                                />

                                {/*
                       */}
                              </div>
                            </td>
                            <td
                              className="column-title     text-center  p-0 px-1"
                              style={{
                                paddingRight: "2px",
                                paddingLeft: "2px",
                              }}
                            >
                              <div className=" ">
                                <Select
                                  className="basic-single"
                                  classNamePrefix="select"
                                  value={gatePassEntriesState[i].avalaibleRollValue}
                                  onChange={async (value) => {
                                    setGatePassValidation({ ...gatePassValidation, product: true })
                                    await fetchProductionRollDetail(value.value, i);
                                    var arr_data = gatePassEntriesState;
                                    arr_data[i].avalaibleRollValue = {
                                      label: value.label,
                                      value: value.value,
                                    };
                                    setGatePassEntriesState(arr_data);
                                    setReRenderApp(!reRenderApp);
                                    await TotalWeightPiecesFinder(arr_data);
                                  }}
                                  isSearchable={true}
                                  options={gatePassEntriesState[i].avalaibleRoll}
                                  styles={gatePassValidation.product ? customStyles : customStylesDanger}
                                />

                              </div>
                            </td>
                            <td
                              className="column-title     text-center  p-0 px-1"
                              style={{
                                paddingRight: "2px",
                                paddingLeft: "2px",
                              }}
                            >
                              <div className=" ">
                                <input
                                  value={gatePassEntriesState[i].pieces}
                                  className="form-control text-right"
                                  type="number"
                                  placeholder="Pieces"
                                  disabled={true}
                                />
                              </div>
                            </td>
                            <td
                              className="column-title     text-center  p-0 px-1"
                              style={{
                                paddingRight: "2px",
                                paddingLeft: "2px",
                              }}
                            >
                              <div className=" ">
                                <input
                                  value={gatePassEntriesState[i].weight}
                                  placeholder="Weight"
                                  className="form-control text-right"
                                  type="text"
                                  disabled={true}
                                />
                              </div>
                            </td>
                            <td
                              className="column-title     text-center  p-0 px-1"
                              style={{
                                paddingRight: "2px",
                                paddingLeft: "2px",
                              }}
                            >
                              <div className=" ">
                                <i
                                  className="fa fa-trash mt-2 text-danger"
                                  onClick={() => removeItem(i)}
                                ></i>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="headings-for-Production-Form-Shif ">
                        <td
                          colSpan="3  "
                          className="column-title     text-center  p-0 px-1"
                          style={{
                            paddingRight: "2px",
                            paddingLeft: "2px",
                          }}
                        >
                          <div className="  text-center">
                            <input
                              className="form-control removeFormControlBorder text-right"
                              type="number"
                              placeholder="Grand Total"
                              disabled={true}
                            />
                          </div>
                        </td>

                        <td
                          className="column-title     text-center  p-0 px-1"
                          style={{
                            paddingRight: "2px",
                            paddingLeft: "2px",
                          }}
                        >
                          <div className=" ">
                            <input
                              value={gatePassMainState.total_pieces} className="form-control" type="number" placeholder="Pieces" disabled={true} />
                          </div>
                        </td>
                        <td
                          className="column-title     text-center  p-0 px-1"
                          style={{
                            paddingRight: "2px",
                            paddingLeft: "2px",
                          }}
                        >
                          <div className=" ">
                            <input
                              value={gatePassMainState.total_weight}
                              placeholder="Weight"
                              className="form-control"
                              type="text"
                              disabled={true}
                            />
                          </div>
                        </td>
                        <td
                          className="column-title     text-center  p-0 px-1"
                          style={{
                            paddingRight: "2px",
                            paddingLeft: "2px",
                          }}
                        >
                          <div className=" "></div>
                        </td>
                      </tr>
                      <button
                        className="btn btn-sm btn-primary round-circle-full ml-1"
                        onClick={() => {
                          setGatePassEntriesState([
                            ...gatePassEntriesState,
                            {
                              avalaibleRoll: [],
                              productListValue: { label: "", value: "" },
                              avalaibleRollValue: { label: "", value: "" },
                              pieces: 0,
                              weight: 0,
                            },
                          ]);
                        }}
                      >
                        +
                      </button>
                    </tbody>
                  </table>

                  <div className="row">
                    <div className="col-md-4 px-0  ">
                      <label className="col-form-label col-md-3 col-sm-3  offset-md-1 label-align">
                        Total Roll
                      </label>
                      <div className="col-md-8 col-sm-8">
                        <input
                          className="form-control form-control-sm text-right px-2"
                          value={gatePassEntriesState.length}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-md-8 px-0">
                      <div className="field item form-group">
                        <label className="col-form-label col-md-4 col-sm-4  label-align">
                          Total Sharing Weight
                        </label>
                        <div className="col-md-8 col-sm-8 pr-3">
                          <input
                            type="number"
                            className="form-control    px-2"
                            onKeyPress={(e) => preventMinus(e)}
                            min="0"
                            value={gatePassMainState.total_sharing_weight}
                            onChange={(e) => {
                              setGatePassMainState({
                                ...gatePassMainState,
                                total_sharing_weight: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 px-0  ">
                      <label className="col-form-label col-md-3 col-sm-3  offset-md-1 label-align">
                        Color
                      </label>
                      <div className="col-md-8 col-sm-8">
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          value={colorValue}
                          onChange={(value) => {
                            setColorValue(value)
                          }}
                          isSearchable={true}
                          options={colorOptions}
                          styles={customStyles}
                        />
                      </div>
                    </div>

                    <div className="col-md-4 px-0">
                      <div className="field item form-group">
                        <label className="col-form-label col-md-4 col-sm-4  label-align">
                          Dying Process
                        </label>
                        <div className="col-md-8 col-sm-8 pr-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Dying Process ..."
                            value={gatePassMainState.dying_process}
                            onChange={(e) => {
                              setGatePassMainState({
                                ...gatePassMainState,
                                dying_process: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 px-0">
                      <div className="field item form-group">
                        <label className="col-form-label col-md-4 col-sm-4  label-align">
                          Dying Weight
                        </label>
                        <div className="col-md-8 col-sm-8 pr-3">
                          <input
                            type="number"
                            className="form-control   px-2"
                            placeholder="Mexico Textile ..."
                            min="0"
                            value={gatePassMainState.total_dying_weight}
                            onChange={(e) => {
                              setGatePassMainState({
                                ...gatePassMainState,
                                total_dying_weight: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-8 px-0  ">
                      <label className="col-form-label col-md-1 col-sm-1 offset-md-1 label-align">
                        Remarks
                      </label>
                      <div className="col-md-10 col-sm-10">
                        <textarea
                          id="message"
                          required="required"
                          className="form-control px-2"
                          style={{
                            width: "947px  ",
                            fontWeight: "500",
                          }}
                          name="message"
                          data-parsley-trigger="keyup"
                          data-parsley-minlength={20}
                          data-parsley-maxlength={100}
                          data-parsley-validation-threshold={100}
                          defaultValue={""}
                          placeholder="Remarks"
                          value={gatePassMainState.remarks}
                          onChange={(e) => {
                            setGatePassMainState({
                              ...gatePassMainState,
                              remarks: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-4 px-0  ">
                      <label className="col-form-label col-md-3 col-sm-3  offset-md-1 label-align">
                        Driver_Name
                      </label>
                      <div className="col-md-8 col-sm-8">
                        <input

                          className={gatePassValidation.driver ? `form-control form-control-sm` : "form-control form-control-sm requiredValidateInput"}
                          value={gatePassMainState.driver_name}
                          onChange={(e) => {
                            setGatePassValidation({ ...gatePassValidation, driver: true })
                            setGatePassMainState({
                              ...gatePassMainState,
                              driver_name: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-4 px-0">
                      <div className="field item form-group">
                        <label className="col-form-label col-md-4 col-sm-4  label-align">
                          Vehicle_Num:
                        </label>
                        <div className="col-md-8 col-sm-8 pr-3">
                          <input
                            className="form-control form-control-sm"
                            value={gatePassMainState.vehicle_no}
                            onChange={(e) => {
                              setGatePassMainState({
                                ...gatePassMainState,
                                vehicle_no: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 px-0">
                      <div className="field item form-group">
                        <label className="col-form-label col-md-4 col-sm-4  label-align">
                          Date :
                        </label>
                        <div className="col-md-8 col-sm-8 pr-3">
                          <input
                            type="date"
                            className="form-control"
                            value={dateToday}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row  d-none ">
                    <div className="col-md-4 px-0  ">
                      <label className=" col-form-label col-md-3 col-sm-3  offset-md-1 label-align">
                        Incharge_Sign
                      </label>
                      <div className="col-md-8 col-sm-8">
                        <input
                          className="form-control form-control-sm"
                          disabled={true}
                        />
                      </div>
                    </div>

                    <div className="col-md-4 px-0">
                      <div className="field item form-group">
                        <label className="col-form-label col-md-4 col-sm-4  label-align">
                          Driver_Sign
                        </label>
                        <div className="col-md-8 col-sm-8 pr-3">
                          <input
                            type="text"
                            className="form-control"
                            disabled={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 px-0">
                      <div className="field item form-group">
                        <label className="col-form-label col-md-4 col-sm-4  label-align">
                          Guard_Sign
                        </label>
                        <div className="col-md-8 col-sm-8 pr-3">
                          <input
                            type="number"
                            className="form-control"
                            disabled={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-12 text-right my-2">

                      {
                        isUpdatingState ? <>
                          <button
                            className="btn btn-sm btn-success  "
                            style={{ width: "120px" }}
                            onClick={async () => {


                              var gatePassEntries = [];
                              gatePassEntriesState.map((eachEntry) => {
                                var splitedProductValues = eachEntry.productListValue.value.split("-"); //border - size id
                                var splitedProductLabel = eachEntry.productListValue.label.split("-"); //border - size id
                                gatePassEntries.push({
                                  borderSize_id: splitedProductValues[1],
                                  borderQuality_id: splitedProductValues[0],
                                  size: splitedProductLabel[1],
                                  border: splitedProductLabel[0],
                                  rollNo: eachEntry.avalaibleRollValue,
                                  pieces: eachEntry.pieces,
                                  weight: eachEntry.weight,
                                });
                              });
                              await updateGatePass()
                              const dateToParseNAvigation = {
                                gate_pass_no: gatePassMainState.gate_pass_no,
                                party_id: gatePassMainState.party_id,
                                partyName: gatePassMainState.party_name,
                                party_cell: gatePassMainState.party_cell,
                                party_address: gatePassMainState.party_address,
                                total_rolls: gatePassEntriesState.length,
                                total_pieces: gatePassMainState.total_pieces,
                                total_sharing_weight: gatePassMainState.total_sharing_weight,
                                color: colorValue.value,
                                color_name: colorValue.label,
                                dying_process: gatePassMainState.dying_process,
                                total_dying_weight: gatePassMainState.total_dying_weight,
                                remarks: gatePassMainState.remarks,
                                driver_name: gatePassMainState.driver_name,
                                vehicle_no: gatePassMainState.vehicle_no,
                                time: gatePassMainState.time,
                                gatePassEntries: gatePassEntries,
                                gatePassID: gatePassIdForUpdate
                              }

                              navigate('/GatePassReport', {
                                state: {
                                  data: dateToParseNAvigation
                                }

                              });


                              // ----------------
                              navigate(state.pathname, { replace: true });
                            }}
                          >
                            Update & View
                          </button></> : <>
                          <button
                            className="btn btn-sm btn-success  "
                            style={{ width: "110px" }}
                            onClick={() => {

                              let conditionValidatorForEntries = true;
                              gatePassEntriesState.map((eachEntry) => {
                                if (eachEntry.productListValue.value === undefined || eachEntry.productListValue.value === "" || eachEntry.productListValue.value === null || eachEntry.productListValue.value === " " ||
                                  eachEntry.avalaibleRollValue.value === undefined || eachEntry.avalaibleRollValue.value === "" || eachEntry.avalaibleRollValue.value === null || eachEntry.avalaibleRollValue.value === " ") {
                                  conditionValidatorForEntries = false
                                }
                              });
                              if (gatePassMainState.party_id === undefined || gatePassMainState.party_id === null || gatePassMainState.party_id === "") {
                                setGatePassValidation({ ...gatePassValidation, partyName: false })
                              } else if (conditionValidatorForEntries === false) {
                                setGatePassValidation({ ...gatePassValidation, product: false })
                              } else if (gatePassMainState.driver_name === undefined || gatePassMainState.driver_name === null || gatePassMainState.driver_name === "") {
                                setGatePassValidation({ ...gatePassValidation, driver: false })
                              } else {
                                postGatePassReciept();
                              }
                            }}
                          >
                            Save And New
                          </button>
                          <button
                            className="btn btn-sm btn-primary  "
                            style={{ width: "110px" }}
                            onClick={async () => {



                              let conditionValidatorForEntries = true;
                              gatePassEntriesState.map((eachEntry) => {
                                if (eachEntry.productListValue.value === undefined || eachEntry.productListValue.value === "" || eachEntry.productListValue.value === null || eachEntry.productListValue.value === " " ||
                                  eachEntry.avalaibleRollValue.value === undefined || eachEntry.avalaibleRollValue.value === "" || eachEntry.avalaibleRollValue.value === null || eachEntry.avalaibleRollValue.value === " ") {
                                  conditionValidatorForEntries = false
                                }
                              });




                              if (gatePassMainState.party_id === undefined || gatePassMainState.party_id === null || gatePassMainState.party_id === "") {
                                setGatePassValidation({ ...gatePassValidation, partyName: false })
                              } else if (conditionValidatorForEntries === false) {
                                setGatePassValidation({ ...gatePassValidation, product: false })
                              } else if (gatePassMainState.driver_name === undefined || gatePassMainState.driver_name === null || gatePassMainState.driver_name === "") {
                                setGatePassValidation({ ...gatePassValidation, driver: false })
                              } else {
                                var gatePassEntries = [];
                                gatePassEntriesState.map((eachEntry) => {
                                  var splitedProductValues = eachEntry.productListValue.value.split("-"); //border - size id
                                  var splitedProductLabel = eachEntry.productListValue.label.split("-"); //border - size id
                                  gatePassEntries.push({
                                    borderSize_id: splitedProductValues[1],
                                    borderQuality_id: splitedProductValues[0],
                                    size: splitedProductLabel[1],
                                    border: splitedProductLabel[0],
                                    rollNo: eachEntry.avalaibleRollValue,
                                    pieces: eachEntry.pieces,
                                    weight: eachEntry.weight,
                                  });
                                });
                                const gate_pass_id = await postGatePassReciept();
                                const dateToParseNAvigation = {
                                  gate_pass_no: gatePassMainState.gate_pass_no,
                                  party_id: gatePassMainState.party_id,
                                  partyName: gatePassMainState.party_name,
                                  party_cell: gatePassMainState.party_cell,
                                  party_address: gatePassMainState.party_address,
                                  total_rolls: gatePassEntriesState.length,
                                  total_pieces: gatePassMainState.total_pieces,
                                  total_sharing_weight: gatePassMainState.total_sharing_weight,
                                  color: colorValue.value,
                                  color_name: colorValue.label,
                                  dying_process: gatePassMainState.dying_process,
                                  total_dying_weight: gatePassMainState.total_dying_weight,
                                  remarks: gatePassMainState.remarks,
                                  driver_name: gatePassMainState.driver_name,
                                  vehicle_no: gatePassMainState.vehicle_no,
                                  time: gatePassMainState.time,
                                  gatePassEntries: gatePassEntries,
                                  gatePassID: gate_pass_id
                                }

                                navigate('/GatePassReport', {
                                  state: {
                                    data: dateToParseNAvigation
                                  }

                                });

                              }











                            }}
                          >
                            Save & View
                          </button>

                        </>
                      }





                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div></>
      }




    </div>
  );
};

export default GatePassForm;
