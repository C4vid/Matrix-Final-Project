import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './SupabasesupabaseClient'; // Supabase client'ınızı ayarlayın

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signUp({ email, password });

    if (user) {
      // Kullanıcı bilgilerini veritabanına kaydedin
      const { error: insertError } = await supabase
        .from('users') // Kullanıcılar tablosu
        .insert([{ username, email }]);

      if (!insertError) {
        navigate('/'); // Anasayfaya yönlendirin
      } else {
        alert(insertError.message);
      }
    } else {
      alert(error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
