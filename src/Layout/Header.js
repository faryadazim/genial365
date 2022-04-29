import React , {useEffect} from 'react' 
import  'jquery'
import $ from 'jquery';
// import "vendor/chosen.jquery";

const Header = () => {
 
  var setContentHeight = function () {
    // reset height
    // $('.right_col').css('min-height', $(window).height());

    // var bodyHeight = $('body').outerHeight(),
    //     footerHeight = $('body').hasClass('footer_fixed') ? -10 : $('footer').height(),
    //     leftColHeight = $('.left_col').eq(1).height() + $('.sidebar-footer').height(),
    //     contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight; //pure

    // // normalize content
    // contentHeight -=$('.nav_menu').height() + footerHeight;

    // $('.right_col').css('min-height', contentHeight);
};

  const newFunc = ()=> {
      console.log("clicked using javascritp");
    if (document.querySelector('body').classList.contains('nav-md')) {
              $('.sidebar-menu').find('li.active ul').hide();  
              $('.sidebar-menu').find('li.active').addClass('active-sm').removeClass('active');
          } else {
              $('.sidebar-menu').find('li.active-sm ul').show();
              $('.sidebar-menu').find('li.active-sm').addClass('active').removeClass('active-sm');
          }
          $('body').toggleClass('nav-md nav-sm'); 
          // setContentHeight();
          // $('.dataTable').each(function () { $(this).dataTable().fnDraw(); });
      
  
   }
  useEffect(() => {
    return () => { 
      document.querySelector(".menu_toggle").addEventListener('click', ()=>newFunc());
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
          <a href="javascript:;" className="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown" data-toggle="dropdown" aria-expanded="false"><img src="images/img.jpg" alt />Super Admin</a>
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
        {/* <li role="presentation" className="nav-item dropdown open">
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
        </li> */}
      </ul>
    </nav>
  </div>
</div>

    </>
  )
}

export default Header