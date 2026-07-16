import { Routes, Route } from "react-router-dom";

import Home from "../pages/user/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProductDetails from "../pages/user/ProductDetails";
import Cart from "../pages/user/Cart";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default AppRoutes;