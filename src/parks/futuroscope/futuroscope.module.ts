import { Module } from '@nestjs/common';
import { FuturoscopeService } from './futuroscope.service';
import { FuturoscopeTransferService } from './futuroscope-transfer/futuroscope-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: ".env",
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [FuturoscopeService, FuturoscopeTransferService],
  exports: [FuturoscopeService]
})
export class FuturoscopeModule {}
