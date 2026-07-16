import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getProductById } from "../../api/productApi";
import { addToCart } from "../../api/cartApi";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const cart = {
        quantity: 1,
        user: {
          id: 2, // तुझ्या users table मधील valid user id
        },
        product: {
          id: product.id,
        },
      };

      await addToCart(cart);

      alert("Product Added To Cart Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed To Add Product");
    }
  };

  if (!product) {
    return (
      <div className="text-center mt-20 text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-10 grid md:grid-cols-2 gap-10">
        <div>
          <img
            src={product.imageUrl || "https://via.placeholder.com/500"}
            alt={product.name}
            className="w-full h-[450px] object-cover rounded-lg shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <p className="text-3xl text-green-600 font-semibold mt-4">
            ₹ {product.price}
          </p>

          <p className="mt-5 text-gray-700">{product.description}</p>

          <p className="mt-4 text-lg">
            <strong>Stock:</strong> {product.stock}
          </p>

          <p
            className={`mt-2 font-semibold ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0 ? "✅ In Stock" : "❌ Out Of Stock"}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg disabled:bg-gray-400"
          >
            Add To Cart
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;