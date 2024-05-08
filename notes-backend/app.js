const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
//const morgan = require('morgan')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
const mongoose = require('mongoose')

/* morgan.token('content', function(req, res) {
    return JSON.stringify(req.body);
}); */

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
.then(result => {
  logger.info('connected to MongoDB')
})
.catch((error) => {
  logger.error('error connection to MongoDB:', error.message)
})

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app