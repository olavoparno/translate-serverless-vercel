import Redis from 'ioredis'
import { Logger } from '../logging/Logging.logger'

const redisOptions = {
  port: (process.env.REDIS_PORT as unknown as number) || 30438,
  host: process.env.REDIS_HOST as string,
  password: process.env.REDIS_PW as string,
  maxRetriesPerRequest: 2,
}

export function RedisManager(): Redis {
  const redisClient = new Redis(redisOptions.port, redisOptions.host, {
    password: redisOptions.password,
    maxRetriesPerRequest: redisOptions.maxRetriesPerRequest,
  })

  redisClient.on('error', (error) => {
    Logger.error('RedisClientOnError::')
    Logger.error(JSON.stringify(error))
  })

  return redisClient
}
