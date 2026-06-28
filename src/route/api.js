import express from 'express';
import { getUserController, updateUserController } from '../controller/user-controller.js'; // Import from controller folder
import { authMiddleware } from '../middleware/auth-middleware.js'; // Import from middleware folder

const userRouter = new express.Router();

// Controller for user registration
userRouter.use(authMiddleware); // Apply authMiddleware to all routes in this router
userRouter.get('/api/users/current', getUserController); // Import from controller folder
userRouter.patch('/api/users/current', updateUserController); // Import from controller folder

export {
    userRouter
}