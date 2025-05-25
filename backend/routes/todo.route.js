import { Router } from "express";
import { createTodo } from "../controllers/todo.controller.js";

const router=Router();

router.get("/",(req,res)=>{
res.send("your all todos sir!!");
})

router.post("/",createTodo);


export default router;