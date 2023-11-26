import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserAPI from "../API/UserAPI";

function Users(props) {
  const [users, setUsers] = useState([]);
  const [keySearch, setKeySearch] = useState("");

  const fetchData = async () => {
    const response = await UserAPI.getAllData();
    // console.log(response);
    setUsers(response.users);
  };

  useEffect(() => {
    const searchUsers = () => {
      let tmp = users.filter(
        (user) =>
          user.fullname.includes(keySearch) || user.email.includes(keySearch)
      );
      setUsers(tmp);
    };
    if (keySearch === "") fetchData();
    else searchUsers();
  }, [keySearch]);

  const deleteHandle = async (userId) => {
    const isConfirm = window.confirm("Are your sure to delete this account?");
    if (isConfirm)
      try {
        await UserAPI.deleteUser(userId);
        alert("Delete an account successfully");
        fetchData();
      } catch (err) {
        console.log(err.response?.data);
        // setError(err.response.data);
      }
  };

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              Basic Initialisation
            </h4>
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="/" className="text-muted">
                      Home
                    </a>
                  </li>
                  <li
                    className="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Table
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Users</h4>
                <input
                  className="form-control w-25"
                  type="text"
                  placeholder="Enter Search!"
                  value={keySearch}
                  onChange={(e) => setKeySearch(e.target.value)}
                />
                <br />
                <div className="table-responsive">
                  <table className="table table-striped table-bordered no-wrap">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Fullname</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users &&
                        users.map((value) => (
                          <tr key={value._id}>
                            <td>{value._id}</td>
                            <td>{value.fullname}</td>
                            <td>{value.email}</td>
                            <td>{value.phone}</td>
                            <td>
                              <Link
                                to={`edit?id=${value._id}`}
                                style={{
                                  cursor: "pointer",
                                  color: "white",
                                }}
                                className="btn btn-success"
                              >
                                Update
                              </Link>
                              &nbsp;
                              <span
                                style={{
                                  cursor: "pointer",
                                  color: "white",
                                }}
                                className="btn btn-danger"
                                onClick={() => deleteHandle(value._id)}
                              >
                                Delete
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center text-muted"></footer>
    </div>
  );
}

export default Users;
