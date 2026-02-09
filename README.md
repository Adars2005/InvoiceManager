# Invoice Management Application

A simple full-stack application for managing invoices, built with React and Node.js.

## Technology Stack

### Backend
*   **Node.js**: Runtime environment.
*   **Express**: Web framework for building the API.
*   **Prisma**: ORM for database interaction and schema management.
*   **SQLite**: Relational database (managed via Prisma).
*   **Body-parser**: Middleware for parsing request bodies.
*   **Cors**: Middleware for enabling Cross-Origin Resource Sharing.

### Frontend
*   **React**: UI library.
*   **React Router**: For handling client-side routing.
*   **Axios**: For making HTTP requests to the backend.
*   **CSS**: Custom styling.

## Project Setup Instructions

### Prerequisites
*   Node.js (v14 or later)
*   npm (Node Package Manager)

### Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Initialize the database:
    ```bash
    npx prisma migrate dev
    ```
4.  Start the server:
    ```bash
    node server.js
    ```
    The server will run on `http://localhost:5000`. The SQLite database file (`dev.db` inside `prisma` folder) will be automatically created.

### Frontend Setup
1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the application:
    ```bash
    npm start
    ```
    The application will open in your browser at `http://localhost:3000`.

## Assumptions & Simplifications

*   **Authentication**: The authentication is simplified. We store users and passwords in plain text in the database for demonstration purposes. In a real application, we would use password hashing (bcrypt) and proper JWT signing.
*   **Environment Variables**: We hardcoded database paths and configurations. In production, these should be managed via `.env` files.
*   **Error Handling**: Basic error handling is implemented. More comprehensive validation and specialized error responses would be needed for a robust API.

## Known Limitation

*   **Scalability**: SQLite is excellent for development and small-scale applications, but it handles only one write operation at a time (database locking). This could become a bottleneck under high concurrent load compared to client-server databases like PostgreSQL or MySQL.
