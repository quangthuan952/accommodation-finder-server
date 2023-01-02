import {profileController} from "../controllers"
import {verifyToken} from "../middleware/auth";

module.exports = (app) => {
    app.get(`/me`, verifyToken, profileController.getProfile)
}