import { useState, useRef, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"

const API = "http://127.0.0.1:8000"

const ALL_SCHEMES = [
  // FARMER (10)
  { id: 1,  name: "PM Kisan Samman Nidhi",       icon: "🌾", category: "Farmer",     question: "PM Kisan scheme ke liye eligibility kya hai?",              helpline: "155261",        benefit: "₹6000/year" },
  { id: 2,  name: "Fasal Bima Yojana",            icon: "🌱", category: "Farmer",     question: "Fasal Bima Yojana mein kaise register kare?",               helpline: "1800180551",    benefit: "Crop insurance" },
  { id: 3,  name: "Kisan Credit Card",            icon: "💳", category: "Farmer",     question: "Kisan Credit Card kaise milega?",                           helpline: "1800115526",    benefit: "₹3L @7%" },
  { id: 4,  name: "PM Krishi Sinchai Yojana",     icon: "💧", category: "Farmer",     question: "PM Krishi Sinchai Yojana mein irrigation subsidy kaise milegi?", helpline: "1800-180-1551", benefit: "55% subsidy" },
  { id: 5,  name: "Soil Health Card",             icon: "🧪", category: "Farmer",     question: "Soil Health Card kaise banaye?",                            helpline: "1800-180-1551", benefit: "Free soil test" },
  { id: 6,  name: "eNAM Digital Market",          icon: "📱", category: "Farmer",     question: "eNAM portal par crop kaise sell kare?",                     helpline: "1800-270-0224", benefit: "Better prices" },
  { id: 7,  name: "PM Kisan Maandhan",            icon: "🧑‍🌾", category: "Farmer",   question: "PM Kisan Maandhan pension yojana kya hai?",                 helpline: "1800-267-6888", benefit: "₹3000/month" },
  { id: 8,  name: "Kisan Vikas Patra",            icon: "📈", category: "Farmer",     question: "Kisan Vikas Patra mein invest kaise kare?",                 helpline: "1800-11-2011",  benefit: "Doubles in 115m" },
  { id: 9,  name: "Paramparagat Krishi Vikas",    icon: "🌿", category: "Farmer",     question: "Paramparagat Krishi organic farming scheme kya hai?",       helpline: "1800-180-1551", benefit: "₹50000/hectare" },
  { id: 10, name: "PM KUSUM Solar Pump",          icon: "☀️", category: "Farmer",     question: "PM KUSUM solar pump yojana ke liye kaise apply kare?",      helpline: "1800-180-3333", benefit: "60% subsidy" },
  // HEALTH (7)
  { id: 11, name: "Ayushman Bharat PMJAY",        icon: "🏥", category: "Health",     question: "Ayushman Bharat scheme kya hai aur card kaise banaye?",     helpline: "14555",         benefit: "₹5L cover" },
  { id: 12, name: "PM Surakshit Matritva",        icon: "🤱", category: "Health",     question: "PM Surakshit Matritva Abhiyan mein free checkup kab milega?", helpline: "104",          benefit: "Free checkup" },
  { id: 13, name: "Janani Suraksha Yojana",       icon: "👶", category: "Health",     question: "Janani Suraksha Yojana mein Rs 1400 cash kaise milega?",    helpline: "104",           benefit: "₹1400 cash" },
  { id: 14, name: "PM Janaushadhi",               icon: "💊", category: "Health",     question: "PM Janaushadhi Kendra se sasti dawa kaise milegi?",         helpline: "1800-111-255",  benefit: "90% cheaper" },
  { id: 15, name: "Poshan Abhiyaan",              icon: "🥗", category: "Health",     question: "Poshan Abhiyaan se nutrition support kaise milega?",        helpline: "1800-11-8004",  benefit: "Free nutrition" },
  { id: 16, name: "Rashtriya Bal Swasthya",       icon: "👦", category: "Health",     question: "Rashtriya Bal Swasthya Karyakram mein bachon ko kya milega?", helpline: "104",          benefit: "Free treatment" },
  { id: 17, name: "National Health Mission",      icon: "🩺", category: "Health",     question: "National Health Mission se free medicines kaise milegi?",   helpline: "1800-11-8004",  benefit: "Free medicines" },
  // HOUSING (6)
  { id: 18, name: "PM Awas Yojana (Rural)",       icon: "🏠", category: "Housing",    question: "PM Awas Yojana rural ke liye kaise apply kare?",            helpline: "1800116446",    benefit: "₹1.2L grant" },
  { id: 19, name: "PM Awas Yojana (Urban)",       icon: "🏙️", category: "Housing",   question: "PM Awas Yojana urban mein subsidy kaise milegi?",            helpline: "1800116446",    benefit: "₹2.67L subsidy" },
  { id: 20, name: "Swachh Bharat Mission",        icon: "🚽", category: "Housing",    question: "Swachh Bharat mein toilet subsidy kaise milegi?",           helpline: "1969",          benefit: "₹12000" },
  { id: 21, name: "PM SVAMITVA Yojana",           icon: "📜", category: "Housing",    question: "PM Svamitva Yojana kya hai property card ke liye?",         helpline: "Gram Panchayat",benefit: "Property card" },
  { id: 22, name: "PMAY Credit Linked Subsidy",   icon: "🏡", category: "Housing",    question: "PMAY CLSS home loan interest subsidy kaise milegi?",        helpline: "1800-116-446",  benefit: "₹6.5L saved" },
  { id: 23, name: "Jal Jeevan Mission",           icon: "🚰", category: "Housing",    question: "Jal Jeevan Mission Har Ghar Jal free tap water kaise milega?", helpline: "1916",        benefit: "Free tap water" },
  // BANKING / FINANCIAL (12)
  { id: 24, name: "PM Jan Dhan Yojana",           icon: "🏦", category: "Banking",    question: "PM Jan Dhan zero balance account kaise khole?",             helpline: "1800-11-0001",  benefit: "Zero balance" },
  { id: 25, name: "PM Mudra Yojana",              icon: "💰", category: "Business",   question: "PM Mudra Yojana mein business loan kaise milega?",          helpline: "1800-180-1111", benefit: "₹10L loan" },
  { id: 26, name: "Atal Pension Yojana",          icon: "👴", category: "Pension",    question: "Atal Pension Yojana kya hai aur kaise join kare?",          helpline: "1800-110-069",  benefit: "₹5000/month" },
  { id: 27, name: "National Pension System",      icon: "📊", category: "Pension",    question: "NPS account kaise khole aur retire ke baad kitna milega?",  helpline: "1800-222-080",  benefit: "Market pension" },
  { id: 28, name: "PM Jeevan Jyoti Bima",         icon: "🛡️", category: "Insurance", question: "PM Jeevan Jyoti Bima Yojana Rs 2 lakh life cover kya hai?", helpline: "1800-180-1111", benefit: "₹2L @₹436/yr" },
  { id: 29, name: "PM Suraksha Bima Yojana",      icon: "🔰", category: "Insurance",  question: "PM Suraksha Bima accident insurance Rs 20 mein kaise milega?", helpline: "1800-180-1111", benefit: "₹2L @₹20/yr" },
  { id: 30, name: "Stand Up India",               icon: "💼", category: "Business",   question: "Stand Up India SC ST women ko business loan kaise milega?", helpline: "1800-11-0001",  benefit: "₹10L-₹1Cr" },
  { id: 31, name: "Senior Citizen Savings",       icon: "🏧", category: "Pension",    question: "Senior Citizen Savings Scheme 8.2 percent return kya hai?", helpline: "1800-11-2011",  benefit: "8.2% p.a." },
  { id: 32, name: "National Savings Certificate", icon: "📋", category: "Investment", question: "NSC National Savings Certificate post office mein kaise khole?", helpline: "1800-11-2011", benefit: "7.7% return" },
  { id: 33, name: "Sukanya Samridhi Yojana",      icon: "👧", category: "Women",      question: "Sukanya Samridhi Yojana beti ke liye kaise khole?",         helpline: "18002666868",   benefit: "8.2% interest" },
  { id: 34, name: "Aam Aadmi Bima Yojana",        icon: "👨‍👩‍👧", category: "Insurance", question: "Aam Aadmi Bima Yojana landless households ke liye kya hai?", helpline: "1800-33-4433", benefit: "₹75000 cover" },
  { id: 35, name: "PM Vaya Vandana Yojana",       icon: "🧓", category: "Pension",    question: "PM Vaya Vandana Yojana 60 saal ke baad pension kaise milega?", helpline: "1800-33-4433", benefit: "7.4% pension" },
  { id: 36, name: "Direct Benefit Transfer",      icon: "💸", category: "Banking",    question: "DBT Direct Benefit Transfer Aadhar bank se kaise link kare?", helpline: "1800-11-0001", benefit: "Direct to bank" },
  // WOMEN & CHILD (6)
  { id: 37, name: "PM Ujjwala Yojana",            icon: "🔥", category: "Women",      question: "PM Ujjwala Yojana free LPG connection ke liye kaun eligible hai?", helpline: "1906",      benefit: "Free LPG" },
  { id: 38, name: "Beti Bachao Beti Padhao",      icon: "👩‍🎓", category: "Women",    question: "Beti Bachao Beti Padhao scheme mein ladki ko kya milta hai?", helpline: "1091",         benefit: "Girl education" },
  { id: 39, name: "Mahila Shakti Kendra",         icon: "💪", category: "Women",      question: "Mahila Shakti Kendra se women empowerment kaise milega?",  helpline: "181",           benefit: "Skill training" },
  { id: 40, name: "PM Matru Vandana Yojana",      icon: "🤰", category: "Women",      question: "PM Matru Vandana PMMVY mein Rs 6000 maternity benefit kaise milega?", helpline: "1800-11-8004", benefit: "₹6000" },
  { id: 41, name: "One Stop Centre Sakhi",        icon: "🏪", category: "Women",      question: "One Stop Centre Sakhi women helpline 181 kya hai?",         helpline: "181",           benefit: "Free help 24x7" },
  { id: 42, name: "ICDS Anganwadi Services",      icon: "🍼", category: "Women",      question: "ICDS Anganwadi mein bachon aur mahilaon ko kya milta hai?", helpline: "1800-11-8004",  benefit: "Free nutrition" },
  // EDUCATION (7)
  { id: 43, name: "Scholarship Schemes NSP",      icon: "📚", category: "Education",  question: "NSP National Scholarship Portal par apply kaise kare?",     helpline: "0120-6619540",  benefit: "₹20000/year" },
  { id: 44, name: "Skill India PMKVY",            icon: "🎓", category: "Education",  question: "Skill India PMKVY free training kaise milegi?",             helpline: "1800-123-9626", benefit: "Free + ₹8000" },
  { id: 45, name: "PM e-VIDYA DIKSHA",            icon: "💻", category: "Education",  question: "PM e-VIDYA DIKSHA portal se free education kaise milegi?",  helpline: "1800-11-8004",  benefit: "Free online" },
  { id: 46, name: "Mid Day Meal PM POSHAN",       icon: "🍱", category: "Education",  question: "Mid Day Meal PM POSHAN school mein free lunch kya hai?",    helpline: "1800-11-8004",  benefit: "Free meals" },
  { id: 47, name: "NMMS Scholarship",             icon: "🏅", category: "Education",  question: "NMMS National Merit Scholarship Rs 12000 kaise milega?",    helpline: "0120-6619540",  benefit: "₹12000/year" },
  { id: 48, name: "Kasturba Gandhi Vidyalaya",    icon: "🏫", category: "Education",  question: "Kasturba Gandhi Balika Vidyalaya girls ko free hostel milega?", helpline: "1800-11-2661", benefit: "Free boarding" },
  { id: 49, name: "PM Gramin Digital Saksharta",  icon: "📲", category: "Education",  question: "PMGDISHA free digital literacy computer training kaise milegi?", helpline: "1800-3000-3468", benefit: "Free training" },
  // EMPLOYMENT (6)
  { id: 50, name: "MGNREGA Job Card",             icon: "⛏️", category: "Employment", question: "MGNREGA job card kaise banaye aur kaam kaise milega?",       helpline: "1800111555",    benefit: "100 days work" },
  { id: 51, name: "e-Shram Card",                 icon: "👷", category: "Employment", question: "e-Shram card unorganized workers ke liye kaise banaye?",    helpline: "14434",         benefit: "₹2L insurance" },
  { id: 52, name: "PM Rozgar Protsahan",          icon: "🏢", category: "Employment", question: "PM Rozgar Protsahan Yojana mein employer ko kya fayda hai?", helpline: "1800-11-2811", benefit: "12% EPF paid" },
  { id: 53, name: "DDU-GKY Skill Training",       icon: "🔧", category: "Employment", question: "DDU-GKY rural youth ko free skill training kab milegi?",    helpline: "1800-11-0001",  benefit: "Free + job" },
  { id: 54, name: "PM SVANidhi Street Vendor",    icon: "🛒", category: "Employment", question: "PM SVANidhi street vendor loan Rs 10000 kaise milega?",     helpline: "1800-11-1979",  benefit: "₹10k-₹50k" },
  { id: 55, name: "NRLM Aajeevika SHG",           icon: "👥", category: "Employment", question: "NRLM SHG Self Help Group mahilaon ke liye kaise banaye?",   helpline: "1800-11-0001",  benefit: "₹6L bank loan" },
  // FOOD (4)
  { id: 56, name: "PM Garib Kalyan Anna",         icon: "🍚", category: "Food",       question: "PM Garib Kalyan Anna Yojana 5kg free grain kaise milega?",  helpline: "1967",          benefit: "5kg free/month" },
  { id: 57, name: "National Food Security Act",   icon: "🌾", category: "Food",       question: "NFSA ration card se subsidized anaj Rs 2 mein kaise milega?", helpline: "1967",         benefit: "₹2-3/kg" },
  { id: 58, name: "One Nation One Ration Card",   icon: "🗂️", category: "Food",      question: "One Nation One Ration Card migrant workers ke liye kya fayda?", helpline: "1967",        benefit: "PDS anywhere" },
  { id: 59, name: "Antyodaya Anna Yojana",        icon: "🥣", category: "Food",       question: "Antyodaya Anna Yojana poorest families ko 35kg grain kaise milega?", helpline: "1967",   benefit: "35kg/month" },
  // UTILITY (4)
  { id: 60, name: "PM UJALA LED Scheme",          icon: "💡", category: "Utility",    question: "PM UJALA scheme mein saste LED bulb kaise milenge?",        helpline: "1800-180-3333", benefit: "LED @₹10-70" },
  { id: 61, name: "Saubhagya Free Electricity",   icon: "⚡", category: "Utility",    question: "Saubhagya scheme mein free electricity connection kaise milega?", helpline: "1800-166-6696", benefit: "Free connection" },
  { id: 62, name: "BharatNet Rural Broadband",    icon: "🌐", category: "Utility",    question: "BharatNet rural broadband internet kaise milega gaon mein?", helpline: "1800-425-1115", benefit: "100Mbps" },
  { id: 63, name: "PM Fasal Bima Rabi",           icon: "🌻", category: "Farmer",     question: "PM Fasal Bima Rabi crop wheat gram insurance kaise milega?", helpline: "1800-200-7710", benefit: "1.5% premium" },
]

const CAT_COLORS = {
  "Farmer": "#2e7d32", "Health": "#c62828", "Housing": "#1565c0",
  "Banking": "#e65100", "Business": "#6a1b9a", "Insurance": "#00695c",
  "Pension": "#37474f", "Investment": "#f57f17", "Women": "#ad1457",
  "Education": "#283593", "Employment": "#4e342e", "Food": "#558b2f", "Utility": "#0277bd",
}

function FormattedAnswer({ text }) {
  return (
    <div style={{ lineHeight: 1.8, fontSize: 14, fontFamily: "'Tiro Devanagari Hindi','DM Sans',sans-serif" }}>
      {text.split("\n").filter(l => l.trim()).map((line, i) => {
        const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong style='color:#4caf50'>$1</strong>")
        if (/^\d+\./.test(line.trim()))
          return <div key={i} style={{ padding: "7px 12px", margin: "4px 0", borderRadius: 8, background: "rgba(76,175,80,0.07)", borderLeft: "3px solid #4caf50", color: "rgba(255,255,255,0.85)" }} dangerouslySetInnerHTML={{ __html: bold }} />
        if (/^[\*\-•]/.test(line.trim()))
          return <div key={i} style={{ padding: "5px 12px", margin: "3px 0", borderRadius: 8, background: "rgba(255,255,255,0.04)", borderLeft: "3px solid rgba(76,175,80,0.35)", color: "rgba(255,255,255,0.75)" }} dangerouslySetInnerHTML={{ __html: "• " + bold.replace(/^[\*\-•]\s*/, "") }} />
        if (!line.trim()) return <br key={i} />
        return <p key={i} style={{ marginBottom: 6, color: "rgba(255,255,255,0.85)" }} dangerouslySetInnerHTML={{ __html: bold }} />
      })}
    </div>
  )
}

export default function ChatbotPage({ setPage }) {
  const { user, logout } = useContext(AuthContext)
  const [messages, setMessages] = useState([
    { role: "bot", text: `नमस्ते ${user?.name || ""}! 👋 मैं GramSetu AI हूँ। बाईं तरफ 63 सरकारी योजनाओं की सूची है — कोई भी योजना click करें या अपना सवाल यहाँ पूछें। Hindi, Marathi या English — जो चाहें!`, lang: "hindi" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [lang, setLang] = useState(user?.language || "hindi")
  const [activeTab, setActiveTab] = useState("schemes")
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedScheme, setSelectedScheme] = useState(null)

  const messagesEndRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const audioRef = useRef(null)

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])

  const categories = ["all", ...Object.keys(CAT_COLORS)]
  const filtered = ALL_SCHEMES.filter(s => {
    const ms = !search || s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      s.benefit.toLowerCase().includes(search.toLowerCase())
    return ms && (category === "all" || s.category === category)
  })

  const ask = async (q = input) => {
    if (!q.trim()) return
    setMessages(p => [...p, { role: "user", text: q }])
    setInput(""); setLoading(true); setActiveTab("chat")
    try {
      const res = await axios.post(`${API}/ask`, { question: q, language: lang },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      setMessages(p => [...p, { role: "bot", text: res.data.answer, lang: res.data.language }])
    } catch {
      setMessages(p => [...p, { role: "bot", text: "❌ Backend se connect nahi ho pa raha. Please check that uvicorn is running!", lang }])
    } finally { setLoading(false) }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []
      mediaRecorderRef.current.ondataavailable = e => audioChunksRef.current.push(e.data)
      mediaRecorderRef.current.onstop = async () => {
        stream.getTracks().forEach(t => t.stop()); setLoading(true)
        try {
          const form = new FormData()
          form.append("audio", new Blob(audioChunksRef.current, { type: "audio/wav" }), "rec.wav")
          const res = await axios.post(`${API}/voice-ask`, form, { responseType: "blob" })
          // Decode base64-encoded headers
          const decodeHeader = (b64) => {
            try {
              return atob(b64) ? new TextDecoder().decode(new Uint8Array(atob(b64).split('').map(c => c.charCodeAt(0)))) : b64
            } catch {
              return b64
            }
          }
          const q = decodeHeader(res.headers["x-question"]) || "Voice question"
          const ans = decodeHeader(res.headers["x-answer"]) || ""
          setMessages(p => [...p, { role: "user", text: `🎤 "${q}"` }, { role: "bot", text: ans, lang: res.headers["x-language"] || lang }])
          setAudioUrl(URL.createObjectURL(res.data))
        } catch { setMessages(p => [...p, { role: "bot", text: "❌ Voice processing failed. Please use text input.", lang }]) }
        finally { setLoading(false) }
      }
      mediaRecorderRef.current.start(); setIsRecording(true)
    } catch { alert("Microphone access denied!") }
  }

  const stopRecording = () => { if (mediaRecorderRef.current && isRecording) { mediaRecorderRef.current.stop(); setIsRecording(false) } }
  const LANG_LABELS = { marathi: "मराठी", hindi: "हिंदी", english: "English" }

  return (
    <div style={{ height: "100vh", background: "#0a0f0a", display: "flex", fontFamily: "'Tiro Devanagari Hindi','DM Sans',sans-serif", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:rgba(76,175,80,0.3);border-radius:3px}
        .si{transition:all 0.18s;cursor:pointer}.si:hover{background:rgba(76,175,80,0.08)!important;border-color:rgba(76,175,80,0.35)!important;transform:translateX(3px)}
        .si.sel{background:rgba(76,175,80,0.1)!important;border-color:rgba(76,175,80,0.5)!important}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
        @keyframes dots{0%,80%,100%{transform:scale(0.6);opacity:0.4}40%{transform:scale(1);opacity:1}}
        .d1{animation:dots 1.2s 0s infinite}.d2{animation:dots 1.2s 0.2s infinite}.d3{animation:dots 1.2s 0.4s infinite}
        @keyframes mi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .mi{animation:mi 0.25s ease forwards}
        .sb:hover:not(:disabled){transform:scale(1.06)!important}
      `}</style>

      {/* SIDEBAR */}
      <div style={{ width: sidebarOpen ? 310 : 0, minWidth: sidebarOpen ? 310 : 0, background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", overflow: "hidden", transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)", flexShrink: 0 }}>
        {/* Header */}
        <div style={{ padding: "16px 14px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 34, height: 34, background: "linear-gradient(135deg,#1b5e20,#4caf50)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>🌾</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "Playfair Display" }}>GramSetu AI</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>63 Government Schemes</div>
            </div>
          </div>
          <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: 9, padding: 3, gap: 3 }}>
            {[{ id: "schemes", l: "📋 Schemes" }, { id: "chat", l: "💬 Quick Ask" }].map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                style={{ flex: 1, padding: "7px 6px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: "'DM Sans',sans-serif", background: activeTab === t.id ? "linear-gradient(135deg,#2e7d32,#4caf50)" : "transparent", color: activeTab === t.id ? "#fff" : "rgba(255,255,255,0.4)", transition: "all 0.2s", boxShadow: activeTab === t.id ? "0 2px 8px rgba(76,175,80,0.25)" : "none" }}>
                {t.l}
              </button>
            ))}
          </div>
        </div>

        {/* SCHEMES TAB */}
        {activeTab === "schemes" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ padding: "10px 12px 6px", flexShrink: 0 }}>
              <div style={{ position: "relative", marginBottom: 8 }}>
                <span style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>🔍</span>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${ALL_SCHEMES.length} schemes...`}
                  style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 9, padding: "8px 10px 8px 28px", color: "#fff", fontSize: 12, outline: "none", fontFamily: "'DM Sans',sans-serif" }}
                  onFocus={e => e.target.style.borderColor = "rgba(76,175,80,0.4)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.07)"} />
              </div>
              {/* Category pills */}
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 6 }}>
                {categories.map(c => (
                  <button key={c} onClick={() => setCategory(c)}
                    style={{ padding: "2px 8px", borderRadius: 20, border: `1px solid ${category === c ? (CAT_COLORS[c] || "rgba(76,175,80,0.5)") : "rgba(255,255,255,0.07)"}`, background: category === c ? `${CAT_COLORS[c] || "#2e7d32"}22` : "transparent", color: category === c ? (CAT_COLORS[c] || "#4caf50") : "rgba(255,255,255,0.35)", cursor: "pointer", fontSize: 9, fontWeight: 600, fontFamily: "'DM Sans',sans-serif", transition: "all 0.15s", whiteSpace: "nowrap" }}>
                    {c === "all" ? "All" : c}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", textAlign: "right" }}>{filtered.length}/{ALL_SCHEMES.length}</div>
            </div>
            {/* List */}
            <div style={{ flex: 1, overflowY: "auto", padding: "0 8px 10px" }}>
              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: 20, color: "rgba(255,255,255,0.25)", fontSize: 12 }}>No schemes found</div>
              ) : filtered.map(s => (
                <div key={s.id} className={`si ${selectedScheme?.id === s.id ? "sel" : ""}`}
                  style={{ padding: "8px 9px", borderRadius: 9, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}
                  onClick={() => { setSelectedScheme(s); ask(s.question) }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{s.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.88)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.name}</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 2, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ fontSize: 10, color: "#4caf50" }}>💰 {s.benefit}</span>
                      <span style={{ fontSize: 9, background: `${CAT_COLORS[s.category] || "#2e7d32"}20`, color: CAT_COLORS[s.category] || "#4caf50", borderRadius: 4, padding: "1px 5px", fontWeight: 600 }}>{s.category}</span>
                    </div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.22)", marginTop: 1 }}>📞 {s.helpline}</div>
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.12)", fontSize: 12 }}>›</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHAT TAB */}
        {activeTab === "chat" && (
          <div style={{ flex: 1, padding: "12px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Language</div>
              {[{ v: "marathi", l: "🟠 मराठी" }, { v: "hindi", l: "🇮🇳 हिंदी" }, { v: "english", l: "🔵 English" }].map(l => (
                <button key={l.v} onClick={() => setLang(l.v)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: `1px solid ${lang === l.v ? "rgba(76,175,80,0.5)" : "rgba(255,255,255,0.07)"}`, background: lang === l.v ? "rgba(76,175,80,0.1)" : "transparent", color: lang === l.v ? "#4caf50" : "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 13, fontWeight: 600, textAlign: "left", fontFamily: "'Tiro Devanagari Hindi','DM Sans',sans-serif", transition: "all 0.2s", marginBottom: 5 }}>
                  {l.l}
                </button>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Quick Questions</div>
              {["PM Kisan ke liye eligible kaun hai?", "Ayushman Bharat card kaise banaye?", "MGNREGA job card kaise milega?", "Free LPG connection kaise milega?", "Sukanya Samridhi account kaise khole?", "e-Shram card kaise banaye?"].map((q, i) => (
                <button key={i} onClick={() => ask(q)}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "transparent", color: "rgba(255,255,255,0.45)", cursor: "pointer", fontSize: 11, textAlign: "left", marginBottom: 5, fontFamily: "'Tiro Devanagari Hindi','DM Sans',sans-serif", transition: "all 0.2s", lineHeight: 1.4 }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(76,175,80,0.07)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(76,175,80,0.3)" }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)" }}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* User footer */}
        <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div style={{ width: 30, height: 30, background: "linear-gradient(135deg,#2e7d32,#4caf50)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0, fontWeight: 700, color: "#fff" }}>{(user?.name || "U")[0].toUpperCase()}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.name || "User"}</div>
            <div style={{ fontSize: 10, color: "#4caf50" }}>{LANG_LABELS[lang]}</div>
          </div>
          <button onClick={logout} style={{ background: "rgba(239,83,80,0.08)", border: "1px solid rgba(239,83,80,0.18)", color: "#ef5350", padding: "4px 9px", borderRadius: 7, cursor: "pointer", fontSize: 10, fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>Logout</button>
        </div>
      </div>

      {/* MAIN CHAT */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setSidebarOpen(p => !p)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>☰</button>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>GramSetu AI Assistant</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 6, height: 6, background: "#4caf50", borderRadius: "50%", display: "inline-block", boxShadow: "0 0 5px #4caf50" }} />
                Online • 63 Schemes • {LANG_LABELS[lang]}
                {selectedScheme && <span style={{ color: CAT_COLORS[selectedScheme.category] || "#4caf50" }}> • {selectedScheme.icon} {selectedScheme.name}</span>}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            {[{ v: "marathi", l: "🟠 मराठी" }, { v: "hindi", l: "🇮🇳 हिंदी" }, { v: "english", l: "🔵 EN" }].map(l => (
              <button key={l.v} onClick={() => setLang(l.v)}
                style={{ padding: "5px 10px", borderRadius: 7, border: `1px solid ${lang === l.v ? "rgba(76,175,80,0.5)" : "rgba(255,255,255,0.08)"}`, background: lang === l.v ? "rgba(76,175,80,0.12)" : "transparent", color: lang === l.v ? "#4caf50" : "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: "'Tiro Devanagari Hindi','DM Sans',sans-serif", transition: "all 0.2s" }}>
                {l.l}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "18px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
          {messages.map((msg, i) => (
            <div key={i} className="mi" style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", gap: 9, alignItems: "flex-start" }}>
              {msg.role === "bot" && <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#1b5e20,#4caf50)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0, marginTop: 2 }}>🌾</div>}
              <div style={{ maxWidth: "74%", padding: msg.role === "user" ? "11px 15px" : "14px 16px", borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: msg.role === "user" ? "linear-gradient(135deg,#2e7d32,#4caf50)" : "rgba(255,255,255,0.05)", border: msg.role === "bot" ? "1px solid rgba(255,255,255,0.08)" : "none", color: "#fff", fontSize: 14, lineHeight: 1.6 }}>
                {msg.role === "bot" ? <FormattedAnswer text={msg.text} /> : msg.text}
                {msg.role === "bot" && msg.lang && (
                  <div style={{ marginTop: 8, paddingTop: 7, borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 10, color: "rgba(255,255,255,0.22)", display: "flex", justifyContent: "space-between" }}>
                    <span>🌐 {LANG_LABELS[msg.lang] || msg.lang}</span><span>GramSetu AI ✨</span>
                  </div>
                )}
              </div>
              {msg.role === "user" && <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#1565C0,#1976D2)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0, marginTop: 2, fontWeight: 700, color: "#fff" }}>{(user?.name || "U")[0].toUpperCase()}</div>}
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
              <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#1b5e20,#4caf50)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🌾</div>
              <div style={{ padding: "13px 16px", borderRadius: "16px 16px 16px 4px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 5 }}>
                {[0, 1, 2].map(i => <div key={i} className={`d${i + 1}`} style={{ width: 7, height: 7, borderRadius: "50%", background: "#4caf50" }} />)}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Audio bar */}
        {audioUrl && (
          <div style={{ padding: "7px 18px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 8, background: "rgba(76,175,80,0.03)", flexShrink: 0 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>🔊 Voice answer:</span>
            <button onClick={() => audioRef.current?.play()} style={{ background: "linear-gradient(135deg,#e65100,#ff8f00)", border: "none", color: "#fff", padding: "5px 12px", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>▶ Play</button>
            <button onClick={() => setAudioUrl(null)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: 15 }}>✕</button>
            <audio ref={audioRef} src={audioUrl} />
          </div>
        )}

        {/* Input */}
        <div style={{ padding: "12px 18px", borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 7, alignItems: "flex-end" }}>
            <button onClick={isRecording ? stopRecording : startRecording}
              style={{ width: 44, height: 44, borderRadius: 11, border: isRecording ? "none" : "1px solid rgba(255,255,255,0.09)", cursor: "pointer", fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: isRecording ? "linear-gradient(135deg,#c62828,#ef5350)" : "rgba(255,255,255,0.06)", animation: isRecording ? "pulse 1s infinite" : "none", transition: "all 0.2s" }}>
              {isRecording ? "⏹️" : "🎤"}
            </button>
            <textarea value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask() } }}
              placeholder={lang === "marathi" ? "योजनेबद्दल विचारा... (Enter पाठवा)" : lang === "hindi" ? "कोई भी सरकारी योजना के बारे में पूछें..." : "Ask about any of the 63 government schemes..."}
              rows={1} style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 11, padding: "12px 14px", color: "#fff", fontSize: 14, fontFamily: "'Tiro Devanagari Hindi','DM Sans',sans-serif", outline: "none", resize: "none", lineHeight: 1.5, transition: "border-color 0.2s" }}
              onFocus={e => e.target.style.borderColor = "rgba(76,175,80,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"} />
            <button onClick={() => ask()} disabled={loading || !input.trim()} className="sb"
              style={{ width: 44, height: 44, borderRadius: 11, border: "none", cursor: loading || !input.trim() ? "not-allowed" : "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: loading || !input.trim() ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg,#2e7d32,#4caf50)", color: "#fff", transition: "all 0.2s", boxShadow: !loading && input.trim() ? "0 4px 14px rgba(76,175,80,0.3)" : "none" }}>
              {loading ? "⏳" : "↑"}
            </button>
          </div>
          <div style={{ marginTop: 5, fontSize: 10, color: "rgba(255,255,255,0.15)", textAlign: "center" }}>Enter to send • Shift+Enter new line • 🎤 voice • Click any scheme in sidebar</div>
        </div>
      </div>
    </div>
  )
}