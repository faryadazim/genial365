import React, { useState, useEffect } from "react";

import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loader from "../../../Layout/Loader/Loader"; 
import LoomListUpdate from "./LoomListUpdate";

 import AddNewLoomModel from './AddNewLoomModel'
const LoomManagement = () => {
  const showNavMenu = useSelector((state) => state.NavState);
  const [loomList, setLoomList] = useState([]);

  const url = localStorage.getItem("authUser");

  const [modalShow, setModalShow] = useState(false);
  const [modalShowForUpdate, setModalShowForUpdate] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const initialStateLoom = {
    loomSize: "",
    drawBox: "",
    jacquard: "",
    weavingUnitId: "",
  };
  const [AddNewLoom, setAddNewLoom] = useState(initialStateLoom);
  const [UpdateLoomList, setUpdateLoomList] = useState(initialStateLoom);
  const [inCompleteInput , setInCompleteInput] = useState(false)
  const [DropBoxValue, setDropBoxValue] = useState("");
  const [JacquardValue, setJacquardValue] = useState("");
  const [weavingUnitValue, setWeavingUnitValue] = useState("");
  // 3   
  const DropBox = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];
  const Jacquard = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];
  const weavingUnitOption = [
    { label: "Weaving Unit A", value: 1 },
    { label: "Weaving Unit B", value: 2 },
    { label: "Weaving Unit c", value: 3 },
  ];

  const DeleteLoom = (e) => {
    fetch(`${url}api/LoomLists?id=${e}`, {
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
      .catch((error) => {
        console.log("error", error);
      });
  };
  const UpdateLoomListFunc = (e) => {
    e.preventDefault();
    if(UpdateLoomList.loomNumber ==""|| UpdateLoomList.size=="" || UpdateLoomList.drawBox==""  || UpdateLoomList.jacquard=="" || UpdateLoomList.weavingUnitId==""  || UpdateLoomList.weavingUnitId==undefined ){
      console.log("empty" , );
      setInCompleteInput(true)
      
      
            }else{
   console.log(UpdateLoomList);

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(UpdateLoomList),
    };

    fetch(url + "api/LoomLists", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // notifyAdd();
        setModalShowForUpdate(false);
        fetchAllData();
      })
      .catch((err) => {
        console.log("err", err);
      });}
  };

  const addNewLoomFunc = (e) => {
    console.log(AddNewLoom);
      if( AddNewLoom.loomSize=="" || AddNewLoom.drawBox==""  || AddNewLoom.jacquard=="" || AddNewLoom.weavingUnitId=="" ){
console.log("empty");
setInCompleteInput(true)


      }else{
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(AddNewLoom),
          };
          console.log(requestOptions.body);
          fetch(url + "api/LoomLists", requestOptions)
            .then((response) => response.json())
            .then((data) => {
              fetchAllData();
      
              setModalShow(false);
              setDropBoxValue("")
              setJacquardValue("")
              setWeavingUnitValue("")
              setAddNewLoom(initialStateLoom)
            })
            .catch((err) => {
              console.log("err", err);
            });
      }
    e.preventDefault(e);
   
  };
  const fetchAllData = () => {
    fetch(url + "api/LoomLists")
      .then((response) => response.json())
      .then((json) => {
        setLoomList(json);
        setisLoading(false);
      });
  };
  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <>
      <div
        role="main"
        className={`right_col  h-100  ${
          showNavMenu == false ? "right_col-margin-remove" : " "
        } `}
      >
        <AddNewLoomModel
          show={modalShow}
          AddNewLoom={AddNewLoom}
          setAddNewLoom={setAddNewLoom}
          addNewLoomFunc={addNewLoomFunc}
          onHide={() => setModalShow(false)}    inCompleteInput={inCompleteInput}  setInCompleteInput={setInCompleteInput}
          DropBoxValue={DropBoxValue} setDropBoxValue={setDropBoxValue} DropBox={DropBox}
          JacquardValue={JacquardValue}  setJacquardValue={setJacquardValue}  Jacquard={Jacquard}
          weavingUnitOption={weavingUnitOption} weavingUnitValue={weavingUnitValue} setWeavingUnitValue={setWeavingUnitValue}
        />
        <LoomListUpdate
          show={modalShowForUpdate}
          UpdateLoomList={UpdateLoomList}
          setUpdateLoomList={setUpdateLoomList}
          UpdateLoomListFunc={UpdateLoomListFunc}
          DropBoxValue={DropBoxValue} setDropBoxValue={setDropBoxValue} DropBox={DropBox}
          JacquardValue={JacquardValue}  setJacquardValue={setJacquardValue}  Jacquard={Jacquard}
           weavingUnitOption={weavingUnitOption} weavingUnitValue={weavingUnitValue} 
           inCompleteInput={inCompleteInput}  setInCompleteInput={setInCompleteInput}
          onHide={() => setModalShowForUpdate(false)}
        />
        <div className="row">
          <div className="col-md-6 text-left">
            <h2> Looms List</h2>
          </div>
          <div className="col-md-6 text-right">
            <button
              className="btn btn-success  btn-sm   px-2"
              onClick={() => setModalShow(true)}
            >
              Add New Loom
              <i className="ml-2 fa fa-plus-square"></i>
            </button>
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {" "}
            <div className="x_panel">
              <div className="x_content">
                <div className="table-responsive">
                  <table className="table  jambo_table  ">
                    <thead>
                      <tr className="headings">
                        <th className="column-title text-center">
                          Loom Number{" "}
                        </th>
                        <th className="column-title text-center">Size </th>
                        <th className="column-title text-center">Draw Box </th>
                        <th className="column-title text-center">Jacquard </th>
                        <th className="column-title text-center">Action </th>
                      </tr>
                    </thead>

                    <tbody>
                      {loomList.map((item) => {
                        if (item.loomsList.length == "0") {
                          return <></>;
                        }
                        return (
                          <>
                            <tr className="moduleBgColor">
                              <td colSpan="6" className="py-2">
                                <div>{item.weavingUnitName}</div>
                              </td>
                            </tr>

                            {item.loomsList.map((innerItem) => {
                              return (
                                <tr className="even pointer">
                                  {/* <td className=" ">{innerItem.loom_id}</td> */}
                                  <td className=" text-center ">
                                    {innerItem.loomNumber}{" "}
                                  </td>
                                  <td className=" text-center ">
                                    {innerItem.loomSize}{" "}
                                  </td>
                              
                                  <td className=" text-center ">
                                    {innerItem.drawBox}{" "}
                                  </td>
                                  <td className=" text-center ">
                                    {innerItem.jacquard}{" "}
                                  </td>
                                  <td className=" text-center ">
                                    <i
                                      className="fa fa-edit"
                                      onClick={() => {
                                        setModalShowForUpdate(true);
                                        // setWeavingUnitValue()
                                        setUpdateLoomList({
                                          loom_id: innerItem.loom_id,
                                          loomNumber: innerItem.loomNumber,
                                          loomSize: innerItem.loomSize,
                                          drawBox: innerItem.drawBox,
                                          jacquard: innerItem.jacquard,
                                          weavingUnitId: item.weavingUnitId,
                                        });
                                        // console.log(UpdateLoomList , "loom list updated clicked");
                                      }}
                                    ></i>
                                    <i
                                      className="fa fa-trash ml-1 text-danger"
                                      onClick={() =>
                                        DeleteLoom(innerItem.loom_id)
                                      }
                                    ></i>
                                  </td>
                                </tr>
                              );
                            })}
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LoomManagement;



