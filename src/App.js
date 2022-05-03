import { Routes, Route, Link } from "react-router-dom";
import Nav from "./Layout/Nav";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import "./App.css";
import Login from "./Auth/Login";
import { useEffect, useState } from "react";
import Content from "./Layout/Content";
import AddRole from "./Pages/Role/AddRole";
import AddUser from "./Pages/Role/AddUser";
import AddPages from "./Pages/Role/AddPages";
import AddModules from "./Pages/Role/AddModules";
import RolePermission from "./Pages/Role/RolePermission.js";
import Loader from "./Layout/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setNavSm, setNavMd } from './actions/NavState';
 

import { useDispatch, useSelector } from 'react-redux';


function App() {
  
  const showNavMenu1 = useSelector((state) => state.NavState);
  const dispatch = useDispatch();
  
  const [showNavMenu, setshowNavMenu] = useState(true);
  const [isLogin, setisLogin] = useState(true);

  const changeSsize = ()=>{
 if (showNavMenu==true) {
   dispatch(setNavSm());
   
  } else {
   dispatch(setNavMd());
   
 }
  }
  useEffect(() => {
 }, [])
  
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
      {isLogin ? (
        <div className="container body">
          <div className="main_container">
            <Nav showNavMenu={showNavMenu} />
            <Header setshowNavMenu={setshowNavMenu} showNavMenu={showNavMenu} />
            {/* <Routes>
              <Route path="/" element={<Loader showNavMenu={showNavMenu} />} />
              <Route path="RoleAccess" element={<AddRole />} />
              <Route path="UserAccess" element={<AddUser />} />
              <Route path="PagesAccess" element={<AddPages />} />
              <Route path="ModuleAccess" element={<AddModules showNavMenu={showNavMenu}/>} />
              <Route path="PermissionAccess" element={<RolePermission />} />
            </Routes> */}
<button onClick={()=>console.log(showNavMenu1)}>
show ewrwewerwerwerewwerwrwrwrwerwerwrwwre
</button>
<button onClick={()=>changeSsize()}>
change ewrwewerwerwerewwerwrwrwrwerwerwrwwre
</button>

            <Footer showNavMenu={showNavMenu} />
          </div>
        </div>
      ) : (
        <Login setisLogin={setisLogin} isLogin={isLogin} />
      )}
    </>
  );
}

export default App;
