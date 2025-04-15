import express from "express";

import ctrlWrapper from "../utils/ctrl.wrapper.js";
import { authenticate } from "../middlewares/authenticate.js";
// import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.controller.js";
import { createPost, getAllPosts, getOnePost } from "../controllers/post.controller.js";

const router = express.Router();


router.post("/add-post", authenticate, ctrlWrapper(createPost));
router.get("/", ctrlWrapper(getAllPosts)); 
router.get("/:slug",  ctrlWrapper(getOnePost));      


export default router;