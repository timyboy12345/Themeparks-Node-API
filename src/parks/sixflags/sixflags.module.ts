import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SixFlagsGeneralParkService } from './parks/six-flags-general-park/six-flags-general-park.service';
import { SixflagsTransferService } from './sixflags-transfer/sixflags-transfer.service';
import { SixflagsService } from './sixflags.service';

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
  providers: [SixflagsTransferService, SixFlagsGeneralParkService, SixflagsService, SixFlagsGeneralParkService],
})
export class SixflagsModule {
}
