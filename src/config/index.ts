import dotenv from 'dotenv'
import { createLogger, transports, format } from 'winston'

dotenv.config()

const ENVIRONMENT = process.env?.ENVIRONMENT
const SERVER_PORT = process.env?.SERVER_PORT

// LOG
const LOGGER = configLog()

function logFormat() {
  return format.printf(({ timestamp,label, level, message }) => {
    return `${timestamp} [${label}] ${level}: ${message}`
  })
}

function configLog() {
  const logger = createLogger({
    format: format.combine(
      format.json(),
      format.label({ label: ENVIRONMENT }),
      format.timestamp(),
      logFormat()
    ),
    transports: [
      new transports.File({ filename: 'logs/logs.log' }),
      new transports.File({ level: 'error', filename: 'logs/errors.log' })
    ]
  })
  
  if(ENVIRONMENT === 'development') {
    logger.add(
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.simple(),
        )
      })
    )
  }
  return logger
}


export {
  SERVER_PORT,
  LOGGER
}