import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../Layout/Loader/Loader";
import LoomListUpdate from "./LoomListUpdate";
import AddNewLoomModel from './AddNewLoomModel'
import { endPoint } from "../../../config/Config";
import { toast } from "react-toastify";











const LoomManagement = () => {
  const notifyDeleted = () => toast("Loom Deleted Successfully");
  const notifyAdded = () => toast("Loom Added Successfully");
  const notifyUpdated = () => toast("Loom Updated Successfully");
  const notifyAlreadyExist = () => toast("Loom Number Already Exist");
  let defaultValueForLoomValidator = { loomNumber: true, loomSize: true, drawBox: true, jacquard: true, weavingUnit: true }
  const [loomValidator, setloomValidator] = useState(defaultValueForLoomValidator)
  const [loomValidatorUpdate, setLoomValidatorUpdate] = useState(true)
  const [loomNumberValidatorUpdate, setloomNumberValidatorUpdate] = useState(true)
  const showNavMenu = useSelector((state) => state.NavState);
  const [loomList, setLoomList] = useState([]);
  const url = localStorage.getItem("authUser");
  const [modalShow, setModalShow] = useState(false);
  const [modalShowForUpdate, setModalShowForUpdate] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const initialStateLoom = {
    loomNumber: "",
    loomSize: "",
    drawBox: "",
    jacquard: "",
    weavingUnitId: "",
  };
  const [AddNewLoom, setAddNewLoom] = useState(initialStateLoom);
  const [UpdateLoomList, setUpdateLoomList] = useState(initialStateLoom);

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
      headers: {
        Authorization:
          "bearer" +
          " " +
          JSON.parse(localStorage.getItem("access_token")).access_token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // deleteing Role for this Id
        fetchAllData();
        notifyDeleted()
      })
      .catch((error) => {
        console.log("error", error);
      });
    // setloomNumberValidatorUpdate
  };
  const UpdateLoomListFunc = (e) => {

    if (UpdateLoomList.loomNumber === "" || UpdateLoomList.loomNumber === 0 || UpdateLoomList.loomNumber === undefined) {
      setloomNumberValidatorUpdate(false)
    } else if (UpdateLoomList.loomSize === "" || UpdateLoomList.loomSize === 0 || UpdateLoomList.loomSize === undefined) {

      setLoomValidatorUpdate(false)
    } else {
      e.preventDefault();
      console.log(UpdateLoomList);
      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization:
            "bearer" +
            " " +
            JSON.parse(localStorage.getItem("access_token")).access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UpdateLoomList),
      };

      fetch(url + "api/LoomLists", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          notifyUpdated();
          setModalShowForUpdate(false);
          fetchAllData();
          setDropBoxValue("")
          setJacquardValue("")
          setWeavingUnitValue("")
          setLoomValidatorUpdate(true)
          setloomNumberValidatorUpdate(true)
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  const addNewLoomFunc = (e) => {
    console.log();
    if (AddNewLoom.loomNumber == "" || AddNewLoom.loomNumber === 0 || AddNewLoom.loomNumber == 0) {
      setloomValidator({ ...loomValidator, loomNumber: false })
    } else if (AddNewLoom.loomSize == "") {
      setloomValidator({ ...loomValidator, loomSize: false })
    } else if (AddNewLoom.drawBox == "") {
      setloomValidator({ ...loomValidator, drawBox: false })
    } else if (AddNewLoom.jacquard == "") {
      setloomValidator({ ...loomValidator, jacquard: false })
    } else if (AddNewLoom.weavingUnitId == "") {
      setloomValidator({ ...loomValidator, weavingUnit: false })
    } else {
      console.log("undereee");
      const requestOptions = {
        method: "POST",
        // headers: {

        // },
        headers: {
          Authorization:
            "bearer" +
            " " +
            JSON.parse(localStorage.getItem("access_token")).access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(AddNewLoom),
      };
      fetch(url + "api/LoomLists", requestOptions)
        .then((response) => {
          console.log(response, "response");
          if (response.status === 201) {
            notifyAdded();
            
// -----------

            fetchAllData();
            setloomValidator(defaultValueForLoomValidator)
            setModalShow(false);
            setDropBoxValue("")
            setJacquardValue("")
            setWeavingUnitValue("")
            setAddNewLoom(initialStateLoom)
            return response.json();

          } else if (response.status === 400) {
            setloomValidator(defaultValueForLoomValidator)
            notifyAlreadyExist()
          }

        })
        .then((data) => {
       

        })
        .catch((err) => {
          console.log("err", err);
        });
    }
    e.preventDefault(e);

  };
  const fetchAllData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(endPoint + "api/LoomLists", requestOptions)
      .then(response => response.text())
      .then(result => {
        setLoomList(JSON.parse(result));
        setisLoading(false);
      })
      .catch(error => console.log('error', error));





  };
  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <>
      <div
        role="main"
        className={`right_col  h-100  ${showNavMenu == false ? "right_col-margin-remove" : " "
          } `}
      >
        <AddNewLoomModel
          show={modalShow}
          AddNewLoom={AddNewLoom}
          setAddNewLoom={setAddNewLoom}
          addNewLoomFunc={addNewLoomFunc}
          onHide={() => {
            setModalShow(false)
            setDropBoxValue("")
            setJacquardValue("")
            setWeavingUnitValue("")
            setAddNewLoom(initialStateLoom)
            setloomValidator(defaultValueForLoomValidator)
          }}
          DropBoxValue={DropBoxValue} setDropBoxValue={setDropBoxValue} DropBox={DropBox}
          JacquardValue={JacquardValue} setJacquardValue={setJacquardValue} Jacquard={Jacquard}
          weavingUnitOption={weavingUnitOption} weavingUnitValue={weavingUnitValue} setWeavingUnitValue={setWeavingUnitValue} loomValidator={loomValidator}
        />
        <LoomListUpdate
          show={modalShowForUpdate}
          UpdateLoomList={UpdateLoomList}
          setUpdateLoomList={setUpdateLoomList}
          UpdateLoomListFunc={UpdateLoomListFunc}
          DropBoxValue={DropBoxValue} setDropBoxValue={setDropBoxValue} DropBox={DropBox}
          JacquardValue={JacquardValue} setJacquardValue={setJacquardValue} Jacquard={Jacquard}
          weavingUnitOption={weavingUnitOption} weavingUnitValue={weavingUnitValue}
          setWeavingUnitValue={setWeavingUnitValue}
          onHide={() => {
            setModalShowForUpdate(false)
            setLoomValidatorUpdate(true)
            setloomNumberValidatorUpdate(true)
            setModalShow(false)
            setDropBoxValue("")
            setJacquardValue("")
            setWeavingUnitValue("")
            setUpdateLoomList(initialStateLoom)


          }}
          loomValidatorUpdate={loomValidatorUpdate}
          loomNumberValidatorUpdate={loomNumberValidatorUpdate}
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
                                          weavingUnitId: item.weavingUnit_id,
                                        });
                                        console.log("lorememrm", item.weavingUnit_id);
                                        setDropBoxValue({ label: innerItem.drawBox, value: innerItem.drawBox })
                                        setJacquardValue({ label: innerItem.jacquard, value: innerItem.jacquard })
                                        setWeavingUnitValue({ label: `Weaving Unit ${item.weavingUnitName}`, value: item.weavingUnit_id })
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



