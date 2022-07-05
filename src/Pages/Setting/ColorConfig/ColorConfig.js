import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../Layout/Loader/Loader";
import { endPoint } from "../../../config/Config";
import { toast } from "react-toastify";
import axios from "axios";



const ColorConfig = () => {
    const notifyDeleted = () => toast("Color Deleted Successfully");
    const notifyAdded = () => toast("Color Added Successfully");
    const showNavMenu = useSelector((state) => state.NavState);
    const [isLoading, setisLoading] = useState(true)
    const [faultList, setFaultList] = useState([{}]);
    const [addNewFaultTitle, setAddNewFaultTitle] = useState("")
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
    useEffect(() => { fetchAllData() }, []);

    return (
        <>
            {
                isLoading ? <>
                    <Loader />
                </> : <>   <div
                    className={`right_col  h-10 heightFixForFAult  ${showNavMenu == false ? "right_col-margin-remove" : " "
                        } `}
                    role="main"
                >
                    {" "}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="x_panel">
                                <div className="x_content">
                                    <div className="table-responsive">
                                        <table className="table table-striped jambo_table bulk_action">
                                            <thead>
                                                <tr className="headings">
                                                    <th className="column-title  right-border-1 text-center" width="10%"> Sr. </th>
                                                    <th className="column-title  right-border-1 text-center">Color Title</th>
                                                    <th className="column-title text-center" width="20%">
                                                        Delete
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
                                                                width="20%"
                                                                className="a-right a-right     text-center"
                                                            >

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
                        <div className="col-md-6">
                            <div className="x_panel">
                                <div className="x_title">
                                    <h2 className="pl-2 pt-2">Color Management</h2>
                                    <ul className="nav navbar-right panel_toolbox d-flex justify-content-end"></ul>
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content">
                                    <form>
                                        {/* <span className="section">Personal Info</span> */}
                                        <div className="field item form-group">
                                            <label className="col-form-label col-md-4 col-sm-4  label-align">
                                                Enter Color Title<span className="required">*</span>
                                            </label>
                                            <div className="col-md-6 col-sm-6">
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
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-sm px-3 mt-2"
                                                    onClick={(e) => {
                                                        addNewFault(e)
                                                    }}
                                                    disabled={addNewFaultTitle == "" ? true : false}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> </>
            }



        </>
    );
};

export default ColorConfig;
