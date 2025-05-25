# AI Todo App

A modern, full-stack Todo application with user authentication, built using React, Firebase Auth, and Firestore. Users can securely manage their todos, with real-time updates and a beautiful UI.User can get a quick summary of their pending tasks.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Firebase Auth
- **Backend:** Node.js, Express, Firebase Admin SDK, Firestore
- **Authentication:** Google & Email/Password (via Firebase Auth)
- **Database:** Firestore (NoSQL, serverless)

---

## ✨ Features

- User authentication (Google & Email/Password)
- Secure CRUD operations on todos
- Real-time updates
- Responsive, modern UI
- Protected routes

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

### 4. **Environment Variables**
- Copy `.env.example` to `.env` in the frontend and fill in your Firebase credentials.
- Backend uses the service account JSON directly in `firebase.config.js`.

### 5. **Run the App**

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