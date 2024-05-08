const app = require('./app') //  Express-app
const config = require('./utils/config')
const logger = require('./utils/logger')

//SERVER START
const PORT = process.env.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})