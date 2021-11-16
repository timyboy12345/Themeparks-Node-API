import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DisneylandParisService } from './disneyland-paris/disneyland-paris.service';
import { DisneylandParisStudiosService } from './disneyland-paris/disneyland-paris-studios.service';
import { DisneylandParisTransferService } from './disneyland-paris/disneyland-paris-transfer/disneyland-paris-transfer.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [DisneylandParisService, DisneylandParisStudiosService, DisneylandParisTransferService],
  exports: [DisneylandParisStudiosService, DisneylandParisService],
})
export class DisneyModule {
}
