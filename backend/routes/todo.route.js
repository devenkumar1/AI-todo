import { Router } from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  getSummary
} from "../controllers/todo.controller.js";
import firebaseAuth from '../middleware/firebaseAuth.js';

const router = Router();

// Get all todos for a user
router.get("/", firebaseAuth, getTodos);

// Create a new todo
router.post("/", firebaseAuth, createTodo);

// Update a todo
router.put("/:id", updateTodo);

// Delete a todo
router.delete("/:id", deleteTodo);

// Get summary of pending todos for a user
router.get("/summary", firebaseAuth, getSummary);

export default router;