import React, { useEffect } from 'react'
import { Modal } from "react-bootstrap";
import { endPoint } from '../../../config/Config';
 
const UpdateJVReport = (props) => {
 


    return (
        <Modal
            {...props}
            size="lg" aria-labelledby="contained-modal-title-vcenter"
            centered     >
            <>
                {" "}
                <div className="x_panel mb-0">
                    <div className="x_title">
                        <h2 className="pl-2 pt-2">Update JV Report</h2>
                 
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
                        <form>
                            <div className="field item form-group">
                                <label className="col-form-label col-md-3 col-sm-3  label-align">
                                    description<span className="required">*</span>
                                </label>
                                <div className="col-md-8 col-sm-8">
                                    <input
                                        name="nanr"
                                        className='form-control'
                                        type="text"
                                        placeholder="ex. Monthly Salary"
                                        value={props.JVReportData.description}
                                        onChange={(e) => {
                                            props.setJVReportData({
                                              ...props.JVReportData,
                                              description: e.target.value,
                                            })
                                          }}


                                    />
                                </div>
                            </div>
                            <div className="field item form-group">
                                <label className="col-form-label col-md-3 col-sm-3  label-align">
                                    Debit<span className="required">*</span>
                                </label>
                                <div className="col-md-8 col-sm-8">
                                    <input
                                        name="nanr"
                                        className='form-control'
                                        type="number"
                                        placeholder="Debit should not null"
                                        required="required"
                                        // onChange={(e)=>{props.setJVReportData({...props.JVReportData, debit:e.target.value})}}
                                        value={props.JVReportData.debit}
                                        onChange={(e) => {
                                            props.setJVReportData({
                                              ...props.JVReportData,
                                              debit: e.target.value,
                                              credit:0,
                                            })
                                         
                                          }}

                                    />
                                </div>
                            </div>
                            <div className="field item form-group">
                                <label className="col-form-label col-md-3 col-sm-3  label-align">
                                    Credit<span className="required">*</span>
                                </label>
                                <div className="col-md-8 col-sm-8">
                                    <input
                                        name="nanr"
                                        className='form-control'
                                        type="number"
                                        placeholder="Credit should not null"
                                        required="required"
                                        value={props.JVReportData.credit}
                                        onChange={(e) => {
                                            props.setJVReportData({
                                              ...props.JVReportData,
                                              credit: e.target.value,
                                              debit: 0,
                                            })  
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="form-group mt-2 ">
                                <div className="col-md-6 offset-md-3 pb-2  ">
                                    <button
                                        className="btn btn-primary btn-sm px-4"
                                        onClick={(e) => {
e.preventDefault()
                                        





                                            var myHeaders = new Headers();
                                            myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`);
                                            myHeaders.append("Content-Type", "application/json");
                                            
                                            var raw = JSON.stringify({
                                              "date": props.JVReportData.date,
                                              "voucherInv": props.JVReportData.voucherInv,
                                              "description":props.JVReportData.description,
                                              "debit": props.JVReportData.debit,
                                              "credit": props.JVReportData.credit
                                            });
                                            
                                            var requestOptions = {
                                              method: 'PUT',
                                              headers: myHeaders,
                                              body: raw,
                                              redirect: 'follow'
                                            };
                                            
                                            fetch( `${endPoint}api/PutJVReport?financeMainId=${props.JVReportData.financeMainId}&weaverId=${props.weaverValue.value}`, requestOptions)
                                              .then(response => response.text())
                                              .then(result => props.setModalShowForUpdate(false))
                                              .catch(error => console.log('error', error));


















                                        }}
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
export default UpdateJVReport;  