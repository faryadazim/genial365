// React Import
import { useEffect, useState } from "react";
//  Style Module Import
import UserProfile from "./Pages/Setting/updateUser/UserProfile";
import "./App.css";
// Router Import
import WeavingProductionForm from "./Pages/WeavingProduction/WeavingProduction/WeavingProductionForm";
import { Routes, Route } from "react-router-dom";
import BorderManagement from "./Pages/Setting/borderManagemrnt/BorderManagement";
// Notifier Import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GrayProductList from "./Pages/WeavingProduction/GrayProductList/GrayProductList";
// Component Import
import Nav from "./Layout/Nav";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Login from "./Auth/Login";
import AddRole from "./Pages/Role/AddRole";
import AddUser from "./Pages/Role/AddUser";
import AddPages from "./Pages/Role/AddPages";
import AddModules from "./Pages/Role/AddModules";
import RolePermission from "./Pages/Role/RolePermission.js";
import Loader from "./Layout/Loader/Loader";
import EmployeeList from "./Pages/Setting/EmployeeList/EmployeeList";
import LoomManagement from "./Pages/Setting/LoomManagement/LoomManagement";
import ProductionFaults from "./Pages/Setting/ShiftFaults/ProductionFaults";
import ProductionReport from "./Pages/WeavingProduction/ProductionReport/ProductionReport";
import { endPoint } from "./config/Config";
import WeaverWiseReport from "./Pages/WeavingProduction/WeaverWiseReport/WeaverWiseReport";
import GenrProductionReport from "./Pages/WeavingProduction/GenrProductionReport/GenrProductionReport";
import SalaryReport from "./Pages/WeavingProduction/SalaryReport/SalaryReport";
import WeaverLadger from "./Pages/Finance/WeaverLadger/WeaverLadger";
import JournalVoucher from './Pages/Finance/JournalVoucher/JournalVoucher'
import JVReport from './Pages/Finance/JVReport/JVReport'
import Dashboard from "./Pages/Home/Dashboard.js/Dashboard";
import PrivateRoute from "./Layout/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { doGetNavigation } from "./store/actions/Navigation";


function App() {
  const [isLogin, setisLogin] = useState(false);
  const [showMainLoader, setShowMainLoader] = useState(true);
  const [navigationData, setNavigationData] = useState("");
  const dispatch = useDispatch();
  const showNavResukt = useSelector((state) => state.NavReducer.data);

  let PermissionObject = { GenrProductionReport: { view: true, add: false } };
  if (showNavResukt !== undefined) {
    showNavResukt.navigationResult.map((eachModule, index) => {
      eachModule.pages.map((eachPage) => {
        var pageUrlName = eachPage.pageURL;
        PermissionObject = { pageUrlName: { view: eachPage.AddPermission, add: false } }
      })
    })


    console.log(PermissionObject, "ddgdgdg");
  }


  // const [permissionTableFromServer, setPermissionTableFromServer] = useState({})
  useEffect(() => {
    localStorage.setItem("authUser", endPoint);
    var newRetrived = localStorage.getItem("access_token");
    if (newRetrived) {
      setisLogin(true);
    }
    dispatch(doGetNavigation(setShowMainLoader))


  }, []);

  return (
    <>
      {/* <ToastContainer /> */}
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {!isLogin ? (
        <>
          <Login
            setisLogin={setisLogin}
            isLogin={isLogin}
            setShowMainLoader={setShowMainLoader}

          />
        </>
      ) : (
        <>
          {showMainLoader ? (
            <>
              {" "}
              <div class="lds-dual-ring-ForMain-Page "></div>
            </>
          ) : (
            <>
              <div className="container body">
                <div className="main_container">
                  <Nav navigationResult={showNavResukt} isLogin={isLogin} />
                  <Header
                    roleName={showNavResukt.RoleName}
                    setisLogin={setisLogin}
                  />
                  <Routes>

                    {/* <PrivateRoute exact path="/RoleAccess"   >
                      <AddRole />
                    </PrivateRoute> */}





                     <Route path="/RoleAccess" element={<AddRole />} />  
                    <Route path="ModuleAccess" element={<AddModules />} />
                    <Route path="UserAccess" element={<AddUser />} />
                    <Route path="PagesAccess" element={<AddPages />} />
                    <Route
                      path="PermissionAccess"
                      element={<RolePermission />}
                    />


                    {/* <Route path="/" element={<PrivateRoute nameRoute={"Dashboard"}><Dashboard /></PrivateRoute>} /> */}


                    <Route path="/" element={<Dashboard />} />

                    <Route path="EmployeesList" element={<EmployeeList />} />
                    <Route
                      path="GrayProductList"
                      element={<GrayProductList />}
                    />
                    <Route path="LoomManagement" element={<LoomManagement />} />
                    <Route
                      path="BorderManagement"
                      element={<BorderManagement />}
                    />
                    <Route
                      path="WeavingProductionForm"
                      element={<WeavingProductionForm />}
                    />
                    <Route path="UserProfile" element={<UserProfile />} />
                    <Route
                      path="ProductionFaults"
                      element={<ProductionFaults />}
                    />
                    <Route
                      path="ProductionReport"
                      element={<ProductionReport />}
                    />
                    <Route
                      path="ProductionReport"
                      element={<ProductionReport />}
                    />
                    <Route
                      path="WeaverWiseReport"
                      element={<WeaverWiseReport />}
                    />
                    <Route
                      path="GenrProductionReport"
                      element={<GenrProductionReport />}
                    />
                    <Route
                      path="SalaryReport"
                      element={<SalaryReport />}
                    />
                    <Route
                      path="WeaverLadger"
                      element={<WeaverLadger />}
                    />
                    <Route
                      path="JournalVoucherForm"
                      element={<JournalVoucher />}
                    />
                    <Route
                      path="JournalVoucherReport"
                      element={<JVReport />}
                    />

                  </Routes>
                  <Footer />
                </div>
              </div>
            </>
          )}{" "}
        </>
      )}
    </>
  );
}

export default App;

// {isLogin===true && showMainLoader===false ? (
//
// ) : (

//     <>
//     {isLogin===false &&  showMainLoader===false &&

//     }
//     {
//       showMainLoader===true && isLogin===true && <>Loader </>
//     }

//     </>

// )}
