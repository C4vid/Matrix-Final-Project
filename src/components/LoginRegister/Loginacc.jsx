import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useTranslation } from 'react-i18next'; // i18next'i import et

const supabaseUrl = "https://btsdjmkresicezlbutpm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c2RqbWtyZXNpY2V6bGJ1dHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODkzNTIsImV4cCI6MjAzODg2NTM1Mn0.EbVl62cSHhz3K0NFOW8LJMPrjjHJXPhVtAJMO_PmvlU";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Loginacc = () => {
    const navigate = useNavigate();
    const { t } = useTranslation(); // Çeviri fonksiyonunu al
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
            // E-poçt ilə istifadəçini yoxlayın
            const { data: user, error: fetchError } = await supabase
                .from('accounts')
                .select('*')
                .eq('email', formData.email)
                .single();

            if (fetchError) {
                console.error("E-poçt yoxlama hatası:", fetchError.message);
                setIsSubmitting(false);
                return setError(t("emailCheckError")); // Çeviriyi kullan
            }

            if (user) {
                // E-poçt tapıldı, şifrəni yoxlayın
                if (user.password === formData.password) {
                    // Şifrə düzgündür, `login` sütununu "true" olaraq güncəlləyin
                    const { error: updateError } = await supabase
                        .from('accounts')
                        .update({ visited: 'active' }) // `active` əvəzinə `login` istifadə edin
                        .eq('email', formData.email);

                    if (updateError) {
                        console.error("Login sütunu güncellenirken hata:", updateError.message);
                        setIsSubmitting(false);
                        return setError(t("loginUpdateError") + ": " + updateError.message); // Çeviriyi kullan
                    }

                    // Uğurlu girişdən sonra ana səhifəyə yönləndirin
                    navigate("/");
                } else {
                    // Şifrə yanlışdır
                    setError(t("incorrectPassword")); // Çeviriyi kullan
                }
            } else {
                // E-poçt tapılmadı
                setError(t("emailNotFound")); // Çeviriyi kullan
            }
        } catch (error) {
            console.error("Genel hata:", error);
            setIsSubmitting(false);
            setError(t("generalError")); // Çeviriyi kullan
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login">
            <div className="login-container">
                <h2>{t("loginTitle")}</h2> {/* Çeviriyi kullan */}
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>{t("emailLabel")}</label> {/* Çeviriyi kullan */}
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>{t("passwordLabel")}</label> {/* Çeviriyi kullan */}
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>  
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" disabled={isSubmitting} className="submit-button">
                        {isSubmitting ? t("loggingIn") : t("loginButton")} {/* Çeviriyi kullan */}
                    </button>
                </form>
                <p className="register-prompt">
                    {t("noAccountPrompt")}{" "}
                    <button onClick={() => navigate("/register")} className="register-button">{t("registerButton")}</button> {/* Çeviriyi kullan */}
                </p>
            </div>
        </div>
    );
};
export default Loginacc;

