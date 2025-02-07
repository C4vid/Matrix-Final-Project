import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { CiHeart } from 'react-icons/ci';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from '../home/HomeNavbar';
// import './Filtr.scss'; // SCSS dosyasını ekleyin

const SUPABASE_URL = 'https://btsdjmkresicezlbutpm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c2RqbWtyZXNpY2V6bGJ1dHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODkzNTIsImV4cCI6MjAzODg2NTM1Mn0.EbVl62cSHhz3K0NFOW8LJMPrjjHJXPhVtAJMO_PmvlU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function Filtr() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      setLoading(true);
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, product_name, cost, discount_price, photo_url, photo_hover_url, product_popularity, product_category')
        .limit(10);

      if (productsError) {
        console.error('Error fetching products:', productsError);
      } else {
        setProducts(productsData);
      }

      // Benzersiz kategorileri almak için sorgu
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('products')
        .select('product_category');

      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError);
      } else {
        // Benzersiz kategorileri elde et
        const uniqueCategories = [...new Set(categoriesData.map(item => item.product_category))];
        setCategories(uniqueCategories);
      }

      setLoading(false);
    };

    fetchProductsAndCategories();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
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
      alert(`${product.product_name} wishlist-a əlavə edildi!`);
    }
  };

  const handleAddToCart = async (product) => {
    const { error } = await supabase
      .from('products')
      .update({ checkout: 'incart' })
      .eq('id', product.id);

    if (error) {
      console.error('Error adding to cart:', error);
    } else {
      alert(`${product.product_name} cart-a əlavə edildi!`);
    }
  };

  const filteredProducts = products.filter(product => {
    const nameMatch = product.product_name.toLowerCase().includes(filterText.toLowerCase());
    let categoryMatch = true;

    if (categoryFilter) {
      categoryMatch = product.product_category.toLowerCase().trim() === categoryFilter.toLowerCase().trim();
    }
    return nameMatch && categoryMatch;
  });

  return (
    <>
    <HomeNavbar/>
    <div className='mainproducts'>
      <input
        type="text"
        placeholder="Məhsul axtarın..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="search-input"
      />
      <div className="category-buttons">
        {categories.map((category, index) => (
          <button key={index} onClick={() => setCategoryFilter(category)}>
            {category}
          </button>
        ))}
        {/* <button onClick={() => setCategoryFilter("")}>Hamısını göstər</button> */}
      </div>
      <ul className='mainproducts-products'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const discountPercentage = calculateDiscountPercentage(product.cost, product.discount_price);
            return (
              <li className="product-item" key={product.id}>
                <div className="mainproducts-products-price">
                  {product.discount_price !== 0.00 ? (
                    <div className="mainproducts-products-price-sale">
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
                    {discountPercentage}% Off
                  </p>
                )}
                <img
                  src={product.photo_hover_url && hoveredProduct === product.product_name ? product.photo_hover_url : product.photo_url}
                  alt={product.product_name}
                  onMouseEnter={() => product.photo_hover_url && setHoveredProduct(product.product_name)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  className="product-image"
                />
                <h2 onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>
                  {product.product_name}
                </h2>
                <div className="product-icons">
                  <CiHeart 
                    onClick={() => toggleWishlist(product)} 
                    style={{ cursor: 'pointer' }}/>
                </div>
                <button className="product-item-buy-btn" onClick={() => handleAddToCart(product)}>
                  <HiOutlineShoppingCart /> Add to Cart
                </button>
              </li>
            );
          })
        ) : (
          <p>Məhsul tapılmadı.</p>
        )}
      </ul>
    </div>
    </>
  );
}

export default Filtr;
