import { SNSClient } from '@aws-sdk/client-sns';
import { AuditData } from './audit.interface';

export enum TransportMethods {
  CONSOLE = 'console',
  MONGOOSE = 'mongoose',
  POSTGRES = 'postgresql',
  MYSQL = 'mysql',
  SNS = 'sns',
  REDIS = 'redis'
}

export interface BaseTransport {
  name: TransportMethods;
  options?: TransportOptions;
}

export interface Transport extends BaseTransport {
  emit(data: AuditData): void;
}

export interface ConsoleTransportOptions {
  logger?: any;
}

export interface SNSTransportOptions {
  client: SNSClient;
  snsTopicArn: string;
}

export interface MongooseTransportOptions {
  connectionString: string;
}

export interface PostgresTransportOptions {
  connectionString: string; // 'postgres://user:pass@example.com:5432/dbname'
}

export interface MySQLTransportOptions {
  connectionString: string;
}

export interface RedisTransportOptions {
  connectionString: string; // 'redis://:authpassword@127.0.0.1:6380/4'
  channel: string; // 'audit-channel'
}

export type TransportOptions =
  | ConsoleTransportOptions
  | MongooseTransportOptions
  | PostgresTransportOptions
  | MySQLTransportOptions
  | SNSTransportOptions
  | RedisTransportOptions;
