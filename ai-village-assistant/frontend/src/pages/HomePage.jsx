import { useState, useEffect, useRef } from "react"

const SCHEMES = [
  { icon: "🌾", name: "PM Kisan", benefit: "₹6000/year", cat: "Farmer" },
  { icon: "🏥", name: "Ayushman Bharat", benefit: "₹5L cover", cat: "Health" },
  { icon: "🏠", name: "PM Awas", benefit: "₹1.2L grant", cat: "Housing" },
  { icon: "💳", name: "Kisan Credit Card", benefit: "₹3L loan", cat: "Farmer" },
  { icon: "🔥", name: "PM Ujjwala", benefit: "Free LPG", cat: "Women" },
  { icon: "👧", name: "Sukanya Samridhi", benefit: "8.2% interest", cat: "Women" },
  { icon: "💰", name: "PM Mudra", benefit: "₹10L loan", cat: "Business" },
  { icon: "⛏️", name: "MGNREGA", benefit: "100 days work", cat: "Employment" },
  { icon: "📚", name: "Skill India", benefit: "Free training", cat: "Education" },
  { icon: "🏦", name: "Jan Dhan", benefit: "Zero balance", cat: "Banking" },
  { icon: "👴", name: "Atal Pension", benefit: "₹5000/month", cat: "Pension" },
  { icon: "🍚", name: "PM Garib Kalyan", benefit: "5kg free grain", cat: "Food" },
]

const STATS = [
  { num: "60+", label: "Govt Schemes", icon: "📋" },
  { num: "3", label: "Languages", icon: "🌐" },
  { num: "800M+", label: "Rural Indians", icon: "🇮🇳" },
  { num: "₹0", label: "Cost to User", icon: "💚" },
]

const FEATURES = [
  { icon: "🎤", title: "Voice Enabled", desc: "Speak in Hindi, Marathi or English and get instant answers in your language" },
  { icon: "🤖", title: "AI Powered", desc: "Llama 3.3 70B LLM with RAG pipeline for accurate, grounded responses" },
  { icon: "🌐", title: "Multilingual", desc: "Auto-detects Hindi, Marathi, English — no manual selection needed" },
  { icon: "📋", title: "60+ Schemes", desc: "Complete database of central and state government schemes" },
  { icon: "⚡", title: "Instant Answers", desc: "Step-by-step guidance with documents and helpline numbers" },
  { icon: "🔒", title: "Secure & Free", desc: "Personal login, chat history saved, completely free forever" },
]

export default function HomePage({ setPage }) {
  const [scrollY, setScrollY] = useState(0)
  const [visible, setVisible] = useState({})
  const [activeScheme, setActiveScheme] = useState(0)
  const [typedText, setTypedText] = useState("")
  const heroRef = useRef(null)

  const phrases = ["PM Kisan yojana ke liye kaun eligible hai?", "आयुष्मान भारत कार्ड कैसे बनाएं?", "मनरेगा जॉब कार्ड कसे मिळवायचे?", "How to apply for PM Awas Yojana?"]
  const phraseRef = useRef(0)
  const charRef = useRef(0)
  const deletingRef = useRef(false)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      const phrase = phrases[phraseRef.current]
      if (!deletingRef.current) {
        if (charRef.current < phrase.length) {
          setTypedText(phrase.slice(0, charRef.current + 1))
          charRef.current++
        } else {
          setTimeout(() => { deletingRef.current = true }, 1800)
        }
      } else {
        if (charRef.current > 0) {
          setTypedText(phrase.slice(0, charRef.current - 1))
          charRef.current--
        } else {
          deletingRef.current = false
          phraseRef.current = (phraseRef.current + 1) % phrases.length
        }
      }
    }, 60)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScheme(p => (p + 1) % SCHEMES.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.id]: true }))
      }), { threshold: 0.15 }
    )
    document.querySelectorAll("[data-animate]").forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ fontFamily: "'Tiro Devanagari Hindi', 'DM Sans', sans-serif", background: "#0a0f0a", color: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&family=DM+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0f0a; }
        ::-webkit-scrollbar-thumb { background: #2e7d32; border-radius: 3px; }
        .fade-up { opacity: 0; transform: translateY(40px); transition: all 0.7s cubic-bezier(0.16,1,0.3,1); }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .fade-up.delay-1 { transition-delay: 0.1s; }
        .fade-up.delay-2 { transition-delay: 0.2s; }
        .fade-up.delay-3 { transition-delay: 0.3s; }
        .fade-up.delay-4 { transition-delay: 0.4s; }
        .fade-up.delay-5 { transition-delay: 0.5s; }
        .fade-up.delay-6 { transition-delay: 0.6s; }
        .btn-glow { position: relative; overflow: hidden; }
        .btn-glow::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(76,175,80,0.3) 0%, transparent 70%); opacity: 0; transition: opacity 0.3s; }
        .btn-glow:hover::before { opacity: 1; }
        .scheme-card { transition: all 0.3s cubic-bezier(0.16,1,0.3,1); }
        .scheme-card:hover { transform: translateY(-8px) scale(1.02); }
        .feature-card { transition: all 0.3s cubic-bezier(0.16,1,0.3,1); }
        .feature-card:hover { transform: translateY(-6px); border-color: rgba(76,175,80,0.5) !important; }
        .nav-link { transition: color 0.2s; cursor: pointer; }
        .nav-link:hover { color: #4caf50; }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(1.8); opacity: 0; } }
        @keyframes grain { 0%,100% { transform: translate(0,0); } 10% { transform: translate(-2%,-3%); } 20% { transform: translate(-5%,2%); } 30% { transform: translate(3%,-4%); } 40% { transform: translate(-2%,6%); } 50% { transform: translate(-6%,2%); } 60% { transform: translate(4%,0); } 70% { transform: translate(-1%,4%); } 80% { transform: translate(3%,3%); } 90% { transform: translate(1%,-1%); } }
        @keyframes scroll-x { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee { animation: scroll-x 25s linear infinite; display: flex; gap: 16px; width: max-content; }
        .marquee:hover { animation-play-state: paused; }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .shimmer-text { background: linear-gradient(90deg, #4caf50, #8bc34a, #cddc39, #4caf50); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 3s linear infinite; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 50 ? "rgba(10,15,10,0.95)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid rgba(76,175,80,0.15)" : "none",
        transition: "all 0.3s", padding: "0 5%"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, background: "linear-gradient(135deg,#1b5e20,#4caf50)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🌾</div>
            <span style={{ fontFamily: "Playfair Display", fontSize: 22, fontWeight: 700, color: "#fff" }}>GramSetu AI</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {[
              { label: "Features", id: "features" },
              { label: "Schemes", id: "schemes" },
              { label: "About", id: "about" }
            ].map(l => (
              <span 
                key={l.label} 
                className="nav-link" 
                onClick={() => {
                  const element = document.getElementById(l.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.7)", cursor: "pointer" }}>
                {l.label}
              </span>
            ))}
            <button onClick={() => setPage("login")} style={{ background: "transparent", border: "1px solid rgba(76,175,80,0.5)", color: "#4caf50", padding: "8px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.background = "rgba(76,175,80,0.1)"; e.target.style.borderColor = "#4caf50" }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(76,175,80,0.5)" }}>
              Login
            </button>
            <button onClick={() => setPage("register")} className="btn-glow" style={{ background: "linear-gradient(135deg,#2e7d32,#4caf50)", border: "none", color: "#fff", padding: "8px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 20px rgba(76,175,80,0.3)" }}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "0 5%" }}>
        {/* Background */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(46,125,50,0.25) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "20%", right: "5%", width: 500, height: 500, background: "radial-gradient(circle, rgba(76,175,80,0.08) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 300, height: 300, background: "radial-gradient(circle, rgba(139,195,74,0.06) 0%, transparent 70%)", borderRadius: "50%" }} />

        {/* Grid lines */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(76,175,80,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(76,175,80,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", paddingTop: 100 }}>
          {/* Left */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(76,175,80,0.1)", border: "1px solid rgba(76,175,80,0.3)", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
              <span style={{ width: 8, height: 8, background: "#4caf50", borderRadius: "50%", display: "inline-block", boxShadow: "0 0 8px #4caf50" }} />
              <span style={{ fontSize: 13, color: "#4caf50", fontWeight: 500 }}>AI-Powered • Free Forever • Multilingual</span>
            </div>

            <h1 style={{ fontFamily: "Playfair Display", fontSize: "clamp(42px,5vw,64px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>
              <span style={{ color: "#fff" }}>Bridging Villages</span><br />
              <span className="shimmer-text">to Government</span><br />
              <span style={{ color: "#fff" }}>Schemes</span>
            </h1>

            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 32, maxWidth: 480 }}>
              GramSetu AI helps rural Indians discover and apply for 60+ government schemes in <strong style={{ color: "rgba(255,255,255,0.9)" }}>Hindi, Marathi and English</strong> using voice or text.
            </p>

            {/* Typing demo */}
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: 12, padding: "14px 18px", marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18 }}>🎤</span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", fontFamily: "'Tiro Devanagari Hindi', 'DM Sans', sans-serif", flex: 1, minHeight: 22 }}>
                {typedText}<span style={{ borderRight: "2px solid #4caf50", animation: "none", opacity: 1 }}>&nbsp;</span>
              </span>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={() => setPage("register")} className="btn-glow" style={{ background: "linear-gradient(135deg,#2e7d32,#4caf50)", border: "none", color: "#fff", padding: "14px 28px", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 32px rgba(76,175,80,0.35)", display: "flex", alignItems: "center", gap: 8 }}>
                Start for Free 
              </button>
              <button onClick={() => setPage("login")} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", padding: "14px 28px", borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.1)"}
                onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.05)"}>
                Already have account →
              </button>
            </div>
          </div>

          {/* Right - Floating UI mockup */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div style={{ width: 380, animation: "float 4s ease-in-out infinite" }}>
              {/* Chat window mockup */}
              <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: 20, overflow: "hidden", backdropFilter: "blur(20px)" }}>
                {/* Header */}
                <div style={{ background: "linear-gradient(135deg,#1b5e20,#2e7d32)", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, background: "rgba(255,255,255,0.2)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌾</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>GramSetu AI</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ width: 6, height: 6, background: "#4caf50", borderRadius: "50%", display: "inline-block" }} />
                      Online • Hindi • Marathi • English
                    </div>
                  </div>
                </div>
                {/* Messages */}
                <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ alignSelf: "flex-end", background: "linear-gradient(135deg,#2e7d32,#4caf50)", borderRadius: "14px 14px 4px 14px", padding: "10px 14px", maxWidth: "80%", fontSize: 13, color: "#fff" }}>
                    PM Kisan ke liye eligible kaun hai? 🌾
                  </div>
                  <div style={{ alignSelf: "flex-start", background: "rgba(255,255,255,0.08)", borderRadius: "14px 14px 14px 4px", padding: "10px 14px", maxWidth: "85%", fontSize: 12, color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                    <strong style={{ color: "#4caf50" }}>PM Kisan Eligibility:</strong><br />
                    ✅ Small &amp; marginal farmers<br />
                    ✅ Land up to 2 hectares<br />
                    ✅ Valid Aadhar + Bank account<br />
                    📞 Helpline: 155261
                  </div>
                  {/* Active scheme card */}
                  <div style={{ background: "rgba(76,175,80,0.1)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, transition: "all 0.4s" }}>
                    <span style={{ fontSize: 24 }}>{SCHEMES[activeScheme].icon}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{SCHEMES[activeScheme].name}</div>
                      <div style={{ fontSize: 11, color: "#4caf50" }}>💰 {SCHEMES[activeScheme].benefit}</div>
                    </div>
                    <div style={{ marginLeft: "auto", background: "rgba(76,175,80,0.2)", borderRadius: 6, padding: "2px 8px", fontSize: 10, color: "#4caf50", fontWeight: 600 }}>{SCHEMES[activeScheme].cat}</div>
                  </div>
                </div>
                {/* Input */}
                <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 8 }}>
                  <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                    Ask in Hindi, Marathi or English...
                  </div>
                  <div style={{ width: 34, height: 34, background: "linear-gradient(135deg,#2e7d32,#4caf50)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🎤</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS MARQUEE */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(76,175,80,0.04)", padding: "20px 0", overflow: "hidden" }}>
        <div className="marquee">
          {[...SCHEMES, ...SCHEMES].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(76,175,80,0.15)", borderRadius: 100, padding: "8px 18px", whiteSpace: "nowrap", flexShrink: 0 }}>
              <span>{s.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{s.name}</span>
              <span style={{ fontSize: 12, color: "#4caf50" }}>• {s.benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section style={{ padding: "80px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
          {STATS.map((s, i) => (
            <div key={i} data-animate id={`stat-${i}`} className={`fade-up delay-${i + 1} ${visible[`stat-${i}`] ? "visible" : ""}`}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.15)", borderRadius: 16, padding: "32px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontFamily: "Playfair Display", fontSize: 44, fontWeight: 900, color: "#4caf50", marginBottom: 4 }}>{s.num}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "80px 5%", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div data-animate id="feat-title" className={`fade-up ${visible["feat-title"] ? "visible" : ""}`}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#4caf50", letterSpacing: 2, textTransform: "uppercase" }}>Why GramSetu AI</span>
              <h2 style={{ fontFamily: "Playfair Display", fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, marginTop: 12, marginBottom: 16 }}>Built for <em>Rural India</em></h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 500, margin: "0 auto" }}>Everything a village-level user needs — no English required, no smartphone expertise needed</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {FEATURES.map((f, i) => (
              <div key={i} data-animate id={`feat-${i}`} className={`fade-up delay-${i + 1} feature-card ${visible[`feat-${i}`] ? "visible" : ""}`}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 24px" }}>
                <div style={{ width: 48, height: 48, background: "rgba(76,175,80,0.1)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: "#fff" }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEMES GRID */}
      <section id="schemes" style={{ padding: "80px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <h2 style={{ fontFamily: "Playfair Display", fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, marginBottom: 12 }}>60+ Schemes <span className="shimmer-text">Covered</span></h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)" }}>From agriculture to health, housing to education — we have it all</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {SCHEMES.map((s, i) => (
              <div key={i} className="scheme-card" data-animate id={`sc-${i}`} className={`scheme-card fade-up delay-${(i % 4) + 1} ${visible[`sc-${i}`] ? "visible" : ""}`}
                style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${activeScheme === i ? "rgba(76,175,80,0.5)" : "rgba(255,255,255,0.07)"}`, borderRadius: 14, padding: "20px 18px", cursor: "pointer", background: activeScheme === i ? "rgba(76,175,80,0.08)" : "rgba(255,255,255,0.03)" }}
                onClick={() => setPage("register")}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: "#4caf50", fontWeight: 600, marginBottom: 6 }}>{s.benefit}</div>
                <div style={{ fontSize: 11, background: "rgba(76,175,80,0.1)", color: "rgba(255,255,255,0.5)", borderRadius: 6, padding: "2px 8px", display: "inline-block" }}>{s.cat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="about" style={{ padding: "80px 5%" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", background: "linear-gradient(135deg,rgba(27,94,32,0.4),rgba(76,175,80,0.15))", border: "1px solid rgba(76,175,80,0.3)", borderRadius: 24, padding: "64px 40px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, background: "radial-gradient(circle,rgba(76,175,80,0.15),transparent)", borderRadius: "50%" }} />
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌾</div>
          <h2 style={{ fontFamily: "Playfair Display", fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, marginBottom: 16 }}>
            Your government benefits<br /><em style={{ color: "#4caf50" }}>are waiting for you</em>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
            Join thousands of rural Indians who discovered schemes worth lakhs with GramSetu AI
          </p>
          <button onClick={() => setPage("register")} className="btn-glow" style={{ background: "linear-gradient(135deg,#2e7d32,#4caf50)", border: "none", color: "#fff", padding: "16px 36px", borderRadius: 12, fontSize: 18, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 32px rgba(76,175,80,0.4)" }}>
            Start Free — No Credit Card 
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "40px 5%", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#1b5e20,#4caf50)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🌾</div>
          <span style={{ fontFamily: "Playfair Display", fontSize: 18, fontWeight: 700 }}>GramSetu AI</span>
        </div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>Built with ❤️ for Rural India • Hindi • Marathi • English • Free Forever</p>
      </footer>
    </div>
  )
}
