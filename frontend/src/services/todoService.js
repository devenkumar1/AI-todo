import axios from 'axios';
import { auth } from '../config/firebase';

const API_URL = 'http://localhost:5000/todos';

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add interceptor to attach Firebase Auth token
axios.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

const handleError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.message || 'Server error');
  }
  throw new Error('Network error');
};

export const todoService = {
  // Get all todos for a user
  async getTodos() {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  // Create a new todo
  async createTodo(todo) {
    try {
      const { text } = todo;
      const response = await axios.post(API_URL, { text });
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  // Update a todo
  async updateTodo(id, updates) {
    const response = await axios.put(`${API_URL}/${id}`, updates);
    return response.data;
  },

  // Delete a todo
  async deleteTodo(id) {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },

  // Get summary of pending todos for a user
  async getSummary() {
    try {
      const response = await axios.get(`${API_URL}/summary`);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  }
};
