import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  status: "idle",
  error: "",
};

export const fetchProducts = createAsyncThunk("fetch/Products", async () => {
  let response = await fetch("http://localhost:3000/products");
  return response.json();
});

const productslice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "success";
      state.products = state.products.concat(action.payload);
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failure";
    });
  },
});

export default productslice.reducer;
