import Redis from 'ioredis'
import { Logger } from '../logging/Logging.logger'

export function RedisManager(): Redis.Redis {
  const redisClient = new Redis({
    host: process.env.REDIS_HOST || 'us1-frank-bluejay-30438.lambda.store',
    password: process.env.REDIS_PW || 'b00e9ba1a3a04a07a432d2b57f419705',
    port: ((process.env.REDIS_PORT as unknown) as number) || 30438,
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
