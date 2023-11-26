import React, { useEffect, useState } from "react";
import ProductAPI from "../API/ProductAPI";
import { useNavigate } from "react-router-dom";

const EditProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState({
    name: "",
    category: "",
    short_desc: "",
    long_desc: "",
  });

  const productId = new URLSearchParams(window.location.search).get("id");

  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductAPI.getDetail(productId);
      console.log(response);

      setProduct(response.product);
    };

    fetchData();
  }, [productId]);

  const handleChange = (target) => {
    setProduct({
      ...product,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ProductAPI.putProduct(product._id, product);

      console.log(response);
      alert("Edit product successfully");
      navigate("/products");
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    }
  };
  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        {!product && <h2>Loading...</h2>}
        {product && (
          <div className="row">
            <form
              style={{ width: "50%", marginLeft: "40px" }}
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Product Name"
                  name="name"
                  value={product?.name}
                  onChange={(e) => handleChange(e.target)}
                />
                {error.name && (
                  <span className="text-danger">{error.name}</span>
                )}
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Category"
                  name="category"
                  value={product?.category}
                  onChange={(e) => handleChange(e.target)}
                />
                {error.category && (
                  <span className="text-danger">{error.category}</span>
                )}
              </div>
              <div class="form-group">
                <label>Short Description</label>
                <textarea
                  class="form-control"
                  rows="3"
                  placeholder="Enter Short Description"
                  name="short_desc"
                  value={product?.short_desc}
                  onChange={(e) => handleChange(e.target)}
                ></textarea>
                {error.short_desc && (
                  <span className="text-danger">{error.short_desc}</span>
                )}
              </div>
              <div class="form-group">
                <label>Long Description</label>
                <textarea
                  class="form-control"
                  rows="6"
                  placeholder="Enter Long Description"
                  name="long_desc"
                  value={product?.long_desc}
                  onChange={(e) => handleChange(e.target)}
                ></textarea>
                {error.long_desc && (
                  <span className="text-danger">{error.long_desc}</span>
                )}
              </div>
              {/* <div class="form-group">
                <label for="exampleFormControlFile1">
                  Upload image (5 images)
                </label>
                <input
                  type="file"
                  class="form-control-file"
                  id="exampleFormControlFile1"
                  multiple
                />
              </div> */}
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

export default EditProduct;
