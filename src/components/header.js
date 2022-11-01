import logo from "../img/argentBankLogo.png";
import { Link } from "react-router-dom";
import "./header.css";
import { useSelector, useDispatch } from "react-redux";

export default function Header() {
  const loggedIn = useSelector((state) => state.isLoggedIn);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="index">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
      </Link>
      {loggedIn === false ? (
        <div>
          <Link className="main-nav-item" to="sign-in">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        </div>
      ) : (
        <div>
          {user !== undefined ? (
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i> {user.firstName}
            </Link>
          ) : (
            <div></div>
          )}
          <Link
            className="main-nav-item"
            to="index"
            onClick={() => {
              dispatch({ type: "setToken", payload: undefined });
              dispatch({ type: "setUser", payload: undefined });
            }}
          >
            <i className="fa fa-sign-out"></i> Sign Out
          </Link>
        </div>
      )}
    </nav>
  );
}
