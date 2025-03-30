
// backend/routes/post.route.js → backend/routes/property.route.js
import express from "express";
import { createProperty, getProperties } from "../controllers/property.controller.js";
import uploadMiddleware from "../middlewares/multer.js"; // For image uploads
import isAuthenticated from "../middlewares/isAuthenticated.js"


const router = express.Router();

router.route("/addproperty").post(isAuthenticated,uploadMiddleware.array("images", 10), createProperty);
router.route("/getproperty").get(getProperties);

export default router
