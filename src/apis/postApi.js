import {serverSettings} from "../configs/config"
import {postController} from "../controllers/index"

const {basePath} = serverSettings

module.exports = (app) => {
  app.post(`/post`, postController.createPost)
  app.get(`/post/all`, postController.getAllPost)
  app.get(`/post/:id`, postController.getPostById)
  app.put(`/post/:id`, postController.updatePost)
}



