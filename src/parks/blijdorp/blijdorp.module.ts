import { Module } from '@nestjs/common';
import { BlijdorpService } from './blijdorp/blijdorp.service';
import { BlijdorpTransferService } from './blijdorp-transfer/blijdorp-transfer.service';
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
  providers: [BlijdorpService, BlijdorpTransferService],
  exports: [BlijdorpService]
})
export class BlijdorpModule {

}
