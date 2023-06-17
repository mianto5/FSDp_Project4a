import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  status: "idle",
  orderstatus: "",
};

export const fetchOrders = createAsyncThunk("fetch/Orders", async () => {
  let response = await fetch("http://localhost:3000/orders");
  return response.json();
});

export const addOrder = createAsyncThunk("add/Product", async (order) => {
  let response = await fetch(`http://localhost:3000/orders`, {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  if (data !== null || data !== undefined) return Promise.resolve("success");
  return Promise.reject("failure");
});

const orderslice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.status = "success";
      state.orders = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.status = "failure";
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.orderstatus = "success";
      state.status = "idle";
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      state.orderstatus = "failure";
      state.status = "idle";
    });
  },
});

export default orderslice.reducer;
