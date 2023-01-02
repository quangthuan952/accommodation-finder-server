import express from "express"
import {serverSettings} from "./configs/config"

const cookieParser = require("cookie-parser");
const apis = require("./apis")
const {port} = serverSettings
const cors = require('cors')
const app = express()

app.use(cookieParser());
app.use(cors())
app.use(express.urlencoded());
app.use(express.json());

apis(app)

app.listen(port, () => {
  console.log('server is running on ' + port)
})