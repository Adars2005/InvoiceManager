const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Initialize Admin User
async function init() {
    try {
        const existingUser = await prisma.user.findUnique({
            where: { username: 'admin' }
        });
        if (!existingUser) {
            await prisma.user.create({
                data: { username: 'admin', password: 'password' }
            });
            console.log('Admin user created (admin/password)');
        }
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}
init();

// Login Endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (user && user.password === password) {
            res.json({ token: 'mock-jwt-token', user: { username: user.username } });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Invoices (with filters)
app.get('/invoices', async (req, res) => {
    const { search, status, from, to } = req.query;

    const where = {};

    if (search) {
        where.OR = [
            { invoiceNumber: { contains: search } },
            { clientName: { contains: search } }
        ];
    }

    if (status) {
        where.status = status;
    }

    if (from || to) {
        where.date = {};
        if (from) where.date.gte = from;
        if (to) where.date.lte = to;
    }

    try {
        const invoices = await prisma.invoice.findMany({
            where
        });
        res.json(invoices);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create Invoice
app.post('/invoices', async (req, res) => {
    const { invoiceNumber, clientName, amount, date, status } = req.body;
    const invNum = invoiceNumber || `INV-${Date.now()}`;

    try {
        const newInvoice = await prisma.invoice.create({
            data: {
                invoiceNumber: invNum,
                clientName,
                amount: parseFloat(amount),
                date,
                status
            }
        });
        res.json(newInvoice);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Invoice
app.delete('/invoices/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.invoice.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Deleted' });
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
