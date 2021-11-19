import { HttpModule, Module } from '@nestjs/common';
import { ThorpeParkService } from './thorpe-park.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [ThorpeParkService],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  exports: [
    ThorpeParkService
  ]
})
export class ThorpeParkModule {}
