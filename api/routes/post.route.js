import express from "express";

import ctrlWrapper from "../utils/ctrl.wrapper.js";
import { authenticate } from "../middlewares/authenticate.js";
// import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.controller.js";
import { createPost } from "../controllers/post.controller.js";

const router = express.Router();


router.post("/add-post", authenticate, ctrlWrapper(createPost));


export default router;