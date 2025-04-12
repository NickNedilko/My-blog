import express from "express";

import ctrlWrapper from "../utils/ctrl.wrapper.js";
import { authenticate } from "../middlewares/authenticate.js";
// import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.controller.js";
import { createPost, getAllPosts } from "../controllers/post.controller.js";

const router = express.Router();


router.post("/add-post", authenticate, ctrlWrapper(createPost));
router.get("/",  ctrlWrapper(getAllPosts));    


export default router;