import express from "express";
const router = express.Router();

import { verifyToken } from "../middleware/auth.js";

import * as userController from "../controller/userController.js";

router.route("/getUser/:id").get(verifyToken, userController.getUser);
router
  .route("/getUserFriends/:id")
  .get(verifyToken, userController.getUserFriends);
router
  .route("/addRemoveFriends/:id/:friendId")
  .patch(verifyToken, userController.addRemoveFriends);

export default router;
