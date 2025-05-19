import express from "express";

import ctrlWrapper from "../utils/ctrl.wrapper.js";
import { authenticate } from "../middlewares/authenticate.js";
import { createPost, deletePost, getMyPosts, getOnePost, getposts, updatePost } from "../controllers/post.controller.js";

const router = express.Router();


router.post("/", authenticate, ctrlWrapper(createPost));
router.get("/", ctrlWrapper(getposts)); 
router.get("/my", authenticate, ctrlWrapper(getMyPosts));  
router.get("/:slug", ctrlWrapper(getOnePost));   
router.patch("/:slug", authenticate, ctrlWrapper(updatePost)); 
router.delete("/:slug", authenticate, ctrlWrapper(deletePost));


export default router;