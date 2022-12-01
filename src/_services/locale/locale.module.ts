import { Module } from '@nestjs/common';
import { LocaleService } from './locale.service';

@Module({
  providers: [
    LocaleService
  ],
  exports: [
    LocaleService
  ]
})
export class LocaleModule {}
