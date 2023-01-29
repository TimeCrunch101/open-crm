if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express')
const rateLimit = require('express-rate-limit');
const initGetRouter = require('./routes/getRouter')
const initPostRouter = require('./routes/postRouter')
const cors = require('cors')
const app = express()

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 1000, // TODO: update for production
	standardHeaders: true,
	legacyHeaders: false,
})

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use((req, res, next) => {
    res.locals.user = req.user
    next()
})
app.use(cors({
	origin: 'http://127.0.0.1:5173',
	credentials: true
}))

// app.use('/api', apiLimiter)

initGetRouter(app)
initPostRouter(app)

if (process.env.NODE_ENV === 'production') console.info('PRODUCTION')

app.listen(8080, console.info(`API: http://localhost:8080`))