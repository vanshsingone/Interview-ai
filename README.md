<div align="center">

# 🎯 Interview AI

### Your AI-Powered Interview Preparation Companion

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Gemini](https://img.shields.io/badge/Gemini_2.5-Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

**Interview AI** analyzes job descriptions against your resume or self-description using **Google Gemini 2.5 Flash** to generate a personalized interview preparation strategy — complete with tailored questions, skill-gap analysis, a day-by-day study plan, and an AI-generated, ATS-friendly resume PDF.

[Features](#-features) · [Quick Start](#-quick-start) · [API Reference](#-api-reference) · [Architecture](#-architecture) · [Contributing](#-contributing)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Interview Reports** | Upload your resume (PDF) or write a quick self-description, paste a job description, and get a comprehensive interview preparation report powered by Gemini 2.5 Flash. |
| 📊 **Match Score** | Get a 0–100 compatibility score showing how well your profile aligns with the target role. |
| 💡 **Technical & Behavioral Q&A** | Receive curated interview questions with the *interviewer's intent* behind each question and a detailed *suggested answer strategy*. |
| 🔍 **Skill Gap Analysis** | Identify missing skills rated by severity (low / medium / high) so you know exactly where to focus. |
| 📅 **Day-by-Day Preparation Plan** | A structured, multi-day study roadmap with daily focus areas and actionable tasks. |
| 📄 **AI-Generated Resume PDF** | Generate a tailored, ATS-friendly resume PDF customized for the specific job description — downloadable in one click. |
| 🔐 **Secure Authentication** | Full JWT-based auth flow with registration, login, logout, and token blacklisting for secure sessions. |
| 📁 **Report History** | All generated reports are saved to your account — revisit any past interview plan anytime. |

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI library with hooks & context for state management |
| **React Router 7** | Client-side routing with protected routes |
| **Vite 8** | Lightning-fast dev server and build tool |
| **SCSS (Sass)** | Modular, feature-scoped styling |

### Backend
| Technology | Purpose |
|---|---|
| **Express 5** | HTTP server and REST API framework |
| **MongoDB + Mongoose 9** | NoSQL database with schema validation |
| **Google GenAI SDK** | Gemini 2.5 Flash for AI-powered content generation |
| **Zod** | Runtime schema validation with JSON schema conversion |
| **JWT + bcryptjs** | Authentication and password hashing |
| **Multer** | Multipart file upload handling (resume PDFs) |
| **pdf-parse** | Extract text content from uploaded PDF resumes |
| **Puppeteer** | Server-side HTML → PDF rendering for resume generation |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **MongoDB Atlas** account (or a local MongoDB instance)
- **Google AI API Key** — [Get one here](https://aistudio.google.com/apikey)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/interview-ai.git
cd interview-ai
```

### 2. Setup the Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` directory (use `.env.example` as reference):

```env
# MongoDB connection string
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# JWT secret key (generate a strong random string)
JWT_SECRET=your_jwt_secret_here

# Google Gemini API key
GOOGLE_GENAI_API_KEY=your_google_genai_api_key_here
```

Start the backend dev server:

```bash
npm run dev
```

The API server starts on **`http://localhost:3000`**.

### 3. Setup the Frontend

```bash
cd Frontend
npm install
npm run dev
```

The frontend dev server starts on **`http://localhost:5173`**.

### 4. Open the app

Navigate to [`http://localhost:5173`](http://localhost:5173) in your browser — you're all set! 🎉

---

## 📁 Project Structure

```
interview-ai/
├── Backend/
│   ├── server.js                          # Entry point — loads env, connects DB, starts Express
│   ├── .env.example                       # Template for environment variables
│   ├── package.json
│   └── src/
│       ├── app.js                         # Express app setup (CORS, routes, middleware)
│       ├── config/
│       │   └── database.js                # MongoDB connection via Mongoose
│       ├── controllers/
│       │   ├── auth.controller.js         # Register, login, logout, get-me handlers
│       │   └── interview.controller.js    # Generate report, get reports, resume PDF
│       ├── middlewares/
│       │   ├── auth.middleware.js          # JWT verification & token blacklist check
│       │   └── file.middleware.js          # Multer config for file uploads
│       ├── models/
│       │   ├── user.model.js              # User schema (username, email, password)
│       │   ├── blacklist.model.js          # Blacklisted JWT tokens
│       │   └── interviewReport.model.js   # Full interview report schema
│       ├── routes/
│       │   ├── auth.routes.js             # /api/auth/* endpoints
│       │   └── interview.routes.js        # /api/interview/* endpoints
│       └── services/
│           └── ai.service.js              # Gemini AI integration & PDF generation
│
├── Frontend/
│   ├── index.html                         # HTML entry point
│   ├── vite.config.js                     # Vite configuration
│   ├── package.json
│   └── src/
│       ├── main.jsx                       # React DOM root
│       ├── App.jsx                        # App shell with providers
│       ├── app.routes.jsx                 # Route definitions (public + protected)
│       ├── style.scss                     # Global SCSS styles
│       ├── index.css                      # Base CSS reset / tokens
│       └── features/
│           ├── auth/
│           │   ├── auth.context.jsx       # Auth context provider
│           │   ├── auth.form.scss         # Auth form styles
│           │   ├── components/
│           │   │   └── Protected.jsx      # Route guard component
│           │   ├── hooks/
│           │   │   └── useAuth.js         # Auth hook (login, register, logout)
│           │   ├── pages/
│           │   │   ├── Login.jsx          # Login page
│           │   │   └── Register.jsx       # Registration page
│           │   └── services/
│           │       └── auth.api.js        # Auth API calls
│           └── interview/
│               ├── interview.context.jsx  # Interview context provider
│               ├── hooks/
│               │   └── useInterview.js    # Interview hook (CRUD + PDF download)
│               ├── pages/
│               │   ├── Home.jsx           # Dashboard — create report + history
│               │   └── interview.jsx      # Report detail — Q&A, roadmap, scores
│               ├── services/
│               │   └── interview.api.js   # Interview API calls
│               └── style/
│                   ├── home.scss          # Home page styles
│                   └── interview.scss     # Interview detail page styles
│
├── .gitignore
└── README.md
```

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Login with email & password |
| `GET` | `/api/auth/logout` | Public | Logout & blacklist token |
| `GET` | `/api/auth/get-me` | Private | Get current user profile |

#### `POST /api/auth/register`

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### `POST /api/auth/login`

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

---

### Interview Reports

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/interview/` | Private | Generate a new interview report |
| `GET` | `/api/interview/` | Private | Get all reports for current user |
| `GET` | `/api/interview/report/:interviewId` | Private | Get a specific report by ID |
| `POST` | `/api/interview/resume/pdf/:interviewReportId` | Private | Generate & download a tailored resume PDF |

#### `POST /api/interview/` — Generate Interview Report

Send as `multipart/form-data`:

| Field | Type | Required | Description |
|---|---|---|---|
| `jobDescription` | `string` | ✅ | Full job description text |
| `selfDescription` | `string` | Optional | Brief self-description of your experience |
| `resume` | `file` | Optional | Resume PDF file upload |

> **Note:** Either `resume` or `selfDescription` (or both) must be provided.

**Response:**
```json
{
  "message": "Interview report generated successfully.",
  "interviewReport": {
    "_id": "...",
    "title": "Senior Frontend Engineer",
    "matchScore": 78,
    "technicalQuestions": [
      {
        "question": "Explain React's reconciliation algorithm.",
        "intention": "Assess deep understanding of React internals.",
        "answer": "Discuss the virtual DOM diffing process..."
      }
    ],
    "behavioralQuestions": [...],
    "skillGaps": [
      { "skill": "TypeScript", "severity": "medium" }
    ],
    "preparationPlan": [
      {
        "day": 1,
        "focus": "React Fundamentals",
        "tasks": ["Review hooks lifecycle", "Build a custom hook"]
      }
    ]
  }
}
```

---

## 🏗 Architecture

```
┌─────────────────────┐         ┌─────────────────────────────────┐
│                     │  HTTP   │            Backend              │
│   React Frontend    │◄───────►│  Express 5 REST API             │
│   (Vite + React 19) │  :5173  │  Port :3000                     │
│                     │         │                                 │
│  • Auth Pages       │         │  ┌───────────┐ ┌─────────────┐  │
│  • Home Dashboard   │         │  │  Auth      │ │  Interview  │  │
│  • Interview Report │         │  │  Routes    │ │  Routes     │  │
│  • Protected Routes │         │  └─────┬─────┘ └──────┬──────┘  │
│                     │         │        │              │         │
└─────────────────────┘         │  ┌─────▼──────────────▼──────┐  │
                                │  │     Controllers           │  │
                                │  └─────┬──────────────┬──────┘  │
                                │        │              │         │
                                │  ┌─────▼─────┐ ┌─────▼──────┐  │
                                │  │  MongoDB   │ │ AI Service │  │
                                │  │  (Mongoose)│ │ (Gemini)   │  │
                                │  └───────────┘ └─────┬──────┘  │
                                │                      │         │
                                │               ┌──────▼──────┐  │
                                │               │ Puppeteer   │  │
                                │               │ (PDF Gen)   │  │
                                │               └─────────────┘  │
                                └─────────────────────────────────┘
```

---

## 🔒 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `MONGO_URI` | ✅ | MongoDB connection string |
| `JWT_SECRET` | ✅ | Secret key for signing JWT tokens |
| `GOOGLE_GENAI_API_KEY` | ✅ | Google AI / Gemini API key |
| `FRONTEND_URL` | Optional | Frontend origin for CORS (defaults to `http://localhost:5173`) |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">

**Built with ❤️ using Google Gemini AI**

*Star ⭐ this repo if you found it helpful!*

</div>
