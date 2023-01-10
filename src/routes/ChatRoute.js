import express from 'express';
import {createChat} from "../controllers/ChatController";

const router = express.Router()

router.post('/', createChat)


export default router