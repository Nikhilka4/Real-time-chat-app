import { Router } from "express";
import { login, signup } from "../controllers/AuthController.js";

const router = new Router();

router.post('/signup', signup)
router.post('/login', login)

export default router