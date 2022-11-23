import { Module } from '@nestjs/common';
import { FamilyparkService } from './familypark/familypark.service';

@Module({
  providers: [FamilyparkService],
  exports: [FamilyparkService]
})
export class FamilyparkModule {}
