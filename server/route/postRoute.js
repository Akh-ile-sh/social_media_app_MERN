import express from "express";
const router = express.Router();

import * as postController from "../controller/postController.js";
import { verifyToken } from "../middleware/auth.js";

router.get("/getFeedPosts", verifyToken, postController.getFeedPosts);
router.get("/getUserPosts/:userId", verifyToken, postController.getUserPosts);

router.patch("/likeposts/:id", verifyToken, postController.likePost);

export default router;
