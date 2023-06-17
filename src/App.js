import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Admin from "./components/Admin";
import ChangePassword from "./components/ChangePassword";
import AddProduct from "./components/AddProduct";
import Confirmation from "./components/Confirmation";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/add" element={<AddProduct />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/admin" element={<ChangePassword />}></Route>
        <Route path="/login" element={<Admin />}></Route>
        <Route path="/confirm" element={<Confirmation />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
