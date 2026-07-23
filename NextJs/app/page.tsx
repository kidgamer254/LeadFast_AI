import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'radial-gradient(circle at 50% -20%, rgba(212, 135, 10, 0.15), transparent 60%), #07111f' }}>
      
      {/* Top Header Navigation */}
      <header style={{ borderBottom: '1px solid var(--border)', background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(12px)', sticky: 'top', top: 0, zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '76px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(212, 135, 10, 0.2), rgba(139, 94, 0, 0.4))', border: '1px solid #D4870A', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(212, 135, 10, 0.3)' }}>
              <img src="/icon.svg" alt="LeadFast AI Logo" style={{ width: '26px', height: '26px' }} />
            </div>
            <span style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.02em' }} className="shiny-gold-heading">
              LeadFast AI
            </span>
          </div>

          <nav className="nav" style={{ alignItems: 'center' }}>
            <a href="#features">Features</a>
            <a href="#marketplace">Contractor Solutions</a>
            <a href="#contact">Owner Contact</a>
            <Link href="/login" className="shiny-green-btn" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
              Portal Login →
            </Link>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section className="container" style={{ padding: '80px 0 60px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(212, 135, 10, 0.12)', border: '1px solid rgba(212, 135, 10, 0.3)', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.85rem', color: '#FFD166', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              ⚡ High-Velocity AI Lead Intake & Dispatch System
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', fontWeight: '900', lineHeight: 1.15, margin: '0 auto 24px', maxWidth: '900px' }}>
            High-Velocity LeadFast AI System
          </h1>

          <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '760px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            The premier AI-driven ecosystem designed for Plumbing, HVAC, Electrical, and General Contracting professionals. 
            Connect home and commercial clients with verified trade specialists through automated qualification and instant routing.
          </p>

          {/* Primary CTA Button - Shiny Green with Greenish Shadow */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/login" className="shiny-green-btn">
              <span>Go to Login / Portal Page</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </section>

        {/* Detailed About LeadFast AI Section */}
        <section id="about" className="container" style={{ padding: '40px 0 20px' }}>
          <div className="panel card" style={{ padding: '36px', background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '18px' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#f8fafc', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>⚡</span> About LeadFast AI
            </h2>
            <p style={{ color: '#e2e8f0', fontSize: '1rem', lineHeight: '1.7', marginBottom: '16px' }}>
              <strong>LeadFast AI</strong> is an instant lead response system engineered specifically for home service contractors like HVAC technicians, plumbers, electricians, and roofers. By intercepting website contact form submissions and generating personalized, context-aware email replies within 30 seconds, LeadFast AI bridges the critical response-time gap when contractors are busy in the field—ensuring no high-intent lead is lost to competitors while logging all interactions into a streamlined business dashboard.
            </p>
            <p style={{ color: '#cbd5e1', fontSize: '0.96rem', lineHeight: '1.7', marginBottom: '28px' }}>
              For clients, this means an end to waiting hours or days for quotes by receiving immediate, intelligent answers tailored to their specific home service needs. For contractors, it provides a 24/7 automated sales assistant that turns website traffic into booked jobs without manual overhead, delivering immediate value to both parties.
            </p>

            {/* 5 Examples of Available Contractors in Top-Down Format */}
            <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <h3 style={{ fontSize: '1.25rem', margin: '0 0 16px', color: '#38bdf8' }}>
                Featured Contractor Specialties Available
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                {/* 1. Plumbing */}
                <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '16px', padding: '20px', transition: 'transform 0.2s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                    <img src="/images/plumbing.jpg" alt="Plumbing Icon" style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', border: '2px solid #38bdf8', boxShadow: '0 4px 12px rgba(56,189,248,0.3)', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '1.05rem' }}>1. Plumbing & Pipefitting Specialists</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px', lineHeight: '1.5' }}>Leak detection, pipe repairs, water heater installation, and 24/7 emergency plumbing dispatch.</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src="/images/plumbing.jpg" alt="Plumbing & Pipefitting" style={{ width: '70%', height: '340px', objectFit: 'contain', borderRadius: '12px', border: '1px solid rgba(56,189,248,0.2)', background: 'rgba(0,0,0,0.2)' }} />
                  </div>
                </div>

                {/* 2. HVAC */}
                <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 209, 102, 0.25)', borderRadius: '16px', padding: '20px', transition: 'transform 0.2s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                    <img src="/images/HVAC.jpg" alt="HVAC Icon" style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', border: '2px solid #FFD166', boxShadow: '0 4px 12px rgba(255,209,102,0.3)', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '1.05rem' }}>2. HVAC & Climate Control Technicians</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px', lineHeight: '1.5' }}>Air conditioning installation, furnace heating repairs, ventilation ductwork, and thermostat automation.</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src="/images/HVAC.jpg" alt="HVAC & Climate Control" style={{ width: '70%', height: '340px', objectFit: 'contain', borderRadius: '12px', border: '1px solid rgba(255,209,102,0.2)', background: 'rgba(0,0,0,0.2)' }} />
                  </div>
                </div>

                {/* 3. Electrical */}
                <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(74, 222, 128, 0.25)', borderRadius: '16px', padding: '20px', transition: 'transform 0.2s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                    <img src="/images/Electrical.jpg" alt="Electrical Icon" style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', border: '2px solid #4ade80', boxShadow: '0 4px 12px rgba(74,222,128,0.3)', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '1.05rem' }}>3. Certified Electrical Contractors</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px', lineHeight: '1.5' }}>Electrical panel upgrades, full building rewiring, EV charger setup, and safety inspection services.</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src="/images/Electrical.jpg" alt="Certified Electrical Contractors" style={{ width: '70%', height: '340px', objectFit: 'contain', borderRadius: '12px', border: '1px solid rgba(74,222,128,0.2)', background: 'rgba(0,0,0,0.2)' }} />
                  </div>
                </div>

                {/* 4. Roofing */}
                <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(244, 114, 182, 0.25)', borderRadius: '16px', padding: '20px', transition: 'transform 0.2s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                    <img src="/images/roofing.jpg" alt="Roofing Icon" style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', border: '2px solid #f472b6', boxShadow: '0 4px 12px rgba(244,114,182,0.3)', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '1.05rem' }}>4. Roofing & Exterior Waterproofing</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px', lineHeight: '1.5' }}>Shingle replacement, gutter system repair, roof leak sealing, and structural weatherproofing.</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src="/images/roofing.jpg" alt="Roofing & Exterior Waterproofing" style={{ width: '70%', height: '340px', objectFit: 'contain', borderRadius: '12px', border: '1px solid rgba(244,114,182,0.2)', background: 'rgba(0,0,0,0.2)' }} />
                  </div>
                </div>

                {/* 5. General Contracting */}
                <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(192, 132, 252, 0.25)', borderRadius: '16px', padding: '20px', transition: 'transform 0.2s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                    <img src="/images/remodel.jpg" alt="Remodeling Icon" style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', border: '2px solid #c084fc', boxShadow: '0 4px 12px rgba(192,132,252,0.3)', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '1.05rem' }}>5. General Contracting & Remodeling Pros</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px', lineHeight: '1.5' }}>Home renovations, kitchen/bathroom upgrades, carpentry, drywall repair, and turnkey construction management.</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src="/images/remodel.jpg" alt="General Contracting & Remodeling" style={{ width: '70%', height: '340px', objectFit: 'contain', borderRadius: '12px', border: '1px solid rgba(192,132,252,0.2)', background: 'rgba(0,0,0,0.2)' }} />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Detailed Information & Capabilities */}
        <section id="features" className="container" style={{ padding: '40px 0 60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.2rem', margin: '0 0 12px' }}>
              Comprehensive Platform Overview
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
              Discover how LeadFast AI streamlines lead ingestion, intelligent contractor matching, and request tracking.
            </p>
          </div>

          <div className="grid grid-3">
            <div className="panel card" style={{ padding: '28px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(37, 99, 235, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>
                🎯
              </div>
              <h3 style={{ fontSize: '1.3rem', margin: '0 0 10px' }}>
                Instant Lead Qualification
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                Client service requests are parsed and structured immediately by AI algorithms to determine job urgency, scope, and trade requirements without delays.
              </p>
            </div>

            <div className="panel card" style={{ padding: '28px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>
                ⚡
              </div>
              <h3 style={{ fontSize: '1.3rem', margin: '0 0 10px' }}>
                Smart Contractor Dispatch
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                Directly targets registered contractors by Business UUID or matching trade discipline (Plumbing, HVAC, Electrical, General Contracting).
              </p>
            </div>

            <div className="panel card" style={{ padding: '28px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(212, 135, 10, 0.15)', border: '1px solid rgba(212, 135, 10, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>
                📊
              </div>
              <h3 style={{ fontSize: '1.3rem', margin: '0 0 10px' }}>
                Interactive Dashboard & CRM
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                Contractors access a private portal to view incoming leads, manage customer inquiries, update status, and review business analytics.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="marketplace" className="container" style={{ padding: '40px 0 80px' }}>
          <div className="panel card" style={{ padding: '40px', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.8))' }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <h2 style={{ fontSize: '2rem', margin: '0 0 8px' }}>
                How LeadFast AI Works
              </h2>
              <p style={{ color: '#94a3b8', margin: 0 }}>
                A seamless 3-step pipeline for clients and contractors alike.
              </p>
            </div>

            <div className="grid grid-3" style={{ gap: '24px' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '14px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>Step 01</div>
                <h4 style={{ fontSize: '1.1rem', margin: '0 0 8px' }}>Browse & Submit Request</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
                  Clients browse verified contractors or submit a trade request via the Client Portal.
                </p>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '14px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.8rem', color: '#FFD166', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>Step 02</div>
                <h4 style={{ fontSize: '1.1rem', margin: '0 0 8px' }}>Automated AI Matching</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
                  LeadFast AI evaluates request parameters and sends direct notifications to matched businesses.
                </p>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '14px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>Step 03</div>
                <h4 style={{ fontSize: '1.1rem', margin: '0 0 8px' }}>Instant Lead Delivery</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
                  Contractors view job details immediately in their dashboard and connect directly with clients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Transition CTA Banner */}
        <section className="container" style={{ paddingBottom: '60px', textAlign: 'center' }}>
          <div className="panel card" style={{ padding: '40px 24px', background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.12), transparent 70%), var(--panel)' }}>
            <h2 style={{ fontSize: '1.8rem', margin: '0 0 12px' }}>
              Ready to Get Started?
            </h2>
            <p style={{ color: '#94a3b8', maxWidth: '540px', margin: '0 auto 28px' }}>
              Log in to access your business dashboard or submit a client service request today.
            </p>
            <Link href="/login" className="shiny-green-btn">
              Proceed to Login Page →
            </Link>
          </div>
        </section>
      </main>

      {/* Website Owner Contact & Footer */}
      <footer id="contact" style={{ background: 'rgba(11, 19, 36, 0.95)', borderTop: '1px solid var(--border)', padding: '60px 0 30px' }}>
        <div className="container">
          <div className="grid grid-2" style={{ gap: '40px', marginBottom: '40px', alignItems: 'start' }}>
            
            {/* Owner Info & Details */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <img src="/icon.svg" alt="LeadFast AI" style={{ width: '28px', height: '28px' }} />
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>
                  LeadFast AI
                </h3>
              </div>
              <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '0.95rem', maxWidth: '480px', margin: '0 0 20px' }}>
                LeadFast AI is an enterprise AI automation solution built specifically for contractors and service marketplace operations. Powered by Ivula Technologies.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span className="badge">✓ Verified Platform</span>
                <span className="badge warn">⚡ 24/7 AI Dispatch</span>
              </div>
            </div>

            {/* Owner Contacts Grid */}
            <div className="panel card" style={{ padding: '24px', background: 'rgba(15, 23, 42, 0.8)' }}>
              <h3 style={{ fontSize: '1.2rem', margin: '0 0 16px' }}>
                Website Owner & Support Contact
              </h3>
              
              <div style={{ display: 'grid', gap: '14px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.2rem' }}>🏢</span>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>Website Owner / Company</div>
                    <div style={{ fontWeight: '600', color: '#f8fafc' }}>Ivula Technologies</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.2rem' }}>💬</span>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>Phone / WhatsApp</div>
                    <a href="https://wa.me/254743761460" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', fontWeight: '500' }}>
                      +254 743 761 460
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.2rem' }}>📧</span>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>Email Address</div>
                    <div style={{ color: '#38bdf8', fontWeight: '500' }}>
                      <a href="mailto:contact@ivula.co.ke" style={{ color: '#38bdf8' }}>contact@ivula.co.ke</a> / <a href="mailto:ivula@gmail.com" style={{ color: '#38bdf8' }}>ivula@gmail.com</a>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.2rem' }}>📍</span>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>Office Address</div>
                    <div style={{ color: '#cbd5e1' }}>
                      Emperor Plaza, 05 Koinange Street, Nairobi, Kenya
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.2rem' }}>⏰</span>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>Support Hours</div>
                    <div style={{ color: '#cbd5e1' }}>
                      Mon - Fri: 8:00 AM - 6:00 PM EAT (24/7 AI Automation)
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.85rem', color: '#64748b' }}>
            <div>
              © {new Date().getFullYear()} LeadFast AI. All rights reserved. Owned & Operated by Ivula Technologies.
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link href="/login" style={{ color: '#94a3b8' }}>Login</Link>
              <Link href="/client" style={{ color: '#94a3b8' }}>Client Directory</Link>
              <a href="#contact" style={{ color: '#94a3b8' }}>Contacts</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
