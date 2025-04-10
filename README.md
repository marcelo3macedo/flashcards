# 🧠 Flashcards App

A full-stack Flashcards application built with **Next.js 15**, **React 19**, **TailwindCSS**, and **MySQL**.

This app is built to help users study and memorize topics using categorized notebooks and learning sessions.

---

## 🚀 Features

- 📚 **Categories** — Group notebooks by category
- 📓 **Notebooks** — Create, update, and organize your study materials
- 🧑‍🎓 **Users** — Manage user creation and identity via `externalId`
- 📖 **Sessions** — Start and finish learning sessions with responses
- 🧪 **API First** — Easily testable with [Postman](https://www.postman.com/)

---

## 🛠️ Project Structure

```

├── pages/api/ # All REST API routes
├── services/ # Business logic and DB operations
├── public/ # Static assets
├── styles/ # Tailwind & global CSS
├── postman/collection.json # Postman collection with all requests
├── Dockerfile
├── docker-compose.yml
└── README.md

```

---

## ⚙️ Setup & Run

### 🔹 1. Run using Docker

```bash
docker compose up --build
```

The app will be available at:  
👉 http://localhost:3000  
MySQL will be running on port `3306`.

You can configure DB credentials inside `docker-compose.yml` under the `environment` section.

---

### 🔹 2. Run using NPM (for local development)

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev
```

Make sure you have a local MySQL server running.  
Update the database credentials in a `.env` file:

```
DATABASE_URL=mysql://user:password@localhost:3306/flashcards
```

---

## 📬 Postman Collection

A full set of API requests is available in:

```
postman/flashcards.postman_collection.json
```

### How to use:

1. Open Postman
2. Click "Import"
3. Choose the `flashcards.postman_collection.json` file
4. Use requests like:
   - `POST /api/users`
   - `POST /api/categories`
   - `POST /api/notebooks`
   - `POST /api/sessions`

---

## 🔍 API Overview

### ✅ `POST /api/users`

Create a user by `externalId` and `name`

### ✅ `GET /api/categories`

Fetch all or search by name with `?name=xyz`

### ✅ `POST /api/categories`

Create a category with `name` and `description`

### ✅ `GET /api/notebooks`

Fetch notebooks or filter by `title`

### ✅ `POST /api/notebooks`

Create a notebook (requires `categoryId`)

### ✅ `GET /api/sessions`

(Not implemented yet — handled on POST/PUT)

### ✅ `POST /api/sessions`

Start a session with a `userId`

### ✅ `PUT /api/sessions`

Finish a session with `sessionId` and `responses`

---

## ✅ Tech Stack

- [Next.js 15](https://nextjs.org)
- [React 19](https://reactjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [MySQL 8](https://www.mysql.com)
- [Docker + Compose](https://docs.docker.com)
- [Postman](https://www.postman.com/)

---

## 📌 License

MIT © 2025

```

---

Let me know if you’d like to add:

- Example request/response bodies
- `.env.example` template
- Swagger/OpenAPI integration
- How to connect to the MySQL DB (via DBeaver or CLI)
```
