import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import ctrlWrapper from "../utils/ctrl.wrapper.js";
import { createComment } from "../controllers/comment.controller.js";


const router = express.Router();


router.post("/add-comment", authenticate, ctrlWrapper(createComment));
// router.get("/get-comments", ctrlWrapper(getComments));


export default router;