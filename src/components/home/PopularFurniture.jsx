import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { CiHeart } from "react-icons/ci";
import { IoIosShuffle } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineShoppingCart } from "react-icons/hi";

const supabaseUrl = 'https://btsdjmkresicezlbutpm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c2RqbWtyZXNpY2V6bGJ1dHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODkzNTIsImV4cCI6MjAzODg2NTM1Mn0.EbVl62cSHhz3K0NFOW8LJMPrjjHJXPhVtAJMO_PmvlU';
const supabase = createClient(supabaseUrl, supabaseKey);

const PopularFurniture = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('id, product_name, cost, discount_price, photo_url, photo_hover_url, product_popularity, product_wishlist')
        .gt('product_popularity', 3)
        .limit(6);

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const calculateDiscountPercentage = (cost, discountPrice) => {
    if (cost && discountPrice) {
      return Math.floor(((cost - discountPrice) / cost) * 100);
    }
    return 0;
  };

  const toggleWishlist = async (product) => {
    const newStatus = product.product_wishlist === 'liked' ? 'unliked' : 'liked';

    const { error } = await supabase
      .from('products')
      .update({ product_wishlist: newStatus })
      .eq('id', product.id);

    if (error) {
      console.error('Error updating wishlist status:', error);
    } else {
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === product.id ? { ...p, product_wishlist: newStatus } : p))
      );
    }
  };

  const handleAddToCart = async (product) => {
    const { error } = await supabase
      .from('products')
      .update({ checkout: 'incart' }) // checkout sütununa 'incart' yazılır
      .eq('id', product.id);

    if (error) {
      console.error('Error adding to cart:', error);
    } else {
      alert(`${product.product_name} cart-a əlavə edildi!`); // Prompt mesajı
      console.log('Product added to cart:', product);
    }
  };

  return (
    <div className="popular-furniture">
      <p>New Arrival</p>
      <h3 className='popular-furniture-header'>Popular <span>Furniture</span></h3>
      <ul className="product-list">
        {products.map((product) => {
          const discountPercentage = calculateDiscountPercentage(product.cost, product.discount_price);
          return (
            <li key={product.id} className="product-item">
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
              {discountPercentage > 0 && (
                <p className='product-item-discountpercentage'>
                  {discountPercentage}%
                </p>
              )}
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={index < product.product_popularity ? 'star filled' : 'star'}>★</span>
                ))}
              </div>
              <div className="product-image">
                <img src={product.photo_url} alt={product.product_name} />
                <img className="hover-image" src={product.photo_hover_url} alt={product.product_name} />
              </div>
              <h2>{product.product_name}</h2>

              <div className="product-icons">
                <CiHeart 
                  onClick={() => toggleWishlist(product)} 
                  style={{ color: product.product_wishlist === 'liked' ? 'red' : 'black', cursor: 'pointer' }} 
                />
              </div>
              <button className="product-item-buy-btn" onClick={() => handleAddToCart(product)}
                style={{ cursor: 'pointer' }} >
                <HiOutlineShoppingCart /> Add to Cart
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PopularFurniture;
