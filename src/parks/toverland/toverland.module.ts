import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ToverlandService } from './toverland.service';
import { ToverlandTransferService } from './toverland-transfer/toverland-transfer.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [ToverlandService, ToverlandTransferService],
  exports: [ToverlandService]})
export class ToverlandModule {}
