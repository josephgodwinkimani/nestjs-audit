import { SNSClient } from '@aws-sdk/client-sns';
import { AuditData } from './audit.interface';

export enum TransportMethods {
  CONSOLE = 'console',
  MONGOOSE = 'mongoose',
  SNS = 'sns',
}

export interface Transport {
  name: TransportMethods;
  options?: TransportOptions;
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

export type TransportOptions =
  | ConsoleTransportOptions
  | MongooseTransportOptions
  | SNSTransportOptions;
