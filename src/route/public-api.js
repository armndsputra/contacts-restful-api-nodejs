import express from 'express';
import { registerController } from '../controller/register-controller.js';

const publicRouter = new express.Router();

// Controller for user registration
publicRouter.post('/api/register', registerController); // Import from controller folder

export {
    publicRouter
}