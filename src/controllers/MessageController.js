import {httpCodes} from "../configs/config";
import db from "../models"

export const addMessage = async (req, res) => {
  const {chatId, senderId, content} = req.body
  if(chatId && senderId && content) {
    try {
      const message = await db.Message.create({chatId, senderId, content})
      res.status(httpCodes.SUCCESS).json(message)
    }catch (e) {
      res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
  }
}

export const getMessages = async (req, res) => {
  const {chatId} = req.params
  if(chatId) {
    try {
      const messages = await db.Message.findAll({where: {chatId}})
      res.status(httpCodes.SUCCESS).json(messages)
    }catch (e) {
      res.sendStatus(httpCodes.UNKNOWN_ERROR)
    }
  }
}