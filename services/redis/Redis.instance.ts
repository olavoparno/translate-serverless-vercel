import Redis from 'ioredis'
import { Logger } from '../logging/Logging.logger'

export function RedisManager(): Redis.Redis {
  const redisClient = new Redis({
    host: process.env.REDIS_HOST || 'us1-good-mite-30424.lambda.store',
    password: process.env.REDIS_PW || '590b6c96919d442ab9ddd2a27989df28',
    port: ((process.env.REDIS_PORT as unknown) as number) || 30424,
  })

  redisClient.on('error', (error) => {
    Logger.error('> RedisClientOnError::')
    Logger.error(JSON.stringify(error))
  })

  return redisClient
}
