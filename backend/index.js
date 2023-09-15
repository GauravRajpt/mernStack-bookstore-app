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

app.get("/", (req, res) => {
 
  return res.status(234).send("welcome to book store");
});


