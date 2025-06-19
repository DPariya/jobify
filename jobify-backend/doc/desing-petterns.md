# 🧠 Jobify Pro – Design Patterns & Principles

This file documents the architectural decisions, design patterns, and SOLID principles applied across the backend code of **Jobify Pro**.

---

## 🔐 1. Authentication (Register/Login)

- **File(s):** `controllers/authController.js`, `routes/authRoutes.js`
- **Pattern:** Factory Pattern
- **Usage:**
  - `createToken(user)` acts as a factory to generate a reusable JWT
- **Comment:**
  ```js
  // Factory pattern: centralizes token creation logic
  ```

---

## 🔒 2. Middleware for Validation & Auth

- **File(s):** `middleware/validateRegister.js`, `authMiddleware.js`
- **Pattern:** Chain of Responsibility
- **Principle:** Single Responsibility Principle (SRP)
- **Usage:**
  - Each middleware acts independently and calls `next()` to pass control
- **Comment:**
  ```js
  // Chain of Responsibility: allows modular, layered request handling
  ```

---

## 🌱 3. MongoDB Connection

- **File(s):** `server.js`
- **Pattern:** Singleton Pattern
- **Usage:**
  - Only one DB connection is maintained across the app lifecycle
- **Comment:**
  ```js
  // Singleton: Ensures one DB connection instance for the app
  ```

---

## 🧾 4. Validation Schema (Zod)

- **File(s):** `middleware/validateRegister.js`
- **Pattern:** Strategy Pattern
- **Principle:** Open/Closed Principle
- **Usage:**
  - Each endpoint can plug in a different validation strategy/schema
- **Comment:**
  ```js
  // Strategy pattern: validation logic is externalized via schema
  ```

---

## 🧱 5. Folder Structure

- **Folders:** `controllers/`, `models/`, `routes/`, `middleware/`
- **Principle:** Separation of Concerns (SoC), SRP
- **Usage:**
  - Clean modular responsibilities for readability and testability
- **Comment:**
  ```js
  // SRP: Each layer has a distinct responsibility
  ```

---

## ✅ Coming Soon…

| Feature                | Pattern            | Principle             |
| ---------------------- | ------------------ | --------------------- |
| Job CRUD               | Template Method    | DRY                   |
| Job Filter Logic       | Strategy           | Open/Closed           |
| Email Reminder System  | Observer           | SRP, Loose Coupling   |
| Pagination             | Iterator           | SoC                   |
| Dashboard Aggregations | Command / Mediator | Single Responsibility |

---

## 💡 Summary

You're applying **real design principles**, not just coding — and this doc proves it to future teammates and interviewers.

Push this to GitHub: `jobify-backend/docs/design-patterns.md`  
It shows you're a thoughtful and skilled engineer 👩‍💻✨
