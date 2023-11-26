import axiosClient from "./axiosClient";

const UserAPI = {
  getAutoLogin: () => {
    const url = "/users";
    return axiosClient.get(url);
  },

  getLogout: () => {
    const url = "/users/logout";
    return axiosClient.get(url);
  },

  getAllData: () => {
    const url = "/users/all";
    return axiosClient.get(url);
  },

  getSearchUser: (query) => {
    const url = `/users/detail${query}`;
    return axiosClient.get(url);
  },

  getDetailData: (id) => {
    const url = `/users/detail/${id}`;
    return axiosClient.get(url);
  },

  deleteUser: (id) => {
    const url = `/users/delete/${id}`;
    return axiosClient.delete(url);
  },

  putEditUser: (id, data) => {
    const url = `/users/edit/${id}`;
    return axiosClient.put(url, data);
  },

  postSignUp: (query) => {
    const url = `/users/signup/${query}`;
    return axiosClient.post(url);
  },
  postLogin: (query) => {
    const url = `/users/login/${query}`;
    return axiosClient.post(url);
  },
};

export default UserAPI;
