import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchProducts } from "../redux/productslice";
import Product from "./Product";

export default function Products() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const state = useSelector((state) => state.productreducer);
  const status = state.status;
  const products = state.products;
  let adminLoggedIn = useSelector((state) => state.adminreducer.adminLoggedIn);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, []);

  let content = "";
  if (status === "success") {
    content = (
      <section className="py-5">
        <div className="text-center">
          {adminLoggedIn && <NavLink to={`add`}>ADD NEW PRODUCT</NavLink>}
        </div>
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return <div>{content}</div>;
}
