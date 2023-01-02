import {httpCodes} from "../configs/config"
import db from "../models"
import jwt from "jsonwebtoken";

require("dotenv").config()

function generateToken(user) {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30s'
    })

    const refreshToken = jwt.sign(user, process.env.REFRESH_ACCESS_TOKEN_SECRET, {
            expiresIn: '60m'
        }
    )
    return {accessToken, refreshToken}
}

const authController = {
    async login(req, res) {
        const {token} = req.body
        const decodedToken = jwt.decode(token)
        const userData = {
            displayName: decodedToken.name,
            email: decodedToken.email,
            phoneNumber: null,
            from: "Google",
            uid: decodedToken.user_id,
            avatar: decodedToken.picture,
        };
        if (Date.now() < decodedToken.exp * 1000) {
            try {
                const user = await db.Account.findOne({where: {uid: userData.uid}})
                const {accessToken, refreshToken} = generateToken(userData)
                if (!user) {
                    await db.Account.create({...userData})
                }
                return res
                    .status(httpCodes.SUCCESS)
                    .json({user: {...userData}, accessToken, refreshToken})

            } catch (e) {
                console.log(e)
                return res.status(httpCodes.UNAUTHORIZED)
            }
        }
        return res.status(httpCodes.TOKEN_EXPIRED)
    },
    async refreshToken(req, res) {
       try {
           const {user} = req
           delete user.iat
           delete user.exp
           const {accessToken, refreshToken} = generateToken(req.user)
           return res
               .status(httpCodes.SUCCESS)
               .json({accessToken, refreshToken})
       }catch (e) {
           console.log(e)
       }
    }
}

module.exports = authController