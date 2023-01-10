import express from 'express';
import {verifyToken} from "../middleware/auth";
import {getProfile, getProfileById} from "../controllers/UserController";

const router = express.Router()

router.get(`/me`, verifyToken, getProfile)
router.get(`/:id`, verifyToken, getProfileById)


export default router