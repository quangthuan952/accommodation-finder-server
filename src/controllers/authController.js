import {httpCodes} from "../configs/config"
import db from "../models"
import jwt from "jsonwebtoken";

require("dotenv").config()

function generateToken(user) {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '24h'
    })

    const refreshToken = jwt.sign(user, process.env.REFRESH_ACCESS_TOKEN_SECRET, {
            expiresIn: '72h'
        }
    )
    return {accessToken, refreshToken}
}

const authController = {
    async login(req, res) {
        const {token} = req.body
       if(token) {
           const decodedToken = jwt.decode(token)
           let userData = {}
           if(decodedToken) {
               userData = {
                   displayName: decodedToken.name || 'Người dùng mới',
                   email: decodedToken.email,
                   phoneNumber: decodedToken.phone_number,
                   from:decodedToken.sign_in_provider,
                   uid: decodedToken.user_id,
                   avatar: decodedToken.picture,
               };
           }
           if (Date.now() < decodedToken.exp * 1000) {
               try {
                   const user = await db.Account.findOne({where: {uid: userData.uid}
                   })
                   let userRes = {}
                   let tokens = {}
                   if (!user) {
                       const userDb = await db.Account.create({...userData})
                       userRes = {...userData, id: userDb.id}
                       tokens = generateToken(userRes)
                   }
                   else {
                       userRes = {...userData, id: user.id}
                       tokens = generateToken(userRes)
                   }
                   return res
                       .status(httpCodes.SUCCESS)
                       .json({user: {...userData}, ...tokens })
               } catch (e) {
                   console.log(e)
                   return res.status(httpCodes.UNKNOWN_ERROR)
               }
           }
           return res.status(httpCodes.TOKEN_EXPIRED)
       }
        return res.status(httpCodes.UNAUTHORIZED)
    },
    async refreshToken(req, res) {
       try {
           const {user} = req
           delete user.iat
           delete user.exp
           const {accessToken, refreshToken} = generateToken(user)
           return res
               .status(httpCodes.SUCCESS)
               .json({accessToken, refreshToken, user})
       }catch (e) {
           console.log(e)
       }
    }
}

module.exports = authController