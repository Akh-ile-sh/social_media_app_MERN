import express from "express";
const router = express.Router();

import * as authController from "../controller/authController.js";

router.route("/register").post(authController.register);

export default router;
