// src/components/OrderList.js
import React, { useState, useEffect } from 'react';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError('Error fetching orders. Please try again.');
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/orders/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setOrders(orders.filter(order => order._id !== id));
    } catch (error) {
      setError('Error deleting order. Please try again.');
    }
  };

  const handleEdit = (id) => {
    // Implement edit functionality
  };

  const calculateTotal = () => {
    const total = orders.reduce((acc, order) => acc + order.quantity * order.price, 0);
    const discountedTotal = total * 0.95; // Assuming a 5% discount
    return { total, discountedTotal };
  };

  const { total, discountedTotal } = calculateTotal();

  return (
    <div>
      <h2>Order List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>{order.price}</td>
              <td>
                <button onClick={() => handleEdit(order._id)}>Edit</button>
                <button onClick={() => handleDelete(order._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Total Regular Bill</td>
            <td>{total}</td>
          </tr>
          <tr>
            <td colSpan="4">Total Discounted Bill</td>
            <td>{discountedTotal}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrderList;