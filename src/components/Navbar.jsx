import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">

      <h2 className="text-2xl font-bold">
        E-Commerce
      </h2>

      <div className="space-x-5">

        <Link to="/">Home</Link>

        <Link to="/login">Login</Link>

        <Link to="/register">Register</Link>
        
        <Link to="/cart">Cart</Link>

        <Link to="/address">Address</Link>

        <Link to="/orders">Orders</Link>


      

      </div>

    </nav>
  );
}

export default Navbar;