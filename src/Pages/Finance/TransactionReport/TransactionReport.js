import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNavSm } from "../../../store/actions/NavState";
import { endPoint } from "../../../config/Config";
import Select from "react-select";
import ReactToPrint from "react-to-print";
import TransactionReportReciept from "./TransactionReportReciept";
const customStyles = {
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
const customStylesDanger = {
    // control: base => ({
    //   ...base, 
    //   // This line disable the blue border

    // })
    control: (provided, state, base) => ({
        ...provided,
        background: '#fff',
        borderColor: 'red',
        borderRadius: "none",
        minHeight: '30px',
        height: '30px',

        ...base, boxShadow: 'none'
    }),
    option: (provided, state) => ({
        ...provided,

        borderBottom: "1px  #003a4d",
        color: state.isSelected ? "#f79c74" : "#003a4d",
        background: '#fff',

    }),
    valueContainer: (provided, state) => ({
        ...provided, fontSize: "11px",
        height: '30px',
        padding: '0 6px',
        // background: '#fff',

    }),

    input: (provided, state) => ({
        ...provided,
        margin: '0px',

    }),
    indicatorSeparator: state => ({
        display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '30px',

    }),

}
const TransactionReport = () => {
    const componentRef = useRef();
    const dispatch = useDispatch();
    const showNavMenu = useSelector((state) => state.NavState);
    var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
    var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
    var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
    const dateToday = `${year}-${month}-${day}`;
    const [dateFrom, setdateFrom] = useState(dateToday);
    const [dateTo, setdateTo] = useState(dateToday);
    const [isLoadingSelector, setIsLoadingSelector] = useState(true);

    const [employeeWeaverOptions, setEmployeeWeaverOptions] = useState([]);
    const [employeeWeaverValue, setEmployeeWeaverValue] = useState({
        label: "",
        value: "",
    });

    const [selectValidation, setSelectorValidation] = useState(true)
    const [LadgerData, setLadgerData] = useState({})
    const [grandTotal, setGrandTotal] = useState({ grandTotalDebit: "", grandTotalCredit: "" })
    const fetchWeaverList = async () => {

        var config = {
            method: 'get',
            url: 'http://localhost:63145/api/accountType',
            headers: {
                'Authorization': 'Bearer Wn3EkeeikfRrWi6q52E4ShR2eWtB2gBWJG-3m83ELxFxk_8q4Sm1dTpEdGHTYksXdyWYdXZRjpORBPJ6sEqC_v4CaiJbreSsU49Q3NdFn_9R7k43OvmGU8zFk42ePERw6CzECq4iADtPk5qN4U7ntpVVURls85kVpCL-34LqXA8Y9zPGLxoSRv_1Q6gZTD-BuJ0KYoGeHRby_R_IUIKfegjFD-ZKLd8zNm3eOIzap19LZnpeQWZ6rjMzczTZKjTpy7EBLi-G5BePTv9D-HEp4yGKCuxHDTuoO9pMIXMlyUxcnnBjVbdeLJKvQgsytIBLveCVAlPSYIBzPMni6lbW8ryxbWGxC7oemCn3vxSKawGRo8vv22Ett823FcumktCllyZXL4mFSNKeuX0JdlAK1IF1mxIKyWl4AEkrV0zoPkFfEhdd82yNk5MUVFJVLGFuhau3nCyRFGWGVnRvQ_zUOyNh21K2BaTMRSWfjj1uTQCxuqhD1uhabbXP5I9pdCg0UnaP_13TM5LWymgpk9Gipg'
            }
        };

        const data = await axios(config)
            .then(function (response) {
                return (response.data);
            })
            .catch(function (error) {
                console.log(error);
            });




        var arrForWeaverEmployee = [];
        data.map((item) => {
            arrForWeaverEmployee.push({
                value: item.chartId,
                label: `${item.accountType} (${item.accountCode})` ,
            });
        });
        setEmployeeWeaverOptions(arrForWeaverEmployee);
        setIsLoadingSelector(false);




        console.log(data)
        // var arrForWeaverEmployee = [];
        // JSON.parse(result).map((item) => {
        //   arrForWeaverEmployee.push({
        //     value: item.employee_Id,
        //     label: item.name,
        //   });
        // });
        // setEmployeeWeaverOptions(arrForWeaverEmployee);
        // setIsLoadingSelector(false);


        // fetch(`${endPoint}api/employeeListsName`, requestOptions)
        //   .then((response) => response.text())
        //   .then((result) => {
        //     var arrForWeaverEmployee = [];
        //     JSON.parse(result).map((item) => {
        //       arrForWeaverEmployee.push({
        //         value: item.employee_Id,
        //         label: item.name,
        //       });
        //     });
        //     setEmployeeWeaverOptions(arrForWeaverEmployee);
        //     setIsLoadingSelector(false);
        //   })
        //   .catch((error) => console.log("error", error));






    };

    const fetchLadger = () => {
        console.log(employeeWeaverValue , "----------------");
        if (employeeWeaverValue.value === null || employeeWeaverValue.value === undefined || employeeWeaverValue.value === "") {
            setSelectorValidation(false)
            console.log("select first");
        } else {



            var myHeaders = new Headers();
            myHeaders.append(
                "Authorization",
                `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
            );
            myHeaders.append("Content-Type", "application/json");

            var requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };
            // GET /api/TransactionReport
            // http://localhost:63145/api/TransactionReport?dateFrom=2011-12-12T12%3A12%3A00&dateTo=2025-12-12T12%3A12%3A00&emp_chart_id=33
            fetch(
                `${endPoint}api/TransactionReport?dateFrom=${dateFrom}T00:00:00&dateTo=${dateTo}T00:00:00&emp_chart_id=${employeeWeaverValue.value}`,
                requestOptions
            )
                .then((response) => response.text())
                .then((result) => {



                    var apiResponse = JSON.parse(result);
                    var arrayForCurrentBalance = []
                    let balance = JSON.parse(result).openingBalance;
                    console.log(balance, "balance");
                    apiResponse.ladgerData.map((eachLadgerItem) => {
                        balance = balance + (eachLadgerItem.debit - eachLadgerItem.credit)
                        arrayForCurrentBalance.push(balance);
                    })
                    setLadgerData({ ...apiResponse, arrayForCurrentBalance })




                    var grandTotalDebit = 0;
                    (JSON.parse(result).ladgerData).map((eachTotalAmount) => {
                        grandTotalDebit = grandTotalDebit + eachTotalAmount.debit


                    })

                    var grandTotalCredit = 0;
                    (JSON.parse(result).ladgerData).map((eachTotalAmount) => {
                        grandTotalCredit = grandTotalCredit + eachTotalAmount.credit


                    })
                    setGrandTotal({ grandTotalDebit: grandTotalDebit, grandTotalCredit: grandTotalCredit })
                })
                .catch((error) => console.log("error", error));
        }
    };
    useEffect(() => {
        // dispatch(setNavSm());
        fetchWeaverList();
    }, []);

    return (
        <>
            <div
                className={`right_col  h-10 heightFixForFAult  ${showNavMenu == false ? "right_col-margin-remove" : " "
                    } `}
                role="main"
            >
                <div className="row">
                    <div className="col-md-12">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2 className="pl-2 pt-2">Transaction Report</h2>
                                <ul className="nav navbar-right panel_toolbox d-flex justify-content-end"></ul>
                                <div className="clearfix" />
                            </div>
                            <div className="x_content">
                                <div className="row  pr-4">

                                </div>
                                <div className="row  pr-4">
                                    <div className="col-md-12 px-0">

                                    </div>
                                </div>
                                <div className="row  pr-4">
                                    <div className="col-md-12 px-0">

                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4">
                                        <label className="col-form-label col-md-4 col-sm-4  label-align px-0">
                                            Select Account
                                        </label>
                                        <div className="col-md-8 col-sm-8 ">
                                            {isLoadingSelector ? (
                                                <>. . .</>
                                            ) : (
                                                <>
                                                    <Select
                                                        required
                                                        className="basic-single"
                                                        classNamePrefix="select"
                                                        value={employeeWeaverValue}
                                                        onChange={(e) => {
                                                            setSelectorValidation(true)
                                                            setEmployeeWeaverValue({
                                                                label: e.label,
                                                                value: e.value,
                                                            })
                                                        }
                                                        }

                                                        isSearchable={true}
                                                        name="color"
                                                        options={employeeWeaverOptions}
                                                        styles={selectValidation ? customStyles : customStylesDanger}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="col-form-label col-md-3 col-sm-3  label-align px-0">
                                            Date From
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
                                    <div className="col-md-4">
                                        <label className="col-form-label col-md-3 col-sm-3  label-align px-0">
                                            Date To
                                        </label>
                                        <div className="col-md-9 col-sm-9">
                                            <input
                                                className="form-control w-100"
                                                type="date"
                                                value={dateTo}
                                                onChange={(e) => {
                                                    setdateTo(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row px-4 mb-2">
                                    <div className="col-md-12 text-right pr-2 mt-1">
                                        <button
                                            className="btn btn-sm btn-customOrange pl-3"
                                            onClick={(e) => {
                                                e.preventDefault();

                                                fetchLadger()
                                            }}
                                        >
                                            Search <i className="fa fa-search pl-3 pr-2"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="x_panel"> */}
                            {/* <div className="x_title"> */}
                            {/* <h2 className="pl-2 pt-2">Weaver Ladger</h2> */}
                            <ul className="mr-3 nav navbar-right panel_toolbox d-flex justify-content-end">
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
                            <div className="clearfix" />
                            {/* </div> */}
                            <TransactionReportReciept ref={componentRef} LadgerData={LadgerData}
                                grandTotal={grandTotal} selectValidation={selectValidation}
                                dateFrom={dateFrom}
                            />
                            {/* </div> */}
                        </div>

                    </div>
                    <div className="col-md-8 px-0">

                    </div>
                </div>
            </div>
        </>
    );
};

export default TransactionReport;
