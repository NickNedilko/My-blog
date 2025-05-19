import express from "express";

import ctrlWrapper from "../utils/ctrl.wrapper.js";
import { authenticate } from "../middlewares/authenticate.js";
import { deleteUser, getAllUsers, getCurrentUser, getUserById, updateUser } from "../controllers/user.controller.js";


const router = express.Router();

router.get("/me", authenticate, ctrlWrapper(getCurrentUser));
router.patch("/me", authenticate, ctrlWrapper(updateUser));
router.delete("/:id", authenticate, ctrlWrapper(deleteUser)); 
router.get("/", authenticate, ctrlWrapper(getAllUsers));
router.get("/:id", ctrlWrapper(getUserById)); 

export default router;