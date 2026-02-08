import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getInvoices, deleteInvoice } from '../services/api';

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter states
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    useEffect(() => {
        loadInvoices();
    }, []);

    const loadInvoices = async () => {
        setLoading(true);
        const filters = { search, status, from, to };
        const data = await getInvoices(filters);
        setInvoices(data);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this invoice?')) {
            try {
                await deleteInvoice(id);
                loadInvoices();
            } catch (error) {
                console.error("Delete failed:", error);
                alert("Failed to delete invoice");
            }
        }
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        loadInvoices();
    };

    const clearFilters = () => {
        setSearch("");
        setStatus("");
        setFrom("");
        setTo("");
        // Trigger load after state update - tricky with closures, so calling loadInvoices directly with empty obj would be better, 
        // but for simplicity, we can just reset and user hits apply, or use effect dependency (but that triggers on every keystroke).
        // Let's just reset state and let user click Apply, or force reload with empty.
        // Better UX:
        setSearch(""); setStatus(""); setFrom(""); setTo("");
        getInvoices({}).then(data => setInvoices(data));
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px'
    };

    const thStyle = {
        backgroundColor: '#f2f2f2',
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd'
    };

    const tdStyle = {
        padding: '12px',
        borderBottom: '1px solid #ddd'
    };

    const filterContainerStyle = {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        flexWrap: 'wrap',
        alignItems: 'end',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
    };

    const inputStyle = {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ced4da'
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Invoices</h2>
                <Link to="/create">
                    <button style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        + New Invoice
                    </button>
                </Link>
            </div>

            {/* Filters */}
            <form onSubmit={handleFilterSubmit} style={filterContainerStyle}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', marginBottom: '4px' }}>Search</label>
                    <input
                        type="text"
                        placeholder="Invoice # or Patient Name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ ...inputStyle, width: '200px' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', marginBottom: '4px' }}>Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{ ...inputStyle, width: '120px' }}
                    >
                        <option value="">All Statuses</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', marginBottom: '4px' }}>From Date</label>
                    <input
                        type="date"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        style={inputStyle}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', marginBottom: '4px' }}>To Date</label>
                    <input
                        type="date"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        style={inputStyle}
                    />
                </div>

                <button type="submit" style={{ ...inputStyle, backgroundColor: '#6c757d', color: 'white', border: 'none', cursor: 'pointer', height: '35px' }}>
                    Apply Filters
                </button>
                <button type="button" onClick={clearFilters} style={{ ...inputStyle, backgroundColor: 'transparent', color: '#6c757d', border: '1px solid #6c757d', cursor: 'pointer', height: '35px' }}>
                    Clear
                </button>
            </form>

            {loading ? (
                <p>Loading invoices...</p>
            ) : invoices.length === 0 ? (
                <p>No invoices found matching your criteria.</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Invoice #</th>
                                <th style={thStyle}>Client</th>
                                <th style={thStyle}>Amount</th>
                                <th style={thStyle}>Date</th>
                                <th style={thStyle}>Status</th>
                                <th style={thStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((invoice) => (
                                <tr key={invoice.id}>
                                    <td style={tdStyle}>{invoice.invoiceNumber}</td>
                                    <td style={tdStyle}>{invoice.clientName}</td>
                                    <td style={tdStyle}>${Number(invoice.amount).toFixed(2)}</td>
                                    <td style={tdStyle}>{invoice.date}</td>
                                    <td style={tdStyle}>
                                        <span style={{
                                            padding: '5px 10px',
                                            borderRadius: '15px',
                                            backgroundColor: invoice.status === 'Paid' ? '#d4edda' : '#fff3cd',
                                            color: invoice.status === 'Paid' ? '#155724' : '#856404',
                                            display: 'inline-block',
                                            textAlign: 'center',
                                            minWidth: '60px'
                                        }}>
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td style={tdStyle}>
                                        <button
                                            onClick={() => handleDelete(invoice.id)}
                                            style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default InvoiceList;
