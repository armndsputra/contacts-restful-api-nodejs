import express from 'express';
import { registerController } from '../controller/register-controller.js';

const publicRouter = new express.Router();

publicRouter.post('/api/register', registerController);

export {
    publicRouter
}