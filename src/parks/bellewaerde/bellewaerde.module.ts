import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { BellewaerdeService } from './bellewaerde/bellewaerde.service';
import { LocaleModule } from '../../_services/locale/locale.module';
import { CompagnieDesAlpesModule } from '../compagnie-des-alpes/compagnie-des-alpes.module';

@Module({
  imports: [
    HttpModule,
    LocaleModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
    CompagnieDesAlpesModule
  ],
  providers: [BellewaerdeService],
  exports: [BellewaerdeService],
})
export class BellewaerdeModule {
}
