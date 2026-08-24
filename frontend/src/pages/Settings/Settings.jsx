import { useAuth } from "../../context/AuthContext";
import React from "react";
export default function Settings(){const {user}=useAuth();return <div><div className="page-heading"><div><p className="eyebrow">YOUR ACCOUNT</p><h1>Settings</h1><p className="muted-text">Manage your Budget Tracker account.</p></div></div><div className="content-card"><h2>Profile</h2><div className="setting-row"><span>Name</span><strong>{user?.name}</strong></div><div className="setting-row"><span>Email</span><strong>{user?.email}</strong></div></div></div>}
