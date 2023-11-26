import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import ProductAPI from "../API/ProductAPI";
import Pagination from "./Component/Pagination";

import convertMoney from "../convertMoney";
import RootAPI from "../API/RootAPI";
function Products() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState();

  const [pagination, setPagination] = useState({
    page: "1",
    count: "6",
    search: "",
    category: "all",
  });

  const onChangeText = (e) => {
    const value = e.target.value;

    setPagination({
      page: pagination.page,
      count: pagination.count,
      search: value,
      category: pagination.category,
    });
  };

  //Tổng số trang
  const [totalPage, setTotalPage] = useState();

  //Hàm này dùng để thay đổi state pagination.page
  //Nó sẽ truyền xuống Component con và nhận dữ liệu từ Component con truyền lên
  const handlerChangePage = (value) => {
    //Sau đó set lại cái pagination để gọi chạy làm useEffect gọi lại API pagination
    setPagination({
      page: value,
      count: pagination.count,
      search: pagination.search,
      category: pagination.category,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        page: pagination.page,
        count: pagination.count,
        search: pagination.search,
        category: pagination.category,
      };
      const query = queryString.stringify(params);
      const newQuery = "?" + query;

      const response = await ProductAPI.getPagination(newQuery);

      //Tính tổng số trang = tổng số sản phẩm / số lượng sản phẩm 1 trang
      const totalPage = Math.ceil(
        parseInt(response.totalProducts) / parseInt(pagination.count)
      );
      setTotalPage(totalPage);

      setProducts(response.products);
      setTotalProducts(response.totalProducts);
    };

    fetchData();
  }, [pagination]);

  const deleteHandle = async (productId) => {
    console.log(productId);
    const isConfirm = window.confirm("Are your sure to delete this product?");
    if (isConfirm)
      try {
        const response = await ProductAPI.deleteProduct(productId);

        // console.log(response);
        alert("Delete product successfully");
        // navigate("/products");
        setPagination({
          page: "1",
          count: "6",
          search: "",
          category: "all",
        });
      } catch (err) {
        console.log(err.response.data);
        // setError(err.response.data);
      }
  };

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              Basic Initialization
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
                <h4 className="card-title">Products</h4>
                <input
                  className="form-control w-25"
                  onChange={onChangeText}
                  type="text"
                  placeholder="Enter Search!"
                />
                <br />
                <div className="table-responsive">
                  <table className="table table-striped table-bordered no-wrap">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products &&
                        products.map((value) => (
                          <tr key={value._id}>
                            <td>{value._id}</td>
                            <td>{value.name}</td>
                            <td>{convertMoney(value.price)}</td>
                            <td>
                              <img
                                src={handleImgLink(value.img1)}
                                style={{
                                  height: "60px",
                                  width: "60px",
                                }}
                                alt=""
                              />
                            </td>
                            <td>{value.category}</td>
                            <td>
                              <Link
                                to={`/edit?id=${value._id}`}
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
                  <Pagination
                    pagination={pagination}
                    handlerChangePage={handlerChangePage}
                    totalPage={totalPage}
                    totalProducts={totalProducts}
                  />
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

const handleImgLink = (link) => {
  if (link?.includes(`images`)) {
    link = RootAPI + "/" + link;
  }

  return link;
};

export default Products;
