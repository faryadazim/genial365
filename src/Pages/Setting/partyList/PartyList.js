import React, { useState, useEffect } from "react";
// import {  Button } from "bootstrap";
import Loader from "../../../Layout/Loader/Loader";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { endPoint } from "../../../config/Config";
import axios from "axios";
import AddParty from "./AddParty";
import EditParty from "./EditParty";

const PartyList = () => {

    const showNavMenu = useSelector((state) => state.NavState);
    const [isLoading, setIsLoading] = useState(true)
    const [partyList, setPartyList] = useState([])
    const [modalShowEdit, setModalShowEdit] = useState(false)
    const [modalShow, setModalShow] = useState(false);
    const [disableAddButton, setdisableAddButton] = useState(false)
    const [addPartyData, setAddPartyData] = useState({
        partyName: "",
        partyCell: "",
        partyCnic: "",
        partyAddress: ""
    });
    const [editPartyData, setEditPartyData] = useState({
        partyId: "",
        partyName: "",
        partyCell: "",
        partyCnic: "",
        partyAddress: ""
    });


    // validations States 
    const [addPartyValidator, setaddPartyValidator] = useState({
        name: true,
        address: true,
        cnic: true,
        phoneNumber: true
    })

    const [editPartyValidation, setEditPartyValidation] = useState({
        name: true,
        address: true,
        cnic: true,
        phoneNumber: true
    })

    const fetchPartyData = () => {
        var config = {
            method: 'get',
            url: `${endPoint}api/GetPartyList`,
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
            }
        };

        const result = axios(config)
            .then(function (response) {
                setPartyList(response.data);
                console.log(response.data);
                setIsLoading(false)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const addPartyFunct = () => {
        setdisableAddButton(true)
        var data = JSON.stringify(addPartyData);

        var config = {
            method: 'post',
            url: `${endPoint}api/PostParty`,
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setModalShow(false)
                setPartyList([...partyList, {
                    party_address: response.data.party_address,
                    party_cell: response.data.party_cell,
                    party_cnic: response.data.party_cnic,
                    party_id: response.data.party_id,
                    party_name: response.data.party_name,
                }])


                setAddPartyData({
                    partyName: "",
                    partyCell: "",
                    partyCnic: "",
                    partyAddress: ""
                });
                console.log(response.status, "response");
                if (response.status) {
                    toast.success(
                        "Party Added Successfully")
                    setdisableAddButton(false)
                } else {
                    toast.error("Something went wrong");
                    setdisableAddButton(false)
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.error("Something went wrong");
            });

    }
    useEffect(() => {
        fetchPartyData();
    }, []);



    return (
        <>
            {isLoading ? (
                <>
                    {" "}
                    <Loader />{" "}
                </>
            ) : (
                <>



                    <div
                        className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                            }   `}
                    >
                        <span>&nbsp; Party Management</span>
                    </div>

                    <div
                        role="main"
                        className={`right_col  h-100  ${showNavMenu === false ? "right_col-margin-remove" : " "
                            } `}
                    >

                        <AddParty show={modalShow} addPartyData={addPartyData} setAddPartyData={setAddPartyData}
                            addPartyValidator={addPartyValidator}
                            setaddPartyValidator={setaddPartyValidator}
                            onHide={() => {
                                setAddPartyData({
                                    partyName: "",
                                    partyCell: "",
                                    partyCnic: "",
                                    partyAddress: ""
                                });
                                setaddPartyValidator({
                                    name: true,
                                    address: true,
                                    cnic: true,
                                    phoneNumber: true
                                })
                                setModalShow(false)
                            }} setModalShow={setModalShow} addPartyFunct={addPartyFunct}
                            disableAddButton={disableAddButton}
                        />

                        <EditParty show={modalShowEdit}
                            editPartyValidation={editPartyValidation} setEditPartyValidation={setEditPartyValidation}
                            onHide={() => {
                                setEditPartyValidation({
                                    name: true,
                                    address: true,
                                    cnic: true,
                                    phoneNumber: true
                                })
                                setEditPartyData({
                                    partyId: "",
                                    partyName: "",
                                    partyCell: "",
                                    partyCnic: "",
                                    partyAddress: ""
                                })
                                setModalShowEdit(false)
                            }} setModalShowEdit={setModalShowEdit}
                            modalShowEdit={modalShowEdit}
                            editPartyData={editPartyData}
                            setEditPartyData={setEditPartyData}
                            fetchPartyData={fetchPartyData}

                        />

                        <div className="x_panel  ">
                            <div className="x_content ">
                                <span className="section">
                                    <div className="row px-2  pt-3">
                                        <div className="col-3 ">
                                            <i className='fa fa-list'></i>&nbsp;Listing
                                        </div>
                                        <div className="col-9 text-right ">
                                            <button
                                                className="btn   btn-sm   px-2 mr-1"
                                                style={{ backgroundColor: ' #f79c74 ', color: "white", borderRadius: "20px " }}
                                                onClick={() => setModalShow(true)}  > Add New
                                                <i className="ml-2 fa fa-plus-square"></i>
                                            </button>
                                        </div>




                                    </div>
                                </span>

                                <div className="table-responsive px-3 pb-2">
                                    <table className="table table-striped jambo_table bulk_action">
                                        <thead>
                                            <tr className="headings">

                                                <th className="column-title fontWeight300   right-border-1 text-center"> Sr. </th>
                                                <th className="column-title fontWeight300   right-border-1 text-center">
                                                    Party Name
                                                </th>
                                                <th className="column-title fontWeight300  right-border-1 text-center ">
                                                    Party Address
                                                </th>
                                                <th className="column-title fontWeight300   right-border-1 text-center">Phone</th>
                                                <th className="column-title fontWeight300 text-center">
                                                    CNIC
                                                </th>
                                                <th className="column-title fontWeight300 text-center">
                                                    Edit
                                                </th>

                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                partyList.map((item, index) => {
                                                    return (
                                                        <tr className="even pointer" key={index}>
                                                            <td className=" ">{index + 1}</td>
                                                            <td className=" ">{item.party_name}</td>
                                                            <td className=" text-left">{item.party_address}</td>
                                                            <td className="text-center  ">{item.party_cell}</td>
                                                            <td className=" text-right ">
                                                                {item.party_cnic}
                                                            </td>
                                                            <td className=" text-center ">
                                                                <i className="ml-2 fa fa-edit" onClick={() => {
                                                                    setEditPartyData({
                                                                        partyId: item.party_id,
                                                                        partyName: item.party_name,
                                                                        partyCell: item.party_cell,
                                                                        partyCnic: item.party_cnic,
                                                                        partyAddress: item.party_address
                                                                    });
                                                                    setModalShowEdit(true)
                                                                }} ></i>
                                                            </td>

                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>


                    </div>
                </>
            )}
        </>
    );
};

export default PartyList;
