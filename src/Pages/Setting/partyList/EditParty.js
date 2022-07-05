import React, { useState, useEffect } from 'react'
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';
import {endPoint} from '../../../config/Config'

const EditParty = (props) => {






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
                            <h2 className="pl-2 pt-2">Edit Party Detail</h2>
                            <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
                                <li></li>
                            </ul>
                            <div className="clearfix" />
                            <div className="x_content"></div>
                        </div>

                        <p className="text-center pr-5 mb-1">
                            <div className="field item form-group">
                                <label className="col-form-label col-md-4 col-sm-4  label-align">
                                     Party Name<span className="required">*</span>
                                </label>
                                <div className="col-md-8 col-sm-8">
                                    <input
                                        className="form-control"
                                        data-validate-length-range={6}
                                        data-validate-words={2}
                                        name="name"
                                        placeholder="ex. Mexicon Textile..."
                                        value={props.editPartyData.partyName}
                                        onChange={(e) => { props.setEditPartyData({ ...props.editPartyData, partyName: e.target.value }) }}


                                    />
                                </div>

                            </div>
                            <div className="field item form-group">
                                <label className="col-form-label col-md-4 col-sm-4  label-align">
                                    Enter Address<span className="required">*</span>
                                </label>
                                <div className="col-md-8 col-sm-8">
                                    <input
                                        className="form-control"
                                        data-validate-length-range={6}
                                        data-validate-words={2}
                                        name="name"
                                        placeholder="ex. Mexicon Textile..."
                                        value={props.editPartyData.partyAddress}
                                        onChange={(e) => { props.setEditPartyData({ ...props.editPartyData, partyAddress: e.target.value }) }}

                                    />
                                </div>

                            </div>
                            <div className="field item form-group">
                                <label className="col-form-label col-md-4 col-sm-4  label-align">
                                    Enter CNIC 
                                </label>
                                <div className="col-md-8 col-sm-8">
                                    <input
                                        className="form-control"
                                        data-validate-length-range={6}
                                        data-validate-words={2}
                                        name="name"
                                        placeholder="ex. Mexicon Textile..."
                                        value={props.editPartyData.partyCnic}
                                        onChange={(e) => { props.setEditPartyData({ ...props.editPartyData, partyCnic: e.target.value }) }}

                                    />
                                </div>

                            </div>
                            <div className="field item form-group">
                                <label className="col-form-label col-md-4 col-sm-4  label-align">
                                    Enter Phone Number  <span className="required">*</span>
                                </label>
                                <div className="col-md-8 col-sm-8">
                                    <input
                                        className="form-control"
                                        data-validate-length-range={6}
                                        data-validate-words={2}
                                        name="name"
                                        placeholder="ex. Mexicon Textile..."
                                        value={props.editPartyData.partyCell}
                                        onChange={(e) => { props.setEditPartyData({ ...props.editPartyData, partyCell: e.target.value }) }}

                                    />
                                </div>

                            </div>
                            <div className="field item form-group d-flex justify-content-end">

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-sm px-3 "

                                    onClick={(e) => {

                                console.log(props.editPartyData
                                    );



                                 
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
                                      data : data
                                    };
                                    
                                    axios(config)
                                    .then(function (response) {
                                       if(response.status===200){
                                        props.setModalShowEdit(false)
                                        props.fetchPartyData()
                                       }else{
                                            console.log("updated")
                                       }
                                    })
                                    .catch(function (error) {
                                      console.log(error);
                                    });
                                    













                                    }}

                                >
                                    Update PArty
                                </button>

                            </div>


                        </p>
                    </div></> : <></>}

            </>
        </Modal></div>
    );
};

export default EditParty;
