import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/home/Homepage.jsx"; 
import Register from "./components/LoginRegister/Register";
import './assets/css/style.css';
import Filtr from "./components/Products/Filtr";
import Login from "./components/LoginRegister/Loginacc.jsx";
import Wishlist from "./components/Wishlist/Wishlist.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Checkoutdetails from "./components/Cart/Checkoutdetails.jsx";
import AdminHomepage from "./components/Admin/AdminHomepage.jsx";
import AdminPanel from "./components/Admin/Adminpanel.jsx";
import FAQPage from "./components/FAQ page/FAQPage.jsx";
import ProductDetail from "./components/Products/Productpage.jsx";
import About from "./components/About/About.jsx";
import Blog from "./components/Blog/Blog.jsx";

import { I18nProvider } from './I18nContext';

function App() {
  return (
    <I18nProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Filtr />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkoutdetails" element={<Checkoutdetails />} />
          <Route path="/adminhomepage" element={<AdminHomepage />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </Router>
    </I18nProvider>
  );
}

export default App;
