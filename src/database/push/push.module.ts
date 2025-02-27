import { Module } from '@nestjs/common';
import { PushService } from './push.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Push } from './push.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Push])],
  exports: [PushService],
  providers: [PushService]
})
export class PushModule {}
