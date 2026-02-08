import axios from 'axios';

const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
});

export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Login failed');
  }
};

export const getInvoices = async (filters = {}) => {
  try {
    const response = await api.get('/invoices', { params: filters });
    return response.data;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return [];
  }
};

export const getInvoice = async (id) => {
  // Note: detailed get is not implemented in backend yet, but we can filter from list or add endpoint if needed
  // For now, let's assume we might need to fetch all and find, or implement retrieving single invoice later.
  // However, existing usage in Dashboard/List mainly uses getInvoices.
  // If strict single fetch needed: await api.get(`/invoices/${id}`);
  try {
    const response = await api.get(`/invoices/${id}`); // Assuming we might add this or just rely on list for now
    return response.data;
  } catch (error) {
    console.error("Error fetching invoice:", error);
    return null;
  }
};

export const createInvoice = async (invoiceData) => {
  try {
    const response = await api.post('/invoices', invoiceData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to create invoice');
  }
};

export const updateInvoice = async (id, invoiceData) => {
  // Backend doesn't have PUT yet, adding TODO or implementing if requested
  // For now, simplistic approach:
  console.warn("Update not implemented in backend yet");
  return null;
};

export const deleteInvoice = async (id) => {
  try {
    await api.delete(`/invoices/${id}`);
    return { success: true };
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete invoice');
  }
};

export default api;
