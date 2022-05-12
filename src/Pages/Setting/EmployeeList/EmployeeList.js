import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
// import {  Button } from "bootstrap";




import { useSelector } from "react-redux";
import Loader from "../../../Layout/Loader/Loader";
const EmployeeList = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [ListOfEmployee, setListOfEmployee] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);

  const [isLoading, setisLoading] = useState(true);
  const showNavMenu = useSelector((state) => state.NavState);

  const fetchAllData = () => {
    fetch("http://localhost:63145/api/employeeLists", {
      method: "GET",
      headers: {
        // Authorization: "bearer" + " " + e,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          console.log(data, "success");
          setListOfEmployee(data)
          setisLoading(false)

        });
      })
      .catch((error) => console.log("error", error));
  }
  useEffect(() => {
    fetchAllData()
  }, [])

  return (
    <>

      {
        isLoading ? <> <Loader /> </> : <>   <div
          role="main"
          className={`right_col  h-100  ${showNavMenu == false ? "right_col-margin-remove" : " "
            } `}
        >
          {/* <Button variant="primary" onClick={() => setModalShow(true)}>
      Launch vertically centered modal
    </Button> */}

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <button className="btn btn-success  btn-sm   px-2" onClick={() => setModalShow(true)}>
            Add New
            <i className="ml-2 fa fa-plus-square"></i>
          </button>
          <div className="x_panel">
            <div className="x_content">
              <div className="table-responsive">
                <table className="table table-striped jambo_table bulk_action">
                  <thead>
                    <tr className="headings">
                      <th className="column-title"> Sr. </th>
                      <th className="column-title">Emp.Name</th>
                      <th className="column-title">FatherName</th>
                      <th className="column-title">CNIC</th>
                      <th className="column-title">Address</th>
                      <th className="column-title">Designation</th>
                      <th className="column-title">Job Status</th>
                      <th className="column-title">Phone</th>
                    </tr>
                  </thead>

                  <tbody>
                    {ListOfEmployee.map((item, index) => {
                      return (
                        <tr className="even pointer" key={item.employee_Id}>
                          <td className=" ">{index + 1}</td>
                          <td className=" ">{item.name}</td>
                          <td className=" ">{item.fatherName}</td>
                          <td className=" ">{item.cnicNum}</td>
                          <td className=" ">{item.address}</td>
                          <td className=" ">{item.address}</td>
                          <td className=" ">{item.jobStatus}</td>
                          <td className=" ">{item.phoneNum1}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div></>
      }

    </>
  );
};

export default EmployeeList;










function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header>
                <Modal.Title>Add Employee</Modal.Title>
                <i  className="fa fa-close"  onClick={props.onHide} ></i>
              </Modal.Header>
        <Modal.Body> */}
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
          <div className="x_content">
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
                  Phone Numbers<span className="required">*</span>
                </label>
                <div className="col-md-8 col-sm-8">
                  <div class="row">
                    <div className="col-md-6"><input
                      className="form-control"

                      name="number"
                      placeholder="Phone Number 1"

                    /></div>
                    <div className="col-md-6"><input
                      className="form-control"

                      name="number"
                      placeholder="Phone Number 2 (Optional)"

                    /></div>
                  </div>
                  <div class="row mt-3">
                    <div className="col-md-6"><input
                      className="form-control"

                      name="number"
                      placeholder="Phone Number 3 (Optional)"

                    /></div>
                    <div className="col-md-6"><input
                      className="form-control"

                      name="number"
                      placeholder="Home Phone (Optional)"

                    /></div>
                  </div>
                </div>
              </div>
              <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">
                  Father Name<span className="required">*</span>
                </label>
                <div className="col-md-8 col-sm-8">



                  <div class="form-group">
                    <label for="file" class="sr-only">File</label>
                    <div class="input-group">
                      <input type="text" name="filename" class="form-control" placeholder="No file selected" readonly />
                      <span class="input-group-btn">
                        <div class="btn btn-default  custom-file-uploader">
                          <input type="file" name="file" onchange="this.form.filename.value = this.files.length ? this.files[0].name : ''" />
                          Select a file
                        </div>
                      </span>
                    </div>

                  </div>




                </div>
              </div>
              {/* <div className="ln_solid"> */}
              <div className="form-group">
                <div className="col-md-6 offset-md-3 pb-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm px-3"
                  >
                    Submit
                  </button>
                  <button

                    className="btn btn-success btn-sm ml-2 px-3"
                  >
                    Reset
                  </button>
                  {/* </div> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
      {/* </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="btn btn-success btn-sm ml-2 px-3">Save</Button>
        </Modal.Footer> */}
    </Modal>
  );
}