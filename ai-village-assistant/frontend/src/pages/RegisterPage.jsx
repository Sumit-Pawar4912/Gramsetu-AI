import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const API = "http://127.0.0.1:8000"

export default function RegisterPage({ setPage }) {
  const { login } = useContext(AuthContext)
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", language: "hindi", state: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState(1)

  const STATES = ["Maharashtra"]

  const nextStep = () => {
    if (!form.name.trim()) return setError("Please enter your name")
    if (!form.email.trim()) return setError("Please enter email")
    if (!form.email.includes("@")) return setError("Invalid email address")
    setError(""); setStep(2)
  }

  const handle = async (e) => {
    e.preventDefault()
    if (form.password.length < 6) return setError("Password must be at least 6 characters")
    if (form.password !== form.confirm) return setError("Passwords do not match")
    setLoading(true); setError("")
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password, language: form.language, state: form.state })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || "Registration failed")
      login(data.user, data.token)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f0a", display: "flex", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .input-field { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 14px 16px; color: #fff; font-size: 15px; font-family: 'DM Sans', sans-serif; outline: none; transition: all 0.2s; }
        .input-field:focus { border-color: rgba(76,175,80,0.6); background: rgba(76,175,80,0.05); box-shadow: 0 0 0 3px rgba(76,175,80,0.1); }
        .input-field::placeholder { color: rgba(255,255,255,0.3); }
        .input-field option { background: #1a2e1a; color: #fff; }
        .submit-btn { width: 100%; background: linear-gradient(135deg,#2e7d32,#4caf50); border: none; color: #fff; padding: 15px; border-radius: 12px; font-size: 16px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; box-shadow: 0 4px 24px rgba(76,175,80,0.35); }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(76,175,80,0.45); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .lang-btn { flex: 1; padding: 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.6); cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; transition: all 0.2s; text-align: center; }
        .lang-btn.active { border-color: rgba(76,175,80,0.6); background: rgba(76,175,80,0.1); color: #4caf50; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      `}</style>

      {/* Left Panel */}
      <div style={{ flex: 1, background: "linear-gradient(135deg,#0d1f0d,#1a2e1a,#0d1f0d)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 60, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(76,175,80,0.06) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "20%", width: 250, height: 250, background: "radial-gradient(circle,rgba(76,175,80,0.1),transparent)", borderRadius: "50%", animation: "float 6s ease-in-out infinite" }} />

        <div style={{ position: "relative", textAlign: "center", maxWidth: 380 }}>
          <div style={{ fontSize: 64, marginBottom: 24, animation: "float 4s ease-in-out infinite" }}>🌾</div>
          <h2 style={{ fontFamily: "Playfair Display", fontSize: 32, color: "#fff", marginBottom: 12, fontWeight: 700 }}>Join GramSetu AI</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 40 }}>Get personalized guidance on government schemes in your language — completely free</p>

          {/* Progress steps */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 32 }}>
            {[{n:1,l:"Basic Info"},{n:2,l:"Security"}].map(s => (
              <div key={s.n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", border: `2px solid ${step >= s.n ? "#4caf50" : "rgba(255,255,255,0.2)"}`, background: step >= s.n ? "rgba(76,175,80,0.2)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: step >= s.n ? "#4caf50" : "rgba(255,255,255,0.3)", transition: "all 0.3s" }}>
                  {step > s.n ? "✓" : s.n}
                </div>
                <span style={{ fontSize: 11, color: step >= s.n ? "#4caf50" : "rgba(255,255,255,0.3)", fontWeight: 500 }}>{s.l}</span>
              </div>
            ))}
          </div>

          {/* Benefits */}
          {["Free access to 60+ schemes", "Voice in Hindi, Marathi, English", "Save chat history", "Step-by-step guidance"].map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, textAlign: "left" }}>
              <span style={{ width: 20, height: 20, background: "rgba(76,175,80,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#4caf50", flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ width: 520, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 44px", overflowY: "auto" }}>
        <div style={{ width: "100%", maxWidth: 400, animation: "fadeIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards" }}>
          <button onClick={() => setPage("home")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 14, marginBottom: 32, display: "flex", alignItems: "center", gap: 6, padding: 0 }}
            onMouseEnter={e => e.target.style.color = "#fff"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}>
            ← Back to Home
          </button>

          <h2 style={{ fontFamily: "Playfair Display", fontSize: 30, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Create Account</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>Step {step} of 2 — {step === 1 ? "Basic information" : "Set your password"}</p>

          {/* Step progress bar */}
          <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, marginBottom: 28, overflow: "hidden" }}>
            <div style={{ height: "100%", width: step === 1 ? "50%" : "100%", background: "linear-gradient(90deg,#2e7d32,#4caf50)", borderRadius: 2, transition: "width 0.4s ease" }} />
          </div>

          {error && (
            <div style={{ background: "rgba(239,83,80,0.1)", border: "1px solid rgba(239,83,80,0.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: 14, color: "#ef5350" }}>
              ⚠️ {error}
            </div>
          )}

          {step === 1 ? (
            <div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}>Full Name</label>
                <input className="input-field" placeholder="Your full name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}>Email Address</label>
                <input className="input-field" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}>State</label>
                <select className="input-field" value={form.state} onChange={e => setForm(p => ({ ...p, state: e.target.value }))}>
                  <option value="">Select your state</option>
                  {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 10, display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}>Preferred Language</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {[{v:"marathi",l:"मराठी",e:"🟠"},{v:"hindi",l:"हिंदी",e:"🇮🇳"},{v:"english",l:"English",e:"🔵"}].map(lang => (
                    <button key={lang.v} type="button" className={`lang-btn ${form.language === lang.v ? "active" : ""}`}
                      onClick={() => setForm(p => ({ ...p, language: lang.v }))}>
                      {lang.e} {lang.l}
                    </button>
                  ))}
                </div>
              </div>
              <button className="submit-btn" onClick={nextStep}>Continue →</button>
            </div>
          ) : (
            <form onSubmit={handle}>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}>Password</label>
                <input className="input-field" type="password" placeholder="Min. 6 characters" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
                {form.password && (
                  <div style={{ marginTop: 8, display: "flex", gap: 4 }}>
                    {[1,2,3,4].map(i => (
                      <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: form.password.length >= i * 2 ? (form.password.length >= 8 ? "#4caf50" : "#ff9800") : "rgba(255,255,255,0.1)", transition: "all 0.2s" }} />
                    ))}
                  </div>
                )}
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}>Confirm Password</label>
                <input className="input-field" type="password" placeholder="Re-enter password" value={form.confirm} onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))} />
                {form.confirm && form.password !== form.confirm && (
                  <p style={{ fontSize: 12, color: "#ef5350", marginTop: 6 }}>⚠️ Passwords do not match</p>
                )}
                {form.confirm && form.password === form.confirm && form.password.length >= 6 && (
                  <p style={{ fontSize: 12, color: "#4caf50", marginTop: 6 }}>✅ Passwords match!</p>
                )}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button type="button" onClick={() => { setStep(1); setError("") }} style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", padding: 14, borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>← Back</button>
                <button className="submit-btn" type="submit" disabled={loading} style={{ flex: 2 }}>
                  {loading ? "Creating account..." : "Create Account 🚀"}
                </button>
              </div>
            </form>
          )}

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>Already have an account? </span>
            <button onClick={() => setPage("login")} style={{ background: "none", border: "none", color: "#4caf50", fontSize: 14, fontWeight: 600, cursor: "pointer", padding: 0 }}>Login →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
