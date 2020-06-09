import Redis from 'ioredis'
import { Logger } from '../logging/Logging.logger'

export function RedisManager(): Redis.Redis {
  const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PW,
    port: (process.env.REDIS_PORT as unknown) as number,
    keepAlive: (false as unknown) as number,
    maxRetriesPerRequest: 2,
    enableReadyCheck: true,
  })

  redisClient.on('error', (error) => {
    Logger.error('RedisClientOnError::')
    Logger.error(JSON.stringify(error))
  })

  return redisClient
}
