import express from "express";
const router = express.Router();

import * as authController from "../controller/authController.js";

router.route("/register").post(authController.register);
router.route("/login").get(authController.login);

export default router;
