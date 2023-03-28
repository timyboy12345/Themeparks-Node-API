import { Module } from '@nestjs/common';
import { PlopsalandDePanneService } from './plopsaland-de-panne.service';
import { ConfigModule } from '@nestjs/config';
import { PlopsalandDePanneTransferService } from './plopsaland-de-panne-transfer/plopsaland-de-panne-transfer.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    })
  ],
  providers: [PlopsalandDePanneService, PlopsalandDePanneTransferService],
  exports: [PlopsalandDePanneService],
})
export class PlopsalandDePanneModule {
}
