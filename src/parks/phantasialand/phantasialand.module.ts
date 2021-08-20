import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PhantasialandService } from './phantasialand.service';
import { PhantasialandTransferService } from './phantasialand-transfer/phantasialand-transfer.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [PhantasialandService, PhantasialandTransferService],
  exports: [PhantasialandService]
})
export class PhantasialandModule {}
