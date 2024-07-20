import { Module } from '@nestjs/common';
import { QrApiController } from './controllers/qr-api.controller';
import { QrApiService } from './service/qr-api.service';

@Module({
  controllers: [QrApiController],
  providers: [QrApiService],
})
export class QrApiModule {}
