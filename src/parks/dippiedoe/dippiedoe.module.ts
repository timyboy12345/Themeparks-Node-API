import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DippieDoeService } from './dippie-doe.service';
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
  providers: [DippieDoeService],
  exports: [DippieDoeService],
})
export class DippiedoeModule {
}
