import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRouter from "./routes/auth.route.js";

export const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);



app.use((err, req, res, next) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message, })
});