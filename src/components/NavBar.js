import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartitems } from "../redux/cartslice";
import { logoutAdmin } from "../redux/adminslice";

export default function NavBar() {
  const cart = useSelector(cartitems);
  let adminLoggedIn = useSelector((state) => state.adminreducer.adminLoggedIn);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4 px-lg-5">
        <a className="navbar-brand" href="#">
          Kitchen Story
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Our Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                <i className="bi-cart-fill me-1"></i>
                Cart
                <span className="badge bg-dark text-white ms-1 rounded-pill">
                  {cart.length}
                </span>
              </NavLink>
            </li>
            {adminLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav me-right mb-2 mb-lg-0 ms-lg-4">
            {adminLoggedIn && (
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/"
                  onClick={() => dispatch(logoutAdmin())}
                >
                  Log Out
                </a>
              </li>
            )}
            {!adminLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Log In
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
