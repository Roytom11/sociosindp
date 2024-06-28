
import './App.css';
import Bonos from './componentes/Bonos';
import Navbar from './componentes/NavBar';
import Login from './componentes/Login';
import Reservas from './componentes/Reservas';
import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsAuthenticated(loggedIn);
  }, []);

  const handleLogin = (credentials) => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsAuthenticated(true);
  };

  return (

    
    <Router>
    <div className="App">
    {isAuthenticated  && <Navbar />}
    <Routes>
          <Route path="/" element={!isAuthenticated  ? <Login handleLogin={handleLogin} /> : <Navigate to="/bonos" />} />
          <Route path="/bonos" element={isAuthenticated ? <Bonos /> : <Navigate to="/" />} />
          <Route path="/bonos/reservas" element={isAuthenticated ? <Reservas /> : <Navigate to="/" />} />
        </Routes>
    </div>
  </Router>
  );
}

export default App;
