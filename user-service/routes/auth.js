/**
 * @file This file contains the routes related to authentication.
 */

import express from "express";
import auth from "../middlewares/auth.js";
import { register } from "../controllers/auth.js";
import { login } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", auth, async (req, res) => {
  // return res.status(200).json({ ...req.user._doc });
  try {
    return res.status(200).json({ ...req.user._doc });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
