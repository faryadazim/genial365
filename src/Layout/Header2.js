import React , {useEffect} from 'react'
import $ from 'jquery'


const Header = () => {
  // const $BODY = $('body')
  const $BODY = document.getElementsByTagName('body');
  // const $MENU_TOGGLE = $('.menu_toggle')
  const $MENU_TOGGLE = document.getElementsByClassName('menu_toggle');
  
  // const $SIDEBAR_MENU = $('.sidebar-menu')
  const $SIDEBAR_MENU = document.getElementsByClassName('sidebar-menu');
  // const $SIDEBAR_FOOTER = $('.sidebar-footer')
  const $SIDEBAR_FOOTER = document.getElementsByClassName('sidebar-footer');
  
  // const $LEFT_COL = $('.left_col')
  const $LEFT_COL = document.getElementsByClassName('left_col');
  // const $RIGHT_COL = $('.right_col')
  const $RIGHT_COL = document.getElementsByClassName('right_col');
  // const $NAV_MENU = $('.nav_menu')
  const $NAV_MENU = document.getElementsByClassName('nav_menu');
  const $FOOTERJ = $('footer');
  const $FOOTER = document.getElementsByTagName('footer');
  let arrayOfElements = Array.from($FOOTER)
  console.log("jQuery deoc" ,$FOOTERJ  ,  arrayOfElements);

const fooFunct = () =>{
  console.log("geewrwerwewerwer");
 
}

//   var setContentHeight = function () {
//     // reset height
//     $RIGHT_COL.css('min-height', $(window).height());

//     var bodyHeight = $BODY.outerHeight(),
//         footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
//         leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
//         contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

//     // normalize content
//     contentHeight -= $NAV_MENU.height() + footerHeight;

//     $RIGHT_COL.css('min-height', contentHeight);
// };

  const newFunc = ()=> {
  console.log("new Funfctioertrotvsdv run ");

          // if ($BODY.hasClass('nav-md')) {
          //     $SIDEBAR_MENU.find('li.active ul').hide();
          //     $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
          // } else {
          //     $SIDEBAR_MENU.find('li.active-sm ul').show();
          //     $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
          // }
  
          // $BODY.toggleClass('nav-md nav-sm');
  
          // // setContentHeight();
  
          // // $('.dataTable').each(function () { $(this).dataTable().fnDraw(); });
          
          // document.getElementsByClassName('dataTable').each(function () { $(this).dataTable().fnDraw(); });
      
      
  
   }
  useEffect(() => {
    // console.log( document.getElementsByTagName('body')  , "Whole docs");
    // console.log( $BODY  , "Whole docs");
    
    
    return () => {
      // fooFunct();
      document.getElementsByClassName('menu_toggle')[0].addEventListener('click', ()=>newFunc());
    };
 
  }, [])
 

  
  return (
    <>
<div className="top_nav">
  <div className="nav_menu">
    <div className="nav toggle"><a className="menu_toggle"><i className="fa fa-bars" /></a></div>
    <nav className="nav navbar-nav">
      <ul className=" navbar-right">
        {/* User Profile */}
        <li className="nav-item dropdown open" style={{paddingLeft: 15}}>
          <a href="javascript:;" className="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown" data-toggle="dropdown" aria-expanded="false"><img src="images/img.jpg" alt />John Doe</a>
          <div className="dropdown-menu dropdown-usermenu pull-right" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="javascript:;"> Profile</a>
            <a className="dropdown-item" href="javascript:;">
              <span className="badge bg-red pull-right">50%</span>
              <span>Settings</span>
            </a>
            <a className="dropdown-item" href="javascript:;">Help</a>
            <a className="dropdown-item" href="login.html"><i className="fa fa-sign-out pull-right" /> Log Out</a>
          </div>
        </li>
        {/* Notification */}
        <li role="presentation" className="nav-item dropdown open">
          <a href="javascript:;" className="dropdown-toggle info-number" id="navbarDropdown1" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-envelope-o" /><span className="badge bg-green">6</span></a>
          <ul className="dropdown-menu list-unstyled msg_list" role="menu" aria-labelledby="navbarDropdown1">
            <li className="nav-item"><a className="dropdown-item">
                <span className="image"><img src="images/img.jpg" alt="Profile Image" /></span>
                <span>
                  <span>John Smith</span>
                  <span className="time">3 mins ago</span>
                </span>
                <span className="message">Film festivals used to be do-or-die moments for movie makers. They were where...</span>
              </a></li>
            <li className="nav-item"><a className="dropdown-item">
                <span className="image"><img src="images/img.jpg" alt="Profile Image" /></span>
                <span>
                  <span>John Smith</span>
                  <span className="time">3 mins ago</span>
                </span>
                <span className="message">Film festivals used to be do-or-die moments for movie makers. They were where...</span>
              </a></li>
            <li className="nav-item"><a className="dropdown-item">
                <span className="image"><img src="images/img.jpg" alt="Profile Image" /></span>
                <span>
                  <span>John Smith</span>
                  <span className="time">3 mins ago</span>
                </span>
                <span className="message">Film festivals used to be do-or-die moments for movie makers. They were where...</span>
              </a></li>
            <li className="nav-item"><a className="dropdown-item">
                <span className="image"><img src="images/img.jpg" alt="Profile Image" /></span>
                <span>
                  <span>John Smith</span>
                  <span className="time">3 mins ago</span>
                </span>
                <span className="message">Film festivals used to be do-or-die moments for movie makers. They were where...</span>
              </a></li>
            <li className="nav-item">
              <div className="text-center"><a className="dropdown-item">
                  <strong>See All Alerts</strong>
                  <i className="fa fa-angle-right" />
                </a></div>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</div>

    </>
  )
}

export default Header