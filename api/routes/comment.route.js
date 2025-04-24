import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import ctrlWrapper from "../utils/ctrl.wrapper.js";
import { createComment, deleteComment, getPostComments, likeComment, updateComment } from "../controllers/comment.controller.js";


const router = express.Router();


router.post("/add-comment", authenticate, ctrlWrapper(createComment));
router.get("/get-post-comments/:postId", ctrlWrapper(getPostComments));
router.put("/like-comment/:commentId", authenticate, ctrlWrapper(likeComment));
router.delete("/delete-comment/:commentId", authenticate, ctrlWrapper(deleteComment));
router.put("/update-comment/:commentId", authenticate, ctrlWrapper(updateComment));

export default router;