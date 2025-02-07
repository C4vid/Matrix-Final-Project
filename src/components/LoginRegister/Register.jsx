import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
// import './Register.css'; // CSS faylını import edin

const supabaseUrl = "https://btsdjmkresicezlbutpm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c2RqbWtyZXNpY2V6bGJ1dHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODkzNTIsImV4cCI6MjAzODg2NTM1Mn0.EbVl62cSHhz3K0NFOW8LJMPrjjHJXPhVtAJMO_PmvlU";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        rememberMe: false,
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            // E-posta adresinin var olup olmadığını kontrol et
            const { data: existingUser } = await supabase
                .from("accounts")
                .select("*")
                .eq("email", formData.email)
                .single();

            if (existingUser) {
                setIsSubmitting(false);
                return setError("Bu e-posta adresi zaten kayıtlı.");
            }

            // Kullanıcı kaydı
            const { data, error: signupError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (signupError) {
                console.error("Kayıt hatası:", signupError);
                setIsSubmitting(false);
                return setError(signupError.message);
            }

            // Kullanıcı bilgilerini accounts tablosuna ekleme
            const { error: insertError } = await supabase.from("accounts").insert([
                {
                    created_at: new Date().toISOString(),
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                },
            ]);

            if (insertError) {
                console.error("Veritabanı hatası:", insertError.message);
                setIsSubmitting(false);
                return setError(insertError.message);
            }

            navigate("/"); // Başarılı kayıt sonrası yönlendirme
        } catch (error) {
            console.error("Genel hata:", error);
            setIsSubmitting(false);
            setError("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
        }
    };

    return (
        <div className="register-container">
            <h2>Kayıt Ol</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Kullanıcı Adı:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                        />
                        Beni Hatırla
                    </label>
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" disabled={isSubmitting}>Kaydol</button>
            </form>
            <p>
                Zaten hesabınız var mı?{" "}
                <button onClick={() => navigate("/login")}>Giriş Yap</button>
            </p>
        </div>
    );
};

export default Register;
