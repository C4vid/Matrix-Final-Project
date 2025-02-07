import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase konfiqurasiyası
const supabaseUrl = "https://btsdjmkresicezlbutpm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c2RqbWtyZXNpY2V6bGJ1dHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODkzNTIsImV4cCI6MjAzODg2NTM1Mn0.EbVl62cSHhz3K0NFOW8LJMPrjjHJXPhVtAJMO_PmvlU";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        product_name: "",
        product_category: "",
        product_popularity: 0,
        cost: 0,
        discount_price: 0,
        photo_url: "",
        photo_hover_url: ""
    });
    const [editProduct, setEditProduct] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase.from("products").select("*");
        setLoading(false);
        if (error) {
            setError("Məlumatları yükləyə bilmirik: " + error.message);
        } else {
            setProducts(data);
        }
    };

    const handleAddProduct = async () => {
        const { product_name, product_category, cost, discount_price, photo_url, photo_hover_url } = newProduct;
        if (!product_name || !product_category || cost <= 0 || discount_price < 0) {
            setError("Bütün sahələri düzgün doldurun.");
            return;
        }

        setLoading(true);
        const { data, error } = await supabase.from("products").insert([newProduct]);
        setLoading(false);
        if (error) {
            setError("Məhsul əlavə edilərkən xəta baş verdi: " + error.message);
        } else {
            if (Array.isArray(data) && data.length > 0) {
                setProducts([...products, ...data]);
                setNewProduct({
                    product_name: "",
                    product_category: "",
                    product_popularity: 0,
                    cost: 0,
                    discount_price: 0,
                    photo_url: "",
                    photo_hover_url: ""
                });
                setMessage("Məhsul uğurla əlavə edildi.");
            } else {
                setError("Gözlənilməz cavab alındı: data iterable deyil.");
            }
        }
    };

    const handleEditProduct = async () => {
        if (!editProduct || !editProduct.product_name || !editProduct.product_category || editProduct.cost <= 0 || editProduct.discount_price < 0) {
            setError("Bütün sahələri düzgün doldurun.");
            return;
        }

        setLoading(true);
        const { id, ...productData } = editProduct; // id-ni çıxarırıq
        const { data, error } = await supabase.from("products").update(productData).eq("id", id); // yalnız productData göndəririk
        setLoading(false);
        if (error) {
            setError("Məhsul redaktə edilərkən xəta baş verdi: " + error.message);
        } else {
            if (data && data.length > 0) { // data-nın null olmadığını və uzunluğunun 0-dan böyük olduğunu yoxlayırıq
                setProducts(products.map(product => (product.id === id ? data[0] : product)));
                setEditProduct(null);
                setMessage("Məhsul uğurla redaktə edildi.");
            } else {
                setError("Gözlənilməz cavab alındı: data null və ya boşdur.");
            }
        }
    };

    const handleDeleteProduct = async (id) => {
        setLoading(true);
        const { error } = await supabase.from("products").delete().eq("id", id);
        setLoading(false);
        if (error) {
            setError("Məhsul silinərkən xəta baş verdi: " + error.message);
        } else {
            setProducts(products.filter(product => product.id !== id));
            setMessage("Məhsul uğurla silindi.");
        }
    };

    return (
        <div className="admin-panel">
            <h2>Admin Paneli</h2>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
            <h3>Yeni Məhsul Əlavə Et</h3>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Məhsul Adı"
                    value={newProduct.product_name}
                    onChange={(e) => setNewProduct({ ...newProduct, product_name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Məhsul Kateqoriyası"
                    value={newProduct.product_category}
                    onChange={(e) => setNewProduct({ ...newProduct, product_category: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Qiymət"
                    value={newProduct.cost}
                    onChange={(e) => setNewProduct({ ...newProduct, cost: parseFloat(e.target.value) })}
                />
                <input
                    type="number"
                    placeholder="Endirimli Qiymət"
                    value={newProduct.discount_price}
                    onChange={(e) => setNewProduct({ ...newProduct, discount_price: parseFloat(e.target.value) })}
                />
                <input
                    type="text"
                    placeholder="Şəkil URL"
                    value={newProduct.photo_url}
                    onChange={(e) => setNewProduct({ ...newProduct, photo_url: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Hover Şəkil URL"
                    value={newProduct.photo_hover_url}
                    onChange={(e) => setNewProduct({ ...newProduct, photo_hover_url: e.target.value })}
                />
                <button onClick={handleAddProduct} disabled={loading}>
                    {loading ? "Yüklənir..." : "Əlavə Et"}
                </button>
            </div>

            <h3>Məhsullar</h3>
            {loading ? (
                <p>Yüklənir...</p>
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Məhsul Adı</th>
                            <th>Kateqoriya</th>
                            <th>Populyarlıq</th>
                            <th>Qiymət</th>
                            <th>Endirimli Qiymət</th>
                            <th>Şəkil</th>
                            <th>Hover Şəkil</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.product_name}</td>
                                <td>{product.product_category}</td>
                                <td>{product.product_popularity}</td>
                                <td>{product.cost} AZN</td>
                                <td>{product.discount_price} AZN</td>
                                <td><img src={product.photo_url} alt={product.product_name} width="50" /></td>
                                <td><img src={product.photo_hover_url} alt={`${product.product_name} Hover`} width="50" /></td>
                                <td>
                                    <button onClick={() => setEditProduct(product)}>Redaktə Et</button>
                                    <button onClick={() => handleDeleteProduct(product.id)}>Sil</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {editProduct && (
                <div>
                    <h3>Məhsulu Redaktə Et</h3>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Məhsul Adı"
                            value={editProduct.product_name}
                            onChange={(e) => setEditProduct({ ...editProduct, product_name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Məhsul Kateqoriyası"
                            value={editProduct.product_category}
                            onChange={(e) => setEditProduct({ ...editProduct, product_category: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Qiymət"
                            value={editProduct.cost}
                            onChange={(e) => setEditProduct({ ...editProduct, cost: parseFloat(e.target.value) })}
                        />
                        <input
                            type="number"
                            placeholder="Endirimli Qiymət"
                            value={editProduct.discount_price}
                            onChange={(e) => setEditProduct({ ...editProduct, discount_price: parseFloat(e.target.value) })}
                        />
                        <input
                            type="text"
                            placeholder="Şəkil URL"
                            value={editProduct.photo_url}
                            onChange={(e) => setEditProduct({ ...editProduct, photo_url: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Hover Şəkil URL"
                            value={editProduct.photo_hover_url}
                            onChange={(e) => setEditProduct({ ...editProduct, photo_hover_url: e.target.value })}
                        />
                        <button onClick={handleEditProduct} disabled={loading}>
                            {loading ? "Yüklənir..." : "Yenilə"}
                        </button>
                        <button onClick={() => setEditProduct(null)}>İptal Et</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
