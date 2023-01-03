const {verifyToken} = require("../middleware/auth");
import {questionController} from "../controllers"
module.exports = (app) => {
  app.post("/question", verifyToken, questionController.raiseQuestion)
}