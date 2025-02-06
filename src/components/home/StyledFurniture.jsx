import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { CiHeart } from 'react-icons/ci';
import { IoIosSearch, IoIosShuffle } from 'react-icons/io';
import { HiOutlineShoppingCart } from 'react-icons/hi';

// Supabase URL ve Anon Key'inizi buraya ekleyin
const SUPABASE_URL = 'https://btsdjmkresicezlbutpm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c2RqbWtyZXNpY2V6bGJ1dHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODkzNTIsImV4cCI6MjAzODg2NTM1Mn0.EbVl62cSHhz3K0NFOW8LJMPrjjHJXPhVtAJMO_PmvlU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const StyledFurniture = () => {
    const [products, setProducts] = useState([]);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const { data, error } = await supabase
              .from('products')
              .select('id, product_name, cost, discount_price, photo_url, photo_hover_url, product_popularity')
              .limit(4); // Maksimum 4 məhsul gətir

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
            return Math.floor(((cost - discountPrice) / cost) * 100); // Kəsr hissəsini atır
        }
        return 0;
    };

    return (
        <div className='styledfurniture'>
            <div className="styledfurniture-txt">
                <h2>Styled <span>Furniture</span> in Unique Style</h2>
                <p>Discover a world of comfort and style with our handcrafted furniture for every room.</p>
                <button className='styledfurniture-txt-btn'>Shop Now</button>
            </div>
            <ul className='styledfurniture-products'> 
                {products.map((product) => {
                    const discountPercentage = calculateDiscountPercentage(product.cost, product.discount_price);
                    return (
                        <li className="product-item" key={product.product_name}>
                            <div className="styledfurniture-products-price">
                                {product.discount_price !== 0.00 ? (
                                    <div className="styledfurniture-products-price-sale">
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
                            <img
                                src={product.photo_hover_url && hoveredProduct === product.product_name ? product.photo_hover_url : product.photo_url}
                                alt={product.product_name}
                                onMouseEnter={() => product.photo_hover_url && setHoveredProduct(product.product_name)}
                                onMouseLeave={() => setHoveredProduct(null)}
                                style={{
                                    transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
                                    opacity: hoveredProduct === product.product_name ? 0.8 : 1,
                                    transform: hoveredProduct === product.product_name ? 'scale(1.05)' : 'scale(1)',
                                }}
                            />
                            <h2>{product.product_name}</h2>
                            <div className="product-icons">
                                <CiHeart />
                                <IoIosShuffle />
                                <IoIosSearch />
                            </div>
                            <button className="product-item-buy-btn"><HiOutlineShoppingCart /> Add to Cart</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default StyledFurniture;
