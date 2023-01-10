import db from "../models"
import {httpCodes} from "../configs/config";

const getAccountData = async (id) => {
  return await db.Account.findOne({where: {id}})
}

export const getProfile = async (req, res) => {
  const {user} = req
  try {
    const accountData = await getAccountData(user.id)
    let roleTemp = accountData.role + 1
    if(roleTemp) {
      switch (roleTemp) {
        case 1: {
          console.log('vafo 0')
          try {
            const userData = await db.User.findOne({where: {accountId: accountData.id},
              attributes: ['bio', 'balance', 'address', 'id']
            })
            return res.status(httpCodes.SUCCESS).json({...accountData, ...userData})
          }
          catch (e) {
            return res.sendStatus(httpCodes.BAD_REQUEST)
          }
        }
        // case 1: {
        //
        // }
        case 3: {
          return res.status(httpCodes.SUCCESS).json({...accountData})
        }
      }
    }
    //     include: [
    //         {model: db.User, as: 'userData', attributes: ['id', 'address', 'balance', 'bio', 'accountId']}
    //     ],
    //     raw: true,
    //     nest: true
    // })
    // if (userData) {
    //     return res.status(httpCodes.SUCCESS).json(userData)
    // } else {
    //     return res.sendStatus(httpCodes.BAD_REQUEST)
    // }
  } catch (e) {
    console.log(e)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}

export const getProfileById = async (req, res) => {
  try {
    const userData = await db.Account.findOne({where: {id: req.params.id},
      include: [
        {model: db.User, as: 'userData', attributes: ['id', 'address', 'balance', 'bio', 'accountId']}
      ],
      raw: true,
      nest: true
    })
    if (userData) {
      return res.status(httpCodes.SUCCESS).json(userData)
    } else {
      return res.sendStatus(httpCodes.BAD_REQUEST)
    }
  } catch (e) {
    console.log(e)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}