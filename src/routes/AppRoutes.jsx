import { Routes, Route } from "react-router-dom";

import Home from "../pages/user/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProductDetails from "../pages/user/ProductDetails";
import Cart from "../pages/user/Cart";
import Address from "../pages/user/Address";
import Orders from "../pages/user/Orders";
import AddAddress from "../pages/user/AddAddress";



function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/address" element={<Address />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/add-address" element={<AddAddress />}/>
    </Routes>
  );
}

export default AppRoutes;