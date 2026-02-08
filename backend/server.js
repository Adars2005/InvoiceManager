const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Login Endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (row) {
            res.json({ token: 'mock-jwt-token', user: { username: row.username } });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

// Get Invoices (with filters)
app.get('/invoices', (req, res) => {
    const { search, status, from, to } = req.query;
    let query = 'SELECT * FROM invoices WHERE 1=1';
    const params = [];

    if (search) {
        query += ' AND (invoiceNumber LIKE ? OR clientName LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
    }
    if (status) {
        query += ' AND status = ?';
        params.push(status);
    }
    if (from) {
        query += ' AND date >= ?';
        params.push(from);
    }
    if (to) {
        query += ' AND date <= ?';
        params.push(to);
    }

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Create Invoice
app.post('/invoices', (req, res) => {
    const { invoiceNumber, clientName, amount, date, status } = req.body;
    // Generate invoice number if not provided
    const invNum = invoiceNumber || `INV-${Date.now()}`;

    const stmt = db.prepare('INSERT INTO invoices (invoiceNumber, clientName, amount, date, status) VALUES (?, ?, ?, ?, ?)');
    stmt.run(invNum, clientName, amount, date, status, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, invoiceNumber: invNum, clientName, amount, date, status });
    });
    stmt.finalize();
});

// Delete Invoice
app.delete('/invoices/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM invoices WHERE id = ?', id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Deleted', changes: this.changes });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
