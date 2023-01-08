import {serverSettings} from "../configs/config"
import {postController} from "../controllers/index"
import {verifyToken} from "../middleware/auth";

const {basePath} = serverSettings

module.exports = (app) => {
  app.post(`/post`, verifyToken, postController.createPost)
  app.get(`/post/all`, postController.getAllPost)
  app.get(`/post/:id`, postController.getPostById)
  app.put(`/post/:id`, postController.updatePost)
  app.get(`/postsByUser`, postController.getPostByUser)
  app.get(`/postsByProvince`, postController.getPostByProvince)
  app.get(`/filterPost`, postController.filterPost)
  app.get(`/sortPost`, postController.sortPost)
  app.post(`/approvePost/:id`,verifyToken, postController.approvePost)
}



