import api from "./axios";

// Place Order
export const placeOrder = async (addressId) => {
  const response = await api.post("/orders/place", {
    addressId,
  });

  return response.data;
};

// Get My Orders
export const getMyOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};