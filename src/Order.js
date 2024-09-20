import React, { useState, useEffect } from 'react';
import coffeeImage from './menu.png';
import './index.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

const Order = () => {
  const API_URL = "http://localhost:8081/orders";
  const [orderName, setOrderName] = useState("");
  const [price, setPrice] = useState("");
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [orders, setOrders] = useState([]);
  const [totalRegular, setTotalRegular] = useState(0);
  const [totalDiscounted, setTotalDiscounted] = useState(0);
 
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingOrderName, setEditingOrderName] = useState("");
  const [editingPrice, setEditingPrice] = useState("");
  const [editingIsDiscounted, setEditingIsDiscounted] = useState(false);
 
  useEffect(() => {
    // Fetch orders from the database
 
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
       
      })
      .catch((error) => {
        console.error("There was an error fetching the orders!", error);
      });
  });

  useEffect(() => {
    // Calculate totals whenever orders change
    const totalRegularBill = orders.reduce((total, order) => total + order.price, 0);
    const totalDiscountedBill = orders.reduce((total, order) => {
      return total + (order.isDiscounted ? order.price * 0.95 : order.price);
    }, 0);
 
    setTotalRegular(totalRegularBill);
    setTotalDiscounted(totalDiscountedBill);
  }, [orders]);
 
  const addOrder = () => {
    const newOrder = { orderName: orderName, price: parseFloat(price), isDiscounted: isDiscounted };
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newOrder),
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders((prevOrders) => [...prevOrders, data]);
        setOrderName('');
        setPrice('');
        setIsDiscounted(false);
      })
      .catch((error) => {
        console.error("There was an error adding the order!", error);
      });
  };
 
 
  const handleEdit = (index, orderName, price, isDiscounted) => {
    setEditingIndex(index);
    setEditingOrderName(orderName);
    setEditingPrice(price);
    setEditingIsDiscounted(isDiscounted);
  };
 
  const handleUpdate = (index) => {
    const updatedOrder = {
      orderName: editingOrderName,
      price: editingPrice,
      isDiscounted: editingIsDiscounted,
    };
    const orderId = orders[index].id; // Assuming each order has a unique id
    editOrder(orderId, updatedOrder);
    setEditingIndex(null);
  };
 
  const handleCancel = () => {
    setEditingIndex(null);
  };
  const deleteOrder = (index) => {
    const orderToDelete = orders[index];
    fetch(`${API_URL}/delete/${orderToDelete.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
      })
      .catch((error) => {
        console.error("There was an error deleting the order!", error);
      });
  };
 
  const editOrder = (orderId, updatedOrder) => {
    fetch(`${API_URL}/update/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedOrder)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Order updated successfully", data);
      // Optionally, update the local state or UI with the new order data
    })
    .catch((error) => {
      console.error("There was an error updating the order!", error);
    });
  };
 
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <img
            src={coffeeImage}
            alt="Menu"
            className="img-fluid mb-3"
            style={{ height: "400px" }}
          />
        </div>
        <div className="col-md-8">
          <h2>Order System</h2>
          <table className="table table-secondary">
            <thead className="thead-light">
              <tr>
                <th>Order Item</th>
                <th>Price</th>
                <th>On 5% Promo?</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={orderName}
                    onChange={(e) => setOrderName(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={isDiscounted}
                    onChange={(e) => setIsDiscounted(e.target.checked)}
                  />
                </td>
                <td>
                  <button className="btn btn-secondary" onClick={addOrder}>
                    Place Order
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <h3>Attending Clerk: Jane Doe</h3>
          <table className="table table-secondary">
            <thead className="thead-light">
              <tr>
                <th>Order Item</th>
                <th>Price</th>
                <th>On 5% Promo?</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
      {orders.map((order, index) => (
        <tr key={index}>
          {editingIndex === index ? (
            <>
              <td>
                <input
                  type="text"
                  value={editingOrderName}
                  onChange={(e) => setEditingOrderName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editingPrice}
                  onChange={(e) => setEditingPrice(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={editingIsDiscounted}
                  onChange={(e) => setEditingIsDiscounted(e.target.checked)}
                />
              </td>
              <td>
                <button 
                  onClick={() => 
                    handleUpdate(index)}
                      className="btn btn-secondary"
                    >
                      Update
                    </button>
                <button 
                  onClick={handleCancel}
                    className="btn btn-dark"
                  >
                    Cancel
                  </button>
              </td>
            </>
          ) : (
            <>
              <td>{order.orderName}</td>
              <td>${order.price}</td>
              <td>{order.isDiscounted ? 'Yes' : 'No'}</td>
              <td>
                <button
                  onClick={() =>
                    handleEdit(index, order.orderName, order.price, order.isDiscounted)
                  }
                  className="btn btn-secondary"
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteOrder(index)}
                  className="btn btn-dark"
                  >
                    Delete
                    </button>
              </td>
            </>
          )}
        </tr>
      ))}
    </tbody>
          </table>
          <div className="totals-container">
          <p>Total Regular Bill: ${totalRegular.toFixed(2)}</p>
          <p>Total Discounted Bill: ${totalDiscounted.toFixed(2)}</p>
        </div>
        </div>
      </div>
    </div>
  );
};
 
export default Order;