import { Module } from '@nestjs/common';
import { ArtisService } from './artis.service';
import { ArtisTransferService } from './artis-transfer/artis-transfer.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
  ],
  providers: [ArtisService, ArtisTransferService],
  exports: [ArtisService],
})
export class ArtisModule {}
