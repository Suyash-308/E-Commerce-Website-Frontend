import api from "./axios";


// Get all addresses
export const getAddresses = async () => {

    const response = await api.get("/address");

    return response.data;
};


// Add new address
export const addAddress = async (address) => {

    const response = await api.post(
        "/address",
        address
    );

    return response.data;
};


// Update address
export const updateAddress = async (id, address) => {

    const response = await api.put(
        `/address/${id}`,
        address
    );

    return response.data;
};


// Delete address
export const deleteAddress = async (id) => {

    const response = await api.delete(
        `/address/${id}`
    );

    return response.data;
};