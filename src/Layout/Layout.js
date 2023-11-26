import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Login from "../Login/Login";
import { useEffect } from "react";
import UserAPI from "../API/UserAPI";

function Layout() {
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const response = await UserAPI.getAutoLogin();
        // console.log("autologin:----", response.user);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.user.email,
        });

        localStorage.setItem("user-admin", response.user.email);
        localStorage.setItem("admin-token", response.user.token);
      } catch (error) {
        // console.log(error.response);
        dispatch({
          type: "LOGOUT",
        });
      }
    };

    if (!user) {
      // console.log("Admin token saved:---", localStorage.getItem("admin-token"));
      autoLogin();
    }
  }, []);

  return (
    <div
      id="main-wrapper"
      data-theme="light"
      data-layout="vertical"
      data-navbarbg="skin6"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
      data-boxed-layout="full"
    >
      <Header />
      <Menu />
      {user ? <Outlet /> : <Login />}
    </div>
  );
}

export default Layout;
