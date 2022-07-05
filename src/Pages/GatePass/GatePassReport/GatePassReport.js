import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 
import { endPoint } from "../../../config/Config";
import ReactToPrint from 'react-to-print'
import GatePassReportReciept from "./GatePassReportReciept";

const GatePassReport = () => {

    const { state } = useLocation();

    const notify = () => toast("Select Employee Or Date correctly!");


    const navigate = useNavigate();
    const [dontShowuntillselect, setdontShowuntillselect] = useState(false)
    const [stateToShowReportResult, setStateToShowReportResult] = useState(false)
    const [selectedReport, setSelectedReport] = useState({})
    const componentRef = useRef();
    const showNavMenu = useSelector((state) => state.NavState);
    const dispatch = useDispatch();
    const [GPHistoryRecord, setGPHistoryRecord] = useState([])
    var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
    var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
    var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
    const dateToday = `${year}-${month}-${day}`;
    const [dateFrom, setdateFrom] = useState(dateToday);
    const [dateTo, setdateTo] = useState(dateToday);


    const fetchHistory = async (e) => {
        console.log(dateFrom, dateTo, "---");

        var config = {
            method: 'get',
            url: `${endPoint}api/GatePassHistory?dateFrom=${dateFrom}T00:00:00&dateTo=${dateTo}T00:00:00`,
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}` }
        };

        await axios(config)
            .then(function (response) {
                setGPHistoryRecord(response.data)
                console.log(response.data, "----------");
            })
            .catch(function (error) {
                console.log(error);
            });


        setdontShowuntillselect(true)

    };
    const generateReportOfSpecificId = async (e) => {

        var config = {
            method: 'get',
            url: `${endPoint}api/GatePassReport?gpID=${e}`,
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}` }
        };

        await axios(config)
            .then(function (response) {
                setSelectedReport(response.data)
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        setStateToShowReportResult(true)

    }

    useEffect(() => {
        if (state !== null) { 
            setSelectedReport({

                poNo: state.data.gate_pass_no,
                partyId: state.data.party_id,
                totalWeight:state.data.totalWeight,
                partyName: state.data.partyName,
                partyAddress: state.data.party_address,
                partyCell: state.data.party_cell,
                totalRolls: state.data.total_rolls,
                totalPieces: state.data.total_pieces,
                entires: state.data.gatePassEntries,
                totalRoll: state.data.total_rolls,
                totalSharingWeight: state.data.total_sharing_weight,
                color: state.data.color_name,
                dyingProceess: state.data.dying_process,
                dyingWeight: state.data.total_dying_weight,
                remarks: state.data.remarks,
                driverName: state.data.driver_name,
                vehicleNumb: state.data.vehicle_no,
                time: state.data.time,
                createdTime:state.data.time,
                createdBy: "----",
                gatePassID:state.data.gatePassID 


            })
            // setdontShowuntillselect(true)
            setStateToShowReportResult(true)
        }

    }, []);

    return (
        <>
            <div
                className={`right_col  h-10 heightFixForFAult  ${showNavMenu == false ? "right_col-margin-remove" : " "
                    } `}
                role="main"
            >
                {" "}
                <div className="row">
                    <div className="col-md-3 ">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2 className="pl-2 pt-2">Gate Pass Report Generator</h2>
                                <ul className="nav navbar-right panel_toolbox d-flex justify-content-end"></ul>
                                <div className="clearfix" />
                            </div>
                            <div className="x_content  ">
                                <div className="field item form-group">
                                    <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                                        Date From
                                    </label>
                                    <div className="col-md-8 col-sm-6">
                                        <input
                                            className="form-control"
                                            type="date"
                                            value={dateFrom}
                                            onChange={(e) => {
                                                setdateFrom(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="field item form-group">
                                    <label className="col-form-label col-md-4 col-sm-4   label-align px-0">
                                        Date To
                                    </label>
                                    <div className="col-md-8 col-sm-6">
                                        <input
                                            className="form-control"
                                            type="date"
                                            value={dateTo}
                                            onChange={(e) => {
                                                setdateTo(e.target.value);
                                            }}
                                        />
                                        <div className="text-right">
                                            <button
                                                className="btn btn-customOrange btn-sm px-3 mt-2 mr-0"
                                                onClick={(e) => {

                                                    fetchHistory(e);
                                                }}
                                            >
                                                Search <i className="ml-2 fa fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <>
                            {" "}
                            {
                                dontShowuntillselect ? <>
                                    <div className="x_panel ">
                                        <div className="x_content tableforHistryinProductionReport">
                                            <div className="table-responsive">
                                                <table className="table table-striped jambo_table bulk_action">
                                                    <thead>
                                                        <tr className="headings positionFixed">
                                                            <th className="column-title fontStyleForHistoryHead right-border-1 text-center">Date</th>
                                                            <th className="column-title text-center fontStyleForHistoryHead right-border-1 text-center"> PO #</th>
                                                            <th className="column-title text-center">
                                                                <div className="col-md-12 fontStyleForHistoryHead text-center">Time</div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            GPHistoryRecord.length == 0 ? <>

                                                                <tr className="even pointer">

                                                                    <td
                                                                        width="100%"
                                                                        className="a-right a-right     text-center"
                                                                        colSpan="3"
                                                                    >
                                                                        No Data Available
                                                                    </td>
                                                                </tr>
                                                            </> : <>

                                                                {
                                                                    GPHistoryRecord.map((eachRecord) => {
                                                                        return <>
                                                                            <tr className="even pointer" key={eachRecord.gatePassID}>
                                                                                <td
                                                                                    className=" "
                                                                                    onClick={() => {
                                                                                        generateReportOfSpecificId(eachRecord.gatePassID)
                                                                                    }}
                                                                                >


                                                                                    {`${eachRecord.Date.slice(
                                                                                        8,
                                                                                        10
                                                                                    )}-${eachRecord.Date.slice(
                                                                                        5,
                                                                                        7
                                                                                    )}-${eachRecord.Date.slice(0, 4)}`}



                                                                                </td>

                                                                                <td
                                                                                    className=" text-center   "
                                                                                    onClick={() => {
                                                                                        generateReportOfSpecificId(eachRecord.gatePassID)
                                                                                    }}
                                                                                >
                                                                                    {eachRecord.gatePassNum}
                                                                                </td>

                                                                                <td
                                                                                    className=" text-center   "
                                                                                    onClick={() => {
                                                                                        generateReportOfSpecificId(eachRecord.gatePassID)
                                                                                    }}
                                                                                >
                                                                                    15:12 PM
                                                                                </td>


                                                                            </tr>
                                                                        </>
                                                                    })
                                                                }
                                                            </>
                                                        }


                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div></> : <></>
                            }



                        </>

                    </div>

                    {/* Report section  */}


                    {stateToShowReportResult ? <>
                        <>
                            <div className="col-md-9">
                                <div className="x_panel">
                                    <div className="x_title">
                                        <h2 className="pl-2 pt-2">Gate Pass Report</h2>
                                        <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
                                            <li>
                                                <ReactToPrint
                                                    trigger={() => {
                                                        return (
                                                            <button
                                                                className="btn btn-sm btn-success my-2 pt-1 borderRadiusRound"
                                                            >
                                                                <i className="fa fa-print"></i>
                                                            </button>
                                                        );
                                                    }}
                                                    content={() => componentRef.current}
                                                    documentTitle="new docs"
                                                    pageStyle="print"
                                                />
                                            </li>
                                            {/* <li>
                                                <button
                                                    className="btn btn-sm btn-primary my-2 pt-1 borderRadiusRound"
                                                    onClick={() => console.log("print")}
                                                >
                                                    <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                                                </button>
                                            </li> */}
                                            <li>
                                                <button
                                                    className="btn btn-sm btn-customOrange my-2 pt-1 borderRadiusRound"
                                                    onClick={() => {
                                                        navigate('/GatePassForm', {
                                                            state: {
                                                              data: selectedReport
                                                            }
                                
                                                          });
                                                    }}
                                                >
                                                    <i className="fa fa-edit"></i>
                                                </button>
                                            </li>
                                        </ul>
                                        <div className="clearfix" />
                                    </div>

                                    <GatePassReportReciept
                                        selectedReport={selectedReport} ref={componentRef} />
                                </div>
                            </div>
                        </></> : <></>}







                </div>
            </div>{" "}
        </>
    );
};

export default GatePassReport;
