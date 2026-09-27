import express from "express";
import {
	registerController,
	loginController,
} from "../controller/user-controller.js"; // Import from controller folder

const publicRouter = new express.Router();

// Controller for user registration
publicRouter.post("/api/register", registerController); // Import from controller folder
publicRouter.post("/api/login", loginController); // Import from controller folder

export { publicRouter };
