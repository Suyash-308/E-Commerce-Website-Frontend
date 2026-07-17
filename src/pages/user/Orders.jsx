import { useEffect, useState } from "react";
import { getMyOrders } from "../../api/orderApi";


function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">

      <h1 className="text-3xl font-bold mb-8">
        My Orders
      </h1>

      {
        orders.length === 0 ? (

          <h2>No Orders Found</h2>

        ) : (

          orders.map(order => (

            <div
              key={order.id}
              className="border rounded-lg p-5 shadow mb-5"
            >

              <img
                src={order.product.imageUrl}
                alt={order.product.name}
                className="w-32 h-32 object-cover rounded"
              />

              <h2 className="text-2xl font-bold mt-3">
                {order.product.name}
              </h2>

              <p>Quantity : {order.quantity}</p>

              <p>Total : ₹{order.totalPrice}</p>

              <p>Status : {order.status}</p>

              <p>
                Date :
                {" "}
                {new Date(order.orderDate).toLocaleString()}
              </p>

            </div>

          ))

        )
      }

    </div>
  );
}

export default Orders;