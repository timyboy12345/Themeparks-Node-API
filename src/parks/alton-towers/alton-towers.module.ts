import { HttpModule, Module } from '@nestjs/common';
import { AltonTowersService } from './alton-towers.service';
import { ConfigModule } from '@nestjs/config';
import { AioTransferServiceService } from '../../_services/aio/transfer-service/aio-transfer-service.service';

@Module({
  providers: [AltonTowersService, AioTransferServiceService],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  exports: [AltonTowersService]
})
export class AltonTowersModule {}
