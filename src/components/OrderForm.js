import React, { useState } from 'react';

const OrderForm = () => {
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    price: 0,
    discount: false,
  });

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic form validation
    if (!orderDetails.name || orderDetails.price <= 0) {
      setError('Please fill in all fields correctly.');
      return;
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setOrders([...orders, data]); // Add the new order to the orders list
      setSuccess('Order placed successfully!');
      setOrderDetails({
        name: '',
        price: 0,
        discount: false,
      });
    } catch (error) {
      setError('Error placing order. Please try again.');
    }
  };

  const handleDelete = (id) => {
    // Implement delete functionality
  };

  const handleEdit = (id) => {
    // Implement edit functionality
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Order Name:</label>
          <input type="text" name="name" value={orderDetails.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={orderDetails.price} onChange={handleChange} min="0" required />
        </div>
        <div>
          <label>
            <input type="checkbox" name="discount" checked={orderDetails.discount} onChange={handleChange} />
            5% Discount
          </label>
        </div>
        <button type="submit">Place Order</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>

      <h2>Order List</h2>
      <table>
        <thead>
          <tr>
            <th>Order Item</th>
            <th>Price</th>
            <th>On 5% Promo?</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.name}</td>
              <td>{order.price}</td>
              <td>{order.discount ? (order.price * 0.95).toFixed(2) : order.price}</td>
              <td>
                <button onClick={() => handleEdit(order._id)}>Edit</button>
                <button onClick={() => handleDelete(order._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderForm;