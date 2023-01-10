import express from 'express';
import {createChat, getChat, getuserChats} from "../controllers/ChatController";

const router = express.Router()

router.post('/', createChat)
router.get('/:userId', getuserChats)
router.get('/', getChat)


export default router