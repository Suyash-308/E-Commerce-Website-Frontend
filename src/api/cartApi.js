import api from "./axios";

export const getCartItems = async () => {
  const response = await api.get("/cart");
  return response.data;
};

export const addToCart = async (cart) => {
  const response = await api.post("/cart", cart);
  return response.data;
};

export const updateCart = async (id, cart) => {
  const response = await api.put(`/cart/${id}`, cart);
  return response.data;
};

export const deleteCartItem = async (id) => {
  const response = await api.delete(`/cart/${id}`);
  return response.data;
};