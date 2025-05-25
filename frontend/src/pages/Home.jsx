import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { todoService } from '../services/todoService';
import { FiPlus, FiLogOut, FiCheck, FiTrash2, FiEdit2 } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/signin');
  };

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await todoService.getTodos();
      setTodos(data);
      toast.success('Fetched all todos!');
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Failed to load todos');
      toast.error('Failed to load todos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) {
      setError('Todo text cannot be empty');
      toast.error('Todo text cannot be empty');
      return;
    }

    try {
      setError('');
      const createdTodo = await todoService.createTodo({ text: newTodo.trim() });
      setTodos([createdTodo, ...todos]);
      setNewTodo('');
      toast.success('Todo added!');
    } catch (err) {
      console.error('Error adding todo:', err);
      setError(err.message || 'Failed to add todo');
      toast.error(err.message || 'Failed to add todo');
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      setError('');
      const todoToUpdate = todos.find(t => t.id === id);
      const updatedTodo = await todoService.updateTodo(id, {
        completed: !todoToUpdate.completed
      });
      setTodos(todos.map(todo =>
        todo.id === id ? updatedTodo : todo
      ));
      toast.success('Todo updated!');
    } catch (err) {
      console.error('Error toggling todo:', err);
      setError('Failed to update todo');
      toast.error('Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      setError('');
      await todoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
      toast.success('Todo deleted!');
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('Failed to delete todo');
      toast.error('Failed to delete todo');
    }
  };

  const handleEditStart = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleEditSave = async (id) => {
    try {
      setError('');
      const updatedTodo = await todoService.updateTodo(id, { text: editText });
      setTodos(todos.map(todo =>
        todo.id === id ? updatedTodo : todo
      ));
      setEditingId(null);
      setEditText('');
      toast.success('Todo updated!');
    } catch (err) {
      console.error('Error updating todo:', err);
      setError('Failed to update todo');
      toast.error('Failed to update todo');
    }
  };

  // Summary state
  const [summaryText, setSummaryText] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const handleGetSummary = async () => {
    try {
      const { summary, count } = await todoService.getSummary();
      console.log('AI summary:', summary); // Debug log
      setSummaryText(summary);
      setShowSummary(true);
      toast.success(`AI summary generated for ${count} pending todo(s).`);
    } catch (err) {
      toast.error('Failed to fetch summary');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">AI Todo App</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {auth.currentUser?.email}</span>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <FiLogOut className="mr-2" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Add Summary Button */}
        <div className="mb-4 flex justify-end">
          <button
            onClick={handleGetSummary}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Get AI Summary
          </button>
        </div>
        {showSummary && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
              <h2 className="text-lg font-bold mb-2">AI Summary</h2>
              <pre className="whitespace-pre-wrap text-gray-800">{summaryText ? summaryText : 'No summary available.'}</pre>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => setShowSummary(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Add Todo Form */}
            <div className="bg-white shadow rounded-lg mb-6">
              <form onSubmit={handleAddTodo} className="p-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <FiPlus className="mr-2" /> Add Task
                  </button>
                </div>
              </form>
            </div>

            {/* Filters */}
            <div className="bg-white shadow rounded-lg mb-6">
              <div className="p-4 flex justify-center space-x-4">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`px-4 py-2 rounded-md ${filter === 'active' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-4 py-2 rounded-md ${filter === 'completed' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Completed
                </button>
              </div>
            </div>

            {/* Todo List */}
            <div className="bg-white shadow rounded-lg">
              <ul className="divide-y divide-gray-200">
                {filteredTodos.map(todo => (
                  <li key={todo.id} className="p-4 flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4 flex-1">
                      <button
                        onClick={() => handleToggleTodo(todo.id)}
                        className={`w-5 h-5 rounded border ${todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'} flex items-center justify-center`}
                      >
                        {todo.completed && <FiCheck className="text-white" />}
                      </button>
                      {editingId === todo.id ? (
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onBlur={() => handleEditSave(todo.id)}
                          className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                          autoFocus
                        />
                      ) : (
                        <span className={`flex-1 ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                          {todo.text}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditStart(todo)}
                        className="p-1 text-gray-500 hover:text-primary focus:outline-none"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="p-1 text-gray-500 hover:text-red-600 focus:outline-none"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </li>
                ))}
                {filteredTodos.length === 0 && (
                  <li className="p-4 text-center text-gray-500">
                    No tasks found
                  </li>
                )}
              </ul>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
