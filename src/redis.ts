import redis, { RedisClient } from 'redis'

export function Redis(): RedisClient {
  const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PW,
    port: (process.env.REDIS_PORT as unknown) as number,
  })

  return redisClient
}
