import React from 'react'

const Footer = ({showNavMenu}) => {
  return (
    <>
    
  <footer 
   className={`footer   ${ showNavMenu === false ? "footer-margin-remove" : " "}  `}
   >
  <div className="pull-right">
    Weaving - Management System by <a href="www.technupur.com">Technupur</a>
  </div>
  <div className="clearfix" />
</footer>

    </>
  )
}

export default Footer