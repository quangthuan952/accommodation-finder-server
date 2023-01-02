import {authController} from "../controllers"
import {verifyRefreshToken} from "../middleware/auth";

module.exports = (app) => {
    app.post('/login', authController.login)
    app.post('/refreshToken', verifyRefreshToken, authController.refreshToken)
}