import React  , {useState}from "react";

import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
const GrayProductList = () => {
    const showNavMenu = useSelector((state) => state.NavState);
    const ListOfGrayProduct = [{}, {}, {}, {}, {}, {}, {}, {}, {}]
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <div
                role="main"
                className={`right_col  h-100  ${showNavMenu == false ? "right_col-margin-remove" : " "
                    } `}
            >

<MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />

                <div className="page-title mb-2  ">
                    <div className="title_left ">
                        <h1>Gray Product Details</h1>
                    </div>
                    <div className="text-right">
                            <button className="btn btn-primary  btn-sm w-10"  onClick={() => setModalShow(true)}> Add New  &nbsp;&nbsp;&nbsp;
                            <i className="fa fa-plus-circle"></i>
                        </button>
                        <button className="btn btn-success  btn-sm w-10"> Print  &nbsp;&nbsp;&nbsp;
                            <i className="fa fa-print"></i>
                        </button>
                    
                    </div>
                    <div className="clearfix" />
                </div>






                <div className="x_panel">
                    <div className="x_content">
                        <div className="table-responsive">
                            <table className="table table-striped jambo_table bulk_action">
                                <thead>
                                    <tr className="headings-for-Gray-Product-Table">
                                        <th className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                                         removeLeftBorder  removeTopBorder text-center" style={{ width: "3%" }}>
                                            <div className=" py-1 d-flex justify-content-center " > Sr.</div>
                                        </th>
                                        <th className="column-title     border border-primary removePadding   border-bottom-color removeTopBorder  text-center" style={{ width: "6%" }} >
                                            <div className=" py-1">Size </div></th>
                                        <th className="column-title  text-center   border border-primary removePadding   border-bottom-color removeTopBorder" style={{ width: "13%" }}>
                                            <div className=" py-1 paddingXaxisTable">Per Piece Gray Weight in Grams</div> </th>
                                        <th className="column-title pileSize  border border-primary removePadding   border-bottom-color removeTopBorder  text-center" style={{ width: "16%" }} >
                                            <div>
                                                <div className="col-md-12 py-1">
                                                    Gray Size Pile to Pile
                                                </div>
                                                <div className="col-md-6 border border-primary removeLeftBorder removeRightBorder removeBottomBorder  py-1 ">
                                                    Length
                                                </div>
                                                <div className="col-md-6 border  border-primary removeRightBorder removeBottomBorder py-1">
                                                    Width
                                                </div>
                                            </div>
                                        </th>

                                        <th className="column-title   
                                         border border-primary removePadding   border-bottom-color removeTopBorder  removePadding  text-center"
                                            style={{ width: "27%" }}>
                                            76" Loom
                                            <div className=" py-1 col-md-12 text-center removePadding">

                                                <div className=" py-1 col-md-6 text-center  removePadding  border border-primary removeLeftBorder removeBottomBorder removeRightBorder pt-5">No Of Piece in  one Border </div>
                                                <div className=" py-1 col-md-6 text-center  removePadding  border border-primary  removeRightBorder removeBottomBorder">
                                                    <div className="col-md-12 text-center  removePadding  border border-primary removeRightBorder removeLeftBorder removeBottomBorder removeTopBorder removeLeftBorder ">Rate Per Border</div>
                                                    <div className="col-md-6 text-center    removePadding border border-primary removeRightBorder removeBottomBorder removeLeftBorder">With Draw Box</div>
                                                    <div className="col-md-6 text-center  removePadding  border border-primary removeRightBorder removeBottomBorder">Without Draw Box</div>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="column-title  
                                         border border-primary removePadding   border-bottom-color removeTopBorder  removePadding  text-center"
                                            style={{ width: "27%" }}>
                                            96" Loom
                                            <div className=" py-1 col-md-12 text-center removePadding">

                                                <div className=" py-1 col-md-6 text-center  removePadding  border border-primary removeLeftBorder removeBottomBorder removeRightBorder ">No Of Piece in  one Border </div>
                                                <div className=" py-1 col-md-6 text-center  removePadding  border border-primary  removeRightBorder removeBottomBorder">
                                                    <div className="col-md-12 text-center  removePadding  border border-primary removeRightBorder removeLeftBorder removeBottomBorder removeTopBorder removeLeftBorder ">Rate Per Border</div>
                                                    <div className="col-md-6 text-center   removePadding border border-primary   removeBottomBorder removeLeftBorder ">With Draw Box</div>
                                                    <div className="col-md-6 text-center  removePadding  border border-primary removeRightBorder removeBottomBorder removeLeftBorder">Without Draw Box</div>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="column-title  text-center  border border-primary 
                                        removeLeftBorder removeTopBorder removeRight Border   border-bottom-color " style={{ width: "4%" }}>Status</th>
                                        <th className="column-title  text-center  border border-primary 
                                        removeLeftBorder removeTopBorder removeRight Border   border-bottom-color " style={{ width: "2%" }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ListOfGrayProduct.map((item, index) => {
                                        return (
                                            <tr className="">
                                                <td className="column-title    removePadding   
                                        text-center paddingYaxisTable" style={{ width: "3%" }} >
                                                    <div className="  d-flex justify-content-center " > {index + 1}</div>
                                                </td>
                                                <td className="column-title   paddingYaxisTable   removePadding      text-center" style={{ width: "6%" }} >
                                                    <div className="  ">45/76 </div></td>
                                                <td className="column-title  text-center  paddingYaxisTable  removePadding " style={{ width: "13%" }}>
                                                    <div className="  ">545 g</div> </td>
                                                <td className="column-title pileSize    removePadding   paddingYaxisTable   text-center" style={{ width: "16%", height: "100%" }} >
                                                    <div>

                                                        <div className="col-md-6        ">
                                                            23ft
                                                        </div>
                                                        <div className="col-md-6     ">
                                                            12ft
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="column-title   
                                              removePadding      removePadding  text-center paddingYaxisTable"
                                                    style={{ width: "27%" }}>

                                                    <div className="  col-md-12 text-center removePadding">

                                                        <div className="   col-md-6 text-center  removePadding            pt-5">300</div>
                                                        <div className="  col-md-6 text-center             ">

                                                            <div className="col-md-6 text-center    ">Yes</div>
                                                            <div className="col-md-6 text-center  removePadding  ">No</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="column-title  
                                            removePadding       removePadding  text-center paddingYaxisTable"
                                                    style={{ width: "27%" }}>

                                                    <div className=" py-1 col-md-12 text-center removePadding">

                                                        <div className=" py-1 col-md-6 text-center  removePadding             ">345 </div>
                                                        <div className=" py-1 col-md-6 text-center  removePadding     ">

                                                            <div className="col-md-6 text-center   removePadding          "> Yes</div>
                                                            <div className="col-md-6 text-center  removePadding    removeLeftBorder">No</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="column-title removePadding  text-center   paddingYaxisTable    
                                            " style={{ width: "4%" }}>true</td>
                                                <td className="column-title removePadding  text-center   paddingYaxisTable    
                                            " style={{ width: "2%" }}>

                                                    <i className="fa fa-edit text-common" ></i>
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
        </>
    );
};

export default GrayProductList;








function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <>
          {" "}
          <div className="x_panel mb-0">
            <div className="x_title">
              <h2 className="pl-2 pt-2">Add Employee</h2>
              <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
                <li>
                  <a
                    className="close-link"
  
                  >
                    <i className="fa fa-close" onClick={props.onHide} />
                  </a>
                </li>
              </ul>
              <div className="clearfix" />
            </div>
            <div className="x_content mb-2 mt-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
  
                }}
              >
                {/* <span className="section">Personal Info</span> */}
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Name<span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-8">
                    <input
                      className="form-control"
  
                      name="nanr"
                      placeholder="ex. Ali A.Khan"
                      required="required"
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    CNIC<span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-8">
                    <input
                      className="form-control"
  
                      name="nanr"
                      placeholder="ex. 33103-4578234-5"
                      required="required"
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Father Name<span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-8">
                    <input
                      className="form-control"
  
                      name="f-Name"
                      placeholder="ex. Abubakar A.Khan"
                      required="required"
                    />
                  </div>
                </div>
  
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Phone Numbers<span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-8">
                    <div class="row">
                      <div className="col-md-6"><input
                        className="form-control"
  
                        name="number"
                        placeholder="Phone Number 1"
  
                      />
                      </div>
                      <div className="col-md-6"><input
                        className="form-control"
  
                        name="number"
                        placeholder="Phone Number 2 (Optional)"
  
                      />
                      </div>
                    </div>
                    <div class="row mt-3">
                      <div className="col-md-6"><input
                        className="form-control"
  
                        name="number"
                        placeholder="Phone Number 3 (Optional)"
  
                      />
                      </div>
                      <div className="col-md-6"><input
                        className="form-control"
  
                        name="number"
                        placeholder="Home Phone (Optional)"
  
                      />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Address<span className="required">*</span>
                  </label>
                  <div className="col-md-8 col-sm-8">
                    <input
                      className="form-control"
  
                      name="address"
                      placeholder="ex. Street 22 ,City Pakistan 39000"
                      required="required"
                    />
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Reference Name<span className="required">*</span>
                  </label>
                  <div className="col-md-4 col-sm-8">
                    <input
                      className="form-control"
  
                      name="address"
                      placeholder="ex. Azim Maalic"
                      required="required"
                    />
                  </div>
                  <div className="col-md-4 col-sm-8">
                    <input
                      className="form-control"
  
                      name="Phone "
                      placeholder="Reference Phone "
  
                    />
                  </div>
                </div>
  
  
                {/* <div className="clearfix" /> */}
  
  
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Job Status<span className="required">*</span>
                  </label>
                  <div className="col-md-3 col-sm-8">
                    <div className="form-group row ml-1-2">
                      <select className="form-control">
  
                        <option>Active</option>
                        <option>Left</option>
                      </select>
                    </div>
                  </div>
                  <label className="col-form-label col-md-2 col-sm-3  label-align">
                    Designation <span className="required">*</span>
                  </label>
                  <div className="col-md-3 col-sm-8">
  
                    <select className="form-control">
  
                      <option>Select option</option>
                      <option>Clerk</option>
                      <option>Manager</option>
                      <option>Cashier</option>
                      <option>Accountant</option>
                    </select>
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Select Reqruitment Type <span className="required">*</span>
                  </label>
                  <div className="col-md-3 col-sm-8">
                    <div className="form-group row ml-1-2">
                      <select className="form-control"  >
                        <option value="1">Choose option</option>
                        <option value="2">Option one</option>
                        <option onSelect={() => console.log("Ad new Designation")}>
  
                          Add New Designation
  
                        </option>
                      </select>
                    </div>
                  </div>
                  <label className="col-form-label col-md-2 col-sm-3  label-align">
                    Monthly Salary <span className="required">*</span>
                  </label>
                  <div className="col-md-3 col-sm-8">
  
                    <div >
                      <input
                        className="form-control"
                        name="nanr"
                        placeholder="ex. 20000"
                        required="required"
                      />
                    </div>
                  </div>
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    Picture 1
                  </label>
                  <div className="col-md-3 col-sm-8">
  
                    <div  >
  
                      <input className="form-control form-control-sm" id="formFileSm" type="file" style={{ height: "33px" }} />
                    </div>
                  </div>
  
  
  
                  <label className="col-form-label col-md-2 col-sm-3  label-align">
                    Picture 2
                  </label>
                  <div className="col-md-3 col-sm-8">
  
                    <div >
  
                      <input className="form-control form-control-sm" id="formFileSm" type="file" style={{ height: "33px" }} />
                    </div>
                  </div>
  
                </div>
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                    CNIC Front
                  </label>
                  <div className="col-md-3 col-sm-8">
  
                    <div  >
  
                      <input className="form-control form-control-sm" id="formFileSm" type="file" style={{ height: "33px" }} />
                    </div>
                  </div>
  
  
  
                  <label className="col-form-label col-md-2 col-sm-3  label-align">
                    CNIC Back
                  </label>
                  <div className="col-md-3 col-sm-8">
  
                    <div >
  
                      <input className="form-control form-control-sm" id="formFileSm" type="file" style={{ height: "33px" }} />
                    </div>
                  </div>
  
                </div>
  
                <div className="form-group mt-2 ">
                  <div className="col-md-6 offset-md-3 pb-2  ">
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm px-4"
                    >
                      Submit
                    </button>
                    <button
  
                      className="btn btn-success btn-sm ml-2 px-3"
                    >
                      Reset
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