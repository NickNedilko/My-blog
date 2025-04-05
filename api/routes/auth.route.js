import express from "express";
import { signUp } from "../controllers/auth.controller.js";
import ctrlWrapper from "../utils/ctrl.wrapper.js";

const router = express.Router();

router.post("/signup", ctrlWrapper(signUp));

export default router;