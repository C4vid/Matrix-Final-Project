import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from '../home/HomeNavbar';
import { useTranslation } from 'react-i18next'; 

const supabaseUrl = 'https://btsdjmkresicezlbutpm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c2RqbWtyZXNpY2V6bGJ1dHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODkzNTIsImV4cCI6MjAzODg2NTM1Mn0.EbVl62cSHhz3K0NFOW8LJMPrjjHJXPhVtAJMO_PmvlU'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Checkout = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); 
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
  const [isActive, setIsActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'firstName' || name === 'lastName') {
      const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      setFormData({ ...formData, [name]: formattedValue });
    } else if (name === 'email') {
      setFormData({ ...formData, [name]: value.toLowerCase() });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCardNumberChange = (e) => {
    const { value } = e.target;
    const formattedValue = value.replace(/[^0-9]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    setFormData({ ...formData, cardNumber: formattedValue.slice(0, 19) }); 
  };

  const handleCardExpiryChange = (e) => {
    const { value } = e.target;
    const formattedValue = value.replace(/[^0-9]/g, '').slice(0, 4).replace(/(\d{2})(\d)/, '$1/$2');
    setFormData({ ...formData, cardExpiry: formattedValue });
  };

  const handleCVCChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, cardCVC: value.replace(/[^0-9]/g, '').slice(0, 3) });
  };

  const calculateTotal = () => {
    const total = items.reduce((acc, item) => {
      const price = item.discount_price > 0 ? item.discount_price : item.cost;
      return acc + price;
    }, 0);
    setTotalAmount(total);
  };

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('id, product_name, cost, discount_price, photo_url')
      .eq('checkout', 'incart'); 
    if (error) {
      console.error('Error fetching items:', error.message);
    } else {
      setItems(data);
    }
  };

  const fetchAccounts = async () => {
    const { data, error } = await supabase
      .from('accounts')
      .select('visited'); 

    if (error) {
      console.error('Error fetching accounts:', error.message); 
    } else {
      const isAnyActive = data.some(account => account.visited === 'active');
      setIsActive(isAnyActive);
    }
  };

  const updateCheckoutStatus = async () => {
    const { error } = await supabase
      .from('products')
      .update({ checkout: 'checket_out' }) 
      .eq('checkout', 'incart'); 

    if (error) {
      console.error('Error updating checkout status:', error.message);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchAccounts(); 
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [items]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, country, address, zipCode, city, email, cardNumber, cardExpiry, cardCVC } = formData;
    if (!firstName || !lastName || !country || !address || !zipCode || !city || !email || !cardNumber || !cardExpiry || !cardCVC) {
      alert(t('fillAllFields')); 
      return;
    }

    if (isActive) {
      await updateCheckoutStatus(); 
      navigate('/successpage');
    } else {
      alert(t('noActiveAccount')); 
      navigate('/login'); 
    }

  };

  return (
    <>
      <HomeNavbar />
      <div className="checkout-container">
        <div className="checkout-form">
          <h3>{t('paymentInfo')}</h3> 
          <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" placeholder={t('firstName')} value={formData.firstName} onChange={handleChange} required />
            <input type="text" name="lastName" placeholder={t('lastName')} value={formData.lastName} onChange={handleChange} required />
            <input type="text" name="country" placeholder={t('country')} value={formData.country} onChange={handleChange} required />
            <input type="text" name="address" placeholder={t('address')} value={formData.address} onChange={handleChange} required />
            <input type="text" name="zipCode" placeholder={t('zipCode')} value={formData.zipCode} onChange={handleChange} required />
            <input type="text" name="city" placeholder={t('city')} value={formData.city} onChange={handleChange} required />
            <input type="email" name="email" placeholder={t('email')} value={formData.email} onChange={handleChange} required />
            <textarea name="notes" placeholder={t('notes')} value={formData.notes} onChange={handleChange} />

            <h4>{t('cardInfo')}</h4> 
            <input type="text" name="cardNumber" placeholder={t('cardNumber')} value={formData.cardNumber} onChange={handleCardNumberChange} required />
            <input
              type="text"
              name="cardExpiry"
              placeholder={t('expiryDate')}
              value={formData.cardExpiry}
              onChange={handleCardExpiryChange}
              required
            />
            <input type="text" name="cardCVC" placeholder={t('cvc')} value={formData.cardCVC} onChange={handleCVCChange} required />
            <button type="submit" className="checkout-button">{t('completePayment')}</button> 
          </form>
        </div>
        <div className="checkout-summary">
          <h3>{t('paymentMethods')}</h3> 
          <p><strong>{t('totalAmount')}:</strong> ${totalAmount.toFixed(2)}</p>
          <h4>{t('itemsPurchased')}:</h4> 
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.product_name} - ${item.discount_price > 0 ? item.discount_price : item.cost}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Checkout;
