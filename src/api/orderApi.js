import api from "./axios";


export const placeOrder = async (addressId) => {

    const response = await api.post(
        "/orders/place",
        {
            addressId: addressId
        }
    );

    return response.data;
};



export const getMyOrders = async () => {

    const response = await api.get(
        "/orders/my-orders"
    );

    return response.data;

};