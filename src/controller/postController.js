import {httpCodes} from "../configs/config"
import db from "../models"

const postController = {

  async createPost(req, res) {
    const {body} = req
    try {
      const {dataValues: post} = await db.Post.create({...body})
      return res.status(httpCodes.CREATED).json({post: post})
    } catch (e) {
      console.log('e', e)
    }
  },

  async getAllPost(req, res) {
   try {
     const allPost = await db.Post.findAll()
     return res.status(httpCodes.SUCCESS).json(allPost)
   }catch (e) {
     console.log('e', e)
   }
  },

  async getPostById(req, res) {
   try {
     const post = await db.Post.findAll({
       where: {
         id: req.params.id
       }
     })
     return res.status(httpCodes.SUCCESS).json(post)
   }
   catch (e) {
     console.log('e', e)
   }
  },

  async updatePost(req, res) {
    try {
      const post = await db.Post.update({...req.body},{
        where: {
          id: req.params.id
        }
      })
      return res.status(httpCodes.SUCCESS).json({ok: true})
    }
    catch (e) {
      console.log('e', e)
    }
  }
}

module.exports = postController