import { Outlet, Link } from "react-router-dom";




const Layout = ({token, deleteToken}) => {
  let authorizations;
  if(!token){
            authorizations= <Link to="/login">Login/Register</Link>
          }
          else{
            authorizations = <Link to="/" onClick={deleteToken}>Sign Out</Link>
            console.log(token);
          }

  return(
    <div style={{height: "90vh"}}>
    <nav class="navbar navbar-expand-sm bg-light navbar-light">
      <div class="container-fluid">
        <ul class="navbar-nav">
          <li class="nav-item">
            {/*<a class="nav-link active" href="#">Active</a>*/}
          </li>
         <li class="nav-item">
            <Link to="/" class="nav-link">Home</Link>
          </li>
          {token && 
            <li class="nav-item">
              <Link to={"/profile/" + token} class="nav-link">My Profile</Link>
            </li>
          }
          {token && 
            <li class = "nav-item">
              <Link to="/" onClick={deleteToken} class="nav-link">Sign Out</Link>
            </li>
          }
          {!token && 
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