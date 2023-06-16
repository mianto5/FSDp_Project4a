import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartitems, onAdd, onRemove, removeAll } from "../redux/cartslice";
import { addOrder } from "../redux/orderslice";

const initialState = {
  items: [],
  cartSum: "",
  tax: "",
  shipping: "",
  totalPrice: "",
};

export default function Cart() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let cart = useSelector(cartitems);
  let tax;

  const itemsPrice = cart.reduce((a, c) => a + c.qty * Number(c.price), 0);

  const onRemoveItem = (item) => {
    dispatch(onRemove(item));
  };
  const onAddItem = (item) => {
    dispatch(onAdd(item));
  };

  const handleConfirm = () => {
    console.log("tax price: ", (itemsPrice * 0.15).toFixed(2));
    console.log("cart: ", cart);
    const addedOrder = {
      cartSum: itemsPrice.toFixed(2),
      tax: (itemsPrice * 0.15).toFixed(2),
      shipping: (8).toFixed(2),
      totalPrice: (itemsPrice * 1.15 + 8).toFixed(2),
      items: cart,
    }
    console.log("addedOrder: ", addedOrder);
    dispatch(addOrder(addedOrder));
    dispatch(removeAll());
    navigate("/confirm");
  };

  return (
    <div className="container px-4 px-lg-5 mt-5">
      <div>
        {cart.length === 0 && (
          <div>
            <h3>Your Cart Is Empty</h3>
            <p>Please, check our products first.</p>
          </div>
        )}
        {cart.map((product) => (
          <div key={product.id} className="row mb-3">
            <div className="col-5">
              {product.name} ({product.amount})
            </div>
            <div className="col-3">
              <button
                onClick={() => onRemoveItem(product)}
                className="remove text-center btn btn-danger"
              >
                <b>-</b>
              </button>
              {"     "}
              <button
                onClick={() => onAddItem(product)}
                className="add  text-center btn btn-success"
              >
                <b>+</b>
              </button>
            </div>
            <div className="col-3 text-right">
              {product.qty} x ${Number(product.price).toFixed(2)}
            </div>
          </div>
        ))}
        {cart.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-5"></div>
              <div className="col-3">Cart Sum</div>
              <div className="col-3 text-right">${itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-5"></div>
              <div className="col-3">Tax 15%</div>
              <div className="col-3 text-right">
                ${(itemsPrice * 0.15).toFixed(2)}
              </div>
            </div>
            <div className="row">
              <div className="col-5"></div>
              <div className="col-3">Shipping</div>
              <div className="col-3 text-right">${(8).toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-5"></div>
              <div className="col-3">
                <strong>Total Price</strong>
              </div>
              <div className="col-3 text-right">
                <strong>${(itemsPrice * 1.15 + 8).toFixed(2)}</strong>
              </div>
            </div>
            <hr />
            <div className="text-center">
              <button onClick={handleConfirm} className="btn btn-dark">
                Confirm Your Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
