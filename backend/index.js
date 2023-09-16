import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { bookmodel } from "./models/bookmodels.js";



mongoose
  .connect(mongodbURL, {
    dbName: "bookStore-menubar",
  })
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
      });
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
//middleware for parse json

app.use(express.json())

//get a single book by id

app.get("/books/:id",async (req,res)=>{
  try {

    const {id}= req.params;
      const books= await bookmodel.findById(id);
      res.status(200).send({
        count:books.length,
        books:books
      })
  } catch (error) {
    res.status(500).send({message:error.message})
  }
})

//get methode to get all the books from database

app.get("/books",async (req,res)=>{
  try {
      const books= await bookmodel.find();
      res.status(200).send({
        count:books.length,
        books:books
      })
  } catch (error) {
    res.status(500).send({message:error.message})
  }
})

//route for save a new book

app.post("/books",async (req,res)=>{
try {
    if(
        !req.body.title || 
        !req.body.author ||
        !req.body.publishYear
    )
    {
        res.status(400).send(
            {message:"send all required feilds title, author, publishyear"}
        )
    }

    const newBook={
        title:req.body.title,
        author:req.body.author,
        publishYear:req.body.publishYear
    }

    const book=await bookmodel.create(newBook);
    return res.status(201).send(book)
} catch (error) {
    console.log(error.message);
    res.status(500).send({message:error.message})
}
})

//update the book

app.put("/books/:id",async(req, res)=>{
  const {id}= req.params;
  if(
    !req.body.title,
    !req.body.author,
    !req.body.publishYear
){
  res.status(404).send({message:"please send all details books, author, publishyear"})
}

  const result=await bookmodel.findByIdAndUpdate(id,req.body)

  if(!result){
    res.status(404).send({message:"book not found"})
  }
  else{
    res.status(200).send({message:"suucsdjfd"})
  }
})

app.get("/", (req, res) => {
 
  return res.status(234).send("welcome to book store");
});


