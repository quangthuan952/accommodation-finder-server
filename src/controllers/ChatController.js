import {httpCodes} from "../configs/config";
import db from "../models"

export const createChat = async (req, res) => {
  
  const {senderId: userId1} = req.body
  const {recevierId: userId2} = req.body
  
  if(userId1 && userId2) {
    try {
      const chat = await db.Chat.create({userId1, userId2})
      res.status(httpCodes.SUCCESS).json(chat)
    }catch (e) {
      console.log(e)
      res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
  }
}