import express, { Request, Response } from 'express'
import 'express-async-errors'
import helmet from 'helmet'
import { LOGGER, SERVER_PORT } from './config'
import { handleErrorMiddleware } from './middlewares/handleErrorMiddleware'


const server = express()

server.use(express.json())
server.use(helmet())

//routes
server.get('/', (request: Request, response: Response) => {
  return response.status(200).json({ message: 'Hello World' })
})

// global error handler
server.use(handleErrorMiddleware)

server.listen(SERVER_PORT, () => LOGGER.log({level: 'info', message: `Server running on port ${SERVER_PORT} and process ${process.pid}`}))
