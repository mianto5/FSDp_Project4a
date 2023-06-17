import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../redux/orderslice";

export default function Confirmation() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const state = useSelector((state) => state.orderreducer);
  const status = state.status;
  let orders = state.orders;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOrders());
    }
  }, [status]);

  let lastOrder = orders[orders.length - 1];
  let content = "";
  if (status === "success") {
    content = (
      <section className="py-5">
        <div className="text-center">
          <h3>Thank You for Your Order!</h3>
          Your order has been created successfully. Please, find the payment
          details below.
        </div>
        <div className="container px-4 px-lg-5 mt-6">
          <div className="row mt-5">
            <div className="col-sm-12 col-md-6">
              <h5>Order details:</h5>
              <br></br>
              <p>
                <b>Order ID: {lastOrder.id}</b>
              </p>
              {lastOrder.items.map((product) => (
                <div key={product.id} className="row mb-3">
                  <div className="col-5">
                    {product.name} ({product.amount})
                  </div>
                  <div className="col-3 text-right">
                    {product.qty} x ${Number(product.price).toFixed(2)}
                  </div>
                </div>
              ))}
              <hr></hr>
              <div className="row">
                <div className="col-5">Cart Sum</div>
                <div className="col-3 text-right">${lastOrder.cartSum}</div>
              </div>
              <div className="row">
                <div className="col-5">Tax 15%</div>
                <div className="col-3 text-right">${lastOrder.tax}</div>
              </div>
              <div className="row">
                <div className="col-5">Shipping</div>
                <div className="col-3 text-right">${lastOrder.shipping}</div>
              </div>
              <div className="row">
                <div className="col-5">
                  <strong>Total Price</strong>
                </div>
                <div className="col-3 text-right">
                  <strong>${lastOrder.totalPrice}</strong>
                </div>
              </div>
              <br></br>
              <br></br>
            </div>
            <div className="col-sm-12 col-md-6">
              <h5>Payment details:</h5>
              <br></br>
              <p>
                <b>Company Name:</b> Kitchen Story
              </p>
              <p>
                <b>Bank Account Number:</b> 987654321/0321
              </p>
              <p>
                <b>Amount:</b> ${lastOrder.totalPrice}
              </p>
              <p>
                <b>Variable Symbol:</b> {lastOrder.id}
              </p>
              <p>
                <b>Comment:</b> Payment for order with ID: {lastOrder.id}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return <div>{content}</div>;
}
