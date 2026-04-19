<div align="center">

# 🌾 GramSetu AI

### *Bridging Villages to Government Schemes*

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![LangChain](https://img.shields.io/badge/LangChain-RAG-1C3C3C?style=for-the-badge&logo=chainlink&logoColor=white)](https://langchain.com)
[![Groq](https://img.shields.io/badge/Groq-Llama_3.3_70B-F55036?style=for-the-badge&logo=meta&logoColor=white)](https://groq.com)


**A multilingual voice-enabled AI chatbot that helps rural Indian citizens discover and apply for 63+ government schemes in Hindi, Marathi, and English — completely free.**

[🚀 Live Demo](#) • [📖 Documentation](#installation) • [🐛 Report Bug](../../issues) • [✨ Request Feature](../../issues)

---

![GramSetu AI Banner](https://img.shields.io/badge/🌾_GramSetu_AI-Bridging_Villages_to_Government_Schemes-1B5E20?style=for-the-badge)

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Project](#running-the-project)
- [Project Structure](#-project-structure)
- [Government Schemes Covered](#-government-schemes-covered)
- [API Documentation](#-api-documentation)
- [How It Works](#-how-it-works)
- [Contributing](#-contributing)
- [Contact](#-contact)

---

## 🎯 About The Project

**GramSetu AI** (ग्रामसेतू AI) — *Gram* (Village) + *Setu* (Bridge) — is an AI-powered multilingual chatbot built as a Final Year Engineering project. It solves a critical real-world problem: **65% of India lives in rural areas, yet most government scheme information is only available in English, on complex government websites.**

### The Problem
- 📵 Villagers don't know about schemes worth **lakhs of rupees** they are eligible for
- 🌍 Language barrier — most info is in English only
- 🤝 Middlemen exploit villagers and charge fees for free services
- 📱 No single AI-powered platform with all schemes in local language

### Our Solution
GramSetu AI provides **step-by-step guidance** for 63+ government schemes in **Hindi, Marathi, and English** — with voice input/output support, making it accessible even for users who cannot read or type.

> *"Your government benefits are waiting for you — just ask in your language."*

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🌐 **Multilingual** | Auto-detects Hindi, Marathi, English — no manual selection |
| 🎤 **Voice I/O** | Speak your question, hear the answer — fully hands-free |
| 🤖 **RAG Pipeline** | Retrieval-Augmented Generation for accurate, grounded answers |
| 📋 **63+ Schemes** | Complete database across 13 categories |
| 🔍 **Smart Search** | Search and filter schemes by category |
| 🔒 **User Auth** | Register/Login with JWT, save language preferences |
| ⚡ **Fast** | Groq inference at 700+ tokens/second |
| 💰 **Zero Cost** | Free-tier APIs + offline embeddings = ₹0 running cost |
| 📱 **Responsive** | Works on desktop, tablet, and mobile |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI component library |
| **Vite 5** | Build tool and dev server |
| **Axios** | HTTP client |
| **Google Fonts** | Tiro Devanagari Hindi, DM Sans |

### Backend
| Technology | Purpose |
|---|---|
| **Python 3.10+** | Primary language |
| **FastAPI** | REST API framework |
| **Uvicorn** | ASGI server |
| **JWT (UUID tokens)** | Authentication |

### AI / ML
| Technology | Purpose |
|---|---|
| **LangChain** | RAG pipeline orchestration |
| **Groq API** | LLM inference (Llama 3.3 70B) |
| **HuggingFace Embeddings** | `paraphrase-multilingual-MiniLM-L12-v2` |
| **FAISS** | Vector similarity search |
| **OpenAI Whisper** | Speech-to-Text (Hindi/Marathi/English) |
| **gTTS** | Text-to-Speech synthesis |

---

## 📸 Screenshots

### 🏠 Home Page
> Dark-themed landing page with animated typing demo, floating chat mockup, scheme marquee, and feature highlights.

### 🔐 Login / Register
> Split-layout authentication with 2-step registration, language preference selection, and state selection.

### 💬 Chatbot
> Full chatbot interface with:
> - **Left sidebar** — 63 schemes, searchable, filterable by 13 categories
> - **Chat area** — Formatted multilingual answers with numbered steps
> - **Voice button** — Record and play voice queries/answers

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

```bash
# Check Python version (3.10+ required)
python --version

# Check Node.js version (18+ required)
node --version
npm --version
```

You will also need:
- **Groq API Key** (free) — https://console.groq.com
- **Git** installed on your system

---

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Sumit-Pawar4912/Gramsetu-AI.git
cd gramsetu-ai
```

**2. Setup Backend**
```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

**3. Setup Frontend**
```bash
cd ../frontend/gramsetu-ui
npm install
```

---

### Environment Variables

Create a `.env` file inside the `backend/` folder:

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` and add your API key:

```env
GROQ_API_KEY=your_groq_api_key_here
```

> **Get your free Groq API key:** https://console.groq.com → Sign up → API Keys → Create API Key
> 
> Free tier includes **14,400 requests/day** — more than enough!

---

### Running the Project

**Step 1 — Build the Vector Database (first time only)**
```bash
cd backend
python rag_pipeline.py
```
> ⏳ First run downloads the HuggingFace embedding model (~120 MB). Subsequent runs are fast (~8 seconds).

**Step 2 — Start the Backend**
```bash
cd backend
uvicorn main:app --reload
```
> ✅ Backend running at: http://127.0.0.1:8000

**Step 3 — Start the Frontend** *(open a new terminal)*
```bash
cd frontend/gramsetu-ui
npm run dev
```
> ✅ Frontend running at: http://localhost:5173

**Step 4 — Open in Browser**
```
http://localhost:5173
```

---

### Demo Credentials

You can use the built-in demo account to test without registering:

```
Email:    demo@gramsetu.ai
Password: demo123
```

---

## 📁 Project Structure

```
gramsetu-ai/
│
├── 📂 data/                          # Government scheme text files (63 files)
│   ├── pm_kisan.txt
│   ├── ayushman.txt
│   ├── mgnrega.txt
│   └── ... (63 scheme files total)
│
├── 📂 vector_db/                     # FAISS vector index (auto-generated)
│   └── schemes_db/
│       ├── index.faiss
│       └── index.pkl
│
├── 📂 backend/                       # FastAPI backend
│   ├── main.py                       # API endpoints + authentication
│   ├── rag_pipeline.py               # RAG pipeline implementation
│   ├── users.json                    # User database (auto-created)
│   ├── requirements.txt              # Python dependencies
│   └── .env                          # API keys (create this yourself)
│
├── 📂 frontend/
│   └── gramsetu-ui/                  # React + Vite frontend
│       ├── src/
│       │   ├── App.jsx               # Main router
│       │   ├── main.jsx              # Entry point
│       │   ├── context/
│       │   │   └── AuthContext.jsx   # Global auth state
│       │   └── pages/
│       │       ├── HomePage.jsx      # Landing page
│       │       ├── LoginPage.jsx     # Authentication
│       │       ├── RegisterPage.jsx  # User registration (2-step)
│       │       └── ChatbotPage.jsx   # Main chatbot UI (63 schemes)
│       ├── index.html
│       └── package.json
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 📋 Government Schemes Covered

<details>
<summary>🌾 Farmer Schemes (10)</summary>

| Scheme | Benefit |
|---|---|
| PM Kisan Samman Nidhi | ₹6000/year |
| Fasal Bima Yojana | Crop Insurance |
| Kisan Credit Card | ₹3L loan @7% |
| PM Krishi Sinchai Yojana | 55% irrigation subsidy |
| Soil Health Card | Free soil testing |
| eNAM | Online crop selling |
| PM Kisan Maandhan | ₹3000/month pension |
| Kisan Vikas Patra | Money doubles in 115 months |
| Paramparagat Krishi Vikas | ₹50000/hectare organic support |
| PM KUSUM Solar Pump | 60% solar pump subsidy |

</details>

<details>
<summary>🏥 Health Schemes (7)</summary>

| Scheme | Benefit |
|---|---|
| Ayushman Bharat PMJAY | ₹5 lakh health cover |
| PM Surakshit Matritva | Free antenatal checkup |
| Janani Suraksha Yojana | ₹1400 delivery cash |
| PM Janaushadhi | 90% cheaper medicines |
| Poshan Abhiyaan | Free nutrition support |
| Rashtriya Bal Swasthya | Free child treatment |
| National Health Mission | Free medicines |

</details>

<details>
<summary>🏠 Housing (6) • 💰 Financial (13) • 👩 Women & Child (6)</summary>

> PM Awas Yojana, Jal Jeevan Mission, PM Jan Dhan, Mudra Loan, Atal Pension, PM Jeevan Jyoti Bima, Sukanya Samridhi, Stand Up India, PM Ujjwala, Beti Bachao, One Stop Centre Sakhi, and many more...

</details>

<details>
<summary>📚 Education (7) • 👷 Employment (6) • 🍚 Food (4) • ⚡ Utility (4)</summary>

> Scholarship NSP, Skill India PMKVY, PM e-VIDYA, NMMS, MGNREGA, e-Shram Card, PM SVANidhi, NRLM, PM Garib Kalyan Anna, NFSA, PM UJALA, Saubhagya, BharatNet, and more...

</details>

**Total: 63 Schemes across 13 Categories**

---

## 📡 API Documentation

Once the backend is running, visit: **http://127.0.0.1:8000/docs** for the interactive Swagger UI.

### Key Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | ❌ | Register new user |
| `POST` | `/auth/login` | ❌ | Login and get token |
| `GET` | `/auth/me` | ✅ | Get current user |
| `POST` | `/ask` | ✅ | Ask text question (RAG) |
| `POST` | `/voice-ask` | ✅ | Voice query (Whisper + RAG + gTTS) |
| `GET` | `/health` | ❌ | Health check |

### Example API Call

```python
import requests

# Login
resp = requests.post("http://127.0.0.1:8000/auth/login", json={
    "email": "demo@gramsetu.ai",
    "password": "demo123"
})
token = resp.json()["token"]

# Ask a question
resp = requests.post("http://127.0.0.1:8000/ask",
    json={"question": "PM Kisan ke liye eligible kaun hai?", "language": "hindi"},
    headers={"Authorization": f"Bearer {token}"}
)
print(resp.json()["answer"])
```

---

## 🔄 How It Works

```
User Question (Text or Voice)
         │
         ▼
┌─────────────────────┐
│  Language Detection  │  Hindi / Marathi / English
│  (Keyword Scoring)  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  HuggingFace        │  paraphrase-multilingual-MiniLM-L12-v2
│  Sentence Embedding │  Question → 384-dim vector
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  FAISS Vector DB    │  Cosine similarity search
│  Semantic Search    │  Top-3 relevant scheme chunks
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Language-specific  │  Hindi / Marathi / English prompt
│  Prompt Template    │  Inject context + question
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Groq Llama 3.3 70B │  Generates multilingual answer
│  (14,400 req/day)   │  700+ tokens/second
└──────────┬──────────┘
           │
           ▼
    ✅ Multilingual Answer
    (Text + Optional Voice)
```

---

## 🤝 Contributing

Contributions make the open source community amazing! Any contributions are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ways to Contribute
- 📝 Add more government scheme `.txt` files to the `data/` folder
- 🌐 Add support for more Indian languages (Tamil, Telugu, Kannada, Bengali)
- 🐛 Report bugs or suggest features via Issues
- 📖 Improve documentation

---

## 📬 Contact

**Project:** GramSetu AI — Generative AI Project | B.Tech AI & Data Science 

**GitHub:** https://github.com/Sumit-Pawar4912/Gramsetu-AI.git

---

## 🙏 Acknowledgements

- [LangChain](https://langchain.com) — RAG pipeline framework
- [Groq](https://groq.com) — Ultra-fast free LLM inference
- [HuggingFace](https://huggingface.co) — Multilingual sentence embeddings
- [Meta AI](https://ai.meta.com) — Llama 3.3 70B model
- [OpenAI Whisper](https://github.com/openai/whisper) — Multilingual speech recognition
- [Facebook AI Research](https://github.com/facebookresearch/faiss) — FAISS vector search
- [FastAPI](https://fastapi.tiangolo.com) — Modern Python web framework

---

<div align="center">

Made with ❤️ for Rural India

**🌾 GramSetu AI — ग्रामसेतू AI — गावांना सरकारी योजनांशी जोडणारा सेतू**

*Hindi • Marathi • English*

⭐ Star this repo if you found it helpful!

</div>
