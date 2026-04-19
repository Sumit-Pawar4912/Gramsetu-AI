import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const API = "http://127.0.0.1:8000"

export default function LoginPage({ setPage }) {
  const { login } = useContext(AuthContext)
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPass, setShowPass] = useState(false)

  const handle = async (e) => {
    e.preventDefault()
    setLoading(true); setError("")
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || "Login failed")
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
        .submit-btn { width: 100%; background: linear-gradient(135deg,#2e7d32,#4caf50); border: none; color: #fff; padding: 15px; border-radius: 12px; font-size: 16px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; box-shadow: 0 4px 24px rgba(76,175,80,0.35); }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(76,175,80,0.45); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }
      `}</style>

      {/* Left Panel */}
      <div style={{ flex: 1, background: "linear-gradient(135deg,#0d1f0d 0%,#1a2e1a 50%,#0d1f0d 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 60, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(76,175,80,0.06) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div style={{ position: "absolute", top: "20%", left: "20%", width: 300, height: 300, background: "radial-gradient(circle,rgba(76,175,80,0.12),transparent)", borderRadius: "50%", animation: "float 5s ease-in-out infinite" }} />

        <div style={{ position: "relative", textAlign: "center", maxWidth: 380 }}>
          <div style={{ width: 80, height: 80, background: "linear-gradient(135deg,#1b5e20,#4caf50)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 24px", boxShadow: "0 12px 40px rgba(76,175,80,0.3)" }}>🌾</div>
          <h1 style={{ fontFamily: "Playfair Display", fontSize: 36, fontWeight: 700, color: "#fff", marginBottom: 12 }}>GramSetu AI</h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 40 }}>Your AI-powered guide to 60+ government schemes in Hindi, Marathi and English</p>

          {/* Feature pills */}
          {["🎤 Voice Input/Output", "🌐 Auto Language Detection", "📋 60+ Govt Schemes", "⚡ Step-by-step Guidance"].map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: 10, padding: "10px 16px", marginBottom: 10, textAlign: "left" }}>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div style={{ width: 480, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 40px", position: "relative" }}>
        <div style={{ width: "100%", maxWidth: 380, animation: "fadeIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards" }}>
          {/* Back */}
          <button onClick={() => setPage("home")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 14, marginBottom: 32, display: "flex", alignItems: "center", gap: 6, padding: 0 }}
            onMouseEnter={e => e.target.style.color = "#fff"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}>
            ← Back to Home
          </button>

          <h2 style={{ fontFamily: "Playfair Display", fontSize: 32, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Welcome back</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginBottom: 36 }}>Login to access your GramSetu AI account</p>

          {error && (
            <div style={{ background: "rgba(239,83,80,0.1)", border: "1px solid rgba(239,83,80,0.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: 14, color: "#ef5350", display: "flex", alignItems: "center", gap: 8 }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handle}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}>Email Address</label>
              <input className="input-field" type="email" placeholder="you@example.com" value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}>Password</label>
              <div style={{ position: "relative" }}>
                <input className="input-field" type={showPass ? "text" : "password"} placeholder="Enter your password" value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required style={{ paddingRight: 44 }} />
                <button type="button" onClick={() => setShowPass(p => !p)}
                  style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "rgba(255,255,255,0.4)" }}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login to GramSetu AI →"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>Don't have an account? </span>
            <button onClick={() => setPage("register")} style={{ background: "none", border: "none", color: "#4caf50", fontSize: 14, fontWeight: 600, cursor: "pointer", padding: 0 }}>Register free →</button>
          </div>

          {/* Demo credentials */}
          <div style={{ marginTop: 24, background: "rgba(76,175,80,0.06)", border: "1px solid rgba(76,175,80,0.15)", borderRadius: 10, padding: "12px 16px" }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Demo credentials:</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Email: <code style={{ color: "#4caf50" }}>demo@gramsetu.ai</code></p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Password: <code style={{ color: "#4caf50" }}>demo123</code></p>
          </div>
        </div>
      </div>
    </div>
  )
}
