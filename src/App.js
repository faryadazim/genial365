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
function App() {
  const [isLogin, setisLogin] = useState(false);
  const [navigationData, setNavigationData] = useState("");
  const [showMainLoader, setShowMainLoader] = useState(true);

  const fetchNavigation = (e) => {
    fetch(endPoint + "api/navigation", {
      method: "GET",
      headers: {
        Authorization:
          "bearer" +
          " " +
          JSON.parse(localStorage.getItem("access_token")).access_token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          console.log(data, "success");
          setNavigationData(data);

          localStorage.setItem("userName", data.userName);
          localStorage.setItem("roleName", data.RoleName);
          localStorage.setItem("loginId", data.LoginName);
          // setemployeeSalaryResult(data);

          setisLogin(true);
          setShowMainLoader(false);
        });
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    localStorage.setItem("authUser", endPoint);
    var newRetrived = localStorage.getItem("access_token");
    if (newRetrived) {
      setisLogin(true);
      fetchNavigation();
    }
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
            fetchNavigation={fetchNavigation}
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
                  <Nav navigationResult={navigationData} isLogin={isLogin} />
                  <Header
                    roleName={navigationData.RoleName}
                    setisLogin={setisLogin}
                  />
                  <Routes>
                 
                    <Route path="RoleAccess" element={<AddRole />} />
                    <Route path="ModuleAccess" element={<AddModules />} />
                    <Route path="UserAccess" element={<AddUser />} />
                    <Route path="PagesAccess" element={<AddPages />} />
                    <Route
                      path="PermissionAccess"
                      element={<RolePermission />}
                    />
                       <Route path="/" element={<Loader />} />
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
