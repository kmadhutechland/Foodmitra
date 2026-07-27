import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  Store,
  Truck,
  Mail,
  Phone,
  X,
  Plus,
  ArrowUpRight,
  Heart,
  Globe,
  Zap,
  Clock,
  MapPin,
  CheckCircle2,
  Lock,
  FileText,
  Play
} from "lucide-react";
import OfferCard from "../components/OfferCard";
import { featuredOffers } from "../data";
import { useNavigate } from "react-router-dom";

const transitionLuxe = { duration: 1, ease: [0.19, 1, 0.22, 1] };

// --- Sub-components ---

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const launchDate = new Date();
    launchDate.setMonth(launchDate.getMonth() + 2);
    const timer = setInterval(() => {
      const distance = launchDate.getTime() - new Date().getTime();
      if (distance < 0) { clearInterval(timer); return; }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  

  const TimerUnit = React.memo(({ value, label, max, color }) => {
    const formattedValue = value.toString().padStart(2, "0");
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const currentOffset = circumference - ((max === 0 ? 0 : (value / max)) * circumference);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: 'clamp(90px, 18vw, 130px)', height: 'clamp(90px, 18vw, 130px)' }}>
          {/* Outer Ring */}
          <svg style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)', width: '100%', height: '100%', overflow: 'visible' }} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="2" />
            <motion.circle
              cx="50" cy="50" r={radius} fill="none"
              stroke={color} strokeWidth="2.5"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset: currentOffset }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ strokeLinecap: 'round' }}
            />
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1="50" y1="2" x2="50" y2="6"
                stroke="rgba(0,0,0,0.1)" strokeWidth="1"
                transform={`rotate(${i * 30} 50 50)`}
              />
            ))}
          </svg>

          {/* Inner Glass Core */}
          <div style={{
            position: 'absolute', inset: '10px',
            background: 'linear-gradient(135deg, #fff 0%, #f9f9f9 100%)',
            borderRadius: '50%',
            boxShadow: '0 8px 20px rgba(0,0,0,0.04), inset 0 2px 4px rgba(255,255,255,1)',
            border: '1px solid rgba(0,0,0,0.03)',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
            overflow: 'hidden'
          }}>
            <span style={{
              fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
              fontWeight: 900,
              color: 'var(--color-ink)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              WebkitFontSmoothing: 'antialiased',
              fontVariantNumeric: 'tabular-nums'
            }}>
              {formattedValue}
            </span>
            <span style={{ fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-ghost)', marginTop: '0.2rem' }}>
              {label}
            </span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="countdown-wrapper" style={{ display: 'flex', gap: 'clamp(1.5rem, 4vw, 3rem)', flexWrap: 'wrap', justifyContent: 'center', marginTop: '3.5rem', position: 'relative', zIndex: 2 }}>
      <TimerUnit value={timeLeft.days} label="Days" max={60} color="var(--color-brand)" />
      <TimerUnit value={timeLeft.hours} label="Hours" max={24} color="var(--color-accent)" />
      <TimerUnit value={timeLeft.minutes} label="Mins" max={60} color="var(--color-ink)" />
      <TimerUnit value={timeLeft.seconds} label="Secs" max={60} color="var(--color-brand)" />
    </div>
  );
};

const BenefitSection = () => {
  const benefitGroups = [
    {
      id: "diners",
      title: "For Diners",
      icon: Users,
      color: "var(--color-brand)",
      tag: "Transparent Pricing",
      desc:
        "Food Mithra protects customer trust by keeping ordering simple, honest, and predictable from menu discovery to doorstep delivery.",
      points: [
        "Live menu alignment keeps pricing consistent with the restaurant, helping customers avoid inflated app-only rates.",
        "Checkout is designed for clarity with clean billing structure, reducing surprises at payment time.",
        "Order status messaging focuses on practical milestones so customers can plan their time with confidence."
      ],
      metric: "0%",
      metricLabel: "Markup Drift"
    },
    {
      id: "partners",
      title: "For Restaurant Partners",
      icon: Store,
      color: "var(--color-accent)",
      tag: "Margin Stability",
      desc:
        "Restaurants get a fair digital channel that supports sustainable growth instead of forcing compromise on quality, staffing, and service.",
      points: [
        "A fixed low-fee model keeps platform cost predictable and protects contribution margins.",
        "Partners retain stronger control over menu, prep pacing, and customer promise windows.",
        "Clear settlement visibility supports better forecasting, planning, and operational decisions."
      ],
      metric: "LESS",
      metricLabel: "Commission"
    },
    {
      id: "delivery",
      title: "For Delivery Teams",
      icon: Truck,
      color: "var(--color-slate)",
      tag: "Dignified Work",
      desc:
        "Delivery operations are built around long-term reliability and rider wellbeing rather than short-term volume pressure.",
      points: [
        "Compensation design prioritizes income consistency over unpredictable day-to-day volatility.",
        "Insurance and support structures are integrated into the model to improve workforce resilience.",
        "Dispatch patterns favor safer, more realistic route planning for better service consistency."
      ],
      metric: "24/7",
      metricLabel: "Support Layer"
    }
  ];

  return (
    <section
      id="benefits"
      className="section"
      style={{
        background: 'radial-gradient(circle at 10% 10%, rgba(250,187,19,0.14), transparent 40%), radial-gradient(circle at 90% 20%, rgba(123,184,45,0.12), transparent 35%), var(--color-bone)',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.25fr)', gap: '2rem', alignItems: 'stretch', marginBottom: '2rem' }}>
          <motion.div
            className="card-luxe"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={transitionLuxe}
            style={{
              background: 'linear-gradient(155deg, #fff 0%, #fff6d9 55%, #fce9ab 100%)',
              padding: '3.2rem',
              border: '1px solid rgba(250,187,19,0.25)',
              display: 'grid',
              gap: '1.4rem',
              alignContent: 'start'
            }}
          >
            <span className="eyebrow" style={{ color: 'var(--color-brand-dark)' }}>Benefits Architecture</span>
            <h3 className="display-2" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.7rem)', lineHeight: 0.95 }}>
              A Fairness
              <br />
              <span className="serif">Operating Model.</span>
            </h3>
            <p style={{ color: 'var(--color-slate)', fontSize: '1.04rem', lineHeight: 1.78, maxWidth: '48ch' }}>
              Food Mithra is structured as one connected policy stack, not isolated features. Pricing truth, partner economics, and delivery dignity are designed to reinforce each other.
            </p>
            <div style={{ display: 'grid', gap: '0.8rem', marginTop: '0.5rem' }}>
              {[
                "No hidden menu inflation for diners",
                "Predictable contribution margins for partners",
                "Stability-first dispatch logic for riders"
              ].map((line, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem' }}>
                  <CheckCircle2 size={16} color="var(--color-brand-dark)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                  <p style={{ color: 'var(--color-slate)', lineHeight: 1.65 }}>{line}</p>
                </div>
              ))}
            </div>
            <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.8rem' }}>
              {benefitGroups.map((item) => (
                <div key={item.id} style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(50,38,33,0.08)', borderRadius: '16px', padding: '0.95rem' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: item.color }}>{item.metric}</div>
                  <div style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ghost)', fontWeight: 800 }}>{item.metricLabel}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="mobile-stack" style={{ display: 'grid', gap: '0.9rem' }}>
            {benefitGroups.map((group, index) => (
              <motion.article
                key={group.id}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ ...transitionLuxe, delay: 0.08 + index * 0.08 }}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(50,38,33,0.08)',
                  borderRadius: '26px',
                  padding: '1.35rem 1.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 170px) minmax(0, 1fr) minmax(0, 1.2fr)',
                  gap: '1rem',
                  alignItems: 'center'
                }}
                className="mobile-stack"
              >
                <div style={{ display: 'grid', gap: '0.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'var(--color-bone)', color: group.color, display: 'grid', placeItems: 'center' }}>
                      <group.icon size={16} />
                    </div>
                    <span style={{ fontSize: '0.66rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--color-ghost)', fontWeight: 900 }}>{group.tag}</span>
                  </div>
                  <h5 style={{ fontSize: '1.12rem', lineHeight: 1.2 }}>{group.title}</h5>
                </div>

                <div style={{ display: 'grid', gap: '0.35rem' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: group.color }}>{group.metric}</div>
                  <div style={{ fontSize: '0.68rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--color-ghost)', fontWeight: 800 }}>
                    {group.metricLabel}
                  </div>
                  <div style={{ height: '5px', borderRadius: '99px', background: 'rgba(50,38,33,0.08)', overflow: 'hidden', marginTop: '0.25rem' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: index === 0 ? '92%' : index === 1 ? '86%' : '89%' }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 1.1, delay: 0.15 + index * 0.1, ease: [0.19, 1, 0.22, 1] }}
                      style={{ height: '100%', borderRadius: '99px', background: group.color }}
                    />
                  </div>
                </div>

                <div>
                  <p style={{ color: 'var(--color-slate)', lineHeight: 1.65, marginBottom: '0.6rem', fontSize: '0.95rem' }}>{group.desc}</p>
                  <div style={{ display: 'grid', gap: '0.45rem' }}>
                    {group.points.slice(0, 2).map((point, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                        <CheckCircle2 color={group.color} size={14} style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                        <p style={{ color: 'var(--color-slate)', lineHeight: 1.55, fontSize: '0.86rem' }}>{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const phases = [
    {
      n: "01",
      title: "Menu Truth Layer",
      desc: "Restaurant menu data is synced into the ordering surface with strict mapping rules, so customers see operationally valid items, prices, and availability.",
      points: ["Outlet-owned menu source", "Real-time availability state", "Price mismatch protection"]
    },
    {
      n: "02",
      title: "Fair Cost Computation",
      desc: "The billing engine separates food value from platform overhead. Customers pay clean totals while partners keep predictable margin visibility.",
      points: ["No hidden markup stack", "Transparent fee logic", "Auditable settlement path"]
    },
    {
      n: "03",
      title: "Dispatch with Dignity",
      desc: "Order allocation prioritizes realistic rider workloads and service reliability, reducing chaos-driven dispatch behavior.",
      points: ["Route sanity checks", "Stability-oriented assignment", "Safety-aware pacing"]
    },
    {
      n: "04",
      title: "Closed-Loop Accountability",
      desc: "Every order event is traced from placement to fulfillment, enabling faster support resolution and better policy tuning over time.",
      points: ["Event-level tracking", "Exception visibility", "Continuous ops optimization"]
    }
  ];

  return (
    <section className="section" style={{ background: 'var(--color-white)', overflow: 'hidden' }}>
      <div className="container">
        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '3rem', marginBottom: '3.2rem', alignItems: 'end' }}>
          <div>
            <span className="eyebrow" style={{ color: 'var(--color-brand)', marginBottom: '1rem' }}>Operating Blueprint</span>
            <h3 className="display-2">How The <span className="serif">System Runs.</span></h3>
          </div>
          <p style={{ color: 'var(--color-slate)', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '62ch' }}>
            This is the execution model behind Food Mithra. Each phase is designed to protect trust between diners, restaurant partners, and delivery teams while keeping operations efficient at scale.
          </p>
        </div>

        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 80px) minmax(0, 1fr)', gap: '1.5rem' }}>
          <div className="mobile-hide" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '2px', background: 'linear-gradient(180deg, var(--color-brand) 0%, rgba(50,38,33,0.08) 100%)', borderRadius: '4px' }} />
          </div>

          <div className="mobile-stack" style={{ display: 'grid', gap: '1.4rem' }}>
            {phases.map((phase, index) => (
              <motion.article
                key={phase.n}
                className="card-luxe"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ ...transitionLuxe, delay: index * 0.08 }}
                style={{ background: 'var(--color-bone)', padding: '2.4rem', position: 'relative', border: '1px solid rgba(50,38,33,0.08)' }}
              >
                <div style={{ position: 'absolute', left: '-63px', top: '2.3rem' }} className="mobile-hide">
                  <div style={{ width: '34px', height: '34px', borderRadius: '999px', background: '#fff', border: '2px solid var(--color-brand)', display: 'grid', placeItems: 'center', fontSize: '0.68rem', fontWeight: 900, color: 'var(--color-brand-dark)' }}>
                    {phase.n}
                  </div>
                </div>

                <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)', gap: '1.6rem' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--color-ghost)', fontWeight: 900 }}>
                      Phase {phase.n}
                    </span>
                    <h4 style={{ fontSize: '1.75rem', marginTop: '0.7rem', marginBottom: '0.9rem', lineHeight: 1.12 }}>{phase.title}</h4>
                    <p style={{ color: 'var(--color-slate)', lineHeight: 1.72 }}>{phase.desc}</p>
                  </div>

                  <div style={{ background: '#fff', borderRadius: '20px', padding: '1.2rem', border: '1px solid rgba(50,38,33,0.08)', display: 'grid', gap: '0.7rem', alignContent: 'start' }}>
                    {phase.points.map((point, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                        <CheckCircle2 size={16} color="var(--color-brand-dark)" style={{ marginTop: '0.18rem', flexShrink: 0 }} />
                        <p style={{ color: 'var(--color-slate)', lineHeight: 1.55, fontSize: '0.95rem' }}>{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1rem', marginTop: '1.8rem' }}>
          {[
            { value: "Live", label: "POS Sync State" },
            { value: "Traceable", label: "Order Audit Trail" },
            { value: "Balanced", label: "Stakeholder Economics" }
          ].map((item) => (
            <div key={item.label} className="card-luxe" style={{ background: '#fff', padding: '1.2rem 1.4rem', border: '1px solid rgba(50,38,33,0.08)' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-ink)' }}>{item.value}</div>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-ghost)', fontWeight: 900 }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ImpactSection = () => {
  const metrics = [
    {
      value: "Rs 1.2Cr",
      label: "Capital Returned To Local Kitchens",
      tone: "var(--color-brand)",
      note: "Recovered from high-commission drain and retained in partner businesses."
    },
    {
      value: "1,200+",
      label: "Active Supply Nodes",
      tone: "var(--color-ink)",
      note: "Restaurants, dhabas, and hotels connected with operational consistency."
    },
    {
      value: "100%",
      label: "Menu Price Fidelity",
      tone: "var(--color-accent)",
      note: "The displayed order value remains aligned with live outlet pricing."
    },
    {
      value: "98%",
      label: "Partner Retention",
      tone: "var(--color-ink)",
      note: "Strong retention driven by better economics and predictable operations."
    }
  ];

  return (
    <section className="section" style={{ background: 'var(--color-ink)', color: '#fff', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-140px', right: '-120px', width: '420px', height: '420px', borderRadius: '50%', background: 'var(--color-brand)', filter: 'blur(140px)', opacity: 0.28, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-150px', left: '-120px', width: '420px', height: '420px', borderRadius: '50%', background: 'var(--color-accent)', filter: 'blur(150px)', opacity: 0.2, pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1.2fr)', gap: '2rem', alignItems: 'stretch' }}>
          <motion.div
            className="card-luxe"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={transitionLuxe}
            style={{
              background: 'linear-gradient(155deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 70%)',
              border: '1px solid rgba(255,255,255,0.18)',
              padding: '3rem',
              backdropFilter: 'blur(8px)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'absolute', top: '-110px', right: '-80px', width: '240px', height: '240px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)' }} />
            <span className="eyebrow" style={{ color: 'var(--color-brand)', marginBottom: '1rem' }}>Impact Observatory</span>
            <h3 className="display-2" style={{ color: '#fff', fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', marginBottom: '1.2rem' }}>
              Wealth <span className="serif">Restored</span>
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, fontSize: '1.08rem', maxWidth: '52ch', marginBottom: '2rem' }}>
              We measure success by value returned to the local food economy. Every order should strengthen kitchens, riders, and customer trust instead of extracting from them.
            </p>

            <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.9rem' }}>
              {[
                { icon: Globe, text: 'Hyperlocal Economic Loop' },
                { icon: Zap, text: 'Low-Friction Operations' },
                { icon: MapPin, text: 'City-Level Network Density' },
                { icon: Clock, text: 'Real-Time Performance Signals' }
              ].map((item, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '14px', padding: '0.8rem', display: 'flex', gap: '0.55rem', alignItems: 'center' }}>
                  <item.icon size={15} color="var(--color-brand)" />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
            {metrics.map((metric, index) => (
              <motion.article
                key={metric.label}
                className="card-luxe"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ ...transitionLuxe, delay: index * 0.08 }}
                style={{
                  background: 'linear-gradient(150deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  padding: '2rem',
                  minHeight: '220px',
                  display: 'grid',
                  alignContent: 'space-between',
                  backdropFilter: 'blur(6px)'
                }}
              >
                <div style={{ width: '58px', height: '4px', background: metric.tone, borderRadius: '4px' }} />
                <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1, color: metric.tone }}>{metric.value}</div>
                <div>
                  <p style={{ fontWeight: 800, lineHeight: 1.35, marginBottom: '0.55rem' }}>{metric.label}</p>
                  <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.92rem', lineHeight: 1.6 }}>{metric.note}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const LegalSection = () => {
  const [view, setView] = useState("terms");

  const content = {
    terms: {
      title: "Terms & Conditions",
      body: [
        "By engaging with the Food Mithra protocol, you enter into a covenant of fairness. We do not operate on markups; therefore, we expect users to honor orders once preparation has been initiated by the kitchen node.",
        "Our system acts as a high-fidelity bridge. While we strive for 100% sync, the outlet's direct POS remains the source of truth in rare sync-lag scenarios.",
        "Refunds and adjustments are processed through our 'Integrity Queue', ensuring both the customer and the hard-working vendor are treated with equal financial dignity."
      ]
    },
    privacy: {
      title: "Privacy Policy",
      body: [
        "Your data belongs to you. Food Mithra only stores metadata essential for logistics and vendor settlement. We have zero integration with third-party advertising networks.",
        "Location services are active only during your 'Live Mission' (order window). Once the delivery partner confirms fulfillment, your spatial coordinate data is purged from our active processing nodes.",
        "All communication between you and our partners happens through a secure, encrypted relay, protecting your phone number and identity."
      ]
    }
  };

  return (
    <section id="legal" className="section" style={{ background: 'var(--color-white)' }}>
      <div className="container">
        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)', gap: '4rem' }}>
          <div>
            <h3 className="display-2" style={{ marginBottom: '4rem' }}>Legal <span className="serif">Nodes.</span></h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {Object.keys(content).map((key) => (
                <button
                  key={key}
                  onClick={() => setView(key)}
                  className={`nav-link ${view === key ? 'active' : ''}`}
                  style={{
                    textAlign: 'left',
                    padding: '2rem',
                    borderRadius: '16px',
                    border: '1px solid',
                    borderColor: view === key ? 'var(--color-ink)' : 'var(--color-bone)',
                    background: view === key ? 'var(--color-ink)' : 'transparent',
                    color: view === key ? '#fff' : 'var(--color-ink)',
                    cursor: 'pointer',
                    transition: '0.4s'
                  }}
                >
                  <span style={{ fontWeight: 800 }}>{content[key].title}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="card-luxe" style={{ background: 'var(--color-bone)', padding: '6rem' }}>
            <motion.div
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h4 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>{content[view].title}</h4>
              <div style={{ display: 'grid', gap: '2rem' }}>
                {content[view].body.map((text, i) => (
                  <p key={i} style={{ color: 'var(--color-slate)', fontSize: '1.1rem', lineHeight: 1.8 }}>{text}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const restaurants = [
    { name: "Royal Tandoor House", place: "Kukutpally", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80" },
    { name: "Coastal Spice Bay", place: "Kondapur", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=80" },
    { name: "Urban Millet Bowl", place: "Madhapur", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80" },
    { name: "Spice Route Kitchen", place: "Hi-Tech City", image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1400&q=80" }
  ];

  const dhabas = [
    { name: "Mitti Ka Swad", place: "Manikonda", image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=1400&q=80" },
    { name: "Desi Chulha", place: "Bangarahills", image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1400&q=80" },
    { name: "Punjab Mitti Dhaba", place: "Kukutpally", image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1400&q=80" },
    { name: "Highway Zaika", place: "Kondapur", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80" }
  ];

  const hotels = [
    { name: "Crown Residency", place: "Madhapur", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80" },
    { name: "Grand Valley Suites", place: "Hi-Tech City", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1400&q=80" },
    { name: "Central Park Inn", place: "Manikonda", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1400&q=80" },
    { name: "City Grand Hotel", place: "Bangarahills", image: "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1400&q=80" }
  ];

  return (
    <section id="gallery" className="section partner-gallery" style={{ background: 'var(--color-white)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="eyebrow" style={{ color: 'var(--color-brand-dark)' }}>Our Partners</span>
          <h3 className="display-2" style={{ marginTop: '0.9rem' }}>Network <span className="serif">Gallery.</span></h3>
        </div>

        <div className="mobile-stack" style={{ display: 'grid', gap: '1.4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={transitionLuxe}
            className="card-luxe"
            style={{ background: 'var(--color-bone)', border: '1px solid rgba(50,38,33,0.08)', padding: '1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem', padding: '0.2rem 0.4rem' }}>
              <h4 style={{ fontSize: '1.2rem' }}>Our Restaurants</h4>
              <span style={{ width: '54px', height: '3px', background: 'var(--color-brand)', borderRadius: '8px' }} />
            </div>
            <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: '0.9rem' }}>
              {restaurants.map((item, i) => (
                <article key={item.name} style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid rgba(50,38,33,0.08)', background: '#fff', gridColumn: i === 0 ? 'span 1' : 'span 1', gridRow: i === 0 ? 'span 2' : 'span 1' }}>
                  <div className={i === 0 ? "gallery-media gallery-media-tall" : "gallery-media gallery-media-regular"} style={{ position: 'relative', height: i === 0 ? '450px' : '220px' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 20%, rgba(0,0,0,0.62) 100%)' }} />
                    <div style={{ position: 'absolute', left: '0.9rem', right: '0.9rem', bottom: '0.8rem' }}>
                      <h5 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '0.2rem' }}>{item.name}</h5>
                      <p style={{ color: 'rgba(255,255,255,0.86)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <MapPin size={14} /> {item.place}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...transitionLuxe, delay: 0.08 }}
            className="card-luxe"
            style={{ background: 'var(--color-bone)', border: '1px solid rgba(50,38,33,0.08)', padding: '1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem', padding: '0.2rem 0.4rem' }}>
              <h4 style={{ fontSize: '1.2rem' }}>Our Dhabas</h4>
              <span style={{ width: '54px', height: '3px', background: 'var(--color-accent)', borderRadius: '8px' }} />
            </div>
            <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '0.9rem' }}>
              {dhabas.map((item, i) => (
                <article key={item.name} style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid rgba(50,38,33,0.08)', background: '#fff', transform: `rotate(${i % 2 === 0 ? '-0.6deg' : '0.6deg'})` }}>
                  <div className="gallery-media gallery-media-dhaba" style={{ position: 'relative', height: '260px' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.06) 20%, rgba(0,0,0,0.65) 100%)' }} />
                    <div style={{ position: 'absolute', left: '0.8rem', right: '0.8rem', bottom: '0.7rem' }}>
                      <h5 style={{ color: '#fff', fontSize: '0.98rem', marginBottom: '0.15rem' }}>{item.name}</h5>
                      <p style={{ color: 'rgba(255,255,255,0.86)', fontSize: '0.76rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <MapPin size={13} /> {item.place}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...transitionLuxe, delay: 0.16 }}
            className="card-luxe"
            style={{ background: 'var(--color-bone)', border: '1px solid rgba(50,38,33,0.08)', padding: '1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem', padding: '0.2rem 0.4rem' }}>
              <h4 style={{ fontSize: '1.2rem' }}>Our Hotels</h4>
              <span style={{ width: '54px', height: '3px', background: 'var(--color-brand-dark)', borderRadius: '8px' }} />
            </div>
            <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '0.9rem' }}>
              <article style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid rgba(50,38,33,0.08)', background: '#fff' }}>
                <div className="gallery-media gallery-media-hotel-main" style={{ position: 'relative', height: '360px' }}>
                  <img src={hotels[0].image} alt={hotels[0].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 20%, rgba(0,0,0,0.62) 100%)' }} />
                  <div style={{ position: 'absolute', left: '0.9rem', right: '0.9rem', bottom: '0.8rem' }}>
                    <h5 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.2rem' }}>{hotels[0].name}</h5>
                    <p style={{ color: 'rgba(255,255,255,0.86)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <MapPin size={14} /> {hotels[0].place}
                    </p>
                  </div>
                </div>
              </article>
              <div className="mobile-stack" style={{ display: 'grid', gap: '0.9rem' }}>
                {hotels.slice(1).map((item) => (
                  <article key={item.name} style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid rgba(50,38,33,0.08)', background: '#fff' }}>
                    <div className="gallery-media gallery-media-hotel-thumb" style={{ position: 'relative', height: '112px' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.03) 10%, rgba(0,0,0,0.58) 100%)' }} />
                      <div style={{ position: 'absolute', left: '0.8rem', right: '0.8rem', bottom: '0.5rem' }}>
                        <h5 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '0.1rem' }}>{item.name}</h5>
                        <p style={{ color: 'rgba(255,255,255,0.86)', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <MapPin size={12} /> {item.place}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
// --- Main Page Component ---


export default function HomePage() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  // --- Hero Interactive Logic ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const auraX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const auraY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const currentPosition = window.scrollY;
      const scrollPercentage = (currentPosition / (fullHeight - windowHeight)) * 100;

      if (scrollPercentage >= 50) {
        setShowPopup(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const currentPosition = window.scrollY;
      const maxScroll = Math.max(fullHeight - windowHeight, 1);
      setScrollProgress((currentPosition / maxScroll) * 100);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const reviews = [
    {
      name: "Aarav N.",
      role: "Regular Diner",
      quote: "Finally an app where menu prices match the outlet. Billing is clean and ETA updates are actually useful.",
      rating: 5
    },
    {
      name: "Meera Hotels",
      role: "Partner Outlet",
      quote: "Flat commission changed our monthly numbers. We now forecast better and avoid discount pressure from aggregator campaigns.",
      rating: 5
    },
    {
      name: "Rafiq S.",
      role: "Delivery Professional",
      quote: "Routes are more realistic and support responds quickly. Daily operations feel safer and less chaotic.",
      rating: 4
    },
    {
      name: "Nisha K.",
      role: "Family Orders",
      quote: "No hidden checkout jumps. It is the first app my parents trust because every order detail stays transparent.",
      rating: 5
    },
    {
      name: "Chef Reddy",
      role: "Cloud Kitchen Owner",
      quote: "Settlement visibility is the best part. We track margins in real time and adjust menu strategy without guesswork.",
      rating: 5
    },
    {
      name: "Imran P.",
      role: "Night Shift Rider",
      quote: "Better batching rules reduced unsafe rushes. Even peak hours are manageable with predictable route sequencing.",
      rating: 4
    }
  ];

  const reviewStats = [
    { value: "4.8/5", label: "Average Rating" },
    { value: "2,300+", label: "Verified Reviews" },
    { value: "92%", label: "Repeat Orders" }
  ];

  const topRail = reviews.slice(0, 3);
  const bottomRail = reviews.slice(3);

  return (
    <div className="page-root">
      <div className="noise-overlay" />
      <div className="scroll-progress">
        <motion.div
          style={{
            height: '100%',
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, var(--color-brand) 0%, var(--color-accent) 100%)'
          }}
        />
      </div>

      {/* Ambient Orbs (Global) */}
      <motion.div
        className="ambient-orb orb-a"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="ambient-orb orb-b"
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Navigation */}
      <nav className="navbar">
        <div className="container nav-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }} onClick={() => scrollTo('hero')}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/logo.jpeg" alt="Food Mithra Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--color-ink)', fontWeight: 900 }}>FOOD MITHRA</h2>
          </div>
          <div className="nav-links mobile-hide">
            <button onClick={() => scrollTo('about')} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>About</button>
            <button onClick={() => scrollTo('benefits')} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Benefits</button>
            <button onClick={() => scrollTo('legal')} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Legal</button>
            <button onClick={() => scrollTo('contact')} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Contact</button>
            <button onClick={() => scrollTo('gallery')} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Gallery</button>
          </div>
        </div>
      </nav>

      {/* Hero: Zen Minimalist Canvas - Magnetic Evolution */}
      <section
        id="hero"
        onMouseMove={handleMouseMove}
        style={{
          minHeight: '100vh',
          background: 'var(--color-bone)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '80px',
          perspective: '1200px'
        }}
      >
        {/* Interactive Magnetic Aura */}
        <motion.div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(250, 187, 19, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            left: -300,
            top: -300,
            x: auraX,
            y: auraY,
            pointerEvents: 'none',
            zIndex: 2,
            filter: 'blur(60px)'
          }}
        />

        {/* Premium Paper Grain Overly */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.03, pointerEvents: 'none', zIndex: 1
        }} />

        {/* Subtle Magnetic Orbs (Background) */}
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', top: '15%', right: '12%', width: '450px', height: '450px', background: 'var(--color-brand)', borderRadius: '50%', filter: 'blur(160px)', opacity: 0.08, zIndex: 0 }}
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ position: 'absolute', bottom: '10%', left: '8%', width: '350px', height: '350px', background: 'var(--color-accent)', borderRadius: '50%', filter: 'blur(140px)', opacity: 0.06, zIndex: 0 }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 5, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Unique Interactive Eyebrow */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '4.5rem', cursor: 'default' }}
            >
              <div style={{ height: '1px', width: '25px', background: 'var(--color-ink)', opacity: 0.15 }} />
              <div style={{ position: 'relative' }}>

                <motion.div
                  animate={{ width: ['0%', '100%', '0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ position: 'absolute', bottom: '-8px', left: 0, height: '1px', background: 'var(--color-brand)', opacity: 0.4 }}
                />
              </div>
              <div style={{ height: '1px', width: '25px', background: 'var(--color-ink)', opacity: 0.15 }} />
            </motion.div>

            {/* Magnetic Display Header */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
            >
              <h1 className="display-1" style={{ color: 'var(--color-ink)', marginBottom: '3.5rem', letterSpacing: '-0.05em', lineHeight: 0.9 }}>
                <motion.span
                  whileHover={{ y: -10, scale: 1.02, textShadow: "0 20px 40px rgba(50,38,33,0.1)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  style={{ display: 'inline-block', cursor: 'default' }}
                >
                  FOOD MITHRA
                </motion.span>
                <br />
                <motion.span
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="serif"
                  style={{ fontSize: '0.85em', color: 'var(--color-brand)', display: 'inline-block', position: 'relative', cursor: 'default' }}
                >
                  is Launching.
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ position: 'absolute', right: '-15px', top: '10px', width: '8px', height: '8px', background: 'var(--color-brand)', borderRadius: '50%' }}
                  />
                </motion.span>
              </h1>

              <p style={{ color: 'var(--color-slate)', fontSize: '1.35rem', maxWidth: '650px', margin: '0 auto 5.5rem', lineHeight: 1.7, fontWeight: 400, opacity: 0.8 }}>
                The architecture of food commerce is evolving. Join the sanctuary where <span style={{ color: 'var(--color-ink)', fontWeight: 800 }}>fairness</span> meets <span style={{ color: 'var(--color-ink)', fontWeight: 800 }}>craftsmanship.</span>
              </p>
            </motion.div>

            {/* Elevated Zen Deck with 3D Tilt */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1.2 }}
              whileHover={{
                rotateX: -5,
                rotateY: 5,
                z: 50,
                boxShadow: "0 50px 100px -20px rgba(50,38,33,0.15)"
              }}
              style={{
                background: 'rgba(255,255,255,0.4)',
                backdropFilter: 'blur(20px)',
                padding: '3.5rem 4rem',
                borderRadius: '40px',
                border: '1px solid #fff',
                boxShadow: '0 30px 60px -15px rgba(50,38,33,0.06)',
                display: 'inline-block',
                position: 'relative',
                transformStyle: 'preserve-3d',
                cursor: 'pointer'
              }}
            >
              <div style={{ transform: 'translateZ(30px)' }}>
                <CountdownTimer />
              </div>

              {/* Corner Geometry Accents */}
              <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', width: '10px', height: '10px', borderTop: '1px solid var(--color-brand)', borderLeft: '1px solid var(--color-brand)', opacity: 0.3 }} />
              <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', width: '10px', height: '10px', borderBottom: '1px solid var(--color-accent)', borderRight: '1px solid var(--color-accent)', opacity: 0.3 }} />
            </motion.div>

            {/* Interactive Pulse Rings */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '700px', height: '700px', border: '1px solid var(--color-ink)', borderRadius: '50%',
                zIndex: -1, pointerEvents: 'none'
              }}
            />
          </motion.div>
        </div>

        {/* Floating Technical Coordinates */}
        <div className="mobile-hide" style={{ position: 'absolute', left: '4rem', bottom: '4rem', display: 'flex', flexDirection: 'column', gap: '3rem', opacity: 0.3 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '4px', height: '4px', background: 'var(--color-brand)', borderRadius: '50%' }} />
                
          </div>
          <div style={{ height: '80px', width: '1px', background: 'var(--color-ink)', margin: '0 auto' }} />
        </div>
      </section>      {/* Photo Strip Between Hero and About */}
      <section style={{ padding: '1rem 0', background: 'var(--color-bone)', overflow: 'hidden' }}>
        <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '0.65rem 0' }}>
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            style={{ display: 'flex', gap: '0.75rem', width: 'max-content' }}
          >
            {[                     
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=80"
            ].map((img, idx) => (
              <div
                key={`${img}-${idx}`}
                style={{
                  width: '210px',
                  height: '110px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(50,38,33,0.08)',
                  flexShrink: 0,
                  background: '#fff'
                }}
              >
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Us */}
      <motion.section
        id="about"
        className="section"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={transitionLuxe}
        style={{ background: 'var(--color-white)' }}
      >
        <div className="container">
          <div className="mobile-stack about-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '4rem', alignItems: 'center' }}>
            <div>
              <div className="accent-line" />
              <h3 className="display-2" style={{ marginBottom: '3rem' }}>ABOUT <span className="serif"> US</span></h3>
              <p style={{ fontSize: '1.3rem', color: 'var(--color-slate)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                Food Mithra was founded on a simple realization: the digital convenience layer was becoming a predatory middleman. In the rush for speed, we lost sight of the <strong>cooks</strong>, the <strong>riders</strong>, and the <strong>diners</strong>.
              </p>
              <p style={{ fontSize: '1.3rem', color: 'var(--color-slate)', lineHeight: 1.8, marginBottom: '4rem' }}>
                We've built a sanctuary—a platform that restores the sacred connection between a kitchen's effort and a diner's table. No markups, no exploitative gig-work, just honest food delivered with dignity.
              </p>
              <div className="about-stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                <div style={{ borderLeft: '3px solid var(--color-brand)', paddingLeft: '2rem' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900 }}>2026</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--color-ghost)', textTransform: 'uppercase' }}>Genesis Year</div>
                </div>
                <div style={{ borderLeft: '3px solid var(--color-accent)', paddingLeft: '2rem' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900 }}>100%</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--color-ghost)', textTransform: 'uppercase' }}>Price Sync</div>
                </div>
              </div>
            </div>
            <div className="card-luxe about-highlight" style={{ background: 'var(--color-bone)', padding: '5rem', position: 'relative', overflow: 'hidden', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Animated Logo Background */}
              <motion.div
                className="about-logo-glow"
                initial={{ filter: 'blur(0px)', opacity: 1, scale: 0.6 }}
                whileInView={{
                  filter: 'blur(30px)',
                  opacity: 0.15,
                  scale: 1.4
                }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 2, ease: [0.19, 1, 0.22, 1] }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  x: '-50%',
                  y: '-50%',
                  width: '100%',
                  height: '100%',
                  zIndex: 0,
                  pointerEvents: 'none'
                }}
              >
                <img src="/logo.jpeg" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </motion.div>

              {/* Animated Content Reveal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 2.5, ease: "easeOut" }}
                style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}
              >
                <Heart size={56} fill="var(--color-brand)" color="var(--color-brand)" style={{ marginBottom: '2.5rem', margin: '0 auto 2.5rem' }} />
                <h5 style={{ fontSize: '2rem', fontWeight: 850, marginBottom: '1.5rem', color: 'var(--color-ink)' }}>Built for the Backbone.</h5>
                <p style={{ color: 'var(--color-slate)', lineHeight: 1.6, maxWidth: '400px', margin: '0 auto' }}>Success isn't measured in clicks, but in the social security of our delivery nodes and the prosperity of our local partners.</p>
                <div style={{ marginTop: '3rem', paddingTop: '3rem', borderTop: '1px solid var(--color-ink)', opacity: 0.1 }}></div>
                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                    <Star fill="var(--color-brand)" color="var(--color-brand)" size={16} />
                    <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>Premium Standards</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                    <CheckCircle2 color="var(--color-accent)" size={16} />
                    <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>Community Verified</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
      <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={transitionLuxe}>
        <BenefitSection />
      </motion.div>      <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={transitionLuxe}>
        <ProcessSection />
      </motion.div>      <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={transitionLuxe}>
        <ImpactSection />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={transitionLuxe}>
        <LegalSection />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={transitionLuxe}>
        <GallerySection />
      </motion.div>

      {/* Reviews Section */}
      <motion.section
        id="reviews"
        className="section"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={transitionLuxe}
        style={{
          background: 'radial-gradient(circle at 12% 0%, rgba(250,187,19,0.18), transparent 45%), radial-gradient(circle at 88% 10%, rgba(123,184,45,0.16), transparent 45%), var(--color-bone)',
          overflow: 'hidden'
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="eyebrow" style={{ color: 'var(--color-brand-dark)' }}>Community Voices</span>
            <h3 className="display-2" style={{ marginTop: '1rem' }}>Trusted By <span className="serif">Real Users.</span></h3>
            <p style={{ marginTop: '1.2rem', color: 'var(--color-slate)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '760px', marginInline: 'auto' }}>
              Live feedback from diners, outlets, and delivery teams across the Food Mithra network.
            </p>
          </div>

          <div className="reviews-marquee-wrap">
            <div className="reviews-marquee reviews-marquee-left">
              {[...topRail, ...topRail].map((review, idx) => (
                <article key={`${review.name}-${idx}`} className="reviews-card card-luxe">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.9rem' }}>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={15} fill={i < review.rating ? 'var(--color-brand)' : 'transparent'} color="var(--color-brand)" />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-ghost)', fontWeight: 800 }}>Verified</span>
                  </div>
                  <p style={{ color: 'var(--color-slate)', lineHeight: 1.72, marginBottom: '1.1rem', fontSize: '0.96rem' }}>
                    "{review.quote}"
                  </p>
                  <div style={{ borderTop: '1px solid rgba(50,38,33,0.08)', paddingTop: '0.85rem' }}>
                    <div style={{ fontWeight: 900 }}>{review.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-ghost)', fontWeight: 700 }}>{review.role}</div>
                  </div>
                </article>
              ))}
            </div>

            <div className="reviews-marquee reviews-marquee-right" style={{ marginTop: '1rem' }}>
              {[...bottomRail, ...bottomRail].map((review, idx) => (
                <article key={`${review.name}-alt-${idx}`} className="reviews-card card-luxe">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.9rem' }}>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={15} fill={i < review.rating ? 'var(--color-brand)' : 'transparent'} color="var(--color-brand)" />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-ghost)', fontWeight: 800 }}>Live</span>
                  </div>
                  <p style={{ color: 'var(--color-slate)', lineHeight: 1.72, marginBottom: '1.1rem', fontSize: '0.96rem' }}>
                    "{review.quote}"
                  </p>
                  <div style={{ borderTop: '1px solid rgba(50,38,33,0.08)', paddingTop: '0.85rem' }}>
                    <div style={{ fontWeight: 900 }}>{review.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-ghost)', fontWeight: 700 }}>{review.role}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.9rem', marginTop: '1.25rem' }}>
            {reviewStats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                className="reviews-stat card-luxe"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ ...transitionLuxe, delay: idx * 0.06 }}
                style={{ background: '#fff', padding: '1rem 1.2rem', border: '1px solid rgba(50,38,33,0.08)' }}
              >
                <div style={{ fontWeight: 900, fontSize: '1.45rem' }}>{stat.value}</div>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-ghost)', fontWeight: 900 }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="section"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={transitionLuxe}
      >
        <div className="container">
          <div className="card-luxe" style={{ background: 'var(--color-ink)', color: '#fff', padding: '8rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', background: 'var(--color-brand)', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.1 }} />
            <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '4rem' }}>
              <div>
                <h3 className="display-2" style={{ color: '#fff' }}>Contact <span className="serif">Us.</span></h3>
                <p style={{ marginTop: '2.5rem', fontSize: '1.3rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  Have questions about our commission model or interested in becoming a delivery partner? Our core ops team is ready to sync.
                </p>

                <div style={{ marginTop: '5rem', display: 'grid', gap: '3.5rem' }}>
                  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.2rem', borderRadius: '12px' }}>
                      <Mail color="var(--color-brand)" size={24} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 900, color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>EMAIL PROTOCOL</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>foodmithara@gmail.com</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.2rem', borderRadius: '12px' }}>
                      <Phone color="var(--color-brand)" size={24} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 900, color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>DIRECT VOICE</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>+91 9391046401</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <form style={{ display: 'grid', gap: '2rem' }}>
                  <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <input type="text" placeholder="FULL NAME" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: '1.8rem', borderRadius: '20px', color: '#fff', fontSize: '0.9rem', fontWeight: 700 }} />
                    <input type="email" placeholder="EMAIL ADDRESS" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: '1.8rem', borderRadius: '20px', color: '#fff', fontSize: '0.9rem', fontWeight: 700 }} />
                  </div>
                  <input type="text" placeholder="SUBJECT" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: '1.8rem', borderRadius: '20px', color: '#fff', fontSize: '0.9rem', fontWeight: 700 }} />
                  <textarea rows="4" placeholder="HOW CAN WE HELP?" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: '1.8rem', borderRadius: '20px', color: '#fff', fontSize: '0.9rem', resize: 'none', fontWeight: 700 }}></textarea>
                  <button type="button" className="btn-premium" style={{ width: '100%', justifyContent: 'center', background: 'var(--color-brand)', color: 'var(--color-ink)' }}>SEND MESSAGE <ArrowUpRight /></button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="section"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={transitionLuxe}
        style={{ background: 'var(--color-white)', paddingBottom: '4rem', borderTop: '1px solid var(--color-bone)' }}
      >
        <div className="container">
          <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '6rem' }}>
            {/* Brand Column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/logo.jpeg" alt="Food Mithra Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>FOOD MITHRA.</h2>
              </div>
              <p style={{ color: 'var(--color-slate)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '3rem' }}>
                The first platform dedicated to price synchronization and financial dignity for the food delivery ecosystem.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h5 style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--color-ghost)', marginBottom: '2.5rem', letterSpacing: '0.15em' }}>REGISTRY</h5>
              <div style={{ display: 'grid', gap: '1.2rem' }}>
                {['About Mission', 'Benefits Sync', 'Live Nodes', 'Impact Data', 'Partner Portal'].map(link => (
                  <button key={link} className="nav-link" style={{ background: 'none', border: 'none', textAlign: 'left', padding: 0, textTransform: 'capitalize' }}>{link}</button>
                ))}
              </div>
            </div>

           {/* Support */}
<div>
  <h5 style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--color-ghost)', marginBottom: '2.5rem', letterSpacing: '0.15em' }}>SECURITY</h5>
  <div style={{ display: 'grid', gap: '1.2rem' }}>
    {['Privacy Protocol', 'Terms of Sync', 'Encryption FAQ', 'Support Hub', 'Dispute Queue', 'Delete Account'].map(link => (
      <button
        key={link}
        className="nav-link"
        style={{ background: 'none', border: 'none', textAlign: 'left', padding: 0, textTransform: 'capitalize' }}
        onClick={() => {
          if (link === 'Privacy Protocol') navigate('/privacy-policy');
          if (link === 'Terms of Sync') navigate('/terms-condition');
          if (link === 'Support Hub') navigate('/support');
          if (link === 'Delete Account') navigate('/delete-account');
        }}
      >
        {link}
      </button>
    ))}
  </div>
</div>

            {/* App Download */}
            <div>
              <h5 style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--color-ghost)', marginBottom: '2.5rem', letterSpacing: '0.15em' }}>EXPERIENCE MITHRA</h5>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <button
                  style={{
                    background: 'var(--color-ink)', color: '#fff', border: 'none',
                    padding: '1.2rem 2rem', borderRadius: '16px', display: 'flex',
                    alignItems: 'center', gap: '1.2rem', cursor: 'pointer', textAlign: 'left'
                  }}
                >
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.6rem', borderRadius: '100px' }}>
                    <Zap size={20} fill="#fff" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, opacity: 0.6 }}>DOWNLOAD ON THE</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900 }}>App Store</div>
                  </div>
                </button>
                <button
                  style={{
                    background: 'var(--color-ink)', color: '#fff', border: 'none',
                    padding: '1.2rem 2rem', borderRadius: '16px', display: 'flex',
                    alignItems: 'center', gap: '1.2rem', cursor: 'pointer', textAlign: 'left'
                  }}
                >
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.6rem', borderRadius: '100px' }}>
                    <Play size={20} fill="#fff" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, opacity: 0.6 }}>GET IT ON</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900 }}>Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4rem', borderTop: '1px solid var(--color-ink)', opacity: 0.1, color: 'var(--color-ink)', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
              <span style={{ fontWeight: 800 }}>© 2026 MITHRA SYSTEMS</span>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* Coming Soon Pop-up */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="popup-overlay"
          >
            <motion.div
              initial={{ scale: 0.92, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="popup-modal"
              style={{ border: '1px solid var(--color-brand-soft)', boxShadow: '0 50px 100px -20px rgba(250, 187, 19, 0.2)' }}
            >
              <button onClick={() => setShowPopup(false)} className="popup-close"><X size={28} color="var(--color-ink)" /></button>
              <div className="accent-line" style={{ margin: '0 auto 2.5rem' }} />
              <h3 className="display-2" style={{ marginBottom: '1.5rem', fontSize: '3.5rem' }}>Waitlist <span className="serif">Open.</span></h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--color-slate)', marginBottom: '3.5rem', lineHeight: 1.6 }}>
                The Fairness Engine is currently undergoing stress testing in pilot sectors. Join <strong>12,000+</strong> diners waiting for the honest food revolution.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input type="email" placeholder="email@protocol.sync" style={{ flex: 1, padding: '1.5rem 2.5rem', background: 'var(--color-bone)', border: 'none', borderRadius: '100px', fontWeight: 700, fontSize: '1rem', color: 'var(--color-ink)' }} />
                <button className="btn-premium" style={{ background: 'var(--color-brand)', padding: '1.5rem' }}><ArrowRight size={24} color="var(--color-ink)" /></button>
              </div>
              <div style={{ marginTop: '3rem', fontSize: '0.75rem', fontWeight: 900, color: 'var(--color-brand-dark)', letterSpacing: '0.15em' }}>GLOBAL SYNC STATUS: 42% COMPLETE</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}








