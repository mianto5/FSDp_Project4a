import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../redux/productslice";

const initialState = {
  name: "",
  amount: "",
  price: 0,
  description: "",
  imageURL: "",
};

export default function AddProduct() {
  const [addedProduct, setAddedProduct] = useState(initialState);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let adminLoggedIn = useSelector((state) => state.adminreducer.adminLoggedIn);
  /* const state = useSelector((state) => state.productreducer);
  const products = state.products; */

  useEffect(() => {
    if (!adminLoggedIn) navigate("/products");
  }, [adminLoggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(addedProduct)); 
    navigate("/products");
  };

  return (
    <div className="container px-4 px-lg-5 mt-5">
      <div className="col-md-6">
        <p></p>
        <h5>Add a new product</h5>
        <p></p>
        <form>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Product's Name:
            </label>{" "}
            <input
              type="text"
              className="form-control"
              name="name"
              value={addedProduct.name}
              onChange={(e) =>
                setAddedProduct({
                  ...addedProduct,
                  [e.target.name]: e.target.value,
                })
              }
              id="formGroupExampleInput2"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Product Amount:
            </label>{" "}
            <input
              type="text"
              className="form-control"
              name="amount"
              value={addedProduct.amount}
              onChange={(e) =>
                setAddedProduct({
                  ...addedProduct,
                  [e.target.name]: e.target.value,
                })
              }
              id="formGroupExampleInput2"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Product Price:
            </label>{" "}
            <input
              type="number"
              className="form-control"
              name="price"
              value={addedProduct.price}
              onChange={(e) =>
                setAddedProduct({
                  ...addedProduct,
                  [e.target.name]: e.target.value,
                })
              }
              id="formGroupExampleInput2"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Product Description:
            </label>{" "}
            <input
              type="text"
              className="form-control"
              name="description"
              value={addedProduct.description}
              onChange={(e) =>
                setAddedProduct({
                  ...addedProduct,
                  [e.target.name]: e.target.value,
                })
              }
              id="formGroupExampleInput2"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Product Image URL:
            </label>{" "}
            <input
              type="text"
              className="form-control"
              name="imageURL"
              value={addedProduct.imageURL}
              onChange={(e) =>
                setAddedProduct({
                  ...addedProduct,
                  [e.target.name]: e.target.value,
                })
              }
              id="formGroupExampleInput2"
            />
          </div>
          <button type="submit" className="btn btn-dark" onClick={handleSubmit}>
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
