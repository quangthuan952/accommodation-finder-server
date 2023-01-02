import db from "../models"
import {httpCodes} from "../configs/config";

const profileController = {
    async getProfile(req, res) {
        const {user} = req
       try {
           const userData = await db.Account.findOne({where: {uid: user.uid}})
           if (userData) {
               return res.status(httpCodes.SUCCESS).json(userData)
           }
           else {
               return res.sendStatus(httpCodes.BAD_REQUEST)
           }
       }
       catch (e) {
           console.log(e)
           return res.sendStatus(httpCodes.UNKNOWN_ERROR)
       }
    }
}

module.exports = profileController