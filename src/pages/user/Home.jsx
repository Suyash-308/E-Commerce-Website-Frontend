import { useEffect, useState } from "react";
import { ShoppingBag, Laptop, Smartphone, Watch } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { getAllProducts } from "../../api/productApi";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const categories = [
    {
      title: "Laptops",
      icon: <Laptop size={40} />,
    },
    {
      title: "Mobiles",
      icon: <Smartphone size={40} />,
    },
    {
      title: "Fashion",
      icon: <ShoppingBag size={40} />,
    },
    {
      title: "Watches",
      icon: <Watch size={40} />,
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-xl">
            <h1 className="text-5xl font-extrabold leading-tight">
              Discover Amazing Deals
            </h1>

            <p className="mt-5 text-lg text-gray-200">
              Shop premium electronics, fashion, and accessories at the best
              prices with fast delivery.
            </p>

            <button className="mt-8 bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              Shop Now
            </button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
            alt="Shopping"
            className="w-full md:w-[450px] rounded-xl shadow-2xl mt-10 md:mt-0"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-8 text-center cursor-pointer hover:-translate-y-1"
            >
              <div className="text-blue-600 flex justify-center mb-4">
                {cat.icon}
              </div>

              <h3 className="font-semibold text-lg">{cat.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Products */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest Products</h2>

          <button className="text-blue-600 font-semibold hover:underline">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;