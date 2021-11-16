import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LegolandDeutschlandService } from './legoland-deutschland/legoland-deutschland.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
      ignoreEnvFile: false,
    }),
  ],
  providers: [LegolandDeutschlandService],
  exports: [LegolandDeutschlandService],
})
export class LegolandModule {
}
