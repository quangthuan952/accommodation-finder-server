import {userController} from "../controllers"
import {verifyToken} from "../middleware/auth";

module.exports = (app) => {
    app.get(`/me`, verifyToken, userController.getProfile)
    app.get(`/user/:id`, verifyToken, userController.getProfileById)
}