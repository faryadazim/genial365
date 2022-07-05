import React, { useState, useEffect } from "react";
import { endPoint } from "../../../config/Config";

import Select from "react-select";

import { useSelector } from "react-redux";
import Loader from "../../../Layout/Loader/Loader";
import AddNewGrayProductList from "./AddNewGrayProductList";
import UpdateGrayProduct from "./UpdateGrayProduct";
import "./GrayProductList.css";
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

    ...base,
    boxShadow: "none",
  }),
  // option: (provided, state) => ({
  //     ...provided,

  //     borderBottom: "1px  #003a4d",
  //     color: state.isSelected ? "#f79c74" : "#003a4d",
  //     background: '#fff',

  // }),
  // menu: base => ({
  //     ...base,
  //     // override border radius to match the box
  //     borderRadius: 0,
  //     backgroundColor: 'red',
  //     marginTop: 0
  //   }),
  //   menuList: base => ({
  //     ...base,
  //     // kill the white space on first and last option
  //     backgroundColor: 'red',
  //     padding: 0
  //   }),
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



const GrayProductList = () => {
  const url = localStorage.getItem("authUser");
  const showNavMenu = useSelector((state) => state.NavState);
  const [ListOfGrayProduct, setListOfGrayProduct] = useState([]);
  const [listOfGrayProductConst , setListOfGrayProductConst] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [modalShowForUpdate, setModalShowForUpdate] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const addNewGrayProductValidatorInitialState = {
    itemName: true,
    itemSize: true,
    PerPieceGrayWeightGram: true,
    graySizeppWidth: true,
    graySizeppLength: true,
    LoomNumbPieceInBorder76: true,
    LoomNumbRatePerBorderWithDraw76: true,
    LoomNumbRatePerBorderWithoutDraw76: true,
    LoomNumbPieceInBorder96: true,
    LoomNumbRatePerBorderWithDraw96: true,
    LoomNumbRatePerBorderWithoutDraw96: true,
    status: true,
  };
  const [productSortingSelectorOptions , setProductSortingSelectorOptions] = useState([{label:"All Products" , value:"All" } ,{label:"Activate Products" , value:"Activate" } ,{label:"Deactivate Product" , value:"Deactivate" } ,])
  const [productSortingSelectorValue ,setProductSortingSelectorValue ] = useState(productSortingSelectorOptions[0])
  const [addNewGrayProductValidator, setaddNewGrayProductValidator] = useState(
    addNewGrayProductValidatorInitialState
  );
  const initialUpdatedValidation = {
    PerPieceGrayWeightGram: true,
    graySizeppWidth: true,
    graySizeppLength: true,
    LoomNumbPieceInBorder76: true,
    LoomNumbRatePerBorderWithDraw76: true,
    LoomNumbRatePerBorderWithoutDraw76: true,
    LoomNumbPieceInBorder96: true,
    LoomNumbRatePerBorderWithDraw96: true,
    LoomNumbRatePerBorderWithoutDraw96: true,
    status: true,
    nativingRate76: true,
    nativingRate96: true,
  };
  const [
    updatedGrayProductListValidation,
    setUpdatedGrayProductListValidation,
  ] = useState(initialUpdatedValidation);
  const newProductInitialState = {
    itemName: "",
    itemSize: "",
    PerPieceGrayWeightGram: "",
    graySizeppWidth: "",
    graySizeppLength: "",
    LoomNumbPieceInBorder76: "",
    LoomNumbRatePerBorderWithDraw76: "",
    LoomNumbRatePerBorderWithoutDraw76: "",
    LoomNumbPieceInBorder96: "",
    LoomNumbRatePerBorderWithDraw96: "",
    LoomNumbRatePerBorderWithoutDraw96: "",
    status: "",
  };
  const [AddNewProduct, setAddNewProduct] = useState(newProductInitialState);
  const [updatedGrayProductList, setUpdatedGrayProductList] = useState({});
  const [itemNameOptions, setItemNameOptions] = useState([]);
  const [itemSizeOptions, setItemSizeOptions] = useState([]);

  const itemStatusOptions = [
    { label: "Activate", value: "Activate" },
    { label: "Deactivate", value: "Deactivate" },
  ];

  const fetchAllData = () => {
    fetch(url + "api/grayProductLists")
      .then((response) => response.json())
      .then((json) => {
        fetch(url + "api/BorderQuality", {
          method: "GET",
          headers: {
            // Authorization: "bearer" + " " + e,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            var arr = [];
            data.map((item) => {
              arr.push({
                label: item.borderQuality1,
                value: item.borderQuality_id,
              });
            });

            setItemNameOptions(arr);
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
            var arr2 = [];
            data.map((item) => {
              arr2.push({
                label: item.borderSize1,
                value: item.borderSize_id,
              });
            });

            setItemSizeOptions(arr2);
            setisLoading(false);
          });

         
 
        setListOfGrayProduct(json);
        setListOfGrayProductConst(json)
      });
  };

  const AddNewProductFunc = () => {
    if (AddNewProduct.itemName == "") {
      setaddNewGrayProductValidator({
        ...addNewGrayProductValidator,
        itemName: false,
      });
    } else if (AddNewProduct.itemSize == "") {
      setaddNewGrayProductValidator({
        ...addNewGrayProductValidator,
        itemSize: false,
      });
    } else if (AddNewProduct.PerPieceGrayWeightGram == "") {
      setaddNewGrayProductValidator({
        ...addNewGrayProductValidator,
        PerPieceGrayWeightGram: false,
      });
    } else if (AddNewProduct.graySizeppWidth == "") {
      setaddNewGrayProductValidator({
        ...addNewGrayProductValidator,
        graySizeppWidth: false,
      });
    } else if (AddNewProduct.graySizeppLength == "") {
      setaddNewGrayProductValidator({
        ...addNewGrayProductValidator,
        graySizeppLength: false,
      });
    } else if (AddNewProduct.LoomNumbPieceInBorder76 == "") {
      setaddNewGrayProductValidator({
        ...addNewGrayProductValidator,
        LoomNumbPieceInBorder76: false,
      });
    } else if (AddNewProduct.LoomNumbRatePerBorderWithDraw76 == "") {
      setaddNewGrayProductValidator({
        ...addNewGrayProductValidator,
        LoomNumbRatePerBorderWithDraw76: false,
      });
    } else if (AddNewProduct.LoomNumbRatePerBorderWithoutDraw76 == "") {
      setaddNewGrayProductValidator({
        ...addNewGrayProductValidator,
        LoomNumbRatePerBorderWithoutDraw76: false,
      });
    } else if (AddNewProduct.LoomNumbPieceInBorder96 == "") {
      setaddNewGrayProductValidator({
        ...addNewGrayProductValidator,
        LoomNumbPieceInBorder96: false,
      });
    } else if (AddNewProduct.LoomNumbRatePerBorderWithDraw96 == "") {
      setaddNewGrayProductValidator({
        ...addNewGrayProductValidator,
        LoomNumbRatePerBorderWithDraw96: false,
      });
    } else if (AddNewProduct.LoomNumbRatePerBorderWithoutDraw96 == "") {
      setaddNewGrayProductValidator({
        ...addNewGrayProductValidator,
        LoomNumbRatePerBorderWithoutDraw96: false,
      });
    } else if (AddNewProduct.status == "") {
      setaddNewGrayProductValidator({
        ...addNewGrayProductValidator,
        status: false,
      });
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(AddNewProduct),
      };
      fetch(url + "api/grayProductLists", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          fetchAllData();
          setModalShow(false);
          setAddNewProduct(newProductInitialState);
          setaddNewGrayProductValidator(addNewGrayProductValidatorInitialState);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };
  const deleteGrayProduct = (e) => {
    fetch(`${endPoint}/api/grayProductLists/${e}`, {
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
        // deleteing Role for this Id

        fetchAllData();
      })
      .catch((error) => console.log("error", error));
  };
  const updateGrayProductList = (e) => {
    e.preventDefault();
    if (
      updatedGrayProductList.PerPieceGrayWeightGram === "" ||
      updatedGrayProductList.PerPieceGrayWeightGram === null ||
      updatedGrayProductList.PerPieceGrayWeightGram === undefined
    ) {
      setUpdatedGrayProductListValidation({
        ...updatedGrayProductListValidation,
        PerPieceGrayWeightGram: false,
      });
    } else if (
      updatedGrayProductList.graySizeppWidth === "" ||
      updatedGrayProductList.graySizeppWidth === null ||
      updatedGrayProductList.graySizeppWidth === undefined
    ) {
      setUpdatedGrayProductListValidation({
        ...updatedGrayProductListValidation,
        graySizeppWidth: false,
      });
    } else if (
      updatedGrayProductList.graySizeppLength === "" ||
      updatedGrayProductList.graySizeppLength === null ||
      updatedGrayProductList.graySizeppLength === undefined
    ) {
      setUpdatedGrayProductListValidation({
        ...updatedGrayProductListValidation,
        graySizeppLength: false,
      });

      // loom number piece
    } else if (
      (updatedGrayProductList.LoomNumbPieceInBorder76 === null ||
        updatedGrayProductList.LoomNumbPieceInBorder76 === "") &&
      (updatedGrayProductList.LoomNumbPieceInBorder96 === null ||
        updatedGrayProductList.LoomNumbPieceInBorder96 === "")
    ) {
      setUpdatedGrayProductListValidation({
        ...updatedGrayProductListValidation,
        LoomNumbPieceInBorder76: false,
        LoomNumbPieceInBorder96: false,
      });
      // loom number piece
    } else if (
      (updatedGrayProductList.LoomNumbRatePerBorderWithDraw76 === null ||
        updatedGrayProductList.LoomNumbRatePerBorderWithDraw76 === "") &&
      (updatedGrayProductList.LoomNumbRatePerBorderWithDraw96 === null ||
        updatedGrayProductList.LoomNumbRatePerBorderWithDraw96 === "")
    ) {
      if (
        updatedGrayProductList.LoomNumbPieceInBorder76 === null ||
        updatedGrayProductList.LoomNumbPieceInBorder76 == undefined ||
        updatedGrayProductList.LoomNumbPieceInBorder76 == ""
      ) {
        setUpdatedGrayProductListValidation({
          ...updatedGrayProductListValidation,

          LoomNumbRatePerBorderWithDraw96: false,
        });
      } else if (
        updatedGrayProductList.LoomNumbPieceInBorder96 === null ||
        updatedGrayProductList.LoomNumbPieceInBorder96 == "" ||
        updatedGrayProductList.LoomNumbPieceInBorder96 == ""
      ) {
        setUpdatedGrayProductListValidation({
          ...updatedGrayProductListValidation,

          LoomNumbRatePerBorderWithDraw76: false,
        });
      } else {
        setUpdatedGrayProductListValidation({
          ...updatedGrayProductListValidation,

          LoomNumbRatePerBorderWithDraw76: false,
          LoomNumbRatePerBorderWithDraw96: false,
        });
      }

      // loom number piece
    } else if (
      (updatedGrayProductList.LoomNumbRatePerBorderWithoutDraw76 === null ||
        updatedGrayProductList.LoomNumbRatePerBorderWithoutDraw76 ===
          undefined ||
        updatedGrayProductList.LoomNumbRatePerBorderWithoutDraw76 === "") &&
      (updatedGrayProductList.LoomNumbRatePerBorderWithoutDraw96 === null ||
        updatedGrayProductList.LoomNumbRatePerBorderWithoutDraw76 ===
          undefined ||
        updatedGrayProductList.LoomNumbRatePerBorderWithoutDraw96 === "")
    ) {
      if (
        updatedGrayProductList.LoomNumbPieceInBorder76 === null ||
        updatedGrayProductList.LoomNumbPieceInBorder76 == undefined ||
        updatedGrayProductList.LoomNumbPieceInBorder76 == ""
      ) {
        setUpdatedGrayProductListValidation({
          ...updatedGrayProductListValidation,

          LoomNumbRatePerBorderWithoutDraw96: false,
        });
      } else if (
        updatedGrayProductList.LoomNumbPieceInBorder96 === null ||
        updatedGrayProductList.LoomNumbPieceInBorder96 == "" ||
        updatedGrayProductList.LoomNumbPieceInBorder96 == ""
      ) {
        setUpdatedGrayProductListValidation({
          ...updatedGrayProductListValidation,

          LoomNumbRatePerBorderWithoutDraw76: false,
        });
      } else {
        setUpdatedGrayProductListValidation({
          ...updatedGrayProductListValidation,
          LoomNumbRatePerBorderWithoutDraw96: false,
          LoomNumbRatePerBorderWithoutDraw76: false,
        });
      }

      // --
    } else if (
      (updatedGrayProductList.nativingRate76 === null ||
        updatedGrayProductList.nativingRate76 === "") &&
      (updatedGrayProductList.nativingRate96 === null ||
        updatedGrayProductList.nativingRate96 === "")
    ) {
      if (
        updatedGrayProductList.LoomNumbPieceInBorder76 === null ||
        updatedGrayProductList.LoomNumbPieceInBorder76 == undefined ||
        updatedGrayProductList.LoomNumbPieceInBorder76 == ""
      ) {
        setUpdatedGrayProductListValidation({
          ...updatedGrayProductListValidation,

          nativingRate96: false,
        });
      } else if (
        updatedGrayProductList.LoomNumbPieceInBorder96 === null ||
        updatedGrayProductList.LoomNumbPieceInBorder96 == "" ||
        updatedGrayProductList.LoomNumbPieceInBorder96 == ""
      ) {
        setUpdatedGrayProductListValidation({
          ...updatedGrayProductListValidation,

          nativingRate76: false,
        });
      } else {
        setUpdatedGrayProductListValidation({
          ...updatedGrayProductListValidation,

          nativingRate76: false,
          nativingRate96: false,
        });
      }
    } else if (updatedGrayProductList.status == "") {
      setUpdatedGrayProductListValidation({
        ...updatedGrayProductListValidation,
        status: false,
      });
    } else {
      const updatedRefactoredGrayProduct = {
        grayProduct_id: parseInt(updatedGrayProductList.grayProduct_id),
        itemName: parseInt(updatedGrayProductList.itemNameValue.value),
        itemSize: parseInt(updatedGrayProductList.itemSizeValue.value),
        PerPieceGrayWeightGram: parseInt(
          updatedGrayProductList.PerPieceGrayWeightGram
        ),
        graySizeppWidth: parseInt(updatedGrayProductList.graySizeppWidth),
        graySizeppLength: parseInt(updatedGrayProductList.graySizeppLength),
        LoomNumbPieceInBorder76: parseInt(
          updatedGrayProductList.LoomNumbPieceInBorder76
        ),
        LoomNumbRatePerBorderWithDraw76: parseInt(
          updatedGrayProductList.LoomNumbRatePerBorderWithDraw76
        ),
        LoomNumbRatePerBorderWithoutDraw76: parseInt(
          updatedGrayProductList.LoomNumbRatePerBorderWithoutDraw76
        ),
        LoomNumbPieceInBorder96: parseInt(
          updatedGrayProductList.LoomNumbPieceInBorder96
        ),
        LoomNumbRatePerBorderWithDraw96: parseInt(
          updatedGrayProductList.LoomNumbRatePerBorderWithDraw96
        ),
        LoomNumbRatePerBorderWithoutDraw96: parseInt(
          updatedGrayProductList.LoomNumbRatePerBorderWithoutDraw96
        ),
        status: updatedGrayProductList.status.value,
        nativingRate76: parseFloat(updatedGrayProductList.nativingRate76),
        nativingRate96: parseFloat(updatedGrayProductList.nativingRate96),
      };
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRefactoredGrayProduct),
      };

      fetch(
        `${endPoint}api/grayProductLists/${updatedRefactoredGrayProduct.grayProduct_id}`,
        requestOptions
      )
        .then((response) => response)
        .then((data) => {
          setUpdatedGrayProductListValidation(initialUpdatedValidation);
          fetchAllData();
        })
        .catch((err) => {
          console.log("err", err);
        });
      setModalShowForUpdate(false);
      fetchAllData();
    }
  };

 
  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          role="main"
          className={`right_col  heightOfGray  ${
            showNavMenu == false ? "right_col-margin-remove " : " "
          } `}
        >
          <AddNewGrayProductList
            show={modalShow}
            itemNameOptions={itemNameOptions}
            AddNewProduct={AddNewProduct}
            setAddNewProduct={setAddNewProduct}
            onHide={() => setModalShow(false)}
            AddNewProductFunc={AddNewProductFunc}
            itemStatusOptions={itemStatusOptions}
            setItemSizeOptions={setItemSizeOptions}
            itemSizeOptions={itemSizeOptions}
            addNewGrayProductValidator={addNewGrayProductValidator}
          />
          <UpdateGrayProduct
            show={modalShowForUpdate}
            itemNameOptions={itemNameOptions}
            onHide={() => setModalShowForUpdate(false)}
            itemStatusOptions={itemStatusOptions}
            setItemSizeOptions={setItemSizeOptions}
            itemSizeOptions={itemSizeOptions}
            updatedGrayProductList={updatedGrayProductList}
            setUpdatedGrayProductList={setUpdatedGrayProductList}
            updateGrayProductList={updateGrayProductList}
            updatedGrayProductListValidation={updatedGrayProductListValidation}
            setUpdatedGrayProductListValidation={
              setUpdatedGrayProductListValidation
            }
          />

          <div className="x_panel">
            {/* <div className="x_title"> */}

            <div className="page-title m-0  ">
              <div className="col-md-8">
                {" "}
                <h1 className="py-2 pl-3 grayListHeading">
                  Gray Prosduct Details
                </h1>
              </div>
              <div className="col-md-4 pt-2">
              <Select
                    // required
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={"Active"}
                    value={productSortingSelectorValue}
                    onChange={(value) => {
                   setProductSortingSelectorValue(value)
                      if (value.value==="All") {
                        setListOfGrayProduct(listOfGrayProductConst)
                      } else if(value.value==="Activate") {
                        let activatedItem = listOfGrayProductConst.filter((EachProduct)=>{
                          return EachProduct.status==="Activate"
                           })
                          
                           setListOfGrayProduct(activatedItem)
                      }else{
                        let DeactivateItem = listOfGrayProductConst.filter((EachProduct)=>{
                          return EachProduct.status==="Deactivate"
                           })
                          
                           setListOfGrayProduct(DeactivateItem)
                      }
            
                    }}
                    isSearchable={true}
                    name="color"
                    options={productSortingSelectorOptions}
                    styles={customStyles}
                  />
              </div>
            </div>
            <div className="clearfix" />
            {/* </div> */}
            <div className="x_content">
              <div className="x_panel  ">
                <div className="x_content">
                  <div className="table-responsive">
                    <table className="table table-striped jambo_table bulk_action">
                      <thead>
                        <tr className="headings-for-Gray-Product-Table">
                          <th
                            className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                                         removeLeftBorder  removeTopBorder text-center removePadding"
                            style={{ width: "3%" }}
                          >
                            <div className=" py-1  d-flex justify-content-center  fontSettingForGrayHeader ">
                              Sr.
                            </div>
                          </th>

                          <th
                            className="column-title fontSettingForGrayHeader    border border-primary removePadding   border-bottom-color removeTopBorder  text-center"
                            style={{ width: "3%" }}
                          >
                            <div className=" py-1">Name </div>
                          </th>
                          <th
                            className="column-title  fontSettingForGrayHeader   border border-primary removePadding   border-bottom-color removeTopBorder  text-center"
                            style={{ width: "3%" }}
                          >
                            <div className=" py-1">Size </div>
                          </th>
                          <th
                            className="column-title  text-center   border border-primary removePadding   border-bottom-color removeTopBorder"
                            style={{ width: "5%" }}
                          >
                            <div className=" fontSettingForGrayHeader  py-1 paddingXaxisTable">
                              Per Piece Gray Weight in Grams
                            </div>{" "}
                          </th>
                          <th
                            className="column-title pileSize  border border-primary removePadding   border-bottom-color removeTopBorder  text-center"
                            style={{ width: "15px" }}
                          >
                            <div>
                              <div className="col-md-12 removePadding py-1 fontSettingForGrayHeader px-0 ">
                                Gray Size Pile to Pile
                              </div>
                              <div className="col-md-6 border fontSettingForGrayHeader  border-primary removeLeftBorder removeRightBorder removeBottomBorder  py-1 ">
                                Length
                              </div>
                              <div className="col-md-6 border  fontSettingForGrayHeader  border-primary removeRightBorder removeBottomBorder py-1">
                                Width
                              </div>
                            </div>
                          </th>

                          <th
                            className="column-title   
                                         border border-primary removePadding   fontSettingForGrayHeader  border-bottom-color removeTopBorder  removePadding  text-center"
                            style={{ width: "28%" }}
                          >
                            76" Loom
                            <div className=" py-1 col-md-12 text-center removePadding">
                              <div className=" py-1 col-md-4 text-center   fontSettingForGrayHeader removePadding  border border-primary removeLeftBorder removeBottomBorder removeRightBorder pt-5">
                                No Of Piece in one Border{" "}
                              </div>
                              <div className=" py-1 col-md-5 text-center  removePadding  border border-primary  removeRightBorder removeBottomBorder">
                                <div className="col-md-12 text-center   fontSettingForGrayHeader removePadding  border border-primary   removeBottomBorder removeTopBorder removeLeftBorder ">
                                  Rate Per Border
                                </div>
                                <div className="col-md-6 text-center    fontSettingForGrayHeader  removePadding border border-primary removeRightBorder removeBottomBorder removeLeftBorder">
                                  With Draw Box
                                </div>
                                <div className="col-md-6 text-center  fontSettingForGrayHeader  removePadding  border border-primary  removeBottomBorder">
                                  Without Draw Box
                                </div>
                              </div>
                              <div className=" py-1 col-md-3 text-center   fontSettingForGrayHeader    border border-primary removeLeftBorder removeBottomBorder removeRightBorder   p-0 px-1">
                                Nativing Rate
                              </div>
                            </div>
                          </th>
                          <th
                            className="column-title  
                                         border border-primary removePadding  fontSettingForGrayHeader   border-bottom-color removeTopBorder  removePadding  text-center"
                            style={{ width: "32%" }}
                          >
                            96" Loom
                            <div className=" py-1 col-md-12 text-center removePadding">
                              <div className=" py-1 col-md-4 text-center  fontSettingForGrayHeader  removePadding  border border-primary removeLeftBorder removeBottomBorder removeRightBorder ">
                                No Of Piece in one Border{" "}
                              </div>
                              <div className=" py-1 col-md-5 text-center  removePadding  border border-primary    removeBottomBorder">
                                <div className="col-md-12 text-center  fontSettingForGrayHeader  removePadding  border border-primary removeRightBorder removeLeftBorder removeBottomBorder removeTopBorder removeLeftBorder ">
                                  Rate Per Border
                                </div>
                                <div className="col-md-6 text-center   fontSettingForGrayHeader  removePadding border border-primary   removeBottomBorder removeLeftBorder ">
                                  With Draw Box
                                </div>
                                <div className="col-md-6 text-center  fontSettingForGrayHeader  removePadding  border border-primary removeRightBorder removeBottomBorder removeLeftBorder">
                                  Without Draw Box
                                </div>
                              </div>
                              <div className=" py-1 col-md-3 text-center   fontSettingForGrayHeader    border border-primary removeLeftBorder removeBottomBorder removeRightBorder   px-1">
                                Nativing Rate
                              </div>
                            </div>
                          </th>
                          <th
                            className="column-title  text-center  border border-primary 
                                        removeLeftBorder removeTopBorder removeRight Border   fontSettingForGrayHeader  border-bottom-color "
                            style={{ width: "4%" }}
                          >
                            Status
                          </th>
                          <th
                            className="column-title  text-center  border border-primary 
                                        removeLeftBorder removeTopBorder removeRight Border  fontSettingForGrayHeader   border-bottom-color "
                            style={{ width: "2%" }}
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ListOfGrayProduct.map((item, index) => {
                          return (
                            <tr className="">
                              <td
                                className="column-title    removePadding   
                                        text-center paddingYaxisTable"
                                style={{ width: "3%" }}
                              >
                                <div className="  d-flex justify-content-center ">
                                  {" "}
                                  {index + 1}
                                </div>
                              </td>
                              <td
                                className="column-title   paddingYaxisTable   removePadding      text-center"
                                style={{ width: "6%" }}
                              >
                                <div className="  ">{item.itemName} </div>
                              </td>
                              <td
                                className="column-title   paddingYaxisTable   removePadding      text-center"
                                style={{ width: "6%" }}
                              >
                                <div className="  ">{item.itemSize} </div>
                              </td>
                              <td
                                className="column-title  text-center  paddingYaxisTable  removePadding "
                                style={{ width: "13%" }}
                              >
                                <div className="  ">
                                  {item.PerPieceGrayWeightGram}
                                </div>{" "}
                              </td>
                              <td
                                className="column-title pileSize    removePadding   paddingYaxisTable   text-center"
                                style={{ width: "16%", height: "100%" }}
                              >
                                <div>
                                  <div className="col-md-6">
                                    {item.graySizeppLength}
                                  </div>
                                  <div className="col-md-6 ">
                                    {item.graySizeppWidth}
                                  </div>
                                </div>
                              </td>

                              <td
                                className="column-title   
                                              removePadding      removePadding  text-center paddingYaxisTable"
                                style={{ width: "27%" }}
                              >
                                <div className="  col-md-12 text-center removePadding">
                                  <div className="   col-md-4 text-center  removePadding            pt-5">
                                    {item.LoomNumbPieceInBorder76}
                                  </div>
                                  <div className="  col-md-5 text-center             ">
                                    <div className="col-md-6 text-center    ">
                                      {item.LoomNumbRatePerBorderWithDraw76}
                                    </div>
                                    <div className="col-md-6 text-center  removePadding  ">
                                      {item.LoomNumbRatePerBorderWithoutDraw76}
                                    </div>
                                  </div>
                                  <div className="   col-md-3 text-center  removePadding            ">
                                    {item.nativingRate76}
                                  </div>
                                </div>
                              </td>
                              <td
                                className="column-title  
                                            removePadding       removePadding  text-center paddingYaxisTable"
                                style={{ width: "27%" }}
                              >
                                <div className=" py-1 col-md-12 text-center removePadding">
                                  <div className=" py-1 col-md-4 text-center  removePadding             ">
                                    {item.LoomNumbPieceInBorder96}
                                  </div>
                                  <div className=" py-1 col-md-5 text-center  removePadding     ">
                                    <div className="col-md-6 text-center   removePadding          ">
                                      {item.LoomNumbRatePerBorderWithDraw96}
                                    </div>
                                    <div className="col-md-6 text-center  removePadding    removeLeftBorder">
                                      {item.LoomNumbRatePerBorderWithoutDraw96}
                                    </div>
                                  </div>
                                  <div className="   col-md-3 text-center  removePadding        ">
                                    {item.nativingRate96}
                                  </div>
                                </div>
                              </td>
                              <td
                                className="column-title removePadding  text-center   paddingYaxisTable    
                                            "
                                style={{ width: "4%" }}
                              >
                                {item.status}
                              </td>
                              <td
                                className="column-title removePadding  text-center   paddingYaxisTable    
                                            "
                                style={{ width: "2%" }}
                              >
                                <i
                                  className="fa fa-edit text-common "
                                  onClick={() => {
                                    setUpdatedGrayProductList({
                                      grayProduct_id: item.grayProduct_id,
                                      itemNameValue: {
                                        label: item.itemName,
                                        value: item.itemNameId,
                                      },
                                      itemSizeValue: {
                                        label: item.itemSize,
                                        value: item.itemSizeId,
                                      },
                                      PerPieceGrayWeightGram:
                                        item.PerPieceGrayWeightGram,
                                      graySizeppWidth: item.graySizeppWidth,
                                      graySizeppLength: item.graySizeppLength,
                                      LoomNumbPieceInBorder76:
                                        item.LoomNumbPieceInBorder76,
                                      LoomNumbRatePerBorderWithDraw76:
                                        item.LoomNumbRatePerBorderWithDraw76,
                                      LoomNumbRatePerBorderWithoutDraw76:
                                        item.LoomNumbRatePerBorderWithoutDraw76,
                                      LoomNumbPieceInBorder96:
                                        item.LoomNumbPieceInBorder96,
                                      LoomNumbRatePerBorderWithDraw96:
                                        item.LoomNumbRatePerBorderWithDraw96,
                                      LoomNumbRatePerBorderWithoutDraw96:
                                        item.LoomNumbRatePerBorderWithoutDraw96,
                                      status: {
                                        label: item.status,
                                        value: item.status,
                                      },
                                      nativingRate76: item.nativingRate76,
                                      nativingRate96: item.nativingRate96,
                                    });
                                    setModalShowForUpdate(true);
                                  }}
                                ></i>
                                {/* <i className="fa fa-trash ml-2 pb-1 text-danger"

                                  onClick={() => deleteGrayProduct(item.grayProduct_id)}></i> */}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GrayProductList;
