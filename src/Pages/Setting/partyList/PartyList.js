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
    const notifyAdd = () => toast("Employee Added Successfully");
    const [partyList, setPartyList] = useState([])
    const [modalShowEdit, setModalShowEdit] = useState(false)
    const [modalShow, setModalShow] = useState(false);
    const [addPartyData, setAddPartyData] = useState({
        partyName: "",
        partyCell: "",
        partyCnic: "",
        partyAddress: ""
    });
    const [editPartyData,setEditPartyData] = useState({
        partyId:"",
        partyName: "",
        partyCell: "",
        partyCnic: "",
        partyAddress: ""
    });
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
        console.log(addPartyData, "---");
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
            })
            .catch(function (error) {
                console.log(error);
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
                    {" "}
                    <div
                        role="main"
                        className={`right_col  h-100  ${showNavMenu === false ? "right_col-margin-remove" : " "
                            } `}
                    >

                        <AddParty show={modalShow} addPartyData={addPartyData} setAddPartyData={setAddPartyData}
                            onHide={() => setModalShow(false)} setModalShow={setModalShow} addPartyFunct={addPartyFunct}
                        /> 
                         <EditParty show={modalShowEdit} 
                            onHide={() => setModalShowEdit(false)} setModalShowEdit={setModalShowEdit}  
                            modalShowEdit={modalShowEdit} 
                            editPartyData={editPartyData} 
                            setEditPartyData={setEditPartyData}
                            fetchPartyData={fetchPartyData}

                        /> 
                         <div className="col-md-6 px-0 ">   </div>
                        <div className="col-md-6 text-right pr-0">
                            <button
                                className="btn btn-success  mt-2 btn-sm   px-2 mr-0"
                                onClick={() => setModalShow(true)}  > Add Party
                                <i className="ml-2 fa fa-plus-square"></i>
                            </button>
                        </div>

                        <div className="x_panel">
                            <div className="x_content">
                                <div className="table-responsive">
                                    <table className="table table-striped jambo_table bulk_action">
                                        <thead>
                                            <tr className="headings fontWeight300">
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
                                                    return <tr className="even pointer" key={item.party_id}>
                                                        <td className=" ">{index + 1}</td>
                                                        <td className=" ">{item.party_name}</td>
                                                        <td className=" text-left">{item.party_address}</td>
                                                        <td className="text-center  ">{item.party_cell}</td>
                                                        <td className=" text-right ">
                                                            {item.party_cnic}
                                                        </td>
                                                        <td className=" text-center ">
                                                            <i className="ml-2 fa fa-edit"    onClick={() => {
                                                               setEditPartyData({
                                                                    partyId:item.party_id,
                                                                    partyName: item.party_name,
                                                                    partyCell: item.party_cell,
                                                                    partyCnic:item.party_cnic,
                                                                    partyAddress: item.party_address
                                                                });
                                                                setModalShowEdit(true)}} ></i>
                                                        </td>

                                                    </tr>
                                                })
                                            }


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* )} */}
                    </div>
                </>
            )}
        </>
    );
};

export default PartyList;
