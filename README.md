# AI Todo App

A modern, full-stack Todo application with user authentication, built using React, Firebase Auth, and Firestore. Users can securely manage their todos, with real-time updates and a beautiful UI. User can get a quick summary of their pending tasks, powered by Google Gemini AI, and have the summary posted to a Slack channel.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Firebase Auth
- **Backend:** Node.js, Express, Firebase Admin SDK, Firestore
- **AI Summary:** Google Gemini API (Generative Language)
- **Notifications:** Slack Incoming Webhooks
- **Authentication:** Google & Email/Password (via Firebase Auth)
- **Database:** Firestore (NoSQL, serverless)

---

## ✨ Features

- User authentication (Google & Email/Password)
- Secure CRUD operations on todos
- Real-time updates
- Responsive, modern UI
- Protected routes
- **AI-powered summary of pending todos (Gemini API)**
- **Summary is posted to a Slack channel via webhook**

---

## 🛠️ Setup Instructions

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/ai-todo-app.git
cd ai-todo-app
```

### 2. **Install Dependencies**

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 3. **Firebase Setup**
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Enable **Authentication** (Email/Password and Google)
- Create a **Firestore** database
- Download your Firebase Admin SDK service account key and place it in `backend/config/firebase.config.js`
- Add your Firebase web config to `frontend/.env` (see `.env.example`)

### 4. **Gemini API Setup**
- Go to [Google AI Studio](https://aistudio.google.com/app/apikey) and create a Gemini API key.
- Add it to your backend `.env` as `GEMINI_API_KEY=your_gemini_api_key`.

### 5. **Slack Webhook Setup**
- [Create a Slack workspace](https://slack.com/get-started#/create) if you don't have one.
- [Create a Slack App and Incoming Webhook](https://api.slack.com/apps) for your workspace and channel.
- Add the webhook URL to your backend `.env` as `SLACK_WEBHOOK_URL=your_webhook_url`.

### 6. **Environment Variables (.env) for Backend**

Add these variables to your `backend/.env`:

```
PORT=5000
FIREBASE_PRIVATE_KEY="..."   # Your Firebase service account private key (escaped as described below)
PRIVATE_KEY_ID=...
CLIENT_ID=...
GEMINI_API_KEY=...
SLACK_WEBHOOK_URL=...
```
- `FIREBASE_PRIVATE_KEY` should be a single line, with `\n` for newlines, wrapped in double quotes.
- `GEMINI_API_KEY` is your Google Gemini API key.
- `SLACK_WEBHOOK_URL` is your Slack Incoming Webhook URL.

### 7. **Run the App**

#### Start Backend
```bash
cd backend
npm start
```

#### Start Frontend
```bash
cd ../frontend
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)

---

## 📝 Firestore Indexing
If you see an error about a required Firestore index, follow the link in the error message to create the index in the Firebase Console.

---

## 📂 Project Structure

```
ai-todo-app/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── service/
│   └── server.js
└── frontend/
    ├── src/
    ├── public/
    └── ...
```

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
This project is licensed under the MIT License. 