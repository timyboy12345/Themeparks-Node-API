import { Module } from '@nestjs/common';
import { UniversalService } from './universal.service';
import { UniversalStudiosFloridaService } from './universal-studios-florida/universal-studios-florida.service';
import { UniversalBaseService } from './universal-base/universal-base.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { UniversalTransferService } from './universal-transfer/universal-transfer.service';
import { IslandsOfAdventureService } from './islands-of-adventure/islands-of-adventure.service';
import { UniversalStudiosHollywoodService } from './universal-studios-hollywood/universal-studios-hollywood.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [UniversalService, UniversalStudiosFloridaService, UniversalBaseService, UniversalTransferService, IslandsOfAdventureService, UniversalStudiosHollywoodService],
  exports: [UniversalService],
})
export class UniversalModule {
}
