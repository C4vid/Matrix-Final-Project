import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/css/style.css';
import Homepage from './components/Homepage.jsx';
// import About from './components/About.jsx'; // Məsələn, başqa bir komponent
// import NotFound from './components/NotFound.jsx'; // 404 səhifəsi üçün

function App() {
  return (
    <Router>
      <div className="App">
        {/* <HomeNavbar/> */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="*" element={<NotFound />} /> 404 səhifəsi */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
