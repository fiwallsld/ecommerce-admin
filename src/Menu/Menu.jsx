import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Menu(props) {
  const [selected, setSelected] = useState("dashboard");
  return (
    <aside className="left-sidebar" data-sidebarbg="skin6">
      <div className="scroll-sidebar" data-sidebarbg="skin6">
        <nav className="sidebar-nav">
          <ul id="sidebarnav">
            <li
              className={`sidebar-item ${
                selected === "dashboard" ? "selected" : ""
              }`}
              onClick={() => setSelected("dashboard")}
            >
              {" "}
              <Link className="sidebar-link sidebar-link" to="/">
                <i data-feather="home" className="feather-icon"></i>
                <span className="hide-menu">Dashboard</span>
              </Link>
            </li>
            <li className="list-divider"></li>

            <li className="nav-small-cap">
              <span className="hide-menu">Components</span>
            </li>
            <li
              className={`sidebar-item ${selected === "new" ? "selected" : ""}`}
              onClick={() => setSelected("new")}
            >
              {" "}
              <Link className="sidebar-link sidebar-link" to="/new">
                <i data-feather="settings" className="feather-icon"></i>
                <span className="hide-menu">New Product</span>
              </Link>
            </li>
            <li
              className={`sidebar-item ${
                selected === "chat" ? "selected" : ""
              }`}
              onClick={() => setSelected("chat")}
            >
              {" "}
              <Link className="sidebar-link sidebar-link" to="/chat">
                <i data-feather="message-square" className="feather-icon"></i>
                <span className="hide-menu">Customer</span>
              </Link>
            </li>
            <li
              className={`sidebar-item ${
                selected === "user" ? "selected" : ""
              }`}
              onClick={() => setSelected("user")}
            >
              <Link to="/users" className="sidebar-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                  className="feather-icon"
                >
                  <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                </svg>
                <span className="hide-menu">Users</span>
              </Link>
            </li>
            <li
              className={`sidebar-item ${
                selected === "product" ? "selected" : ""
              }`}
              onClick={() => setSelected("product")}
            >
              <Link to="/products" className="sidebar-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                  className="feather-icon"
                >
                  <path d="M0 64C0 28.7 28.7 0 64 0H384c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM256 448a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM384 64H64V384H384V64z" />
                </svg>
                <span className="hide-menu">Products</span>
              </Link>
            </li>
            <li
              className={`sidebar-item ${
                selected === "history" ? "selected" : ""
              }`}
              onClick={() => setSelected("history")}
            >
              <Link to="/history" className="sidebar-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                  className="feather-icon"
                >
                  <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H288V352c0-17.7 14.3-32 32-32h80V96c0-8.8-7.2-16-16-16H64zM288 480H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V320v5.5c0 17-6.7 33.3-18.7 45.3l-90.5 90.5c-12 12-28.3 18.7-45.3 18.7H288z" />
                </svg>
                <span className="hide-menu">History</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Menu;
