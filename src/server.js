import express from "express"
import {serverSettings} from "./configs/config"
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const apis = require("./apis")
const {port} = serverSettings
const cors = require('cors')
const app = express()

app.use(cookieParser());
app.use(cors({origin: '*'}))

app.use(express.urlencoded({limit: "100mb"}));
app.use(express.json({limit: "100mb"}));
apis(app)

app.listen(port, () => {
  console.log('server is running on ' + port)
})