import React, { useEffect, useState } from "react";
import UserAPI from "../API/UserAPI";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState({
    fullname: "",
    email: "",
    phone: "",
    role: "",
  });

  const userId = new URLSearchParams(window.location.search).get("id");

  useEffect(() => {
    const fetchData = async () => {
      const response = await UserAPI.getDetailData(userId);
      // console.log(response);
      setUser(response.user);
    };

    fetchData();
  }, [userId]);

  const handleChange = (target) => {
    setUser({
      ...user,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user);
    try {
      const response = await UserAPI.putEditUser(userId, user);
      // console.log(response);
      alert("Edit user successfully");
      navigate("/users");
    } catch (err) {
      // console.log(err.response?.data);
      setError(err.response?.data);
    }
  };
  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        {!user && <h2>Loading...</h2>}
        {user && (
          <div className="row">
            <form
              style={{ width: "50%", marginLeft: "40px" }}
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Product Name"
                  name="fullname"
                  value={user?.fullname}
                  onChange={(e) => handleChange(e.target)}
                />
                {error.fullname && (
                  <span className="text-danger">{error.fullname}</span>
                )}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="email"
                  value={user?.email}
                  onChange={(e) => handleChange(e.target)}
                />
                {error.email && (
                  <span className="text-danger">{error.email}</span>
                )}
              </div>
              <div className="form-group">
                <label>Phone number</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter phone number"
                  name="phone"
                  value={user?.phone}
                  onChange={(e) => handleChange(e.target)}
                ></input>
                {error.phone && (
                  <span className="text-danger">{error.phone}</span>
                )}
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  className="form-control"
                  name="role"
                  value={user?.role}
                  onChange={(e) => handleChange(e.target)}
                >
                  <option value="admin">Admin</option>
                  <option value="client">Client</option>
                  <option value="sub-admin">Adviser</option>
                </select>
                {error.phone && (
                  <span className="text-danger">{error.phone}</span>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Edit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditUser;
