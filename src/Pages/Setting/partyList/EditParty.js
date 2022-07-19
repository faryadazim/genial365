import React, { useState, useEffect } from 'react'
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';
import { endPoint } from '../../../config/Config'
import { toast, ToastContainer } from "react-toastify";
const EditParty = (props) => {
const [disableEditButton, setdisableEditButton] = useState(false)
 
 
    return (

        <div className='marginForModel'>  <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <>
                {props.modalShowEdit ? <>
                    <div className="x_panel mb-0">
                        <div className="x_title">
                            <h2 className="pl-2 pt-2">
                                <i className='fa fa-edit'></i>&nbsp;Edit Party</h2>
                                <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
    <li>
        <a className="close-link">
            <i className="fa fa-close" onClick={props.onHide} />
        </a>
    </li>
</ul>
                            <div className="clearfix" />
                            <div className="x_content"></div>
                        </div>

                        <p className="text-center pr-5 mb-1 mt-2">
                            <div className="field item form-group">
                                <label className="col-form-label col-md-4 col-sm-4  label-align">
                                    Party Name<span className="required">*</span>
                                </label>
                                <div className="col-md-8 col-sm-8">
                                    <input
                                       className={`form-control ${props.editPartyValidation.name ? "" : "requiredValidateInput"}`}
                                  
                                        data-validate-length-range={6}
                                        data-validate-words={2}
                                        name="name"
                                        placeholder="ex. Mexicon Textile..."
                                        value={props.editPartyData.partyName}
                                        onChange={(e) => { 
                                            props.setEditPartyValidation({ ...props.editPartyValidation, name: true })
                                            props.setEditPartyData({ ...props.editPartyData, partyName: e.target.value }) }}


                                    />
                                </div>

                            </div>
                            <div className="field item form-group">
                                <label className="col-form-label col-md-4 col-sm-4  label-align">
                                    Enter Address<span className="required">*</span>
                                </label>
                                <div className="col-md-8 col-sm-8">
                                    <input 
                                        className={`form-control ${props.editPartyValidation.address ? "" : "requiredValidateInput"}`}
                                        data-validate-length-range={6}
                                        data-validate-words={2}
                                        name="name"
                                        placeholder="ex. Mexicon Textile..."
                                        value={props.editPartyData.partyAddress}
                                        onChange={(e) => {
                                            props.setEditPartyValidation({ ...props.editPartyValidation, address: true })
                                            props.setEditPartyData({ ...props.editPartyData, partyAddress: e.target.value }) }}

                                    />
                                </div>

                            </div>
                            <div className="field item form-group">
                                <label className="col-form-label col-md-4 col-sm-4  label-align">
                                    Enter CNIC
                                </label>
                                <div className="col-md-8 col-sm-8">
                                    <input
                                      className={`form-control ${props.editPartyValidation.cnic ? "" : "requiredValidateInput"}`}
                                        data-validate-length-range={6}
                                        data-validate-words={2}
                                        name="name"
                                        placeholder="ex. Mexicon Textile..."
                                        value={props.editPartyData.partyCnic}
                                        onChange={(e) => {
                                            props.setEditPartyValidation({ ...props.editPartyValidation, cnic: true })
                                            props.setEditPartyData({ ...props.editPartyData, partyCnic: e.target.value }) }}

                                    />
                                </div>

                            </div>
                            <div className="field item form-group">
                                <label className="col-form-label col-md-4 col-sm-4  label-align">
                                    Enter Phone Number  <span className="required">*</span>
                                </label>
                                <div className="col-md-8 col-sm-8">
                                    <input
                                        className={`form-control ${props.editPartyValidation.phoneNumber ? "" : "requiredValidateInput"}`}
                                        data-validate-length-range={6}
                                        data-validate-words={2}
                                        name="name"
                                        placeholder="ex. Mexicon Textile..."
                                        value={props.editPartyData.partyCell}
                                        onChange={(e) => {
                                            props.setEditPartyValidation({ ...props.editPartyValidation, phoneNumber: true })
                                            props.setEditPartyData({ ...props.editPartyData, partyCell: e.target.value }) }}

                                    />
                                </div>

                            </div>
                            <div className="field item form-group d-flex justify-content-end">

                                <button
                                    type="submit"
                                    disabled={disableEditButton}
                                    className="btn btn-primary btn-sm px-3 mr-2 "

                                    onClick={(e) => {
                                        
                                        if (props.editPartyData.partyName === "" || props.editPartyData.partyName === undefined || props.editPartyData.partyName === null || props.editPartyData.partyName === " ") {
                                            props.setEditPartyValidation({ ...props.editPartyValidation, name: false })
                                        } else if (props.editPartyData.partyAddress === "" || props.editPartyData.partyAddress === null || props.editPartyData.partyAddress === undefined) {
                                            props.setEditPartyValidation({ ...props.editPartyValidation, address: false })
                                        } else if (props.editPartyData.partyCnic === "" || props.editPartyData.partyCnic === null || props.editPartyData.partyCnic === undefined) {
                                            props.setEditPartyValidation({ ...props.editPartyValidation, cnic: false })
                                        } else if (props.editPartyData.partyCell === "" || props.editPartyData.partyCell === null || props.editPartyData.partyCell === undefined) {
                                            props.setEditPartyValidation({ ...props.editPartyValidation, phoneNumber: false })
                                        } else {


                                            setdisableEditButton(true)


                                            var data = JSON.stringify({
                                                "partyName": props.editPartyData.partyName,
                                                "partyCell": props.editPartyData.partyCell,
                                                "partyCnic": props.editPartyData.partyCnic,
                                                "partyAddress": props.editPartyData.partyAddress,
                                            });

                                            var config = {
                                                method: 'put',
                                                url: `${endPoint}api/PutPartyList?id=${props.editPartyData.partyId}`,
                                                headers: {
                                                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,
                                                    'Content-Type': 'application/json'
                                                },
                                                data: data
                                            };

                                            axios(config)
                                                .then(function (response) {
                                                    if (response.status === 200) {
                                                        toast.success(
                                                            "Party updated Successfully")
                                                        props.setModalShowEdit(false)
                                                        props.fetchPartyData()
                                                          setdisableEditButton(false)
                                                    } else {
                                                        toast.error("Something went wrong");
                                                          setdisableEditButton(false)
                                                    }
                                                })
                                                .catch(function (error) {
                                                    toast.error("Something went wrong");
                                                      setdisableEditButton(false)
                                                });
                                        }
                                    }}

                                >
                                    Submit
                                </button>

                            </div>


                        </p>
                    </div></> : <></>}

            </>
        </Modal></div>
    );
};

export default EditParty;
