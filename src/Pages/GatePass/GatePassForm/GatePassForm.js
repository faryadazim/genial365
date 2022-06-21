import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { endPoint } from "../../../config/Config";
import axios from "axios";
import { preventMinus } from "../../../config/oreventMinus";
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

const GatePassForm = () => {
  const navigate = useNavigate();
  const notify = () => toast("Voucher Created Successfully");
  const showNavMenu = useSelector((state) => state.NavState);
  var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
  var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
  var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
  const dateToday = `${year}-${month}-${day}`;
  const [reRenderApp , setReRenderApp] = useState(false)
  const [dateSelected, setDateSelected] = useState(dateToday);
  const gatePassMainStateInitial = {
    gate_pass_no: "",
    party_name: "",
    party_cell: "",
    party_address: "",
    total_rolls: 0,
    total_pieces: 0,
    total_sharing_weight: 0,
    color: 0,
    dying_process: "",
    total_dying_weight: 0,
    remarks: "",
    driver_name: "",
    vehicle_no: "",
    time: "2022-06-21T12:00:08.951Z",
  };
  const [gatePassMainState, setGatePassMainState] = useState(
    gatePassMainStateInitial
  );
  const [productListOptions, setProductListOptions] = useState([]);
  //   const [  , setAvailableRoll] = useState([])
  const [gatePassEntriesState, setGatePassEntriesState] = useState([
    {
      avalaibleRoll: [],
      productListValue: { label: "", value: "" },
      avalaibleRollValue: { label: "", value: "" },
      roll_no: "",
      pieces: 0,
      weight: 0,
    },
  ]);
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
      })
      .catch((error) => console.log("error", error));
  };
  const fetchGetPO = async () => {
    var config = {
      method: "get",
      url: `${endPoint}api/GatePassNo`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
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
  };
  const fetchRollAvailable = async (borderID, sizeID, index) => {
    var config = {
      method: "get",
      url: `${endPoint}api/GetAvailableRoll?borderID=${borderID}&sizeID=${sizeID}`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
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
  };
  useEffect(() => {
    fetchGetPO();
    fetchProductListSelector();
  }, []);

  return (
    <div
      role="main"
      className={`top_nav bg-light p-1 px-3 heightForJV ${
        showNavMenu == false ? "right_col-margin-remove" : " "
      }  `}
    >
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
                    Enter Party Name
                  </label>
                  <div className="col-md-8 col-sm-8">
                    <input
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
                      type="number"
                      className="form-control"
                      placeholder="Mecio Textile ..."
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
                    placeholder="Ex. Faisalabad Sadar Pubjab Pakistan"
                    value={gatePassMainState.party_address}
                    onChange={(e) => {
                      setGatePassMainState({
                        ...gatePassMainState,
                        party_address: e.target.value,
                      });
                    }}
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
                      style={{ width: "40%" }}
                    >
                      <div className=" py-1 d-flex justify-content-center ">
                        Select Product
                      </div>
                    </th>
                    <th
                      className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                                         removeLeftBorder  removeTopBorder text-center fontWeight300"
                      style={{ width: "20%" }}
                    >
                      <div className=" py-1 d-flex justify-content-center ">
                        Select Roll
                      </div>
                    </th>
                    <th
                      className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                                         removeLeftBorder  removeTopBorder text-center fontWeight300"
                      style={{ width: "20%" }}
                    >
                      <div className=" py-1 d-flex justify-content-center ">
                        Pieces
                      </div>
                    </th>
                    <th
                      className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                                         removeLeftBorder  removeTopBorder text-center fontWeight300"
                      style={{ width: "20%" }}
                    >
                      <div className=" py-1 d-flex justify-content-center ">
                        Weight
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
                            width: "10%",
                            paddingRight: "2px",
                            paddingLeft: "2px",
                          }}
                        >
                          <div className=" py-1">
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              setProductListValue
                              value={gatePassEntriesState[i].productListValue}
                              onChange={(value) => {
                                //  setProductListValue({label:value.label ,value:value.value })

                                var arr_data = gatePassEntriesState;
                                arr_data[i].productListValue = {
                                  label: value.label,
                                  value: value.value,
                                };
                                setGatePassEntriesState(arr_data);
                                setReRenderApp(!reRenderApp)
                                var splitedProductValues =
                                  value.value.split("-"); //border - size id
                                fetchRollAvailable(
                                  splitedProductValues[0],
                                  splitedProductValues[1],
                                  i
                                );
                              }}
                              isSearchable={true}
                              options={productListOptions}
                              styles={customStyles}
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
                          <div className=" py-1">
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              value={gatePassEntriesState[i].avalaibleRollValue}
                              onChange={(value) => {
                                var arr_data = gatePassEntriesState;
                                arr_data[i].avalaibleRollValue = {
                                  label: value.label,
                                  value: value.value,
                                };
                                setGatePassEntriesState(arr_data);
                                setReRenderApp(!reRenderApp)
                              }}
                              isSearchable={true}
                              options={gatePassEntriesState[i].avalaibleRoll}
                              styles={customStyles}
                            />

                            {/*  
                              onChange={(value) => {
                            //  setProductListValue({label:value.label ,value:value.value })



                            var arr_data = gatePassEntriesState;
                            arr_data[i].productListValue = {label:value.label ,value:value.value };
                            setGatePassEntriesState(arr_data);   */}
                          </div>
                        </td>
                        <td
                          className="column-title     text-center  p-0 px-1"
                          style={{
                            paddingRight: "2px",
                            paddingLeft: "2px",
                          }}
                        >
                          <div className=" py-1">
                            <input
                              className="form-control"
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
                          <div className=" py-1">
                            <input
                              className="form-control"
                              type="text"
                              disabled={true}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  <button
                    className="btn btn-sm btn-primary round-circle-full ml-1"
                    onClick={() => {
                      setGatePassEntriesState([
                        ...gatePassEntriesState,
                        {
                            avalaibleRoll: [],
                            productListValue: { label: "", value: "" },
                            avalaibleRollValue: { label: "", value: "" },
                            roll_no: "",
                            pieces: 0,
                            weight: 0,
                          }
                      ]);
                    }}
                  >
                    +
                  </button>
                </tbody>
              </table>
              <div className="row ">
                <div className="col-md-12 text-right my-2">
                  <button
                    className="btn btn-sm btn-success  "
                    style={{ width: "110px" }}
                  >
                    Save And New
                  </button>
                  <button
                    className="btn btn-sm btn-primary  "
                    style={{ width: "110px" }}
                    onClick={() => {
                      fetchProductListSelector();
                    }}
                  >
                    Save & View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GatePassForm;
