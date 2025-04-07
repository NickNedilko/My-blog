import express from "express";

import ctrlWrapper from "../utils/ctrl.wrapper.js";
import { logout, signin, signup } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/signup", ctrlWrapper(signup));
router.post("/signin", ctrlWrapper(signin));
router.post("/logout", authenticate, ctrlWrapper(logout));


export default router;