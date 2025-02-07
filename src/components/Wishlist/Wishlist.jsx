import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { CiHeart } from "react-icons/ci";
import { HiOutlineShoppingCart } from "react-icons/hi";
import HomeNavbar from '../home/HomeNavbar';

const supabaseUrl = 'https://btsdjmkresicezlbutpm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c2RqbWtyZXNpY2V6bGJ1dHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODkzNTIsImV4cCI6MjAzODg2NTM1Mn0.EbVl62cSHhz3K0NFOW8LJMPrjjHJXPhVtAJMO_PmvlU';
const supabase = createClient(supabaseUrl, supabaseKey);

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('id, product_name, cost, discount_price, photo_url, product_wishlist')
        .eq('product_wishlist', 'liked');

      if (error) {
        console.error('Error fetching wishlist items:', error);
      } else {
        setWishlistItems(data);
      }
      setLoading(false);
    };

    fetchWishlistItems();
  }, []);

  const toggleWishlist = async (product) => {
    const newStatus = 'unliked';

    const { error } = await supabase
      .from('products')
      .update({ product_wishlist: newStatus })
      .eq('id', product.id);

    if (error) {
      console.error('Error updating wishlist status:', error);
    } else {
      setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== product.id));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <HomeNavbar/>
      <div className="popular-furniture">
      <h3>Your Wishlist <span>❤️</span></h3>
      <ul className="product-list">
        {wishlistItems.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          wishlistItems.map((product) => (
            <li key={product.id} className="product-item">
              <div className="product-image">
                <img src={product.photo_url} alt={product.product_name} />
                {product.discount_price !== 0.00 && (
                  <div className="product-item-discountpercentage">
                    -{((product.cost - product.discount_price) / product.cost * 100).toFixed(0)}%
                  </div>
                )}
              </div>
              <h2>{product.product_name}</h2>
              <div className="product-item-cost">
                {product.discount_price !== 0.00 ? (
                  <div className="product-item-discount-cost">
                    <p style={{ textDecorationLine: 'line-through', display: 'inline' }}>
                      ${product.cost}
                    </p>
                    <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                      ${product.discount_price}
                    </span>
                  </div>
                ) : (
                  <p>${product.cost}</p>
                )}
              </div>
              <CiHeart 
                onClick={() => toggleWishlist(product)} 
                className="product-heart-icon" 
                style={{ color: 'red', cursor: 'pointer' }} 
              />
              <button className="product-item-buy-btn">
                <HiOutlineShoppingCart /> Add to Cart
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
    </>
  );
};

export default Wishlist;
