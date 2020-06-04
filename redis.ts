import redis from 'redis'

export function useRedis() {
  const redisClient = redis.createClient({
    host: process.env.REDIS_HOST || 'us1-integral-quagga-30422.lambda.store',
    password: process.env.REDIS_PW || '4d59458e08f041dcb092e74cf3e77c4f',
    port: ((process.env.REDIS_PORT as unknown) as number) || 30422,
  })

  return {
    redisClient,
  }
}
