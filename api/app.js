import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";

export const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://my-blog-blond-eight.vercel.app/',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);



app.use((err, req, res, next) => {

  if (err.code === 11000 && err.keyPattern?.email) {
    return res.status(400).json({ message: 'validation.emailExists' });
  }
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message, })
});