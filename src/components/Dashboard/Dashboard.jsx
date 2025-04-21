import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom'; // React Router'ı kullanarak yönlendirme
import Homenavbar from '../home/HomeNavbar'
const supabaseUrl = 'https://btsdjmkresicezlbutpm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c2RqbWtyZXNpY2V6bGJ1dHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODkzNTIsImV4cCI6MjAzODg2NTM1Mn0.EbVl62cSHhz3K0NFOW8LJMPrjjHJXPhVtAJMO_PmvlU'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Dashboard = () => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('accounts')
        .select('username, email, password')
        .eq('visited', 'active');

      if (error) {
        console.error('Error fetching data:', error);
      } else if (data.length > 0) {
        setUserData({
          username: data[0].username,
          email: data[0].email,
          password: data[0].password
        });
      }
    };

    fetchData();

    document.body.className = 'dashboard-active'; 

  }, []);

  const handleLogout = async () => {
    const { error } = await supabase
      .from('accounts')
      .update({ visited: 'not_active' })
      .eq('email', userData.email);

    if (error) {
      console.error('Error updating status:', error);
    } else {
      console.log('Logout successful');
      navigate('/'); 
    }
  };

  return (
    <>
      <Homenavbar/>
      <div className='dashboard-container'>
      <h1>Hoş Geldiniz, {userData.username}</h1>
      <p>Email: {userData.email}</p>
      <p>Şifre: {userData.password}</p>
      <button onClick={handleLogout}>Çıkış Yap</button>
    </div>
    </>
  );
};

export default Dashboard;
