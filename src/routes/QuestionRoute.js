import express from 'express';
import {createQuestion} from "../controllers/QuestionController";

const router = express.Router()

router.post('/question', createQuestion)


export default router