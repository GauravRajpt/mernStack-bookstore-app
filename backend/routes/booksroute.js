import express from "express";
import { bookmodel } from "../models/bookmodels.js";
const router= express.Router();



//get a single book by id

router.get("/:id",async (req,res)=>{
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
  
  router.get("",async (req,res)=>{
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
  
  router.post("",async (req,res)=>{
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
  
  router.put("/:id",async(req, res)=>{
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
  
  
  //route for delete a book
  
  router.delete("/:id",async(req,res)=>{
    const {id}= req.params;
  const result=  await bookmodel.findByIdAndDelete(id)
  
  if(!result){
    res.status(404).send({message:"book not found for this id"})
  }
  else{
    res.status(200).send({message:"book delete successfully"})
  }
  
  })

  export default router;