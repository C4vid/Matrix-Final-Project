import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://btsdjmkresicezlbutpm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c2RqbWtyZXNpY2V6bGJ1dHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODkzNTIsImV4cCI6MjAzODg2NTM1Mn0.EbVl62cSHhz3K0NFOW8LJMPrjjHJXPhVtAJMO_PmvlU";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Loginacc = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            // Admin e-posta və şifrəni yoxla
            if (formData.email === "admin@example.com" && formData.password === "adminPassword") {
                navigate("/adminhomepage"); // Admin ana səhifəsinə yönləndir
                return;
            }

            // accounts tablosundan e-posta ve şifre ile kullanıcıyı kontrol et
            const { data, error: fetchError } = await supabase
                .from('accounts')
                .select('*')
                .eq('email', formData.email)
                .eq('password', formData.password)
                .single();

            if (fetchError || !data) {
                console.error("Giriş hatası:", fetchError);
                setIsSubmitting(false);
                return setError("E-posta veya şifre hatalı.");
            }

            // Uğurlu girişdən sonra ana səhifəyə yönləndir
            navigate("/"); 
        } catch (error) {
            console.error("Genel hata:", error);
            setIsSubmitting(false);
            setError("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2>Giriş Yap</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>E-posta:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Şifre:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Giriş Yapılıyor..." : "Giriş Yap"}
                </button>
            </form>
            <p>
                Hesabınız yok mu?{" "}
                <button onClick={() => navigate("/register")}>Kayıt Ol</button>
            </p>
        </div>
    );
};

export default Loginacc;
