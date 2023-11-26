import axiosClient from "./axiosClient";

const ProductAPI = {
  getAPI: () => {
    const url = "/products";
    return axiosClient.get(url);
  },

  getCategory: (query) => {
    const url = `/products/category${query}`;
    return axiosClient.get(url);
  },

  getDetail: (id) => {
    const url = `/products/details/${id}`;
    return axiosClient.get(url);
  },

  getPagination: (query) => {
    const url = `/products/pagination${query}`;
    return axiosClient.get(url);
  },

  putProduct: (id, data) => {
    const url = `/products/edit/${id}`;
    return axiosClient.put(url, data);
  },
  postNewProduct: (data) => {
    const url = `/products/new`;
    return axiosClient.postForm(url, data);
  },
  deleteProduct: (id) => {
    const url = `/products/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default ProductAPI;
