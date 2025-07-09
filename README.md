# 🚀 DevConnect

DevConnect is a full-stack MERN (MongoDB, Express.js, React, Node.js) web app that allows developers to showcase their profiles and projects, explore others' work, and give feedback — all in one place.

---

## 🌟 Features

- ✅ Persistent **Signup/Login** with JWT
- 🧑‍💻 Create and manage **developer profiles**
- 🛠️ Post, update, and delete **projects** with GitHub/Live links
- 💬 Leave **feedback** on other users' projects
- 🔍 Search users or projects by **name or title**
- 📱 Fully **responsive**, modern UI (TailwindCSS)

---

## 🛠️ Tech Stack

| Layer        | Tech                    |
|--------------|--------------------------|
| Frontend     | React, TailwindCSS       |
| Backend      | Node.js, Express.js      |
| Database     | MongoDB Atlas            |
| Auth         | JWT, bcryptjs            |
| Deployment   | Netlify (frontend), Render (backend) |

---

## 🔧 Local Setup Instructions

### 1. Clone the Repo

git clone https://github.com/your-username/devconnect.git
cd devconnect

2️⃣ Setup & Run the Backend

cd server
npm install

Create a .env file inside the server/ folder with the following:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret


Start the server:
npm run dev

3️⃣ Setup & Run the Frontend

cd client
npm install
npm start


Your React app will run.

## 🌍 Deployment

- **Frontend (Vercel)**: [https://your-vercel-app-url.vercel.app](#)
- **Backend (Render)**: [https://your-render-app-url.onrender.com](#)


🧠 Made by
Yashasviny Verma
Built with ❤️ using the MERN stack

---
