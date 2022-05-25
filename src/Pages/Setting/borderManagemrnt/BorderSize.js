import React, { useEffect, useState } from "react";
import EditBorderSize from "./EditBorderSize";

const BorderSize = ({ setisLoadBorderSize }) => {
  const url = localStorage.getItem("authUser");
  const [borderSize, setBorderSize] = useState([]);
  const [AddNewSize, setAddNewSize] = useState({ borderSize1: "" });
  const [modalShow, setModalShow] = useState(false);
  const [EditBorderSizeState, setEditBorderSizeState] = useState({
    borderSize1: "",
    borderSize_id: "",
  });

  const fetchAllData = () => {
    fetch(url + "api/BorderSizes")
      .then((response) => response.json())
      .then((json) => {
        setBorderSize(json);
        setisLoadBorderSize(false);
      });
  };

  const deleteSize = (e) => {
    console.log(e);
    fetch(`${url}api/BorderSizes?id=${e}`, {
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
      })
      .catch((error) => console.log("error", error));
  };

  const AddNewSizePost = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(AddNewSize),
    };

    fetch(url + "/api/BorderSizes", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        fetchAllData();
        setAddNewSize({ borderSize1: "" });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const updateBorderSize = () => {
    console.log("asdasd");
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(EditBorderSizeState),
    };

    fetch(url + "/api/BorderSizes", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("data updated");
        fetchAllData();
        setModalShow(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <>
      <EditBorderSize
        show={modalShow}
        updateBorderSize={updateBorderSize}
        onHide={() => setModalShow(false)}
        setModalShow={setModalShow}
        EditBorderSizeState={EditBorderSizeState}
        setEditBorderSizeState={setEditBorderSizeState}
      />

      {/* EditBorderSizeState , setEditBorderSizeState */}
      <>
        {" "}
        <div className="x_panel">
          <div className="x_title">
            <h2 className="pl-2 pt-2">Border Size</h2>
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
                  Enter Quality Size<span className="required">*</span>
                </label>
                <div className="col-md-6 col-sm-6">
                  <input
                    className="form-control"
                    data-validate-length-range={6}
                    data-validate-words={2}
                    name="name"
                    placeholder="ex. 45/67  "
                    required="true"
                    value={AddNewSize.borderSize1}
                    onChange={(e) =>
                      setAddNewSize({ borderSize1: e.target.value })
                    }
                  />
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm px-3 mt-2"
                    onClick={(e) => {
                      AddNewSizePost(e);
                    }}
                    disabled={
                      AddNewSize.borderSize1 == "" ||
                      AddNewSize.borderSize1 == undefined ||
                      AddNewSize.borderSize1 == null ||
                      AddNewSize.borderSize1 == " "
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
                  <th className="column-title">Quality Size</th>
                  <th className="column-title text-center" width="20%">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* {RoleRegistered.map((Role, index) => {
                        return ( */}
                {borderSize.map((item, index) => {
                  return (
                    <tr className="even pointer" key={item.borderSize_id}>
                      <td className=" ">{index + 1}</td>
                      <td className=" "> {item.borderSize1} </td>

                      <td
                        width="20%"
                        className="a-right a-right     text-center"
                      >
                        <i
                          className="fa fa-edit"
                          onClick={() => {
                            setModalShow(true);
                            //   handleShow();
                            //   setCurrentEditUser({
                            //     id: Role.Id,
                            //     name: Role.Name,
                            //   });
                            setEditBorderSizeState({
                              borderSize_id: item.borderSize_id,
                              borderSize1: item.borderSize1,
                            });
                          }}
                        ></i>{" "}
                        <i
                          className="fa fa-trash-o pl-3"
                          onClick={() => {
                            deleteSize(item.borderSize_id);
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

export default BorderSize;
