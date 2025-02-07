import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom'; // React Router'dan useNavigate'i içe aktar
import HomeNavbar from '../home/HomeNavbar';

const supabaseUrl = 'https://btsdjmkresicezlbutpm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c2RqbWtyZXNpY2V6bGJ1dHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODkzNTIsImV4cCI6MjAzODg2NTM1Mn0.EbVl62cSHhz3K0NFOW8LJMPrjjHJXPhVtAJMO_PmvlU'; 
const supabase = createClient(supabaseUrl, supabaseKey);

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('id, product_name, cost, discount_price, photo_url, checkout')
        .eq('checkout', 'incart'); 

      if (error) {
        console.error('Error fetching cart items:', error);
        setError(error.message);
      } else {
        setCartItems(data);
      }
      setLoading(false);
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (id) => {
    const { error } = await supabase
      .from('products')
      .update({ checkout: null }) 
      .eq('id', id);

    if (error) {
      console.error('Error removing item:', error);
    } else {
      setCartItems(cartItems.filter(item => item.id !== id));
    }
  };

  const handleCheckout = async () => {
    const { error } = await supabase
      .from('products')
      .update({ checkout: 'checked_out' }) 

    if (error) {
      console.error('Error during checkout:', error);
    } else {
      navigate('/checkoutdetails');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <HomeNavbar />
      <div className="cart-container">
        <h3>Your Cart</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Discounted Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="cart-item">
                    <td className="cart-item-image">
                      <img src={item.photo_url} alt={item.product_name} style={{ width: '50px' }} />
                    </td>
                    <td>{item.product_name}</td>
                    <td>
                      {item.discount_price !== 0.00 ? (
                        <div className="cart-item-cost">
                          <span style={{ textDecorationLine: 'line-through' }}>${item.cost}</span>
                        </div>
                      ) : (
                        <span>${item.cost}</span>
                      )}
                    </td>
                    <td>
                      {item.discount_price !== 0.00 ? (
                        <span style={{ fontWeight: 'bold' }}>${item.discount_price}</span>
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleCheckout} style={{ marginTop: '20px', backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Confirm Checkout
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
