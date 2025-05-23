import { Router } from "express";

const router=Router();

router.get("/",(req,res)=>{
res.send("your all todos sir!!");
})


export default router;