import { Module } from '@nestjs/common';
import { ApenheulService } from './apenheul/apenheul.service';
import { ApenheulTransferService } from './apenheul-transfer/apenheul-transfer.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [ApenheulService, ApenheulTransferService],
  exports: [ApenheulService]
})
export class ApenheulModule {}
