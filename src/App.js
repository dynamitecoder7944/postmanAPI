import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import DrugSearch from './DrugSearch';
import HealthInsights from './HealthInsights';
import SymptomChecker from './SymptomChecker';
import FitnessWellnessPlans from './FitnessWellnessPlans';
import Login from './Login';

import logo from './image/HH.png'; // Correct import for the logo

import './App.css';

function App() {
  useEffect(() => {
    const links = document.querySelectorAll('nav a');

    links.forEach(link => {
      link.addEventListener('mouseover', (e) => {
        const starsCount = 5; // Number of stars
        const linkRect = link.getBoundingClientRect();

        for (let i = 0; i < starsCount; i++) {
          const star = document.createElement('div');
          star.className = 'star';
          // Random position within the link
          const x = Math.random() * linkRect.width;
          const y = Math.random() * linkRect.height;

          star.style.left = `${x + linkRect.left}px`; // Position relative to the link
          star.style.top = `${y + linkRect.top}px`; // Position relative to the link

          document.body.appendChild(star);

          // Remove the star after animation
          star.addEventListener('animationend', () => {
            star.remove();
          });
        }
      });
    });

    // Cleanup event listeners on component unmount
    return () => {
      links.forEach(link => {
        link.removeEventListener('mouseover', () => {});
      });
    };
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar">
          <Link to="/Home">
            <img src={logo} alt="Logo" className="logo" /> {/* Use the imported logo here */}
          </Link>
          <Link to="/Home">Home</Link>
          <Link to="/DrugSearch">Drug Search</Link>
          <Link to="/SymptomChecker">Symptom Checker</Link>
          <Link to="/FitnessWellnessPlans">Fitness & Wellness Plans</Link>
          <Link to="/HealthInsights">Health Insights</Link>
          <Link to="/Login">Login</Link>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Default route */}
          <Route path="/Home" element={<Home />} />
          <Route path="/DrugSearch" element={<DrugSearch />} />
          <Route path="/SymptomChecker" element={<SymptomChecker />} />
          <Route path="/FitnessWellnessPlans" element={<FitnessWellnessPlans />} />
          <Route path="/HealthInsights" element={<HealthInsights />} />
          <Route path="/Login" element={<Login />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
