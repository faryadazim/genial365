// React Import
import { useEffect, useState } from "react";
//  Style Module Import
import UserProfile from './Pages/Setting/updateUser/UserProfile'
import "./App.css";
// Router Import
import WeavingProductionForm from './Pages/WeavingProduction/WeavingProduction/WeavingProductionForm'
import { Routes, Route } from "react-router-dom";
import BorderManagement from "./Pages/Setting/borderManagemrnt/BorderManagement";
// Notifier Import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GrayProductList from './Pages/WeavingProduction/GrayProductList/GrayProductList'
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
import EmployeeList from './Pages/Setting/EmployeeList/EmployeeList'
import LoomManagement from "./Pages/Setting/LoomManagement/LoomManagement";
import ProductionFaults from './Pages/Setting/ShiftFaults/ProductionFaults'

function App() {
  const [isLogin, setisLogin] = useState(false); 
const [navigationData , setNavigationData] = useState("")
  useEffect(() => {
   
  }, []);

  return (
    <>
      {/* <ToastContainer /> */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {isLogin  ? (
        <div className="container body">
          <div className="main_container">
            <Nav  navigationResult ={navigationData} isLogin={isLogin} />
            <Header roleName = {navigationData.RoleName} />
            <Routes>
              <Route path="/" element={<Loader />} />
              <Route path="RoleAccess" element={<AddRole />} />
              <Route path="UserAccess" element={<AddUser />} />
              <Route path="PagesAccess" element={<AddPages />} />
              <Route path="ModuleAccess" element={<AddModules />} />
              <Route path="PermissionAccess" element={<RolePermission />} />
              <Route path="EmployeesList" element={<EmployeeList/>} />
              <Route path="GrayProductList" element={<GrayProductList/>} />
              <Route path="LoomManagement" element={<LoomManagement/>} />
              <Route path="BorderManagement" element={<BorderManagement/>} />
              <Route path="WeavingProductionForm" element={<WeavingProductionForm/>} />
              <Route path="UserProfile" element={<UserProfile/>} />
              <Route path="ProductionFaults" element={<ProductionFaults/>} />
              

            
            </Routes>

            <Footer />
          </div>
        </div>
      ) : (
        <Login setisLogin={setisLogin} isLogin={isLogin}   setNavigationData={setNavigationData}  />
      )}
    </>
  );
}

export default App;
