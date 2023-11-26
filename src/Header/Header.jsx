import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import Logoicon from "../Image/logo-icon.png";
import Logotext from "../Image/logo-text.png";
import Logolight from "../Image/logo-light-text.png";
import UserAPI from "../API/UserAPI";

function Header(props) {
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = async () => {
    await UserAPI.getLogout();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <header className="topbar" data-navbarbg="skin6">
      <nav className="navbar top-navbar navbar-expand-md">
        <div className="navbar-header" data-logobg="skin6">
          <Link
            className="nav-toggler waves-effect waves-light d-block d-md-none"
            to="#"
          >
            <i className="ti-menu ti-close"></i>
          </Link>
          <div className="navbar-brand">
            <Link to="/">
              <b className="logo-icon">
                <img src={Logoicon} alt="homepage" className="dark-logo" />
                <img src={Logoicon} alt="homepage" className="light-logo" />
              </b>
              <span className="logo-text">
                <img src={Logotext} alt="homepage" className="dark-logo" />
                <img src={Logolight} className="light-logo" alt="homepage" />
              </span>
            </Link>
          </div>
        </div>
        <div className="navbar-collapse collapse" id="navbarSupportedContent">
          <ul className="navbar-nav float-left mr-auto ml-3 pl-1"></ul>

          {user && (
            <div className="navbar-nav float-left">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDarkDropdown"
                aria-controls="navbarNavDarkDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarNavDarkDropdown"
              >
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="#"
                      id="navbarDarkDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="ml-2 d-none d-lg-inline-block">
                        <span>Hello,</span>{" "}
                        <span className="text-dark">{user ? user : ""}</span>{" "}
                        <i data-feather="chevron-down" className="svg-icon"></i>
                      </span>
                    </Link>
                    <ul
                      className="dropdown-menu dropdown-menu-dark"
                      aria-labelledby="navbarDarkDropdownMenuLink"
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
