import express from "express"
import * as dotenv from 'dotenv'
dotenv.config()
const app = express()
const port = process.env.PORT

app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello word")
})

app.listen(port, () => {
    console.log('server is running on ' + port)
})