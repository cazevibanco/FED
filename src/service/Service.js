import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching orders. Please try again.');
  }
};

export const addOrder = async (order) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, order);
    return response.data;
  } catch (error) {
    throw new Error('Error adding order. Please try again.');
  }
};

export const updateOrder = async (id, order) => {
  try {
    const response = await axios.put(`${API_URL}/orders/${id}`, order);
    return response.data;
  } catch (error) {
    throw new Error('Error updating order. Please try again.');
  }
};

export const deleteOrder = async (id) => {
  try {
    await axios.delete(`${API_URL}/orders/${id}`);
  } catch (error) {
    throw new Error('Error deleting order. Please try again.');
  }
};