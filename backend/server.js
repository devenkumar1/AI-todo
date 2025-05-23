import express from "express";
import todoRoutes from './routes/todo.route.js'
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 5000 ;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.send("welcome to the backend");
})

app.use("/todos",todoRoutes);

app.listen(PORT,()=>{
    console.log(`server started at port http://localhost:${PORT}`);
})