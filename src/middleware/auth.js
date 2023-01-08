const jwt = require('jsonwebtoken');
const {httpCodes} = require("../configs/config");
require('dotenv').config()

const verifyToken = (req, res, next) =>  {
    const accessToken = req.headers["authorization"] && req.headers["authorization"].split(" ")[1]
    if(!accessToken) {
        return res.sendStatus(httpCodes.UNAUTHORIZED);
    }
    else {
        try {
            req.user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
            next()
        }catch (e) {
            if (e.name === "TokenExpiredError") {
                return res.sendStatus(httpCodes.TOKEN_EXPIRED)
            }
            return res.sendStatus(httpCodes.INVALID_ACCESS_TOKEN)
        }
    }
}

const verifyRefreshToken = (req, res, next) =>  {
    const {refreshToken} = req.body
    if(!refreshToken) {
        return res.sendStatus(httpCodes.UNAUTHORIZED);
    }
    else {
        try {
            req.user = jwt.verify(refreshToken, process.env.REFRESH_ACCESS_TOKEN_SECRET)
            next()
        }catch (e) {
            console.log(e)
            return res.sendStatus(httpCodes.INVALID_ACCESS_TOKEN)
        }
    }
}




module.exports = {
    verifyToken,
    verifyRefreshToken
}