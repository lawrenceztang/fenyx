import { Outlet, Link } from "react-router-dom";
import { useState } from 'react';
import bird from "../fenix.png"



const Layout = ({token, deleteToken}) => {
  let authorizations;
  const [refresh_token, setRefresh] = useState(0)
  if(!token){
            authorizations= <Link to="/login">Login/Register</Link>
          }
          else{
            authorizations = <Link to="/" onClick={deleteToken}>Sign Out</Link>
            console.log(token);
          }

  return(
    <div style={{minHeight: "100vh",
                 backgroundImage: 'url(' + require('../fenix.png') + ')',
                 backgroundAttachment: "scroll",
                 backgroundPosition: "center",
                 backgroundRepeat: "no-repeat",
                 backgroundSize: "cover"}}>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <div class="container-fluid">
        <ul class="navbar-nav">
          <li class="nav-item">
            {/*<a class="nav-link active" href="#">Active</a>*/}
          </li>
         <li class="nav-item">
            <Link to="/" class="nav-link">Home</Link>
          </li>
          {sessionStorage.getItem("token") && 
            <li class="nav-item">
              <Link to={"/profile/" + sessionStorage.getItem('token')} class="nav-link" 
              onClick={() => window.location.href="/profile/" + parseInt(sessionStorage.getItem('token'))}>My Profile</Link>
            </li>
          }
          {sessionStorage.getItem("token") && 
            <li class = "nav-item">
              <Link to="/" onClick={deleteToken} class="nav-link">Sign Out</Link>
            </li>
          }
          {!sessionStorage.getItem("token") && 
            <li class="nav-item">
              <Link to="/login" class="nav-link">Login/Register</Link>
            </li>
          }
        </ul>
      </div>
    </nav>
      <Outlet/>
      </div>
  )
};

export default Layout;