import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const accpuntingSvcConfig = {
  urls: [`${configService.get('RABBITMQ_URL')}`],
  queue: `${configService.get('RABBITMQ_ACCOUNTING_SVC')}`,
  queueOptions: {
    durable: true,
  },
};