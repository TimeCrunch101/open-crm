if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express')
const rateLimit = require('express-rate-limit');
const initGetRouter = require('./routes/getRouter')
const initPostRouter = require('./routes/postRouter')
const cors = require('cors')
const app = express()

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 200,
	standardHeaders: true,
	legacyHeaders: false,
})

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use((req, res, next) => {
    res.locals.user = req.user
    next()
})

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }))
}

if (process.env.NODE_ENV === 'production') {
	app.use('/api/get', apiLimiter)
	app.use('/api/login', apiLimiter)
	app.use('/api/create', apiLimiter)
	app.use('/api/update', apiLimiter)
	app.use('/api/disable', apiLimiter)
	app.use('/api/enable', apiLimiter)
	app.use('/api/delete', apiLimiter)
  app.use('/api/validate', rateLimit({windowMs: 15*60*1000,max:500,standardHeaders:true,legacyHeaders:false}))
}

initGetRouter(app)
initPostRouter(app)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public'))
  console.warn('PRODUCTION')
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
  })
}

app.listen(8080, console.info(`API: http://localhost:8080`))