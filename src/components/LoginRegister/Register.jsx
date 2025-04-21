import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useTranslation } from 'react-i18next'; // i18next'i import et

const supabaseUrl = "https://btsdjmkresicezlbutpm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c2RqbWtyZXNpY2V6bGJ1dHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODkzNTIsImV4cCI6MjAzODg2NTM1Mn0.EbVl62cSHhz3K0NFOW8LJMPrjjHJXPhVtAJMO_PmvlU";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Register = () => {
    const navigate = useNavigate();
    const { t } = useTranslation(); 
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
            const { data: existingUser } = await supabase
                .from("accounts")
                .select("*")
                .eq("email", formData.email)
                .single();

            if (existingUser) {
                setIsSubmitting(false);
                return setError(t("emailAlreadyRegistered")); 
            }

            const { data, error: signupError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (signupError) {
                console.error("Kayıt hatası:", signupError);
                setIsSubmitting(false);
                return setError(signupError.message);
            }

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

            navigate("/"); 
        } catch (error) {
            console.error("Genel hata:", error);
            setIsSubmitting(false);
            setError(t("generalError")); 
        }
    };

    return (
        <div className="register">
            <div className="register-container">
                <h2>{t("registerTitle")}</h2> 
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>{t("usernameLabel")}</label> 
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>{t("emailLabel")}</label> 
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>{t("passwordLabel")}</label> 
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="rememberme">
                        <label>{t("rememberMeLabel")}</label> 
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" disabled={isSubmitting}>{t("registerButton")}</button> 
                </form>
                <p>
                    {t("alreadyHaveAccountPrompt")}{" "}
                    <button onClick={() => navigate("/login")}>{t("loginButton")}</button> 
                </p>
            </div>
        </div>
    );
};

export default Register;
