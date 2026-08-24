import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";
const links = [
  ["Dashboard", "/dashboard"],
  ["Transactions", "/transactions"],
  ["Analytics", "/analytics"],
  ["Monthly", "/monthly"],
  ["Import", "/import"],
  ["Settings", "/settings"]
];

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/dashboard" className="brand">
          <span className="brand-mark">₹</span>
          <span>Budget<span className="muted">Tracker</span></span>
        </NavLink>

        <nav className="nav">
          {links.map(([label, path]) => (
            <NavLink key={path} to={path} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="user-area">
          <span>{user?.name}</span>
          <button className="text-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="page">
        <Outlet />
      </main>
    </div>
  );
}
