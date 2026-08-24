import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../Auth/auth.css";
import React from "react";
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"", confirmPassword:"" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-brand"><span>₹</span> BudgetTracker</Link>
        <h1>Create your account</h1>
        <p className="auth-subtitle">Start understanding your spending.</p>

        <form onSubmit={submit}>
          <label>Name<input required value={form.name} onChange={e => setForm({...form,name:e.target.value})}/></label>
          <label>Email<input type="email" required value={form.email} onChange={e => setForm({...form,email:e.target.value})}/></label>
          <label>Password<input type="password" required value={form.password} onChange={e => setForm({...form,password:e.target.value})}/></label>
          <label>Confirm password<input type="password" required value={form.confirmPassword} onChange={e => setForm({...form,confirmPassword:e.target.value})}/></label>
          {error && <div className="form-error">{error}</div>}
          <button className="auth-submit" disabled={loading}>{loading ? "Creating account..." : "Create account"}</button>
        </form>

        <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </main>
  );
}
