# 🧠 Jobify Backend

This is the **backend** of the Jobify Pro application – a full-stack job tracking app for job seekers.

Built with **Node.js**, **Express**, and **MongoDB**, it supports secure authentication, job CRUD, filtering, logging, and a clean design architecture using design patterns and principles.

---

## 🔧 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT** (Authentication)
- **bcryptjs** (Password hashing)
- **Zod** (Request validation)
- **ESM (import/export)** support

---

## 📁 Folder Structure

```
jobify-backend/
├── controllers/       # Business logic (auth, job, user)
├── models/            # Mongoose schemas
├── routes/            # Express routes
├── middleware/        # Auth, error, validation middlewares
├── utils/             # CustomError, token factory, logger
├── logs/              # Error log output
├── server.js          # Entry point
├── .env               # Environment variables
└── .gitignore
```

---

## 🚀 Getting Started

### 📦 Install Dependencies

```bash
cd jobify-backend
npm install
```

### 🌐 Setup Environment

Create a `.env` file in the root:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

### ▶️ Run in Dev Mode

```bash
npm run dev
```

Open your browser:  
[http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🔐 API Endpoints

| Method | Route                | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | Register a new user   |
| POST   | `/api/auth/login`    | Login and receive JWT |
| GET    | `/api/health`        | Health check          |

---

## 🧠 Design Patterns & Principles

This backend follows key software architecture practices:

- ✅ **Factory Pattern** – for token creation
- ✅ **Chain of Responsibility** – middleware layers
- ✅ **Strategy Pattern** – request validation via Zod
- ✅ **Singleton** – DB connection and logger
- ✅ **SRP, SoC, OCP** – clean separation of logic

> See `docs/design-patterns.md` for full documentation.

---

## 📒 Logs

All server and error logs are stored in:

```
jobify-backend/logs/error.log
```

---

## 🧪 Testing (Manual via Postman)

You can use Postman or ThunderClient to test:

- Registration/Login
- Auth-protected routes (upcoming)

---

## 🛠 Upcoming Features

- Job CRUD APIs
- Job filters & sorting
- Analytics dashboard
- Email reminders
- Rate limiter & security

---

## 🧹 Contribution Notes

- Use Prettier: `npm run format`
- Commit in chunks (linted)
- Follow naming conventions for folders, routes, models

---

## 💼 Author

Made by [Dipti Pariya](https://github.com/diptipariya) – passionate MERN stack developer.
