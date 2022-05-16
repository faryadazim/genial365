import React, { useState, useEffect } from "react";

import { Modal } from "react-bootstrap";

import { useSelector } from "react-redux";
import Loader from "../../../Layout/Loader/Loader";

const LoomManagement = () => {
    const showNavMenu = useSelector((state) => state.NavState);
    const [loomList, setLoomList] = useState([])

    const [modalShow, setModalShow] = useState(false);
    const [modalShowForUpdate, setModalShowForUpdate] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const [AddNewLoom, setAddNewLoom] = useState({
    
        loomNumber: "",
        loomSize: "",
        drawBox: "",
        jacquard: "",
        weavingUnitId: ""
    })
    const [UpdateLoomList, setUpdateLoomList] = useState({
          loom_id: "",
            loomNumber: "",
        loomSize: "",
        drawBox: "",
        jacquard: "",
        weavingUnitId: ""
    })
    // 3

    const DeleteLoom = (e) => {
        fetch(`http://localhost:63145/api/LoomLists?id=${e}`, {
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
                fetchAllData()

            })
            .catch((error) => {
                console.log("error", error);

            });
    }
const UpdateLoomListFunc = (e)=>{
    console.log(UpdateLoomList);
        e.preventDefault();
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(UpdateLoomList),
        };
        console.log(requestOptions.body);
        fetch("http://localhost:63145/api/LoomLists", requestOptions)
            .then((response) => response.json())
            .then((data) => { // notifyAdd();
                setModalShowForUpdate(false)
                fetchAllData();

            })
            .catch((err) => {
                console.log("err", err);
            });


}

    const addNewLoomFunc = (e) => {
        e.preventDefault(e);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(AddNewLoom),
        };
        console.log(requestOptions.body);
        fetch("http://localhost:63145/api/LoomLists", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                fetchAllData();

                setModalShow(false)
            })
            .catch((err) => {
                console.log("err", err);
            });
    }
    const fetchAllData = () => {
        fetch("http://localhost:63145/api/LoomLists")
            .then((response) => response.json())
            .then((json) => {
                setLoomList(json);
                console.log("uuuuuu", json);
                setisLoading(false)
            });
    };
    useEffect(() => {
        fetchAllData()
    }, [])

    return (
        <>
            <div
                role="main"
                className={`right_col  h-100  ${showNavMenu == false ? "right_col-margin-remove" : " "
                    } `}
            >
                <MyVerticallyCenteredModal
                    show={modalShow}
                    AddNewLoom={AddNewLoom} setAddNewLoom={setAddNewLoom} addNewLoomFunc={addNewLoomFunc}
                    onHide={() => setModalShow(false)}
                />
                <MyVerticallyCenteredModalForUpdate
                    show={modalShowForUpdate}
                    UpdateLoomList={UpdateLoomList} setUpdateLoomList = {setUpdateLoomList}   UpdateLoomListFunc={UpdateLoomListFunc}
                    onHide={() => setModalShowForUpdate(false)}
                />
                <div className="row">
                    <div className="col-md-6 text-left">
                        <h2>     Looms List</h2>
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
                {
                    isLoading ? <Loader /> : <> <div className="x_panel">
                        <div className="x_content">
                            <div className="table-responsive">
                                <table className="table  jambo_table  ">
                                    <thead>
                                        <tr className="headings">
                                            <th className="column-title text-center">Loom Number </th>
                                            <th className="column-title text-center">Size </th>
                                            <th className="column-title text-center">Draw Box </th>
                                            <th className="column-title text-center">Jacquard </th>
                                            <th className="column-title text-center">Action </th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            loomList.map((item) => {
                                                if (item.loomsList.length == "0") {
                                                    return <></>
                                                }
                                                return <>

                                                    <tr className="moduleBgColor">
                                                        <td colSpan="6" className="py-2">
                                                            <div>{item.weavingUnitName}</div>
                                                        </td>
                                                    </tr>

                                                    {item.loomsList.map((innerItem) => {
                                                        return <tr className="even pointer">
                                                            {/* <td className=" ">{innerItem.loom_id}</td> */}
                                                            <td className=" text-center ">{innerItem.loomNumber}  </td>
                                                            <td className=" text-center ">{innerItem.loomSize}  </td>
                                                            <td className=" text-center ">{innerItem.jacquard}  </td>
                                                            <td className=" text-center ">{innerItem.drawBox}   </td>
                                                            <td className=" text-center ">
                                                                <i className="fa fa-edit" onClick={
                                                                    ()=>{setModalShowForUpdate(true)
                                                                   
                                                                    setUpdateLoomList(  {
                                                                        loom_id: innerItem.loom_id ,
                                                                        loomNumber: innerItem.loomNumber,
                                                                    loomSize:innerItem.loomSize,
                                                                    drawBox:innerItem.drawBox,
                                                                    jacquard: innerItem.jacquard,
                                                                    weavingUnitId: item.weavingUnitId})}
                                                                }></i>
                                                                <i className="fa fa-trash ml-1 text-danger" onClick={() => DeleteLoom(innerItem.loom_id)}></i>

                                                            </td>


                                                        </tr>
                                                    })

                                                    }



                                                </>
                                            })
                                        }



                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div></>
                }

            </div>
        </>
    );
};

export default LoomManagement;




function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <>
                {" "}
                <div className="x_panel mb-0">
                    <div className="x_title">
                        <h2 className="pl-2 pt-2">Add Employee</h2>
                        <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
                            <li>
                                <a className="close-link">
                                    <i className="fa fa-close" onClick={props.onHide} />
                                </a>
                            </li>
                        </ul>
                        <div className="clearfix" />
                    </div>
                    <div className="x_content mb-2 mt-2">
                        <form  >
                            {/* <span className="section">Personal Info</span> */}
                            <div className="field item form-group">
                                <label className="col-form-label col-md-3 col-sm-3  label-align">
                                    Loom Number<span className="required">*</span>
                                </label>
                                <div className="col-md-8 col-sm-8">
                                    <input
                                        className="form-control"
                                        name="nanr"
                                        placeholder="ex. Loom Number"
                                        required="required"
                                        value={props.AddNewLoom.loomNumber}
                                        onChange={(e) => props.setAddNewLoom({ ...props.AddNewLoom, loomNumber: e.target.value })}
                                    />

                                </div>
                            </div>
                            <div className="field item form-group">
                                <label className="col-form-label col-md-3 col-sm-3  label-align">
                                    Size<span className="required">*</span>
                                </label>
                                <div className="col-md-8 col-sm-8">
                                    <input
                                        className="form-control"
                                        name="nanr"
                                        placeholder="ex. Loom Number"
                                        required="required" value={props.AddNewLoom.loomSize}
                                        onChange={(e) => props.setAddNewLoom({ ...props.AddNewLoom, loomSize: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="field item form-group">
                                <label className="col-form-label col-md-3 col-sm-3  label-align">
                                    Draw Box<span className="required">*</span>
                                </label>
                                <div className="col-md-8 col-sm-8">
                                    <input
                                        className="form-control"
                                        name="nanr"
                                        placeholder="ex. Loom Number"
                                        required="required" value={props.AddNewLoom.drawBox}
                                        onChange={(e) => props.setAddNewLoom({ ...props.AddNewLoom, drawBox: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="field item form-group">
                                <label className="col-form-label col-md-3 col-sm-3  label-align">
                                    Jacquad<span className="required">*</span>
                                </label>
                                <div className="col-md-8 col-sm-8">
                                    <input
                                        className="form-control"
                                        name="nanr"
                                        placeholder="ex. Loom Number"
                                        required="required"
                                        value={props.AddNewLoom.jacquard}
                                        onChange={(e) => props.setAddNewLoom({ ...props.AddNewLoom, jacquard: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="field item form-group">
                                <label className="col-form-label col-md-3 col-sm-3  label-align">
                                    Weaving Unit<span className="required">*</span>
                                </label>
                                <div className="col-md-8 col-sm-8">
                                    <select
                                        className="form-control"
                                        onChange={(e) =>
                                            props.setAddNewLoom({
                                                ...props.AddNewLoom,
                                                weavingUnitId: e.target.value,
                                            })
                                        }
                                    >
                                        <option value={1}>Unit A</option>
                                        <option value={2}>Unit B</option>
                                        <option value={3}>Unit C</option>

                                    </select>
                                </div>
                            </div>
                            <div className="form-group mt-2 ">
                                <div className="col-md-6 offset-md-3 pb-2  ">
                                    <button
                                        className="btn btn-primary btn-sm px-4"
                                        onClick={(e) => props.addNewLoomFunc(e)}
                                    >
                                        Submit
                                    </button>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        </Modal>
    );
}



function MyVerticallyCenteredModalForUpdate(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <>
                {" "}
                <div className="x_panel mb-0">
                    <div className="x_title">
                        <h2 className="pl-2 pt-2">Update Loom Machine</h2>
                        <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
                            <li>
                                <a className="close-link">
                                    <i className="fa fa-close" onClick={props.onHide} />
                                </a>
                            </li>
                        </ul>
                        <div className="clearfix" />
                    </div>
                    <div className="x_content mb-2 mt-2">
                        <form  >
                            {/* <span className="section">Personal Info</span> */}
                            <div className="field item form-group">
                                <label className="col-form-label col-md-3 col-sm-3  label-align">
                                    Loom Number<span className="required">*</span>
                                </label>
                                <div className="col-md-8 col-sm-8">
                                    <input
                                        className="form-control"
                                        name="nanr"
                                        placeholder="ex. Loom Number"
                                        required="required"
                                        value={props.UpdateLoomList.loomNumber}
                                        onChange={(e) => props.setUpdateLoomList({ ...props.UpdateLoomList, loomNumber: e.target.value })}
                                    />

                                </div>
                            </div>
                            <div className="field item form-group">
                                <label className="col-form-label col-md-3 col-sm-3  label-align">
                                    Size<span className="required">*</span>
                                </label>
                                <div className="col-md-8 col-sm-8">
                                    <input
                                        className="form-control"
                                        name="nanr"
                                        placeholder="ex. Loom Number"
                                        required="required"
                                        value={props.UpdateLoomList.loomSize}
                                    onChange={(e) => props.setUpdateLoomList({ ...props.UpdateLoomList, loomSize: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="field item form-group">
                                <label className="col-form-label col-md-3 col-sm-3  label-align">
                                    Draw Box<span className="required">*</span>
                                </label>
                                <div className="col-md-8 col-sm-8">
                                    <input
                                        className="form-control"
                                        name="nanr"
                                        placeholder="ex. Loom Number"
                                        required="required" 
                                      value={props.UpdateLoomList.drawBox}
                                    onChange={(e) => props.setUpdateLoomList({ ...props.UpdateLoomList, drawBox: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="field item form-group">
                                <label className="col-form-label col-md-3 col-sm-3  label-align">
                                    Jacquad<span className="required">*</span>
                                </label>
                                <div className="col-md-8 col-sm-8">
                                    <input
                                        className="form-control"
                                        name="nanr"
                                        placeholder="ex. Loom Number"
                                        required="required"
                            value={props.UpdateLoomList.jacquard}
                                       onChange={(e) => props.setUpdateLoomList({ ...props.UpdateLoomList, jacquard: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="field item form-group">
                                <label className="col-form-label col-md-3 col-sm-3  label-align">
                                    Weaving Unit<span className="required">*</span>
                                </label>
                                <div className="col-md-8 col-sm-8">
                                    <select
                                        className="form-control"
                                        onChange={(e) =>
                                            props.setUpdateLoomList({
                                                ...props.UpdateLoomList,
                                                weavingUnitId: e.target.value,
                                            })
                                        }
                                    >
                                        <option value={1}>Unit A</option>
                                        <option value={2}>Unit B</option>
                                        <option value={3}>Unit C</option>

                                    </select>
                                </div>
                            </div>
                            <div className="form-group mt-2 ">
                                <div className="col-md-6 offset-md-3 pb-2  ">
                                    <button
                                        className="btn btn-primary btn-sm px-4"
                                         onClick={(e) => props.UpdateLoomListFunc(e)}
                                    >
                                        Update
                                    </button>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        </Modal>
    );
}