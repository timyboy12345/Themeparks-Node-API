import { Module } from '@nestjs/common';
import { BobbejaanlandService } from './bobbejaanland.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [BobbejaanlandService],
  exports: [BobbejaanlandService],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    })
  ],
})
export class BobbejaanlandModule {
}
