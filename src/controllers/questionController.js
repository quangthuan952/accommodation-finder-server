import db from "../models"
const {httpCodes} = require("../configs/config");

export const createQuestion = async (req, res) => {
  const {user} = req
  const questionData = {
    question: req.body.question,
    answer: null,
    topic: 1,
    questionerId: user.uid,
    respondentId: null,
    isActive: false,
    status: 1
  }
  try {
    const {dataValues: questionResponse} = await db.Question.create({...questionData})
    return res.status(httpCodes.CREATED).json({question: questionResponse})
  } catch (e) {
    console.log(e)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}