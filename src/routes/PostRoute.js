import express from 'express';
import {verifyToken} from "../middleware/auth";
import {
  approvePost,
  createPost,
  filterPost,
  getAllApprovalPost,
  getAllPost,
  getPostById, getPostByUser, sortPost,
  updatePost
} from "../controllers/PostController";

const router = express.Router()

router.post(`/`, verifyToken, createPost)
router.get(`/all`, getAllPost)
router.get(`/allApprovalPost`, getAllApprovalPost)
router.get(`/:id`, getPostById)
router.put(`/:id`, updatePost)
router.get(`/postsByUser`, getPostByUser)
router.post(`/filterPost`, filterPost)
router.get(`/sortPost`, sortPost)
router.post(`/approvePost/:id`, verifyToken, approvePost)


export default router