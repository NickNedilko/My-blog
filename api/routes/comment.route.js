import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import ctrlWrapper from "../utils/ctrl.wrapper.js";
import { createComment, deleteComment, getAllComments, getPostComments, likeComment, updateComment } from "../controllers/comment.controller.js";


const router = express.Router();


router.post("/", authenticate, ctrlWrapper(createComment));
router.get("/:postId", ctrlWrapper(getPostComments));
router.get("/", ctrlWrapper(getAllComments));
router.put("/:commentId/like", authenticate, ctrlWrapper(likeComment));
router.delete("/:commentId", authenticate, ctrlWrapper(deleteComment));
router.put("/:commentId", authenticate, ctrlWrapper(updateComment));

export default router;