import express from "express";
import { PORT } from "./config.js";


const app= express();

app.get("/",(req,res)=>{
    console.log(req);
   return res.status(234).send("welcome to book store")
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})