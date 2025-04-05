import express from "express";
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://nick:Bc5CeTRCHGzsGhPc@cluster0.icdlzve.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0").
    then(() => console.log("Connected to DB"));
//Bc5CeTRCHGzsGhPc
const app = express();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});