import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, MessageCircle } from "lucide-react";

const supportEmail = "foodmithara@gmail.com";

export default function SupportPage() {
  const navigate = useNavigate();

  return (
    <section className="support-page">
      <div className="support-card">
        <button type="button" className="support-back" onClick={() => navigate("/")}>
          <ArrowLeft size={18} /> Back to home
        </button>
        <div className="support-icon"><MessageCircle size={32} /></div>
        <p className="eyebrow">Food Mithra support</p>
        <h1>How can we help?</h1>
        <p className="support-description">
          For account, order, or general questions, send our support team an email and we’ll get back to you as soon as possible.
        </p>
        <a className="support-email" href={`mailto:${supportEmail}`}>
          <Mail size={20} />
          <span>
            <small>Email support</small>
            {supportEmail}
          </span>
        </a>
      </div>
    </section>
  );
}
