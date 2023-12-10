import  express  from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";

dotenv.config();

connectDB()
const app = express();
app.use(express.json())
app.get('/',(req,res)=>{
    res.send(`<h1>Hii this is Job Portal Application`);
})
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`listening to ${port} in  ${process.env.DEV_MODE} mode`);
})