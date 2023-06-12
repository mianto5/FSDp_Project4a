import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAdd } from "../redux/cartslice";

export default function Product({ product }) {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const onAddToCart = () => {
    dispatch(onAdd(product));
  };

  return product !== undefined ? (
    <div className="col mb-5">
      <div className="card h-100">
        {/* Sale badge*/}
        {/* <div
                  className="badge bg-dark text-white position-absolute"
                  style="top: 0.5rem; right: 0.5rem"
                >
                  Sale
                </div> */}
        {/* Product image*/}
        <img className="card-img-top" src={product.imageURL} alt="..." />
        {/* Product details*/}
        <div className="card-body p-4">
          <div className="text-center">
            {/* Product name*/}
            <h5 className="fw-bolder">{product.name}</h5>
            {/* Product amount*/}
            <p>{product.amount}</p>
            {/* Product price*/}
            <p>${product.price}</p>
          </div>
        </div>
        {/* Product actions*/}
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            <button
              className="btn btn-outline-dark mt-auto"
              onClick={onAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>No products yet</div>
  );
}
