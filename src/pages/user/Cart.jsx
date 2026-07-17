import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getCartItems,
  updateCart,
  deleteCartItem,
} from "../../api/cartApi";

function Cart() {
 const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await getCartItems();
      setCartItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQuantity = async (item) => {
    try {
      await updateCart(item.id, {
        quantity: item.quantity + 1,
        user: item.user,
        product: item.product,
      });

      loadCart();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQuantity = async (item) => {
    try {
      if (item.quantity > 1) {
        await updateCart(item.id, {
          quantity: item.quantity - 1,
          user: item.user,
          product: item.product,
        });
      } else {
        await deleteCartItem(item.id);
      }

      loadCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCartItem(id);
      loadCart();
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-5">

      <h1 className="text-3xl font-bold mb-6">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <h2 className="text-center text-2xl font-semibold">
          Cart is Empty
        </h2>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border rounded-lg shadow-md p-4 mb-5"
            >
              <div className="flex gap-5">

                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-32 h-32 object-cover rounded"
                />

                <div>
                  <h2 className="text-2xl font-bold">
                    {item.product.name}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    {item.product.description}
                  </p>

                  <p className="text-xl font-semibold mt-2">
                    ₹ {item.product.price}
                  </p>

                  <div className="flex items-center gap-3 mt-4">

                    <button
                      onClick={() => decreaseQuantity(item)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      -
                    </button>

                    <span className="text-xl font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      +
                    </button>

                  </div>
                </div>

              </div>

              <div className="text-right">

                <h2 className="text-2xl font-bold mb-4">
                  ₹ {item.product.price * item.quantity}
                </h2>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
                >
                  Remove
                </button>

              </div>
            </div>
          ))}

          <div className="text-right mt-8 border-t pt-5">

            <h2 className="text-3xl font-bold">
              Total : ₹ {totalPrice}
            </h2>

            <button
              onClick={() => navigate("/address")}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
              Proceed To Checkout
           </button>

          </div>
        </>
      )}
    </div>
  );
}

export default Cart;