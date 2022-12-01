import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ToverlandService } from './toverland.service';
import { ToverlandTransferService } from './toverland-transfer/toverland-transfer.service';
import { LocaleModule } from '../../_services/locale/locale.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
    LocaleModule
  ],
  providers: [ToverlandService, ToverlandTransferService],
  exports: [ToverlandService],
})
export class ToverlandModule {
}
