'use client';

import { useEffect, useState } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { useRouter } from 'next/navigation';
import { supabaseAnon as supabase, hasSupabaseConfig } from '@/lib/supabase';

interface Business {
  id: string;
  business_name: string;
}

type Step = 'role_select' | 'auth_form';

export default function LoginPage() {
  const [welcomeTitle, welcomeDone] = useTypewriter('Welcome to LeadFast AI', 60, 200);
  const [contractorTitle, contractorDone] = useTypewriter('Contractor Login', 60, 200);
  const [signUpTitle, signUpDone] = useTypewriter('Contractor Sign‑Up', 60, 200);
  const [step, setStep] = useState<Step>('role_select');
  const [role, setRole] = useState<'contractor' | 'client' | null>(null);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [businessTrade, setBusinessTrade] = useState('');
  const [businessContactEmail, setBusinessContactEmail] = useState('');
  const [businessContactPhone, setBusinessContactPhone] = useState('');
  const [businessPlan, setBusinessPlan] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBizId, setSelectedBizId] = useState('');
  const [showBizSelect, setShowBizSelect] = useState(false);

  useEffect(() => {
    const session = window.localStorage.getItem('hvap-session');
    const logoutMessage = window.localStorage.getItem('hvap-logout-message');
    if (logoutMessage) {
      setMessage(logoutMessage);
      window.localStorage.removeItem('hvap-logout-message');
    } else if (session) {
      setMessage('You are signing in as a contractor.');
    }
  }, []);

  function handleSelectRole(selectedRole: 'contractor' | 'client') {
    setRole(selectedRole);
    if (selectedRole === 'client') {
      router.push('/client');
    } else {
      setStep('auth_form');
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (!hasSupabaseConfig || !supabase) throw new Error('Supabase configuration missing.');

      if (isSignUp) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;
        if (signUpData.user?.identities && signUpData.user.identities.length === 0) {
          throw new Error('An account with this email already exists. Please sign in instead.');
        }
        const userId = signUpData.user?.id;
        if (!userId) throw new Error('User ID not returned after sign‑up.');

        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            business_name: businessName,
            trade: businessTrade,
            contact_email: businessContactEmail || email,
            contact_phone: businessContactPhone,
            plan: businessPlan || null
          }),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || 'Failed to create business.');

        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData.session) {
          setMessage('Business registered! Please check your email to confirm your account before signing in.');
          setLoading(false);
          return;
        }
        window.localStorage.setItem('hvap-session', JSON.stringify(sessionData.session));
        window.localStorage.setItem('hvap-user', JSON.stringify(signUpData.user));
        window.localStorage.setItem('hvap-business', JSON.stringify({ id: result.id, name: result.business_name }));
        setMessage('Account created! Redirecting to your dashboard…');
        router.replace('/dashboard');
        return;
      }

      if (useMagicLink) {
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) throw error;
        setMessage('Check your email for the magic sign‑in link!');
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      if (data.session) {
        window.localStorage.setItem('hvap-session', JSON.stringify(data.session));
        window.localStorage.setItem('hvap-user', JSON.stringify(data.user));

        const bizRes = await fetch('/api/my-businesses', {
          headers: { Authorization: `Bearer ${data.session.access_token}` }
        });
        const bizData = await bizRes.json();
        const bizList = Array.isArray(bizData) ? bizData : [];
        setBusinesses(bizList);

        if (bizList.length === 0) {
          router.replace('/dashboard');
          return;
        }
        if (bizList.length === 1) {
          window.localStorage.setItem('hvap-business', JSON.stringify({ id: bizList[0].id, name: bizList[0].business_name }));
          router.replace('/dashboard');
          return;
        }
        setSelectedBizId(bizList[0].id);
        setShowBizSelect(true);
      }
    } catch (err: any) {
      setMessage(err.message || 'Unable to sign in / sign up.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundImage: `linear-gradient(to bottom, rgba(7, 17, 31, 0.82), rgba(7, 17, 31, 0.92)), url('/images/roofing.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <section className="container" style={{ padding: '40px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
        
        {/* Main Interactive Card: Role Selection / Auth */}
        <div className="panel card" style={{ width: '100%', maxWidth: '580px', padding: '32px' }}>
          
          {step === 'role_select' ? (
            <div>
              <h1 style={{ margin: '0 0 8px', fontSize: '2.2rem', minHeight: '1.2em' }}>
                {welcomeTitle}
                <span style={{ display: 'inline-block', width: '2px', height: '0.8em', background: '#38bdf8', marginLeft: '3px', verticalAlign: 'middle', borderRadius: '2px', opacity: welcomeDone ? 0 : 1, animation: welcomeDone ? 'none' : 'blink 0.9s step-end infinite', transition: 'opacity 0.4s ease' }} />
              </h1>
              <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
              <p style={{ color: '#38bdf8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.24em', marginBottom: '16px' }}>
                Contractor & Client Access Portal
              </p>
              <h2 style={{ margin: '0 0 12px', fontSize: '1.4rem' }}>How would you like to proceed?</h2>
              <p style={{ color: '#94a3b8', marginBottom: '28px', lineHeight: '1.5' }}>
                Please select your role to be directed to the appropriate portal.
              </p>

              <div style={{ display: 'grid', gap: '18px' }}>
                <button
                  type="button"
                  onClick={() => handleSelectRole('contractor')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '20px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.25), rgba(56, 189, 248, 0.12))',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    color: 'white',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 8px 24px rgba(2, 6, 23, 0.3)'
                  }}
                >
                  <img
                    src="/images/appliance.png"
                    alt="Contractor Icon"
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '14px',
                      objectFit: 'cover',
                      border: '2px solid #38bdf8',
                      boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)',
                      flexShrink: 0
                    }}
                  />
                  <div>
                    <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#f8fafc', display: 'block', marginBottom: '2px' }}>
                      I am a Contractor
                    </span>
                    <span style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: '1.4', display: 'block' }}>
                      Sign in to your private dashboard to view your business leads and metrics.
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectRole('client')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '20px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.08))',
                    border: '1px solid rgba(52, 211, 153, 0.4)',
                    color: 'white',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 8px 24px rgba(2, 6, 23, 0.3)'
                  }}
                >
                  <img
                    src="/images/client.jpg"
                    alt="Client Icon"
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '14px',
                      objectFit: 'cover',
                      border: '2px solid #34d399',
                      boxShadow: '0 4px 14px rgba(52, 211, 153, 0.35)',
                      flexShrink: 0
                    }}
                  />
                  <div>
                    <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#f8fafc', display: 'block', marginBottom: '2px' }}>
                      I am a Client / Lead
                    </span>
                    <span style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: '1.4', display: 'block' }}>
                      Browse available contractors by trade and submit a service request.
                    </span>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <button
                type="button"
                onClick={() => setStep('role_select')}
                style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', padding: 0, marginBottom: '16px', fontSize: '0.9rem' }}
              >
                ← Back to role selection
              </button>

              <p style={{ color: '#38bdf8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.24em', marginBottom: '6px' }}>
                Contractor Access
              </p>
              <h1 style={{ margin: '0 0 8px', fontSize: '1.75rem', minHeight: '1.2em' }}>
                {isSignUp ? signUpTitle : contractorTitle}
                <span style={{ display: 'inline-block', width: '2px', height: '0.8em', background: '#38bdf8', marginLeft: '3px', verticalAlign: 'middle', borderRadius: '2px', opacity: (isSignUp ? signUpDone : contractorDone) ? 0 : 1, animation: (isSignUp ? signUpDone : contractorDone) ? 'none' : 'blink 0.9s step-end infinite', transition: 'opacity 0.4s ease' }} />
              </h1>
              
              <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
                <button
                  type="button"
                  data-plain="true"
                  onClick={() => { setIsSignUp(!isSignUp); setShowBizSelect(false); }}
                  style={{ background: 'transparent', border: '1px solid #38bdf8', color: '#38bdf8', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  {isSignUp ? 'Switch to Login' : 'Create Account'}
                </button>
              </div>

              {showBizSelect && businesses.length > 0 ? (
                <div style={{ display: 'grid', gap: '12px' }}>
                  <label style={{ display: 'grid', gap: '6px' }}>
                    <span>Select Business</span>
                    <select value={selectedBizId} onChange={(e) => setSelectedBizId(e.target.value)}>
                      {businesses.map((biz) => (
                        <option key={biz.id} value={biz.id}>{biz.business_name}</option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    className="btn"
                    style={{ color: 'white', padding: '10px 14px' }}
                    onClick={() => {
                      const chosen = businesses.find((b) => b.id === selectedBizId);
                      window.localStorage.setItem('hvap-business', JSON.stringify({ id: selectedBizId, name: chosen?.business_name }));
                      router.replace('/dashboard');
                    }}
                  >
                    Continue to Dashboard
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px' }}>
                  <label style={{ display: 'grid', gap: '6px' }}>
                    <span>Email</span>
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contractor@company.com" />
                  </label>

                  {!isSignUp && (
                    <button
                      type="button"
                      data-plain="true"
                      onClick={() => setUseMagicLink(!useMagicLink)}
                      style={{ fontSize: '0.8rem', background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', textAlign: 'left' }}
                    >
                      {useMagicLink ? 'Switch to Password' : 'Use Magic Link instead'}
                    </button>
                  )}

                  {(!useMagicLink || isSignUp) && (
                    <label style={{ display: 'grid', gap: '6px' }}>
                      <span>Password</span>
                      <input required={!useMagicLink} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                    </label>
                  )}

                  {isSignUp && (
                    <>
                      <label style={{ display: 'grid', gap: '6px' }}>
                        <span>Business Name</span>
                        <input required type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Acme Plumbing Co." />
                      </label>
                      <label style={{ display: 'grid', gap: '6px' }}>
                        <span>Trade</span>
                        <input type="text" value={businessTrade} onChange={(e) => setBusinessTrade(e.target.value)} placeholder="e.g. Plumbing, HVAC, Electrical" />
                      </label>
                      <label style={{ display: 'grid', gap: '6px' }}>
                        <span>Business Contact Email</span>
                        <input type="email" value={businessContactEmail} onChange={(e) => setBusinessContactEmail(e.target.value)} placeholder="info@acme.com" />
                      </label>
                      <label style={{ display: 'grid', gap: '6px' }}>
                        <span>Contact Phone</span>
                        <input type="tel" value={businessContactPhone} onChange={(e) => setBusinessContactPhone(e.target.value)} placeholder="+1 555 1234" />
                      </label>
                      <label style={{ display: 'grid', gap: '6px' }}>
                        <span>Plan</span>
                        <select value={businessPlan} onChange={(e) => setBusinessPlan(e.target.value)}>
                          <option value="">Select a plan (optional)</option>
                          <option value="starter">Starter</option>
                          <option value="pro">Pro</option>
                          <option value="enterprise">Enterprise</option>
                        </select>
                      </label>
                    </>
                  )}

                  <button
                    type="submit"
                    className="btn"
                    style={{ color: 'white', padding: '12px 16px', marginTop: '6px' }}
                    disabled={loading}
                  >
                    {loading ? 'Processing…' : isSignUp ? 'Sign Up' : useMagicLink ? 'Send Magic Link' : 'Sign In'}
                  </button>
                </form>
              )}

              {message && (
                <p role="alert" style={{
                  marginTop: '12px',
                  color: message.includes('Unable') || message.includes('failed') || message.includes('Failed') || message.includes('exists') || message.includes('missing')
                    ? '#fca5a5'
                    : message.startsWith('Account') || message.includes('registered') || message.includes('created')
                    ? '#86efac'
                    : '#38bdf8'
                }}>
                  {message}
                </p>
              )}
            </div>
          )}

        </div>

      </section>

      {/* Website Owner / Company Footer Details */}
      <footer style={{ background: '#090d16', borderTop: '1px solid var(--border)', padding: '32px 16px 24px', marginTop: '40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '24px' }}>
            <div>
              <h3 style={{ margin: '0 0 8px', color: '#f8fafc', fontSize: '1.1rem', fontWeight: '700' }}>LeadFast AI</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0, maxWidth: '320px' }}>
                Instant AI lead response and scheduling automation system for home service professionals. Powered by Ivula Technologies.
              </p>
            </div>
            <div style={{ display: 'grid', gap: '8px', fontSize: '0.88rem', color: '#cbd5e1' }}>
              <strong style={{ color: '#38bdf8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ivula Technologies Contact</strong>
              <div>🏢 <strong>Website / Owner:</strong> Ivula Technologies</div>
              <div>💬 <strong>Phone / WhatsApp:</strong> <a href="https://wa.me/254743761460" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none' }}>+254 743 761 460</a></div>
              <div>✉️ <strong>Email:</strong> <a href="mailto:contact@ivula.co.ke" style={{ color: '#94a3b8', textDecoration: 'none' }}>contact@ivula.co.ke</a> / <a href="mailto:ivula@gmail.com" style={{ color: '#94a3b8', textDecoration: 'none' }}>ivula@gmail.com</a></div>
              <div>📍 <strong>Address:</strong> Emperor Plaza, 05 Koinange Street, Nairobi, Kenya</div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', color: '#64748b', fontSize: '0.8rem' }}>
            <span>© {new Date().getFullYear()} LeadFast AI. All rights reserved. Owned & Operated by Ivula Technologies.</span>
            <span>HVAP Contractor Portal & Client Marketplace</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
