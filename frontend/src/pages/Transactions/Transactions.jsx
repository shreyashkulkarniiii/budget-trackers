import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { addTransaction, deleteTransaction, getTransactions } from "../../services/transactionService";
import React from "react";
export default function Transactions() {
  const { user, token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ amount:"", merchant:"", category:"Food", date:new Date().toISOString().slice(0,10) });
  const [loading, setLoading] = useState(false);

  useEffect(() => { getTransactions(token,user.id).then(setTransactions).catch(console.error); }, [token,user.id]);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Submitting transaction:", form);
      console.log(token);
      const item = await addTransaction(token, {...form, amount:Number(form.amount), userId:user.id, source:"manual"});
      setTransactions(prev => [item,...prev]);
      setForm({amount:"",merchant:"",category:"Food",date:new Date().toISOString().slice(0,10)});
    } finally { setLoading(false); }
  }

  async function remove(id) {
    await deleteTransaction(token,id);
    setTransactions(prev => prev.filter(t => t.id !== id));
  }

  return <div>
    <div className="page-heading"><div><p className="eyebrow">TRACKING</p><h1>Transactions</h1><p className="muted-text">Keep every expense in one place.</p></div></div>
    <div className="two-column">
      <div className="content-card">
        <h2>Add expense</h2>
        <form className="expense-form" onSubmit={submit}>
          <input required type="number" min="1" placeholder="Amount" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})}/>
          <input required placeholder="Merchant" value={form.merchant} onChange={e=>setForm({...form,merchant:e.target.value})}/>
          <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option>Food</option><option>Shopping</option><option>Transport</option><option>Entertainment</option><option>Bills</option><option>Other</option></select>
          <input required type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/>
          <button className="primary-link" disabled={loading}>{loading ? "Saving..." : "Add expense"}</button>
        </form>
      </div>
      <div className="content-card"><h2>History</h2>{transactions.length===0?<p className="muted-text">No transactions yet.</p>:<div className="transaction-list">{transactions.map(t=><div className="transaction-row" key={t.id}><div><strong>{t.merchant}</strong><span>{t.category} · {t.date}</span></div><div className="row-right"><strong>₹{Number(t.amount).toLocaleString("en-IN")}</strong><button className="delete-button" onClick={()=>remove(t.id)}>Delete</button></div></div>)}</div>}</div>
    </div>
  </div>;
}
