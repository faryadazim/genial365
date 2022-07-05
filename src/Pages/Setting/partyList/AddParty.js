import React, { useState, useEffect } from 'react'
import { Modal, Button } from "react-bootstrap";

const AddParty = (props) => {




    return (

        <div className='marginForModel'>  <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <>
                {" "}
                <div className="x_panel mb-0">
                    <div className="x_title">
                        <h2 className="pl-2 pt-2">Add Party</h2>
                        <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
                            <li></li>
                        </ul>
                        <div className="clearfix" />
                        <div className="x_content"></div>
                    </div>

                    <p className="text-center pr-5 mb-1">
                        <div className="field item form-group">
                            <label className="col-form-label col-md-4 col-sm-4  label-align">
                                Enter Party Name<span className="required">*</span>
                            </label>
                            <div className="col-md-8 col-sm-8">
                                <input
                                    className="form-control"
                                    data-validate-length-range={6}
                                    data-validate-words={2}
                                    name="name"
                                    placeholder="ex. Mexicon Textile..."
                                    value={props.addPartyData.partyName}
                                    onChange={(e)=>{props.setAddPartyData({...props.addPartyData , partyName:e.target.value})}}


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
                                    value={props.addPartyData.partyAddress}
                                    onChange={(e)=>{props.setAddPartyData({...props.addPartyData , partyAddress:e.target.value})}}

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
                                    value={props.addPartyData.partyCnic}
                                    onChange={(e)=>{props.setAddPartyData({...props.addPartyData , partyCnic:e.target.value})}}

                                />
                            </div>
                          
                        </div>
                        <div className="field item form-group">
                            <label className="col-form-label col-md-4 col-sm-4  label-align">
                                Enter Phone Number<span className="required">*</span>
                            </label>
                            <div className="col-md-8 col-sm-8">
                                <input
                                    className="form-control"
                                    data-validate-length-range={6}
                                    data-validate-words={2}
                                    name="name"
                                    placeholder="ex. Mexicon Textile..."
                                    value={props.addPartyData.partyCell}
                                    onChange={(e)=>{props.setAddPartyData({...props.addPartyData , partyCell:e.target.value})}}

                                />
                            </div>
                          
                        </div>
                        <div className="field item form-group d-flex justify-content-end">
                       
                        <button
                                    type="submit"
                                    className="btn btn-primary btn-sm px-3 "

                                    onClick={(e) => {

props.addPartyFunct(    )

                                    }}

                                >
                                    Add PArty
                                </button>
                          
                        </div>

                    
                    </p> 
                </div>
            </>
        </Modal></div>
    );
};

export default AddParty;
