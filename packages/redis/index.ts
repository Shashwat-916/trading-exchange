import { createClient, type RedisClientType } from 'redis'


export class RedisManager {

    private client: RedisClientType;
    private static instance: RedisManager

    private constructor() {
        this.client = createClient()
        this.client.on('error', (err) => { console.error("Redis Client Error") })
        this.client.on('connect', () => { console.log("Redis connected Successfully ") })
        this.client.connect().catch(console.error)
    }

    public static getInstance(): RedisManager {
        if (!this.instance) {
            this.instance = new RedisManager()
        }
        return this.instance
    }

    public getClient(): RedisClientType {
        return this.client
    }

}


export const redisInstance = RedisManager.getInstance()
export const redis = redisInstance.getClient()

