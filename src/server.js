import express from "express"
import cors from "cors";
import {serverSettings} from "./configs/config"
const {port} = serverSettings

// routes
import AuthRoute from "./routes/AuthRoute"
import PostRoute from "./routes/PostRoute"
import UserRoute from "./routes/UserRoute"
import ChatRoute from "./routes/ChatRoute";
import MessageRoute from "./routes/MessageRoute";
import CommentRoute from "./routes/CommentRoute";

const app = express()

app.use(cors({origin: '*'}))
app.use(express.urlencoded({limit: "100mb"}));
app.use(express.json({limit: "100mb"}));


app.use('/auth', AuthRoute)
app.use('/post', PostRoute)
app.use('/user', UserRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)
app.use('/comment', CommentRoute)

app.listen(port, () => {
  console.log('server is running on ' + port)
})