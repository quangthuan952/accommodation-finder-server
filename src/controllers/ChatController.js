import {httpCodes} from "../configs/config";
import db from "../models"

const {Op} = require("sequelize");
export const createChat = async (req, res) => {

    const {senderId: userId1} = req.body
    const {recevierId: userId2} = req.body

    if (userId1 && userId2) {
        try {
            const chat = await db.Chat.create({userId1, userId2})
            res.status(httpCodes.SUCCESS).json(chat)
        } catch (e) {
            console.log(e)
            res.sendStatus(httpCodes.UNKNOWN_ERROR)
        }
    }
}

export const getuserChats = async (req, res) => {
    const {userId} = req.params
    if (userId) {
        try {
            const chats = await db.Chat.findAll({
                where: {
                    [Op.or]: [{userId1: userId}, {userId2: userId}]
                }
            })
            res.status(httpCodes.SUCCESS).json(chats)
        } catch (e) {
            console.log(e)
            res.sendStatus(httpCodes.UNKNOWN_ERROR)
        }
    }
}


export const getChat = async (req, res) => {
    const {senderId, receiverId} = req.query
    if (senderId && receiverId) {
        try {
            const chat = await db.Chat.findAll({
                where: {
                    userId1: {
                        [Op.or]: [senderId, receiverId]
                    },
                    userId2: {
                        [Op.or]: [senderId, receiverId]
                    }
                }
            })
            res.status(httpCodes.SUCCESS).json(chat)
        } catch (e) {
            console.log(e)
            res.sendStatus(httpCodes.UNKNOWN_ERROR)
        }
    }
}