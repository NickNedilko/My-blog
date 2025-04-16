import express from "express";

import ctrlWrapper from "../utils/ctrl.wrapper.js";
import { authenticate } from "../middlewares/authenticate.js";
import { createPost, deletePost, getAllPosts, getMyPosts, getOnePost, updatePost } from "../controllers/post.controller.js";

const router = express.Router();


router.post("/add-post", authenticate, ctrlWrapper(createPost));
router.get("/", ctrlWrapper(getAllPosts)); 
router.get("/my-posts", authenticate, ctrlWrapper(getMyPosts));  
router.get("/:slug", ctrlWrapper(getOnePost));   
router.patch("/update-post/:slug", authenticate, ctrlWrapper(updatePost)); 
router.delete("/delete-post/:slug", authenticate, ctrlWrapper(deletePost));


export default router;