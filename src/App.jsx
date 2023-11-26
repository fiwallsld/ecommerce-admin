import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./Chat/Chat";
import History from "./History/History";
import Home from "./Home/Home";
import Products from "./Products/Products";
import Users from "./Users/Users";
import Login from "./Login/Login";
import NewProduct from "./New/NewProduct";
import { AuthContextProvider } from "./Context/AuthContext";
import Layout from "./Layout/Layout";
import EditProduct from "./New/EditProduct";
import EditUser from "./Users/EditUser";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" index={true} element={<Home />} />
              <Route path="/ecommerce-admin" index={true} element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/edit" element={<EditUser />} />
              <Route path="/products" element={<Products />} />
              <Route path="/edit" element={<EditProduct />} />
              <Route path="/history" element={<History />} />
              <Route path="/login" element={<Login />} />
              <Route path="/new" element={<NewProduct />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
