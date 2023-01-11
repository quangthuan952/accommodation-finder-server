import express from 'express';
import {addComment, deleteComment, getComment, updateComment} from "../controllers/CommentController";

const router = express.Router()

router.post('/', addComment)
router.get('/:postId', getComment)
router.put('/', updateComment)
router.delete('/:id', deleteComment)


export default router