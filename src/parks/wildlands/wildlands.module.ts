import { Module } from '@nestjs/common';
import { WildlandsService } from './wildlands.service';
import { WildlandsTransferService } from './wildlands-transfer/wildlands-transfer.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [WildlandsService, WildlandsTransferService],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  exports: [WildlandsService],
})
export class WildlandsModule {
}
