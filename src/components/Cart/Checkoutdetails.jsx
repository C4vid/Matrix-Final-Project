import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import HomeNavbar from '../home/HomeNavbar';


const supabaseUrl = 'https://btsdjmkresicezlbutpm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c2RqbWtyZXNpY2V6bGJ1dHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODkzNTIsImV4cCI6MjAzODg2NTM1Mn0.EbVl62cSHhz3K0NFOW8LJMPrjjHJXPhVtAJMO_PmvlU';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    address: '',
    zipCode: '',
    city: '',
    email: '',
    notes: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateTotal = () => {
    const total = items.reduce((acc, item) => acc + item.price, 0);
    setTotalAmount(total);
  };

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('products') 
      .select('name, price');

    if (error) {
      console.error('Error fetching items:', error);
    } else {
      setItems(data);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [items]);

  return (
    <>
    <HomeNavbar/>
    <div className="checkout-container">
      <div className="checkout-form">
        <h3>ÖDƏNIŞ MƏLUMATLARI</h3>
        <form>
          <input type="text" name="firstName" placeholder="Ad" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Soyad" value={formData.lastName} onChange={handleChange} required />
          <input type="text" name="country" placeholder="Ölkə" value={formData.country} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Ünvan" value={formData.address} onChange={handleChange} required />
          <input type="text" name="zipCode" placeholder="ZIP kodu" value={formData.zipCode} onChange={handleChange} required />
          <input type="text" name="city" placeholder="Şəhər" value={formData.city} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email ünvanı" value={formData.email} onChange={handleChange} required />
          <textarea name="notes" placeholder="Qeyd bölməsi" value={formData.notes} onChange={handleChange} />

          <h4>Kart Məlumatları</h4>
          <input type="text" name="cardNumber" placeholder="Kart Nömrəsi" value={formData.cardNumber} onChange={handleChange} required />
          <input type="text" name="cardExpiry" placeholder="Son İstifadə Tarixi (MM/YY)" value={formData.cardExpiry} onChange={handleChange} required />
          <input type="text" name="cardCVC" placeholder="CVC" value={formData.cardCVC} onChange={handleChange} required />
        </form>
      </div>
      <div className="checkout-summary">
        <h3>Ödəmə Metodları</h3>
        <p><strong>Cəmi Məbləğ:</strong> ${totalAmount}</p>
        <h4>Nə almışam:</h4>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item.name} - ${item.price}</li>
          ))}
        </ul>
        <button className="checkout-button">Ödənişi Tamamla</button>
      </div>
    </div>
    </>
  );
};

export default Checkout;
