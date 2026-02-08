import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getInvoices } from '../services/api';

const Dashboard = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            const data = await getInvoices();
            setInvoices(data);
            setLoading(false);
        };
        fetchInvoices();
    }, []);

    if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

    const totalInvoices = invoices.length;
    const totalAmount = invoices.reduce((sum, inv) => sum + Number(inv.amount), 0);
    const pendingInvoices = invoices.filter(inv => inv.status === 'Pending').length;

    const cardStyle = {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        margin: '10px',
        flex: '1',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'center'
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <div style={cardStyle}>
                    <h3>Total Invoices</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalInvoices}</p>
                </div>
                <div style={cardStyle}>
                    <h3>Total Amount</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>${totalAmount.toFixed(2)}</p>
                </div>
                <div style={cardStyle}>
                    <h3>Pending Invoices</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{pendingInvoices}</p>
                </div>
            </div>

            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <Link to="/invoices">
                    <button style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}>
                        View Invoices
                    </button>
                </Link>
                <Link to="/create">
                    <button style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}>
                        Create New Invoice
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
