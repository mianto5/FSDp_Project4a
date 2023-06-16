import { configureStore } from "@reduxjs/toolkit";
import adminreducer from "./redux/adminslice";
import productreducer from "./redux/productslice";
import cartreducer from "./redux/cartslice";
import orderreducer from "./redux/orderslice";

export default configureStore({
  reducer: {
    adminreducer,
    productreducer,
    cartreducer,
    orderreducer,
  },
});
