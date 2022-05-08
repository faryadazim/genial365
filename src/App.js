// React Import
import { useEffect, useState } from "react";
//  Style Module Import
import "./App.css";
// Router Import
import { Routes, Route } from "react-router-dom";

// Notifier Import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

function App() {
  const [isLogin, setisLogin] = useState(false);

  useEffect(() => {}, []);

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
            <Nav />
            <Header />
            <Routes>
              <Route path="/" element={<Loader />} />
              <Route path="RoleAccess" element={<AddRole />} />
              <Route path="UserAccess" element={<AddUser />} />
              <Route path="PagesAccess" element={<AddPages />} />
              <Route path="ModuleAccess" element={<AddModules />} />
              <Route path="PermissionAccess" element={<RolePermission />} />
            </Routes>

            <Footer />
          </div>
        </div>
      ) : (
        <Login setisLogin={setisLogin} isLogin={isLogin} />
      )}
    </>
  );
}

export default App;
