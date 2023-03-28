import { Module } from '@nestjs/common';
import { ParqueWarnerService } from './parque-warner.service';
import { ParqueWarnerTransferService } from './parque-warner-transfer/parque-warner-transfer.service';
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
  providers: [ParqueWarnerService, ParqueWarnerTransferService],
  exports: [ParqueWarnerService],
})
export class ParqueWarnerModule {
}
