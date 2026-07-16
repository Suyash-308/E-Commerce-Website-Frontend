export const updateCart = async (id, cart) => {
  const response = await api.put(`/cart/${id}`, cart);
  return response.data;
};

export const deleteCartItem = async (id) => {
  const response = await api.delete(`/cart/${id}`);
  return response.data;
};