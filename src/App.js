import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/home/Homepage.jsx"; 
import Register from "./components/LoginRegister/Register";
import './assets/css/style.css'
import Filtr from "./components/Products/Filtr";
import Login from "./components/LoginRegister/Loginacc.jsx";
import Wishlist from "./components/Wishlist/Wishlist.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Checkoutdetails from "./components/Cart/Checkoutdetails.jsx";
import AdminHomepage from "./components/Admin/AdminHomepage.jsx";
import AdminPanel from "./components/Admin/Adminpanel.jsx";
import FAQPage from "./components/FAQ page/FAQPage.jsx";

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/faq" element={<FAQPage />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/products" element={<Filtr />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/wishlist" element={<Wishlist />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkoutdetails" element={<Checkoutdetails />} />
          <Route exact path="/adminhomepage" element={<AdminHomepage />} />
          <Route exact path="/adminpanel" element={<AdminPanel />} />


        </Routes>
      </Router>
  );
}

export default App;
