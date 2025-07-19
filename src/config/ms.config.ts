import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const accountingSvcConfig = {
  urls: [`${configService.get('RABBITMQ_URL')}`],
  queue: `${configService.get('RABBITMQ_EVS_QUEUE')}`,
  queueOptions: {
    durable: true,
  },
};
