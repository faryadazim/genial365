import React, { useEffect, useState } from "react";
import EditBorderQuality from "./EditBorderQuality";
import { toast } from "react-toastify";






const BorderQuality = ({ setisLoadBorderQuality }) => {
   
  const notifyDeleted = () => toast("Border Quality Deleted Successfully");
  const notifyAdded = () => toast("Border Quality Added Successfully");
  const notifyUpdated = () => toast("Border Quality Updated Successfully");
  const url = localStorage.getItem("authUser");
  const [borderQuality, setBorderQuality] = useState([]);
  const [AddNewQuality, setAddNewQuality] = useState({ borderQuality1: "" });

  const [modalShow, setModalShow] = useState(false);
  const [EditBorderQualityState , setEditBorderQualityState]= useState({borderQuality1:"" , borderQuality_id:""})

  const fetchAllData = () => {
    fetch(url + "api/BorderQuality")
      .then((response) => response.json())
      .then((json) => {
        setBorderQuality(json);
        setisLoadBorderQuality(false);
      });
  };

  const deleteQuality = (e) => {
    console.log(e);
    fetch(`${url}api/BorderQuality?id=${e}`, {
      method: "DELETE",
      // headers: {
      //   Authorization:
      //     JSON.parse(localStorage.getItem("authUser")).token_type +
      //     " " +
      //     JSON.parse(localStorage.getItem("authUser")).access_token,
      //   "Content-Type": "application/x-www-form-urlencoded",
      // },
    })
      .then((response) => {
        // deleteing Role for this Id

        fetchAllData();
        notifyDeleted()
      })
      .catch((error) => console.log("error", error));
  };

  const AddNewQualityPost = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(AddNewQuality),
    };
    console.log(requestOptions.body);
    fetch(url + "/api/BorderQuality", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        fetchAllData();
        setAddNewQuality({ borderQuality1: "" });
        notifyAdded()
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const updateBorderQuality = ()=>{
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(EditBorderQualityState),
    };

    fetch(url + "/api/BorderQuality", requestOptions)
      .then((response) => response.json())
      .then((data) => {
      console.log("data updated");
      fetchAllData()
      setModalShow(false)
      notifyUpdated()
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <>
      <EditBorderQuality show={modalShow}  updateBorderQuality={updateBorderQuality}
       onHide={() => setModalShow(false)} setModalShow={setModalShow}
      EditBorderQualityState={EditBorderQualityState} setEditBorderQualityState={setEditBorderQualityState} />
      <>
        {" "}
        <div className="x_panel">
          <div className="x_title">
            <h2 className="pl-2 pt-2">Border Quality</h2>
            <ul className="nav navbar-right panel_toolbox d-flex justify-content-end">
              {/* <li>
                        <a
                          className="close-link"
                          onClick={() => setdisplayUserRegBox(false)}
                        >
                          <i className="fa fa-close" />
                        </a>
                      </li> */}
            </ul>
            <div className="clearfix" />
          </div>
          <div className="x_content">
            <form>
              {/* <span className="section">Personal Info</span> */}
              <div className="field item form-group">
                <label className="col-form-label col-md-4 col-sm-4  label-align">
                  Enter Quality Name<span className="required">*</span>
                </label>
                <div className="col-md-6 col-sm-6">
                  <input
                    className="form-control"
                    data-validate-length-range={6}
                    data-validate-words={2}
                    name="name"
                    placeholder="ex. Phool"
                    required="true"
                    value={AddNewQuality.borderQuality1}
                    onChange={(e) =>
                      setAddNewQuality({ borderQuality1: e.target.value })
                    }
                  />
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm px-3 mt-2"
                    onClick={(e) => {
                      AddNewQualityPost(e);
                    }}
                    disabled={
                      AddNewQuality.borderQuality1 == "" ||
                      AddNewQuality.borderQuality1 == undefined ||
                      AddNewQuality.borderQuality1 == null ||
                      AddNewQuality.borderQuality1 == " "
                        ? true
                        : false
                    }
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>

      {/* Model  */}
      <div className="x_panel">
        <div className="x_content">
          <div className="table-responsive">
            <table className="table table-striped jambo_table bulk_action">
              <thead>
                <tr className="headings">
                  <th className="column-title"> Sr. </th>
                  <th className="column-title">Quality Name</th>
                  <th className="column-title text-center" width="20%">
                    Action{" "}
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* {RoleRegistered.map((Role, index) => {
                        return ( */}
                {borderQuality.map((item, index) => {
                  return (
                    <tr className="even pointer" key={item.borderQuality_id}>
                      <td className=" ">{index + 1}</td>
                      <td className=" "> {item.borderQuality1} </td>

                      <td
                        width="20%"
                        className="a-right a-right     text-center"
                      >
                        <i
                          className="fa fa-edit"
                        onClick={() => {
                          setModalShow(true)
                          //   handleShow();
                          //   setCurrentEditUser({
                          //     id: Role.Id,
                          //     name: Role.Name,
                          //   });
                          setEditBorderQualityState({  borderQuality_id:item.borderQuality_id, borderQuality1:item.borderQuality1})
                 }}
                        ></i>{" "}
                        <i
                          className="fa fa-trash-o pl-3"
                          onClick={() => {
                            deleteQuality(item.borderQuality_id);
                          }}
                        ></i>{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default BorderQuality;
