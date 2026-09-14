import express from "express";
import {
	getUserController,
	updateUserController,
	logoutController,
} from "../controller/user-controller.js"; // Import from controller folder
import { authMiddleware } from "../middleware/auth-middleware.js"; // Import from middleware folder
import contactController from "../controller/contact-controller.js"; // Import from controller folder
import addressController from "../controller/address-controller.js"; // Import from controller folder

const userRouter = new express.Router();

// Controller for user registration
// User API routes
userRouter.use(authMiddleware); // Apply authMiddleware to all routes in this router
userRouter.get("/api/users/current", getUserController); // Import from controller folder
userRouter.patch("/api/users/current", updateUserController); // Import from controller folder
userRouter.delete("/api/users/logout", logoutController); // Import from controller folder

// Contact API routes
userRouter.post("/api/contacts", contactController.create); // Import from controller folder
userRouter.get("/api/contacts/:id", contactController.get); // Import from controller folder
userRouter.patch("/api/contacts/:id", contactController.update); // Import from controller folder
userRouter.delete("/api/contacts/:id", contactController.remove); // Import from controller folder
userRouter.get("/api/contacts/", contactController.search); // Import from controller folder

// Address API routes
userRouter.post("/api/contacts/:contactId/addresses", addressController.create); // Import from controller folder
userRouter.get("/api/contacts/:contactId/addresses/:addressId", addressController.get); // Import from controller folder	
userRouter.patch("/api/contacts/:contactId/addresses/:addressId", addressController.update); // Import from controller folder

export { userRouter };
