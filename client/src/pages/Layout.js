import { Outlet, Link } from "react-router-dom";

const Layout = ({token, deleteToken}) => {
  let login_signout;
  if(!token){
            login_signout = <Link to="/login">Login/Register</Link>
          }
          else{
            login_signout = <Link to="/" onClick={deleteToken}>Sign Out</Link>
          }
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">My Profile</Link>
          </li>
          <li>
            {login_signout}
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;