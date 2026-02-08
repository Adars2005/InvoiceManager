import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInvoice } from '../services/api';

const InvoiceForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        clientName: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Pending'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createInvoice(formData);
            navigate('/invoices');
        } catch (error) {
            console.error("Failed to create invoice:", error.message);
            alert("Failed to create invoice");
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        marginBottom: '15px',
        borderRadius: '4px',
        border: '1px solid #ddd'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold'
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2>Create New Invoice</h2>
            <form onSubmit={handleSubmit} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
                <div>
                    <label style={labelStyle}>Client Name:</label>
                    <input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Amount ($):</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Status:</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                    </select>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Save Invoice
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/invoices')}
                        style={{ marginLeft: '10px', backgroundColor: '#6c757d', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InvoiceForm;
