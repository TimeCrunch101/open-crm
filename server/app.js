const express = require('express')
const initGetRouter = require('./routes/getRouter')
const initPostRouter = require('./routes/postRouter')
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use((req, res, next) => {
    res.locals.user = req.user
    next()
})

initGetRouter(app)
initPostRouter(app)

app.listen(8080, console.log(`API: http://localhost:8080`))