import React, { useState } from 'react'
import { Modal } from "react-bootstrap";
import { preventMinus } from '../../../config/oreventMinus';

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
                        <h2 className="pl-2 pt-2">   <i className='fa fa-list'></i>&nbsp;Add Party</h2>
                        <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
                            <li></li>
                        </ul>
                        <div className="clearfix" />
                        <div className="x_content"></div>
                    </div>





                    <p className="text-center pr-5 mb-1 mt-2">
                        <div className="field item form-group">
                            <label className="col-form-label col-md-4 col-sm-4  label-align">
                                Enter Party Name<span className="required">*</span>
                            </label>
                            <div className="col-md-8 col-sm-8">
                                <input
                                    className={`form-control ${props.addPartyValidator.name ? "" : "requiredValidateInput"}`}
                                    data-validate-length-range={6}
                                    data-validate-words={2}
                                    name="name"
                                    placeholder="Party Name..."
                                    value={props.addPartyData.partyName}
                                    onChange={(e) => {
                                        props.setaddPartyValidator({ ...props.addPartyValidator, name: true })
                                        props.setAddPartyData({ ...props.addPartyData, partyName: e.target.value })
                                    }}


                                />
                            </div>

                        </div>
                        <div className="field item form-group">
                            <label className="col-form-label col-md-4 col-sm-4  label-align">
                                Enter Address<span className="required">*</span>
                            </label>

 
                            <div className="col-md-8 col-sm-8">
                                <input
                                    className={`form-control ${props.addPartyValidator.address ? "" : "requiredValidateInput"}`}

                                    data-validate-length-range={6}
                                    data-validate-words={2}
                                    name="name"
                                    placeholder="Party Address..."
                                    value={props.addPartyData.partyAddress}
                                    onChange={(e) => {
                                        props.setaddPartyValidator({ ...props.addPartyValidator, address: true })
                                        props.setAddPartyData({ ...props.addPartyData, partyAddress: e.target.value })
                                    }}

                                />
                            </div>

                        </div>
                        <div className="field item form-group">
                            <label className="col-form-label col-md-4 col-sm-4  label-align">
                                Enter CNIC
                            </label>

                            <div className="col-md-8 col-sm-8">
                                <input
                                    onKeyPress={(e) => preventMinus(e)}
                                    min="0"
                                    onInput={(er) => er.target.value = er.target.value.slice(0, 13)}
                                    className={`form-control ${props.addPartyValidator.cnic ? "" : "requiredValidateInput"}`}
                                    data-validate-length-range={6}
                                    data-validate-words={2}
                                    name="name"
                                    type="number"
                                    placeholder="CNIC..."
                                    value={props.addPartyData.partyCnic}
                                    onChange={(e) => {
                                        props.setaddPartyValidator({ ...props.addPartyValidator, cnic: true })
                                        props.setAddPartyData({ ...props.addPartyData, partyCnic: e.target.value })
                                    }}

                                />
                            </div>

                        </div>
                        <div className="field item form-group">
                            <label className="col-form-label col-md-4 col-sm-4  label-align">
                                Enter Phone Number<span className="required">*</span>
                            </label>




                            <div className="col-md-8 col-sm-8">
                                <input
                                    type="number"
                                    className={`form-control ${props.addPartyValidator.phoneNumber ? "" : "requiredValidateInput"}`}
                                    data-validate-length-range={6}
                                    data-validate-words={2}
                                    name="name"
                                    placeholder="ex.Phone Number..."
                                    value={props.addPartyData.partyCell}
                                    onChange={(e) => {
                                        props.setaddPartyValidator({ ...props.addPartyValidator, phoneNumber: true })
                                        props.setAddPartyData({ ...props.addPartyData, partyCell: e.target.value })
                                    }}
                                    onKeyPress={(e) => preventMinus(e)}
                                    min="0"
                                    onInput={(er) => er.target.value = er.target.value.slice(0, 11)}
                                />
                            </div>

                        </div>
                        <div className="field item form-group d-flex justify-content-end">

                            <button
                                type="submit"
                                disabled={props.disableAddButton}
                                className="btn btn-primary btn-sm px-3 mr-2"

                                onClick={(e) => {
                                    if (props.addPartyData.partyName === "" || props.addPartyData.partyName === undefined || props.addPartyData.partyName === null || props.addPartyData.partyName === " ") {
                                        props.setaddPartyValidator({ ...props.addPartyValidator, name: false })
                                    } else if (props.addPartyData.partyAddress === "" || props.addPartyData.partyAddress === null || props.addPartyData.partyAddress === undefined) {
                                        props.setaddPartyValidator({ ...props.addPartyValidator, address: false })
                                    } else if (props.addPartyData.partyCnic === "" || props.addPartyData.partyCnic === null || props.addPartyData.partyCnic === undefined) {
                                        props.setaddPartyValidator({ ...props.addPartyValidator, cnic: false })
                                    } else if (props.addPartyData.partyCell === "" || props.addPartyData.partyCell === null || props.addPartyData.partyCell === undefined) {
                                        props.setaddPartyValidator({ ...props.addPartyValidator, phoneNumber: false })
                                    } else {

                                        props.addPartyFunct()
                                    }





                                }}

                            >
                                Submit
                            </button>

                        </div>


                    </p>
                </div>
            </>
        </Modal></div>
    );
};

export default AddParty;
