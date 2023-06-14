import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchProducts } from "../redux/productslice";
import Product from "./Product";

export default function Products() {
  const [productSearch, setProductSearch] = useState({ search: "" });
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const state = useSelector((state) => state.productreducer);
  const status = state.status;
  let products = state.products;
  let adminLoggedIn = useSelector((state) => state.adminreducer.adminLoggedIn);

  /* navigate(0); */
  
  useEffect(() => {
    if (status === "idle") {
      products = [];
      console.log("is products empty? ", products);
      dispatch(fetchProducts());
      console.log("is products full? ", products);
      /* navigate("/products"); */
    }
  }, [status]);

  let filteredProducts = [...products].sort((a, b) =>
    a.name > b.name ? 1 : -1
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    filteredProducts = filteredProducts.filter((product) => product.name.includes(productSearch.search));
    console.log("filtered products", filteredProducts);
    navigate("/products");
  };

  let content = "";
  if (status === "success") {
    content = (
      <section className="py-5">
        <div className="text-center">
          {adminLoggedIn && <NavLink to={`add`}>ADD NEW PRODUCT</NavLink>}
        </div>
        <div className="container px-4 px-lg-5 mt-6">
          <form>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                name="search"
                value={productSearch.search}
                onChange={(e) => [
                  setProductSearch({
                    /* ...productSearch, */
                    [e.target.name]: e.target.value,
                  }),
                  console.log(productSearch),
                ]}
                id="formGroupExampleInput2"
              />
              <button
                type="submit"
                className="btn btn-secondary" onClick={handleSubmit}
              >
                Search Products
              </button>
            </div>
          </form>
          <br></br>
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
