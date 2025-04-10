import express from "express";

import ctrlWrapper from "../utils/ctrl.wrapper.js";
import { authenticate } from "../middlewares/authenticate.js";
import { deleteUser, getCurrentUser, updateUser } from "../controllers/user.controller.js";


const router = express.Router();

router.get("/get-user", authenticate, ctrlWrapper(getCurrentUser));
router.patch("/update-user", authenticate, ctrlWrapper(updateUser));
router.delete("/delete-user", authenticate, ctrlWrapper(deleteUser)); 

export default router;