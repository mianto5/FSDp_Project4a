import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartitems: [],
};

const cartslice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    onAdd: (state, action) => {
      const exist = state.cartitems.find((x) => x.id === action.payload.id);
      if (exist) {
        let items = state.cartitems.map((x) =>
          x.id === action.payload.id ? { ...exist, qty: exist.qty + 1 } : x
        );
        state.cartitems = items;
      } else {
        let item = { ...action.payload, qty: 1 };
        state.cartitems.push(item);
      }
    },
    onRemove: (state, action) => {
      let product = action.payload;
      const exist = state.cartitems.find((x) => x.id === product.id);
      if (exist.qty === 1) {
        state.cartitems.splice(
          state.cartitems.findIndex((x) => x.id === product.id),
          1
        );
      } else {
        let items = state.cartitems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        );
        state.cartitems = items;
      }
    },
    removeAll: (state, action) => {
      state.cartitems = [];
    },
  },
});

export let cartitems = (state) => state.cartreducer.cartitems;
export let { onAdd, onRemove, removeAll } = cartslice.actions;
export default cartslice.reducer;
