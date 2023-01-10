import express from 'express';
import {login, refreshToken} from "../controllers/AuthController";
import {verifyRefreshToken} from "../middleware/auth";

const router = express.Router()

router.post('/login', login)
router.post('/refreshToken', verifyRefreshToken,refreshToken)


export default router