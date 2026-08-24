import React from "react";
export default function Import() {
  return <div><div className="page-heading"><div><p className="eyebrow">AUTOMATIC IMPORT</p><h1>Import from Gmail</h1><p className="muted-text">The email is the source. The transaction is the product.</p></div></div><div className="content-card import-card"><div className="import-icon">✉</div><h2>Find your transactions automatically</h2><p>Connect Gmail when you choose to import. We'll look for relevant payment emails, extract transaction details, categorize them, and show you a preview before anything is saved.</p><button className="primary-link" disabled>Connect Gmail — coming next</button><p className="tiny-note">Google OAuth and Gmail API integration are intentionally isolated from normal app login.</p></div></div>
}
