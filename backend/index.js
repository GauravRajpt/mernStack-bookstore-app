import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";

import router from "./routes/booksroute.js";




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

app.use(express.json());

app.use("/books",router);


app.get("/", (req, res) => {
 
  return res.status(234).send("welcome to book store");
});


