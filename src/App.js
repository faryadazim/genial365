import { Routes, Route, Link } from "react-router-dom";
import Nav from "./Layout/Nav";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import "./App.css";
import Login from "./Auth/Login";
import { useState } from "react";
import Content from "./Layout/Content";
import AddRole from "./Pages/Role/AddRole";
import AddUser from "./Pages/Role/AddUser";
import AddPages from "./Pages/Role/AddPages";
import AddModules from "./Pages/Role/AddModules";
import Permission from "./Pages/Role/Permission.js";
import Loader from "./Layout/Loader/Loader";

 

function App() {
  const [isLogin, setisLogin] = useState(false);
  return (
    <>
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
              <Route path="PermissionAccess" element={<Permission />} />
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
