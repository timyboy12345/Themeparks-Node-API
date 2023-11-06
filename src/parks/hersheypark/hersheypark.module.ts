import { Module } from '@nestjs/common';
import { HersheyparkService } from './hersheypark.service';
import { HersheyparkTransferService } from './hersheypark-transfer/hersheypark-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [HersheyparkService, HersheyparkTransferService],
  exports: [HersheyparkService]
})
export class HersheyparkModule {}
