import { HttpModule, Module } from '@nestjs/common';
import { EnergylandiaService } from './energylandia/energylandia.service';
import { ConfigModule } from '@nestjs/config';
import { EnergylandiaTransferService } from './energylandia-transfer/energylandia-transfer.service';

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
