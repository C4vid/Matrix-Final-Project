import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'react-router-dom';
import HomeNavbar from '../home/HomeNavbar';
import { useTranslation } from 'react-i18next';

const SUPABASE_URL = 'https://btsdjmkresicezlbutpm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c2RqbWtyZXNpY2V6bGJ1dHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODkzNTIsImV4cCI6MjAzODg2NTM1Mn0.EbVl62cSHhz3K0NFOW8LJMPrjjHJXPhVtAJMO_PmvlU';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const ProductDetail = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                setError(t('fetchError')); 
            } else {
                setProduct(data);
            }
            setLoading(false);
        };

        fetchProduct();
    }, [id, t]);

    const handleAddToCart = async () => {
        const { error } = await supabase
            .from('products')
            .update({ checkout: 'incart' })
            .eq('id', id);

        if (error) {
            console.error('Error adding to cart:', error);
        } else {
            alert(`${product.product_name} ${t('addedToCart')}`); 
        }
    };

    const toggleWishlist = async () => {
        const newStatus = product.product_wishlist === 'liked' ? 'unliked' : 'liked';

        const { error } = await supabase
            .from('products')
            .update({ product_wishlist: newStatus })
            .eq('id', id);

        if (error) {
            console.error('Error updating wishlist status:', error);
        } else {
            setProduct((prevProduct) => ({
                ...prevProduct,
                product_wishlist: newStatus
            }));
            alert(newStatus === 'liked' ? t('addedToWishlist') : t('removedFromWishlist')); 
        }
    };

    if (loading) {
        return <div className="loading-spinner">{t('loading')}</div>; 
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!product?.product_name) {
        return <div>{t('productNotFound')}</div>; 
    }

    return (
        <>
            <HomeNavbar />
            <div className="product-detail">
                <h2>{product.product_name}</h2>
                <img src={product.photo_url} alt={product.product_name} className="product-image" />
                <p>{t('price')}: ${product.cost}</p>
                {product.discount_price > 0 && (
                    <>
                        <p className="discount-price">
                            {t('discountedPrice')}: ${product.discount_price}
                        </p>
                        <p className="discount-percentage">
                            {Math.floor(((product.cost - product.discount_price) / product.cost) * 100)}% {t('discount')}!
                        </p>
                    </>
                )}
                <p>{t('description')}: {product.description || t('noDescription')}</p>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    {t('addToCart')}
                </button>
                <button
                    className="wishlist-btn"
                    onClick={toggleWishlist}
                    style={{ backgroundColor: product.product_wishlist === 'liked' ? 'red' : 'gray' }}
                >
                    {product.product_wishlist === 'liked' ? t('removeFromWishlist') : t('addToWishlist')}
                </button>
            </div>
        </>
    );
};

export default ProductDetail;
