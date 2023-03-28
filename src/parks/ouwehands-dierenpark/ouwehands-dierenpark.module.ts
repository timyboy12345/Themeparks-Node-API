import { Module } from '@nestjs/common';
import { OuwehandsDierenparkService } from './ouwehands-dierenpark.service';
import { OuwehandsDierenparkTransferService } from './ouwehands-dierenpark-transfer/ouwehands-dierenpark-transfer.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [OuwehandsDierenparkService, OuwehandsDierenparkTransferService],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  exports: [OuwehandsDierenparkService],
})
export class OuwehandsDierenparkModule {
}
