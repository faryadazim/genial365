import Nav from './Layout/Nav'
import Header from './Layout/Header'
import Footer from './Layout/Footer'
import Content from './Layout/Content'
import './App.css'
import Login from './Auth/Login'
import { useState } from 'react'


function App() {
  const [isLogin, setisLogin] = useState(false)
  return (
  <>
 {
   isLogin?<div className="container body">
    <div className="main_container">
      <Nav/>
      <Header/>
      <Content/>
      <Footer/>
    
      
    </div>
 
</div> :<Login setisLogin={setisLogin} isLogin={isLogin}/>
 }
  

</>
  );
}

export default App;
