import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getTransactions } from "../../services/transactionService";
import React from "react";
export default function Monthly() {
  const {user,token}=useAuth(); const [transactions,setTransactions]=useState([]);
  useEffect(()=>{getTransactions(token,user.id).then(setTransactions).catch(console.error)},[token,user.id]);
  const total=transactions.reduce((s,t)=>s+Number(t.amount||0),0);
  const top=[...transactions].sort((a,b)=>Number(b.amount)-Number(a.amount))[0];
  return <div><div className="page-heading"><div><p className="eyebrow">MONTHLY STORY</p><h1>This month</h1><p className="muted-text">A simple view of what happened with your money.</p></div></div><div className="story-grid"><div className="story-card"><span>Total spent</span><strong>₹{total.toLocaleString("en-IN")}</strong></div><div className="story-card"><span>Transactions</span><strong>{transactions.length}</strong></div><div className="story-card"><span>Biggest expense</span><strong>{top ? `₹${Number(top.amount).toLocaleString("en-IN")}` : "—"}</strong><small>{top?.merchant || "No data yet"}</small></div></div><div className="content-card"><h2>Your monthly story</h2><p className="story-text">{transactions.length ? `You recorded ${transactions.length} transactions this month, spending ₹${total.toLocaleString("en-IN")}. Your largest recorded expense was ${top?.merchant || "an expense"} at ₹${Number(top?.amount || 0).toLocaleString("en-IN")}.` : "Once you add expenses, this page will turn them into a simple monthly story."}</p></div></div>
}
