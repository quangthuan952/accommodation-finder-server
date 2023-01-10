import {httpCodes} from "../configs/config"
import db from "../models"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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

export const login = async (req, res) => {
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
        avatar: decodedToken.picture || 'https://res.cloudinary.com/dqrn1uojt/image/upload/v1673227384/avatar_default_lqsou9.png',
      };
    }
    if (Date.now() < decodedToken.exp * 1000) {
      try {
        const account = await db.Account.findOne({where: {uid: userData.uid}
        
        })
        let userRes = {}
        let tokens = {}
        if (!account) {
          const userDb = await db.Account.create({...userData})
          userRes = {...userData, id: userDb.id}
          tokens = generateToken(userRes)
          await db.User.create({accountId: userDb.id})
        }
        else {
          userRes = {...userData, id: account.id}
          tokens = generateToken(userRes)
        }
        return res
          .status(httpCodes.SUCCESS)
          .json({account: {...userData}, ...tokens })
      } catch (e) {
        console.log(e)
        return res.status(httpCodes.UNKNOWN_ERROR)
      }
    }
    return res.status(httpCodes.TOKEN_EXPIRED)
  }
  return res.status(httpCodes.UNAUTHORIZED)
}

export const refreshToken = async (req, res) => {
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
