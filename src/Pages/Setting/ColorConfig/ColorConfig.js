import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../Layout/Loader/Loader";
import { endPoint } from "../../../config/Config";
import { toast } from "react-toastify";
import axios from "axios";
import EditColor from './EditColor'



const ColorConfig = () => {
    const notifyDeleted = () => toast("Color Deleted Successfully");
    const notifyAdded = () => toast("Color Added Successfully");
    const showNavMenu = useSelector((state) => state.NavState);
    const [isLoading, setisLoading] = useState(true)
    const [faultList, setFaultList] = useState([{}]);
    const [addNewFaultTitle, setAddNewFaultTitle] = useState("")
    const [editColorState, setEditColorState] = useState({ id: "", color: "" })
    const [modalShow, setModalShow] = useState(false);

    const fetchAllData = async () => {

        var config = {
            method: 'get',
            url: `${endPoint}api/GetColor `,
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
            }
        };

        await axios(config)
            .then(function (response) {
                setFaultList(response.data);
                setisLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });





    };

    const addNewFault = (e) => {
        e.preventDefault()
        var config = {
            method: 'post',
            url: `${endPoint}api/PostColor?color=${addNewFaultTitle}`,
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
            }
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                setAddNewFaultTitle("")
                fetchAllData();
            })
            .catch(function (error) {
                console.log(error);
            });


    }
    const deleteFault = async (id) => {

        var config = {
            method: 'delete',
            url: `${endPoint}api/DeleteColor?id=${id}`,
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
            }
        };

        await axios(config)
            .then(function (response) {
                fetchAllData();
                notifyDeleted()
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    const editColor = () => {

    }
    useEffect(() => { fetchAllData() }, []);

    return (
        <>
            {
                isLoading ? <>
                    <Loader />
                </> : <>
                    <EditColor show={modalShow}

                        onHide={() => {
                            setModalShow(false)
                        }}


                    />
                    <div
                        className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                            }   `}
                    >
                        <span>&nbsp; Color Management</span>
                    </div>
                    <div
                        role="main"
                        className={`right_col  h-100  ${showNavMenu === false ? "right_col-margin-remove" : " "
                            } `}
                    >
                        <div className="x_panel">


                            <div className="x_content my-3">
                                <span className="section pl-4">
                                    <i className="fa fa-edit"></i>&nbsp;Add Color
                                </span>
                                <div className="row">
                                    <div className="field item form-group col-md-6 col-sm-6">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align"> Enter Color Title <span className="required">*</span></label>
                                        <div className="col-md-8 col-sm-8">
                                            <input
                                                className="form-control"
                                                data-validate-length-range={6}
                                                data-validate-words={2}
                                                name="name"
                                                placeholder="ex. Plugin Breakdown  "

                                                value={addNewFaultTitle}
                                                onChange={(e) =>
                                                    setAddNewFaultTitle(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 text-right x_footer">

                                <button
                                    type="submit"
                                    style={{ backgroundColor: ' #f79c74 ', color: "white", borderRadius: "20px " }}
                                    className="btn  btn-sm px-3 mt-2"
                                    onClick={(e) => {
                                        addNewFault(e)
                                    }}
                                    disabled={addNewFaultTitle == "" ? true : false}
                                >
                                    Submit
                                </button>



                            </div>

                        </div>



                        <div className="x_panel  ">
                            <div className="x_content">
                                <span className="section pl-3">
                                    <div className="row   pt-3">
                                        <div className="col-3">
                                            <i className='fa fa-list'></i>&nbsp;Listing
                                        </div>
                                        <div className="col-9 text-right ">
                                        </div>
                                    </div>
                                </span>

                                <div className="table-responsive px-3 pb-2">
                                    <table className="table table-striped jambo_table bulk_action">
                                        <thead>
                                            <tr className="headings">
                                                <th className="column-title  right-border-1 text-center" width="10%"> Sr. </th>
                                                <th className="column-title  right-border-1 text-center">Color Title</th>
                                                <th className="column-title text-center" width="10%">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {faultList.map((item, index) => {
                                                return (
                                                    <tr className="even pointer" key={item.fault_id} >
                                                        <td className=" ">{index + 1}</td>
                                                        <td className=" "> {item.color_name} </td>
                                                        <td

                                                            className="a-right a-right     text-center"
                                                        >

                                                            <i
                                                                className="fa fa-edit pl-3"
                                                                onClick={() => {
                                                                    setModalShow(true)
                                                                    setEditColorState({ id: item.fault_id, color: item.color_name })
                                                                }}
                                                            ></i>
                                                            <i
                                                                className="fa fa-trash-o pl-3"
                                                                onClick={() => {
                                                                    deleteFault(item.color_id);
                                                                }}
                                                            ></i>
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
                </>
            }



        </>
    );
};

export default ColorConfig;
