import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNavSm } from "../../../store/actions/NavState";
import Loader from "../../../Layout/Loader/Loader";
import { endPoint } from "../../../config/Config";
import ReactToPrint from "react-to-print";
import GenrProductionReportReciept from "./GenrProductionReportReciept";
import Select from "react-select";
const customStyles = {
  // control: base => ({
  //   ...base,
  //   // This line disable the blue border

  // })
  control: (provided, state, base) => ({
    ...provided,
    background: "#fff",
    borderColor: "#d9e4e8",
    borderRadius: "none",
    minHeight: "28px",
    height: "28px",
    // boxShadow: state.isFocused ? null : null,
    ...base,
    boxShadow: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px  #003a4d",
    color: state.isSelected ? "#f79c74" : "#003a4d",
    background: "#fff",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: "28px",
    padding: "0 6px",
    // background: '#fff',
  }),

  input: (provided, state) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "28px",
  }),
};


const GenrProductionReport = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const showNavMenu = useSelector((state) => state.NavState);
  var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
  var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
  var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
  const dateToday = `${year}-${month}-${day}`;
  const [dateFrom, setdateFrom] = useState(dateToday);
  const [dateEnd, setdateEnd] = useState(dateToday);
  const [GenrProductionReportData, setGenrProductionReportData] = useState([])
  const [productValue, setProductValue] = useState({ borderID: 0, borderSizeID: 0 })
  const [productSelectedValue, setProductSelectedValue] = useState({ label: "All", value: "0-0" })
  const [productSelectorOptions, setProductSelectorOptions] = useState([])
  const [isLoading ,setIsLoading ] = useState(true)
  const fetchProductListSelector = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${endPoint}api/ProductList`, requestOptions)
      .then(response => response.json())
      .then(result => {
        var selectOptionsArr = [{label: "All", value: "0-0"}]
        result.map((eachProduct) => {
          selectOptionsArr.push({ label: eachProduct.productName, value: eachProduct.productId })
        })
        setProductSelectorOptions(selectOptionsArr)
        setIsLoading(false)
      })
      .catch(error => console.log('error', error));
  }
  const fetchReportData = () => {

    // console.log("data" , `${endPoint}api/ProductionReport?dateToFind=${dateFrom}T00:00:00&dateToEnd=${dateEnd}T00:00:00&BorderID=${productValue.borderID}&BorderSize=${productValue.borderSizeID}`);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`,);



    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${endPoint}api/ProductionReport?dateToFind=${dateFrom}T00:00:00&dateToEnd=${dateEnd}T00:00:00&BorderID=${productValue.borderID}&BorderSize=${productValue.borderSizeID}`, requestOptions)
      .then(response => response.json())
      .then(result => setGenrProductionReportData(result))
      .catch(error => console.log('error', error));
  };
  useEffect(() => {
    dispatch(setNavSm());
    fetchProductListSelector()
  }, []);

  return (
    <>

      {/* ---- Model Preview Production  ---- */}


      {/* ---- Model Preview Production  ---- */}
      <div
        className={`right_col  h-10 heightFixForFAult  ${showNavMenu == false ? "right_col-margin-remove" : " "
          } `}
        role="main"
      >


        {
          isLoading? <> <Loader/>  </>:<><div className="row">
          <div className="col-md-12">
            <div className="x_panel">
              <div className="x_title">
                <h2 className="pl-2 pt-2">General Production Report</h2>
                <ul className="nav navbar-right panel_toolbox d-flex justify-content-end"></ul>
                <div className="clearfix" />
              </div>
              <div className="x_content">
                <form>
                  {/* <span className="section">Personal Info</span> */}
                  <div className="field item form-group">
                    <div className="col-md-4">
       
              <label className="col-form-label col-md-3 col-sm-3  label-align px-0">
                        Select Product
                        </label>
             
              <div className="col-md-8">
              <Select
                        required
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={"Active"}
                        value={productSelectedValue}
                        onChange={(value) => {
                          setProductSelectedValue({ label: value.label, value: value.value })
                          const arrForBorderSizeIds =value.value.split("-");
                          setProductValue({borderID: parseInt(arrForBorderSizeIds[0]) , borderSizeID:parseInt(arrForBorderSizeIds[1]) })
               
                        }}
                        isSearchable={true}
                        name="color"
                        options={productSelectorOptions}
                        styles={customStyles}
                      />
              </div>
                     




                    </div>
                    <div className="col-md-8 px-0">
                      <div className="col-md-5 px-0 ">
                        <label className="col-form-label col-md-3 col-sm-3  label-align px-0">
                          Start Date
                        </label>
                        <div className="col-md-9 col-sm-9">
                          <input
                            className="form-control"
                            type="date"
                            value={dateFrom}
                            onChange={(e) => {
                              setdateFrom(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-5 px-0 ">
                        <label className="col-form-label col-md-3 col-sm-3  label-align px-0">
                          End Date
                        </label>
                        <div className="col-md-9 col-sm-9">
                          <input
                            className="form-control"
                            type="date"
                            value={dateEnd}
                            onChange={(e) => {
                              setdateEnd(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-2 px-0 ">
                        <button
                          className="btn btn-sm btn-customOrange pl-3"
                          onClick={(e) => {
                            e.preventDefault();
                            fetchReportData();

                          }}
                        >
                          Search <i className="fa fa-search pl-3 pr-2"></i>
                        </button>
                      </div>


                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-12 px-0">

                <ul className="nav navbar-right panel_toolbox d-flex justify-content-end px-3">
                  <li>
                    <ReactToPrint
                      trigger={() => {
                        return (
                          <button className="btn btn-sm btn-success my-2 pt-1 borderRadiusRound">
                            <i className="fa fa-print"></i>
                          </button>
                        );
                      }}
                      content={() => componentRef.current}
                      documentTitle="new docs"
                      pageStyle="print"
                    />
                  </li>
                  <li>
                    <button
                      className="btn btn-sm btn-primary my-2 pt-1 borderRadiusRound"
                      onClick={() => console.log("print")}
                    >

                      <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                    </button>
                  </li>
                </ul>


                <GenrProductionReportReciept ref={componentRef}
                  GenrProductionReportData={GenrProductionReportData} />

              </div>
            </div>
          </div>
        </div></>
        }
        


      </div>
    </>
  );
};

export default GenrProductionReport;
