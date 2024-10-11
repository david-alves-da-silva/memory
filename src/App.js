import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import GameBoard from './pages/GameBoard';
import './assets/styles/style.css';
import RegisterPage from './pages/RegisterPage';
import Home from './components/Home';

const App = () => {
  const isAuthenticated = useSelector((state) => !!state.auth.token); // Verifica o token no estado Redux

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage />}
        />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/home" element={<Home />} />

        <Route path="/game" element={<GameBoard />} />

        <Route path="/memory" element={<Navigate to="/login" />} />

        <Route path="*" element={<Navigate to="/login" />} />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
