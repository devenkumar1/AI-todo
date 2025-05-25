import express from "express";
import todoRoutes from './routes/todo.route.js'
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("welcome to the backend");
})

app.use("/todos",todoRoutes);

app.listen(PORT,() => {
    console.log(`Server running at http://localhost:${PORT}`);
})