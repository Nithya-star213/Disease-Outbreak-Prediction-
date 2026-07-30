# 🩺 PulseWatch India - Disease Outbreak Intelligence Platform

Developed by **Department of Artificial Intelligence & Data Science, S.A. Engineering College**

---

## 🚀 How to Run in VS Code on Localhost

### Method 1: Python Built-In Localhost Server (Recommended - Zero Installation Needed)

1. Open VS Code and open the extracted project folder (`pulsewatch_light`).
2. Open a terminal in VS Code (`Ctrl + ~` or `Terminal -> New Terminal`).
3. Run the local server command:
   ```bash
   python3 server.py
   ```
   *(Or on Windows: `python server.py`)*
4. The server will launch automatically at:
   👉 **`http://localhost:8000/login.html`**

---

### Method 2: Live Server Extension in VS Code

1. Install the **Live Server** extension by *Ritwick Dey* in VS Code extensions (`Ctrl+Shift+X` / `Cmd+Shift+X`).
2. Right-click **`frontend/web/login.html`** in VS Code File Explorer.
3. Click **"Open with Live Server"**.

---

### Method 3: Direct Browser Execution

Double click **`frontend/web/login.html`** in your system file explorer to open it directly in Google Chrome / Edge / Firefox.

---

## 🔑 Access Portal Credentials & Validation Rules

- **Email**: Must end with **`@pulsewatch.io`** (e.g. `doctor@pulsewatch.io` or `user@pulsewatch.io`). Inputs start blank.
- **Password**: Must be **5 to 8 numeric digits** (e.g. `12345`). Inputs start blank.

---

## 📂 Project Structure

```
pulsewatch_light/
├── frontend/
│   └── web/
│       ├── login.html              # Clean Access Portal Login
│       ├── index.html              # Home Page & Differential Diagnosis Engine
│       ├── symptom-checker.html    # Guided Symptom Assessment Wizard
│       ├── map.html                # Leaflet Outbreak Map & Sidebar Hotspots
│       ├── signals.html            # Real-Time Disease Signals Feed & Search
│       ├── forecast.html           # 7-Day Ensemble LSTM & XGBoost Predictive Engine
│       ├── about.html              # Architecture Deep-Dive & Academic R&D Team
│       ├── css/
│       │   ├── style.css           # Enterprise Design Token System
│       │   └── chatbot.css         # Scoped Chatbot Widget Styling
│       └── js/
│           ├── api.js              # Mock Data API & Signals Feed Dataset
│           ├── auth.js             # Blank Input & Strict Format Validation
│           ├── chatbot.js          # Conversational Medical NLP Engine
│           ├── india_map.js        # Vector Map Dataset
│           ├── lang.js             # Pure English Language Engine
│           └── patient_search.js   # Diagnostic Consultation Search Logic
├── server.py                       # Python Localhost Web Server Script
├── requirements.txt                # Optional Dependencies File
├── .vscode/
│   └── launch.json                 # VS Code 1-Click Debug Launcher
└── README.md                       # Complete Project Documentation
```
