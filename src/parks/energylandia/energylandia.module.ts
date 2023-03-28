import { Module } from '@nestjs/common';
import { EnergylandiaService } from './energylandia/energylandia.service';
import { ConfigModule } from '@nestjs/config';
import { EnergylandiaTransferService } from './energylandia-transfer/energylandia-transfer.service';
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
  providers: [EnergylandiaService, EnergylandiaTransferService],
  exports: [EnergylandiaService]
})
export class EnergylandiaModule {}
