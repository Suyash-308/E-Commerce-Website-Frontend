import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-xl transition">
      <img
        src={product.imageUrl || "https://via.placeholder.com/250"}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />

      <h2 className="text-xl font-bold mt-3">
        {product.name}
      </h2>

      <p className="text-gray-600 mt-2">
        ₹ {product.price}
      </p>

      <p className="mt-2">
        <span className="font-semibold">Stock:</span> {product.stock}
      </p>

      <p
        className={`mt-2 font-semibold ${
          product.stock > 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        {product.stock > 0 ? "In Stock" : "Out of Stock"}
      </p>

      <Link
        to={`/product/${product.id}`}
        className="block mt-4 bg-blue-600 text-white text-center p-2 rounded"
      >
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;