import express from "express"
import {serverSettings} from "./configs/config"

const apis = require("./apis")
const {port} = serverSettings
const app = express()

app.use(express.urlencoded());
app.use(express.json());

apis(app)

app.listen(port, () => {
  console.log('server is running on ' + port)
})