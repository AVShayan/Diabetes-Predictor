--- 🩺 Diabetes Predictor Desktop App

A Full-stack cross-platform Desktop application that predicts the likelihood of *Type 1 Diabetes* based on medical input parameters.  
This project combines Machine Learning, FastAPI, Node.js, and Electron into one integrated solution — complete with PDF report generation and offline support.

---

--- 🚀 Features

✅ Predicts diabetes risk using a trained ML model  
✅ Beautiful Electron-based desktop UI (Windows & macOS)  
✅ Node.js backend acting as middleware between Electron and FastAPI  
✅ Generates detailed PDF reports using Puppeteer  
✅ FastAPI ML model deployed on Render  
✅ Cross-platform installer (.exe / .dmg) built with Electron Builder  

---

🧠 Machine Learning Model

- *Dataset:* Kaggle Diabetes dataset  
- *Tech:* Python, scikit-learn, pandas, numpy  
- *Algorithms Tested:* Logistic Regression, Random Forest, XGBoost, LightGBM  
- *Optimization:* Class balancing, feature scaling, and hyperparameter tuning  
- *Deployment:* Model served as a REST API using *FastAPI* and deployed on *Render*

---
⚙️ Architecture Overview



Electron (Frontend UI)
↓
Node.js (Backend Middleware)
↓
FastAPI (ML Model API)



*Flow:*
1. User enters health data in the Electron app.  
2. Electron sends input to Node backend.  
3. Node forwards the data to FastAPI (hosted on Render).  
4. FastAPI returns prediction (0 = Non-Diabetic, 1 = Diabetic).  
5. Node generates a *PDF report* and sends it back to Electron.  
6. Electron displays the result and allows auto-download of the report.

---

🪟 Tech Stack

| Layer | Technology |
|-------|-------------|
| *Machine Learning* | Python, scikit-learn, pandas, numpy |
| *API* | FastAPI, Render |
| *Backend* | Node.js, Express, Puppeteer |
| *Frontend* | Electron, HTML, CSS, JavaScript |
| *Deployment* | Render (API), Electron Builder (App Packaging) |

---

🧾 PDF Report Generation

The backend (Node.js) uses *Puppeteer* to convert HTML templates into professional PDF reports that include:
- Patient input details  
- Model prediction result  
- Date and session info  
- Branded app logo and summary  

---

🧩 Project Structure



diabetes-predictor/
│
├── backend/           # Node.js backend (handles API + PDF)
│   ├── server.js
│   ├── routes/
│   └── utils/
│
├── frontend/          # Electron app (UI)
│   ├── main.js
│   ├── preload.js
│   ├── renderer.js
│   ├── assets/
│   └── index.html
│
├── model/             # FastAPI + ML model
│   ├── main.py
│   ├── model.pkl
│   └── requirements.txt
│
└── package.json

`

---

🧰 Setup Instructions

🧪 1. Clone the Repository
bash
git clone https://github.com/<your-username>/diabetes-predictor.git
cd diabetes-predictor
`

⚙️ 2. Install Dependencies

bash
npm install


🧩 3. Run Node + Electron

bash
npm start


Make sure your *FastAPI* backend (on Render) is active and the API URL is configured in your .env file.

---

🏗️ Building the Desktop App

To create a Windows or macOS executable:

bash
npm run build


Output files will appear inside the dist/ folder:

* Diabetes Predictor Setup.exe → Windows installer
* Diabetes Predictor.dmg → macOS installer

---

🌐 Deployment

* *FastAPI model* deployed on [Render](https://render.com/)
* *Electron app* built using [Electron Builder](https://www.electron.build/)

---

🧑‍💻 Authors

*Md.Thahood Anfaas*
💻 B.Tech 3rd Year | App Developer
📫 [LinkedIn](https://linkedin.com/in/) | [GitHub](https://github.com/)
*Md.Shariq*
💻 B.Tech 3rd Year | Frontend Developer
📫 [LinkedIn](https://linkedin.com/in/) | [GitHub](https://github.com/)
*AV Shayan*
💻 B.Tech 3rd Year | Full-stack Engineer
📫 [LinkedIn](https://linkedin.com/in/av-shayan) | [GitHub](https://github.com/AVShayan)

---

🏁 Summary

This project demonstrates an end-to-end *AI-powered desktop application* — from *ML model training* to *cross-platform app distribution*.
It’s a showcase of integrating data science with real-world software engineering using modern frameworks.

---
