import { HttpModule, Module } from '@nestjs/common';
import { LisebergService } from './liseberg.service';
import { LisebergTransferService } from './liseberg-transfer/liseberg-transfer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [LisebergService, LisebergTransferService],
  exports: [LisebergService],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ]
})
export class LisebergModule {}
