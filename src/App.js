// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage'; // Ensure this path is correct
import OrderForm from './components/OrderForm'; // Import the OrderForm component
import OrderList from './components/OrderList'; // Import the OrderList component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/order" element={<OrderForm />} /> {/* Add route for OrderForm */}
        <Route path="/orders" element={<OrderList />} /> {/* Add route for OrderList */}
      </Routes>
    </Router>
  );
};

export default App;