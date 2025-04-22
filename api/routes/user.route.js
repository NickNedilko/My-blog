import express from "express";

import ctrlWrapper from "../utils/ctrl.wrapper.js";
import { authenticate } from "../middlewares/authenticate.js";
import { deleteUser, getAllUsers, getCurrentUser, updateUser } from "../controllers/user.controller.js";


const router = express.Router();

router.get("/get-user", authenticate, ctrlWrapper(getCurrentUser));
router.patch("/update-user", authenticate, ctrlWrapper(updateUser));
router.delete("/delete-user/:id", authenticate, ctrlWrapper(deleteUser)); 
router.get("/get-users", authenticate, ctrlWrapper(getAllUsers));
export default router;