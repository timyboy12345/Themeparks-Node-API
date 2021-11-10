import { HttpModule, Module } from '@nestjs/common';
import { GronaLundService } from './grona-lund.service';
import { GronaLundTransferService } from './grona-lund-transfer/grona-lund-transfer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [GronaLundService, GronaLundTransferService],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  exports: [GronaLundService]
})
export class GronaLundModule {}
