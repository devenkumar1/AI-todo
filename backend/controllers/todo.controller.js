import { db } from '../config/firebase.config.js';

const todosCollection = 'todos';

// Create a new todo
export const createTodo = async (req, res) => {
  const { text } = req.body;
  const userId = req.userId;
  console.log("the received text", text);
  console.log("the received userID", userId);

  if (!text) {
    return res.status(400).json({ message: 'Text is required' });
  }
  
  try {
    const newTodo = {
      text: text,
      userId: userId,
      completed: false,
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection(todosCollection).add(newTodo);
    res.status(201).json({ id: docRef.id, ...newTodo });
  } catch (err) {
    console.error('Error creating todo:', err);
    res.status(500).json({ message: 'Error creating todo' });
  }
};

// Get all todos for a user
export const getTodos = async (req, res) => {
  const userId = req.userId;

  try {
    const snapshot = await db.collection(todosCollection)
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
    
    const todos = [];
    snapshot.forEach((doc) => {
      todos.push({ id: doc.id, ...doc.data() });
    });
    
    res.status(200).json(todos);
  } catch (err) {
    console.error('Error getting todos:', err);
    res.status(500).json({ message: 'Error getting todos', error: err.message });
  }
};

// Update a todo
export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  try {
    const todoRef = db.collection(todosCollection).doc(id);
    const todoDoc = await todoRef.get();

    if (!todoDoc.exists) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const updates = {};
    if (text !== undefined) updates.text = text;
    if (completed !== undefined) updates.completed = completed;

    await todoRef.update(updates);
    
    const updatedDoc = await todoRef.get();
    res.status(200).json({ id: updatedDoc.id, ...updatedDoc.data() });
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(500).json({ message: 'Error updating todo', error: err.message });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todoRef = db.collection(todosCollection).doc(id);
    const todoDoc = await todoRef.get();

    if (!todoDoc.exists) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await todoRef.delete();
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ message: 'Error deleting todo', error: err.message });
  }
};

// Get summary of pending todos for a user
export const getSummary = async (req, res) => {
  const userId = req.userId;
  try {
    const snapshot = await db.collection(todosCollection)
      .where('userId', '==', userId)
      .where('completed', '==', false)
      .orderBy('createdAt', 'desc')
      .get();
    const todos = [];
    snapshot.forEach((doc) => {
      todos.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(todos);
  } catch (err) {
    console.error('Error getting summary:', err);
    res.status(500).json({ message: 'Error getting summary', error: err.message });
  }
};
