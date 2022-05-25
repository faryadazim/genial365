import React, { useState, useEffect } from "react";
import {endPoint} from '../../../config/Config'

import { useSelector } from "react-redux";
import Loader from "../../../Layout/Loader/Loader";
import AddNewGrayProductList from "./AddNewGrayProductList";
const GrayProductList = () => {
  const url = localStorage.getItem("authUser");
  const showNavMenu = useSelector((state) => state.NavState);
  const [ListOfGrayProduct, setListOfGrayProduct] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  const [AddNewProduct, setAddNewProduct] = useState({
    itemName: 0,
    itemSize: 0,
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
  });

  const [itemNameValue, setitemNameValue] = useState("Custom");
  const [itemSizeValue, setitemSizeValue] = useState("Not Decided");
  const [itemStatusValue, setitemStatusValue] = useState("");
  const [itemNameOptions, setItemNameOptions] = useState([]);
  const [itemSizeOptions, setItemSizeOptions] = useState([]);
 
  const itemStatusOptions =  [ 
    { label: "Activate", value: "Activate" },
    { label: "Deactivate", value: "Deactivate" }, 
  ] ;

  const fetchAllData = () => {
    fetch(url + "api/grayProductLists")
      .then((response) => response.json())
      .then((json) => {


        // Fetching selector data for Border/itemName 
      
        fetch(url + "api/BorderQuality", {
          method: "GET",
          headers: {
            // Authorization: "bearer" + " " + e,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            var arr = [];
            data.map((item) => {
              console.log(item);
              arr.push({
                label: item.borderQuality1,
                value: item.borderQuality_id,
              });
            });

            setItemNameOptions(arr);
          
          });
            // Fetching selector data for Border/itemName 
            fetch(url + "api/BorderSizes", {
              method: "GET",
              headers: {
                // Authorization: "bearer" + " " + e,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                var arr2 = [];
                data.map((item) => {
                  console.log(item);
                  arr2.push({
                    label: item.borderSize1,
                    value: item.borderSize_id,
                  });
                });
    
                setItemSizeOptions(arr2);
                setisLoading(false);
              });
        setListOfGrayProduct(json);
      });
  };

  const AddNewProductFunc = ()=>{
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(AddNewProduct),
    };
    
    console.log("Its new Product Func" , AddNewProduct );
    fetch(url +"api/grayProductLists", requestOptions)
    .then((response) => response.json())
    .then((data) => {   
      fetchAllData()
 setModalShow(false);
    
    })
    .catch((err) => {
      console.log("err front End", err);
    });
  }
  const deleteGrayProduct = (e)=>{
  
    // http://localhost:63145/api/grayProductLists/13
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
  }
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
          className={`right_col  h-100  ${
            showNavMenu == false ? "right_col-margin-remove" : " "
          } `}
        >
          <AddNewGrayProductList
            show={modalShow}
            itemNameOptions={itemNameOptions}
            itemNameValue={itemNameValue}
            setitemNameValue={setitemNameValue}
            AddNewProduct={AddNewProduct}
            setAddNewProduct={setAddNewProduct}
            onHide={() => setModalShow(false)}
            AddNewProductFunc={AddNewProductFunc}   
            itemStatusOptions={itemStatusOptions} setitemStatusValue={setitemStatusValue} itemStatusValue={itemStatusOptions}

            // Selector of size item 
            setItemSizeOptions={setItemSizeOptions}   itemSizeOptions={itemSizeOptions}   
            itemSizeValue={itemSizeValue}    setitemSizeValue={setitemSizeValue}
          />

          <div className="page-title mb-2  ">
            <div className="title_left ">
              <h1>Gray Product Details</h1>
            </div>
            <div className="text-right">
              <button
                className="btn btn-primary  btn-sm w-10"
                onClick={() => setModalShow(true)}
              >
                {" "}
                Add New &nbsp;&nbsp;&nbsp;
                <i className="fa fa-plus-circle"></i>
              </button>
              <button className="btn btn-success  btn-sm w-10">
                {" "}
                Print &nbsp;&nbsp;&nbsp;
                <i className="fa fa-print"></i>
              </button>
            </div>
            <div className="clearfix" />
          </div>

          <div className="x_panel">
            <div className="x_content">
              <div className="table-responsive">
                <table className="table table-striped jambo_table bulk_action">
                  <thead>
                    <tr className="headings-for-Gray-Product-Table">
                      <th
                        className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                                         removeLeftBorder  removeTopBorder text-center"
                        style={{ width: "3%" }}
                      >
                        <div className=" py-1 d-flex justify-content-center ">
                          {" "}
                          Sr.
                        </div>
                      </th>

                      <th
                        className="column-title     border border-primary removePadding   border-bottom-color removeTopBorder  text-center"
                        style={{ width: "3%" }}
                      >
                        <div className=" py-1">Name </div>
                      </th>
                      <th
                        className="column-title     border border-primary removePadding   border-bottom-color removeTopBorder  text-center"
                        style={{ width: "3%" }}
                      >
                        <div className=" py-1">Size </div>
                      </th>
                      <th
                        className="column-title  text-center   border border-primary removePadding   border-bottom-color removeTopBorder"
                        style={{ width: "13%" }}
                      >
                        <div className=" py-1 paddingXaxisTable">
                          Per Piece Gray Weight in Grams
                        </div>{" "}
                      </th>
                      <th
                        className="column-title pileSize  border border-primary removePadding   border-bottom-color removeTopBorder  text-center"
                        style={{ width: "12%" }}
                      >
                        <div>
                          <div className="col-md-12 py-1">
                            Gray Size Pile to Pile
                          </div>
                          <div className="col-md-6 border border-primary removeLeftBorder removeRightBorder removeBottomBorder  py-1 ">
                            Length
                          </div>
                          <div className="col-md-6 border  border-primary removeRightBorder removeBottomBorder py-1">
                            Width
                          </div>
                        </div>
                      </th>

                      <th
                        className="column-title   
                                         border border-primary removePadding   border-bottom-color removeTopBorder  removePadding  text-center"
                        style={{ width: "27%" }}
                      >
                        76" Loom
                        <div className=" py-1 col-md-12 text-center removePadding">
                          <div className=" py-1 col-md-6 text-center  removePadding  border border-primary removeLeftBorder removeBottomBorder removeRightBorder pt-5">
                            No Of Piece in one Border{" "}
                          </div>
                          <div className=" py-1 col-md-6 text-center  removePadding  border border-primary  removeRightBorder removeBottomBorder">
                            <div className="col-md-12 text-center  removePadding  border border-primary removeRightBorder removeLeftBorder removeBottomBorder removeTopBorder removeLeftBorder ">
                              Rate Per Border
                            </div>
                            <div className="col-md-6 text-center    removePadding border border-primary removeRightBorder removeBottomBorder removeLeftBorder">
                              With Draw Box
                            </div>
                            <div className="col-md-6 text-center  removePadding  border border-primary removeRightBorder removeBottomBorder">
                              Without Draw Box
                            </div>
                          </div>
                        </div>
                      </th>
                      <th
                        className="column-title  
                                         border border-primary removePadding   border-bottom-color removeTopBorder  removePadding  text-center"
                        style={{ width: "27%" }}
                      >
                        96" Loom
                        <div className=" py-1 col-md-12 text-center removePadding">
                          <div className=" py-1 col-md-6 text-center  removePadding  border border-primary removeLeftBorder removeBottomBorder removeRightBorder ">
                            No Of Piece in one Border{" "}
                          </div>
                          <div className=" py-1 col-md-6 text-center  removePadding  border border-primary  removeRightBorder removeBottomBorder">
                            <div className="col-md-12 text-center  removePadding  border border-primary removeRightBorder removeLeftBorder removeBottomBorder removeTopBorder removeLeftBorder ">
                              Rate Per Border
                            </div>
                            <div className="col-md-6 text-center   removePadding border border-primary   removeBottomBorder removeLeftBorder ">
                              With Draw Box
                            </div>
                            <div className="col-md-6 text-center  removePadding  border border-primary removeRightBorder removeBottomBorder removeLeftBorder">
                              Without Draw Box
                            </div>
                          </div>
                        </div>
                      </th>
                      <th
                        className="column-title  text-center  border border-primary 
                                        removeLeftBorder removeTopBorder removeRight Border   border-bottom-color "
                        style={{ width: "4%" }}
                      >
                        Status
                      </th>
                      <th
                        className="column-title  text-center  border border-primary 
                                        removeLeftBorder removeTopBorder removeRight Border   border-bottom-color "
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
                              <div className="   col-md-6 text-center  removePadding            pt-5">
                                {item.LoomNumbPieceInBorder76}
                              </div>
                              <div className="  col-md-6 text-center             ">
                                <div className="col-md-6 text-center    ">
                                  {item.LoomNumbRatePerBorderWithDraw76}
                                </div>
                                <div className="col-md-6 text-center  removePadding  ">
                                  {item.LoomNumbRatePerBorderWithoutDraw76}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td
                            className="column-title  
                                            removePadding       removePadding  text-center paddingYaxisTable"
                            style={{ width: "27%" }}
                          >
                            <div className=" py-1 col-md-12 text-center removePadding">
                              <div className=" py-1 col-md-6 text-center  removePadding             ">
                                {item.LoomNumbPieceInBorder96}
                              </div>
                              <div className=" py-1 col-md-6 text-center  removePadding     ">
                                <div className="col-md-6 text-center   removePadding          ">
                                  {item.LoomNumbRatePerBorderWithDraw96}
                                </div>
                                <div className="col-md-6 text-center  removePadding    removeLeftBorder">
                                  {item.LoomNumbRatePerBorderWithoutDraw76}
                                </div>
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
                            <i className="fa fa-edit text-common"></i>
                            <i className="fa fa-trash ml-2 pb-1 text-danger"
                            
                            onClick={()=>deleteGrayProduct(item.grayProduct_id)}></i>
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
      )}
    </>
  );
};

export default GrayProductList;
