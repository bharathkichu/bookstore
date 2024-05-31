import express from "express";
import {PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoutes.js";
import cors from "cors";

const app = express();

// middleware
app.use(express.json());

app.use(cors());

app.use("/books",booksRoute);

mongoose.connect(mongoDBURL).then(()=>{
    console.log("App connected to database");

    app.listen(PORT,() => {
      console.log(`App is listening to port : ${PORT}`);
    });
}).catch((error)=>{
    console.log(error);
});