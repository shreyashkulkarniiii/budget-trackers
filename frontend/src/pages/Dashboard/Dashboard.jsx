import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getTransactions } from "../../services/transactionService";
import React from "react";
export default function Dashboard() {
  const { user, token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTransactions(token, user.id).then(setTransactions).catch(console.error).finally(() => setLoading(false));
  }, [token, user.id]);

  const total = useMemo(() => transactions.reduce((sum, t) => sum + Number(t.amount || 0), 0), [transactions]);
  const today = new Date().toISOString().slice(0,10);
  const todayTotal = transactions.filter(t => t.date === today).reduce((s,t) => s + Number(t.amount || 0), 0);

  return (
    <div>
      <div className="page-heading"><div><p className="eyebrow">YOUR FINANCES</p><h1>Good to see you, {user?.name}.</h1><p className="muted-text">Here's what happened with your money.</p></div><Link className="primary-link" to="/transactions">+ Add expense</Link></div>
      <div className="stat-grid">
        <div className="stat-card"><span>This month</span><strong>₹{total.toLocaleString("en-IN")}</strong></div>
        <div className="stat-card"><span>Today</span><strong>₹{todayTotal.toLocaleString("en-IN")}</strong></div>
        <div className="stat-card"><span>Transactions</span><strong>{transactions.length}</strong></div>
      </div>
      <div className="content-card">
        <div className="card-heading"><h2>Recent transactions</h2><Link to="/transactions">View all</Link></div>
        {loading ? <p className="muted-text">Loading your data...</p> : transactions.length === 0 ? <div className="empty-state"><h3>No expenses yet</h3><p>Add your first expense or import transactions from Gmail.</p><Link className="primary-link" to="/transactions">Add your first expense</Link></div> :
          <div className="transaction-list">{transactions.slice(0,8).map(t => <div className="transaction-row" key={t.id}><div><strong>{t.merchant || t.description || "Expense"}</strong><span>{t.category || "Other"} · {t.date}</span></div><strong>₹{Number(t.amount).toLocaleString("en-IN")}</strong></div>)}</div>}
      </div>
    </div>
  );
}
