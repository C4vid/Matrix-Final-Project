import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://btsdjmkresicezlbutpm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c2RqbWtyZXNpY2V6bGJ1dHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODkzNTIsImV4cCI6MjAzODg2NTM1Mn0.EbVl62cSHhz3K0NFOW8LJMPrjjHJXPhVtAJMO_PmvlU';
const supabase = createClient(supabaseUrl, supabaseKey);

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('id, product_name, cost, discount_price, photo_url, checkout')
        .eq('checkout', 'inCart');

      if (error) {
        console.error('Error fetching cart items:', error);
      } else {
        setCartItems(data);
      }
      setLoading(false);
    };

    fetchCartItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cart-container">
      <h3>Your Cart</h3>
      <ul className="cart-list">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.photo_url} alt={item.product_name} />
              </div>
              <h2>{item.product_name}</h2>
              <div className="cart-item-cost">
                {item.discount_price !== 0.00 ? (
                  <div className="cart-item-discount-cost">
                    <p style={{ textDecorationLine: 'line-through', display: 'inline' }}>
                      ${item.cost}
                    </p>
                    <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                      ${item.discount_price}
                    </span>
                  </div>
                ) : (
                  <p>${item.cost}</p>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Cart;
