import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  status: "idle",
  error: "",
  productstatus: "",
};

export const fetchProducts = createAsyncThunk("fetch/Products", async () => {
  let response = await fetch("http://localhost:3000/products");
  return response.json();
});

export const addProduct = createAsyncThunk("add/Product", async (product) => {
  let response = await fetch(`http://localhost:3000/products`, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  if (data !== null || data !== undefined) return Promise.resolve("success");
  return Promise.reject("failure");
});

export const deleteProduct = createAsyncThunk("delete/Product", async (id) => {
  let response = await fetch(`http://localhost:3000/products/` + id, {
    method: "DELETE",
  });
  return Promise.resolve("success");
});

const productslice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "success";
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failure";
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.productstatus = "success";
      state.status = "idle";
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.productstatus = "failure";
      state.status = "idle";
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.status = "idle";
    });
  },
});

export default productslice.reducer;
