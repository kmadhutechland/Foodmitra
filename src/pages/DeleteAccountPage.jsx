import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Trash2 } from "lucide-react";

export default function DeleteAccountPage() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({ name: "", email: "" });

  function handleSubmit(event) {
    event.preventDefault();
    // The deletion request can be sent to the account API here when it is available.
    navigate("/", { replace: true });
  }

  return (
    <section className="delete-account-page">
      <div className="delete-account-card">
        <button type="button" className="delete-account-back" onClick={() => navigate("/")}>
          <ArrowLeft size={18} /> Back to home
        </button>

        <div className="delete-account-icon"><AlertTriangle size={30} /></div>
        <p className="eyebrow">Account request</p>
        <h1>Delete your account</h1>
        <p className="delete-account-description">
          Please provide the details associated with your Food Mithra account. This action cannot be undone.
        </p>

        <form className="delete-account-form" onSubmit={handleSubmit}>
          <label htmlFor="delete-name">Full name</label>
          <input
            id="delete-name"
            name="name"
            type="text"
            autoComplete="name"
            value={details.name}
            onChange={(event) => setDetails({ ...details, name: event.target.value })}
            placeholder="Your full name"
            required
          />

          <label htmlFor="delete-email">Email address</label>
          <input
            id="delete-email"
            name="email"
            type="email"
            autoComplete="email"
            value={details.email}
            onChange={(event) => setDetails({ ...details, email: event.target.value })}
            placeholder="you@example.com"
            required
          />

          <button type="submit" className="delete-account-submit">
            <Trash2 size={18} /> Delete account
          </button>
        </form>
      </div>
    </section>
  );
}
