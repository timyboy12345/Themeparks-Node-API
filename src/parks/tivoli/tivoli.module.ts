import { HttpModule, Module } from '@nestjs/common';
import { TivoliService } from './tivoli.service';
import { TivoliTransferService } from './tivoli-transfer/tivoli-transfer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  exports: [TivoliService],
  providers: [TivoliService, TivoliTransferService]
})
export class TivoliModule {}