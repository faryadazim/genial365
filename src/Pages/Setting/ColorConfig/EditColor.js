import React, { useState } from 'react'
import { Modal } from "react-bootstrap";

const EditColor = (props) => {




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
                        <h2 className="pl-2 pt-2">   <i className='fa fa-list'></i>&nbsp;Edit Party</h2>
                        <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
                            <li></li>
                        </ul>
                        <div className="clearfix" />
                        <div className="x_content">
                            <div className="row mt-3">
                                <div className="field item form-group col-md-12 col-sm-12">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align"> Enter Color Title <span className="required">*</span></label>
                                    <div className="col-md-8 col-sm-8">
                                        <input
                                            className="form-control"
                                            data-validate-length-range={6}
                                            data-validate-words={2}
                                            name="name"
                                            placeholder="ex. Plugin Breakdown  "

                                        // value={addNewFaultTitle}
                                        // onChange={(e) =>
                                        //     setAddNewFaultTitle(e.target.value)
                                        // }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="x_content ">
                            <div className="row  text-right  pr-5  mr-3 ">
                                <div className="col-md-12">
                                <button
                                    type="submit"
                                    style={{ backgroundColor: ' #f79c74 ', color: "white", borderRadius: "20px " }}
                                    className="btn  btn-sm px-3   "
                                // onClick={(e) => {
                                //     addNewFault(e)
                                // }}
                                // disabled={addNewFaultTitle == "" ? true : false}
                                >
                                    Submit
                                </button></div>
                            </div>
                        </div>
                    </div>





                </div>
            </>
        </Modal></div>
    );
};

export default EditColor;
