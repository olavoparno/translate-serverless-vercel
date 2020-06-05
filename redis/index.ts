import Redis from 'ioredis'

export function RedisManager(): Redis.Redis {
  const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PW,
    port: (process.env.REDIS_PORT as unknown) as number,
  })

  return redisClient
}
