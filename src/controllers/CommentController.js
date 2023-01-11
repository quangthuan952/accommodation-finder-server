import {httpCodes} from "../configs/config";
import db from "../models"

export const addComment = async (req, res) => {
  const {postId, accountId, content, parentId} = req.body
  if (postId && accountId && content) {
    try {
      const comment = await db.Comment.create({postId, accountId, content, parentId})
      res.status(httpCodes.SUCCESS).json(comment)
    } catch (e) {
      res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
  }
}

export const getComment = async (req, res) => {
  const {postId} = req.params
  if (postId) {
    try {
      const comments = await db.Comment.findAll({where: {postId}, order: [['createdAt', 'DESC']]})
      res.status(httpCodes.SUCCESS).json(comments)
    } catch (e) {
      res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
  }
}

export const updateComment = async (req, res) => {
  const {contentUpdate, commentId} = req.body
  if (commentId && contentUpdate) {
    try {
      const comment = await db.Comment.update({content: contentUpdate},{where: {id: commentId}})
      res.status(httpCodes.SUCCESS).json(comment)
    } catch (e) {
      res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
  }
}


export const deleteComment = async (req, res) => {
  const {id} = req.params
  if (id ) {
    try {
      await db.Comment.destroy({where: {id}})
      await db.Comment.destroy({where: {parentId: id}})
      res.status(httpCodes.SUCCESS).json({"ok": true})
    } catch (e) {
      res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
  }
}




