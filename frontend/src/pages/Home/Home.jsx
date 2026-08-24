import { useNavigate } from "react-router-dom";
import "./Home.css";
import React from "react";
export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="home">
      <div className="home-glow" />
      <div className="home-container">
        <div className="logo">
          <div className="logo-icon">₹</div>
          <div className="logo-name">Budget<span>Tracker</span></div>
        </div>

        <section className="hero">
          <p className="eyebrow">PERSONAL FINANCE, SIMPLIFIED</p>
          <h1>Know where your <span>money goes.</span></h1>
          <p className="subtitle">
            Track your spending, understand your habits, and take control
            of your money — all in one place.
          </p>
        </section>

        <div className="actions">
          <button className="btn btn-primary" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/register")}>
            Create an account
          </button>
        </div>

        <p className="footer-text">Simple. Private. Built for everyday spending.</p>
      </div>
    </main>
  );
}
