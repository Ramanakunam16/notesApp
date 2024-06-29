/*
console.log("hello world");
const http = require("http");*/

//////////////////////////////////////////////////////////
/* backend logic */
////////////////////////////////////////////////////////////
const app = require('./app')
const logger = require('./utils/logger')
const config = require('./utils/config')

app.listen(config.PORT)
logger.info(`Server running on port ${config.PORT}`)
