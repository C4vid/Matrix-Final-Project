import React, { useState } from 'react';

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
  const [items, setItems] = useState([
    { name: 'Product 1', price: 50 },
    { name: 'Product 2', price: 30 },
    { name: 'Product 3', price: 20 },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateTotal = () => {
    const total = items.reduce((acc, item) => acc + item.price, 0);
    setTotalAmount(total);
  };

  React.useEffect(() => {
    calculateTotal();
  }, [items]);

  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <h3>ÖDƏNIŞ MƏLUMATLARI</h3>
        <form>
          <input
            type="text"
            name="firstName"
            placeholder="Ad"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Soyad"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Ölkə"
            value={formData.country}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Ünvan"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="zipCode"
            placeholder="ZIP kodu"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="Şəhər"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email ünvanı"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="notes"
            placeholder="Qeyd bölməsi"
            value={formData.notes}
            onChange={handleChange}
          />
          
          {/* Kart Bilgileri */}
          <h4>Kart Məlumatları</h4>
          <input
            type="text"
            name="cardNumber"
            placeholder="Kart Nömrəsi"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cardExpiry"
            placeholder="Son İstifadə Tarixi (MM/YY)"
            value={formData.cardExpiry}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cardCVC"
            placeholder="CVC"
            value={formData.cardCVC}
            onChange={handleChange}
            required
          />
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
  );
};

export default Checkout;
