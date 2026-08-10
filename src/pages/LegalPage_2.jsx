import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Mail, Phone, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function LegalPage({ title, content }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-root">
      <nav className="navbar">
        <div className="container nav-content">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ background: 'var(--color-brand)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap fill="#fff" size={16} />
            </div>
            <h2 style={{ fontSize: '1.4rem', letterSpacing: '-0.05em' }}>FOOD MITHRA</h2>
          </Link>
          <Link to="/" className="btn-premium" style={{ padding: '0.6rem 2rem', fontSize: '0.75rem' }}>
            <ArrowLeft size={16} /> RETURN TO GRID
          </Link>
        </div>
      </nav>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="section"
        style={{ paddingTop: '15rem' }}
      >
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8rem' }}>
            <div>
              <div className="accent-line" />
              <span style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', color: 'var(--color-brand)' }}>Governance Documentation</span>
              <h1 className="display-2" style={{ marginTop: '2rem' }}>{title}</h1>

              <div style={{ marginTop: '6rem', display: 'grid', gap: '2rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', color: 'var(--color-slate)' }}>
                  <ShieldCheck size={20} color="var(--color-brand)" />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>INTEGRITY_VERIFIED</span>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', color: 'var(--color-slate)' }}>
                  <Zap size={20} color="var(--color-brand)" />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>LATEST_SYNC: 2026</span>
                </div>
              </div>
            </div>

            <div className="card-luxe" style={{ background: 'var(--color-bone)', border: 'none' }}>
              <div style={{ fontSize: '1.8rem', lineHeight: 1.6, fontWeight: 300, color: 'var(--color-ink)' }}>
                {content}
              </div>

              <div style={{ marginTop: '6rem', paddingTop: '4rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                <h5 style={{ fontWeight: 900, marginBottom: '2rem', letterSpacing: '0.1em' }}>MITHRA STANDARD PROTOCOL</h5>
                <p style={{ color: 'var(--color-ghost)', fontSize: '1rem', lineHeight: 1.8 }}>
                  The statutes contained herein are engineered to protect the radical transparency of the Food Mithra ecosystem.
                  We operate as a pass-through layer for culinary value. Any attempt to distort menu prices or erode the fixed
                  financial security of our delivery professionals results in an immediate decoupling from the central sync node.
                  By using this application, you enter into a covenant of fairness and transparency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <footer className="section" style={{ background: 'var(--color-ink)', color: '#fff', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-0.05em' }}>MITHRA_SYSTEMS © 2026</div>
            <div style={{ display: 'flex', gap: '3rem' }}>
              <Mail size={20} />
              <Phone size={20} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
