import { Redis } from 'ioredis';
import {
    AuditData,
    RedisTransportOptions,
    TransportMethods,
    Transport,
} from '../interfaces';
import { Logger } from '@nestjs/common';

export default class RedisTransport implements Transport {
    options: RedisTransportOptions;
    name = TransportMethods.REDIS;

    private redisClient: Redis;

    constructor(options: RedisTransportOptions) {
        this.options = options;
        this.redisClient = new Redis(this.options.connectionString);
    }

    async emit(data: AuditData): Promise<void> {
        try {
            await this.publish(this.options.channel, JSON.stringify(data));
        } catch (error) {
            Logger.error(
                'Error sending message to Redis channel. Please check if the provided arguments are correct',
                error,
            );
        }
    }

    private async publish(channel: string, message: string): Promise<number> {
        // Post a message to a channel
        return await this.redisClient.publish(channel, message);
    }
}
