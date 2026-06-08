import express from "express";

// Routes
import { publicRouter } from "../route/public-api.js"; // Import routes from route folder

import { errorMiddleware } from "../middleware/error-middleware.js";

export const web = express();
web.use(express.json());
 // <-- sebelum router
 web.use(express.urlencoded({ extended: true })); // jika ingin menerima data dari form dengan enctype application/x-www-form-urlencoded

web.use(publicRouter);
web.use(errorMiddleware); // error handling middleware