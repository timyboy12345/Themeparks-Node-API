import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SixFlagsGeneralParkService } from './parks/six-flags-general-park/six-flags-general-park.service';
import { SixflagsTransferService } from './sixflags-transfer/sixflags-transfer.service';
import { SixflagsService } from './sixflags.service';
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
  exports: [SixflagsService],
  providers: [SixflagsTransferService, SixFlagsGeneralParkService, SixflagsService],
})
export class SixflagsModule {
}
