import express from "express";

import ctrlWrapper from "../utils/ctrl.wrapper.js";
import { signin, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", ctrlWrapper(signup));
router.post("/signin", ctrlWrapper(signin));


export default router;