# Invoice Management App - Full Stack

This project is a React-based invoice management system with a Node.js/Express backend and SQLite database.

## System Components

### 1. Backend (`/backend`)
*   **Technology:** Node.js, Express, SQLite3.
*   **Database File:** `backend/invoices.db` (This file is automatically created on first run).
*   **Port:** 5000 (`http://localhost:5000`)

### 2. Frontend (`/frontend`)
*   **Technology:** React, Axios.
*   **Port:** 3004 (or 3000 if available)

## 🚀 Setup & Run Instructions

**Step 1: Start the Backend**
```bash
cd backend
npm install  # Install dependencies (only first time)
node server.js
```
*The server will start on port 5000 and create `invoices.db`.*

**Step 2: Start the Frontend**
```bash
cd frontend
npm install  # Install dependencies (only first time)
npm start
```
*The app will open in your browser at `http://localhost:3004` (or similar).*

## 🔐 Credentials

*   **Username:** `admin`
*   **Password:** `password`

## 🗄️ Accessing the Database

The database is a single file located at:
`backend/invoices.db`

You can view the data using any SQLite viewer, such as:
*   **DB Browser for SQLite** (Recommended)
*   **VS Code Extensions** (e.g., SQLite Viewer)

## ✨ Features
*   **Login Authentication** (Mock JWT)
*   **Dashboard** with statistics.
*   **Invoice Management** (List, Create, Delete).
*   **Search & Filter** by Name, Date, and Status.
*   **Persistent Data** using SQLite.

## 🛠️ API Endpoints
*   `POST /login`: Authenticate user.
*   `GET /invoices`: Fetch invoices (supports headers for filtering).
*   `POST /invoices`: Create a new invoice.
*   `DELETE /invoices/:id`: Delete an invoice.
