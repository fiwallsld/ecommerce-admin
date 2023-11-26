import React, { useState } from "react";
import ProductAPI from "../API/ProductAPI";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    short_desc: "",
    long_desc: "",
    images: [],
  });

  const [error, setError] = useState({
    name: "",
    category: "",
    short_desc: "",
    long_desc: "",
  });

  const handleChange = (target) => {
    if (target.name !== "images") {
      setProduct({
        ...product,
        [target.name]: target.value,
      });
    } else {
      setProduct({
        ...product,
        [target.name]: target.files,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("short_desc", product.short_desc);
    formData.append("long_desc", product.long_desc);

    [...product.images].forEach((img) => {
      formData.append("images", img);
    });

    try {
      const response = await ProductAPI.postNewProduct(formData);

      // console.log(response);
      alert("Add new product successfully");
      navigate("/products");
    } catch (err) {
      // console.log(err.response.data);
      setError(err.response.data);
    }
  };
  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <form
            style={{ width: "50%", marginLeft: "40px" }}
            onSubmit={handleSubmit}
            encType="multipart/formData"
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
              {error.name && <span className="text-danger">{error.name}</span>}
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
            <div className="form-group">
              <label>Short Description</label>
              <textarea
                className="form-control"
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
            <div className="form-group">
              <label>Long Description</label>
              <textarea
                className="form-control"
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
            <div className="form-group">
              <label htmlFor="images">Upload image (5 images)</label>
              <input
                type="file"
                name="images"
                className="form-control-file"
                id="images"
                onChange={(e) => handleChange(e.target)}
                multiple
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
