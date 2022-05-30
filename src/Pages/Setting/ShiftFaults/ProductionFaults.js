import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../Layout/Loader/Loader";
import { endPoint } from "../../../config/Config";

const ProducctionFaults = () => {
 
  const showNavMenu = useSelector((state) => state.NavState);
const [isLoading  , setisLoading] = useState(true)
  const [faultList, setFaultList] = useState([{}]);
  const [addNewFaultTitle , setAddNewFaultTitle] = useState("")
  const fetchAllData = () => {
    fetch(endPoint + "/api/ShiftFaults")
      .then((response) => response.json())
      .then((json) => {
        setFaultList(json);
        setisLoading(false);
      });
  };
const addNewFault = (e)=>{
    e.preventDefault() 
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({fault_title:addNewFaultTitle}),
      };
      console.log(requestOptions);
  
      fetch(endPoint + "api/ShiftFaults", requestOptions)
        .then((response) => response.json())
        .then((data) => { 
         setAddNewFaultTitle("")
          fetchAllData();
        })
        .catch((err) => {
          console.log("err", err);
        });
 
    }
  const deleteFault = (id)=>{  
fetch(`${endPoint}/api/ShiftFaults/${id}`, {
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
      fetchAllData(); 
    })
    .catch((error) => console.log("error", error));
  }
  useEffect(() => {fetchAllData()}, []);

  return (
    <>
{
    isLoading? <>
    <Loader/>
     </> :<>   <div
        className={`right_col  h-10 heightFixForFAult  ${
          showNavMenu == false ? "right_col-margin-remove" : " "
        } `}
        role="main"
      >
        {" "}
        <div className="row">
          <div className="col-md-6">
            <div className="x_panel">
              <div className="x_content">
                <div className="table-responsive">
                  <table className="table table-striped jambo_table bulk_action">
                    <thead>
                      <tr className="headings">
                        <th className="column-title"> Sr. </th>
                        <th className="column-title">Faults Title</th>
                        <th className="column-title text-center" width="20%">
                         Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {faultList.map((item, index) => {
                        return (
                          <tr className="even pointer" key={item.fault_id} >
                            <td className=" ">{index + 1}</td>
                            <td className=" "> {item.fault_title} </td>
                            <td
                              width="20%"
                              className="a-right a-right     text-center"
                            >
                              
                              <i
                                className="fa fa-trash-o pl-3"
                                  onClick={() => {
                                    deleteFault(item.fault_id);
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
          </div>
          <div className="col-md-6">
            <div className="x_panel">
              <div className="x_title">
                <h2 className="pl-2 pt-2">Shift Faults</h2>
                <ul className="nav navbar-right panel_toolbox d-flex justify-content-end"></ul>
                <div className="clearfix" />
              </div>
              <div className="x_content">
                <form>
                  {/* <span className="section">Personal Info</span> */}
                  <div className="field item form-group">
                    <label className="col-form-label col-md-4 col-sm-4  label-align">
                      Enter Fault Title<span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6">
                      <input
                        className="form-control"
                        data-validate-length-range={6}
                        data-validate-words={2}
                        name="name"
                        placeholder="ex. Plugin Breakdown  "

                        value={addNewFaultTitle}
                        onChange={(e) =>
                            setAddNewFaultTitle(e.target.value)
                        }
                      />
                      <button
                        type="submit"
                        className="btn btn-primary btn-sm px-3 mt-2"
                        onClick={(e) => {
           addNewFault(e)
                        }}
                        disabled={addNewFaultTitle==""?true:false}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> </>
}


   
    </>
  );
};

export default ProducctionFaults;
