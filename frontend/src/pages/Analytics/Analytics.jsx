import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getTransactions } from "../../services/transactionService";
import React from "react";
export default function Analytics() {
  const { user, token } = useAuth();
  const [transactions,setTransactions]=useState([]);
  useEffect(()=>{getTransactions(token,user.id).then(setTransactions).catch(console.error)},[token,user.id]);
  const categories=useMemo(()=>transactions.reduce((acc,t)=>{const c=t.category||"Other";acc[c]=(acc[c]||0)+Number(t.amount||0);return acc},{}),[transactions]);
  const total=Object.values(categories).reduce((a,b)=>a+b,0);
  return <div><div className="page-heading"><div><p className="eyebrow">UNDERSTAND YOUR MONEY</p><h1>Analytics</h1><p className="muted-text">Your spending should tell a story.</p></div></div><div className="content-card"><h2>Category spending</h2>{Object.entries(categories).sort((a,b)=>b[1]-a[1]).map(([name,value])=><div className="bar-row" key={name}><div><span>{name}</span><strong>₹{value.toLocaleString("en-IN")}</strong></div><div className="bar"><i style={{width:`${total ? value/total*100 : 0}%`}}/></div></div>)}{!transactions.length&&<p className="muted-text">Add transactions to see your spending patterns.</p>}</div></div>
}
