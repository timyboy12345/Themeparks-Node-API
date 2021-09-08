import { Module } from '@nestjs/common';
import { EuropaParkService } from './europa-park/europa-park.service';

@Module({
  providers: [EuropaParkService]
})
export class EuropaParkModule {
}
