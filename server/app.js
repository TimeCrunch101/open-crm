import express from "express";
import { initGetRouter } from "./routes/getRouter.js";
import { initPostRouter } from "./routes/postRouter.js";
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

initGetRouter(app)
initPostRouter(app)

app.listen(8080, console.log(`API: http://localhost:8080`))