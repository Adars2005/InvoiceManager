const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'invoices.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + dbPath + ': ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');

        db.serialize(() => {
            // Create Invoices Table
            db.run(`CREATE TABLE IF NOT EXISTS invoices (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                invoiceNumber TEXT UNIQUE,
                clientName TEXT,
                amount REAL,
                date TEXT,
                status TEXT
            )`);

            // Create Users Table (for basic auth)
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password TEXT
            )`);

            // Insert default admin user if not exists
            const insertUser = db.prepare("INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)");
            insertUser.run("admin", "password");
            insertUser.finalize();
        });
    }
});

module.exports = db;
