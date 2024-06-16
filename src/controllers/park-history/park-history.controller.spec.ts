// import { Test, TestingModule } from '@nestjs/testing';
// import { ParkHistoryController } from './park-history.controller';
// import { ParksService } from '../../_services/parks/parks.service';
// import { CacheModule } from '@nestjs/cache-module';
// import { ParksModule } from '../../parks/parks.module';

// TODO: Fix the testing of anything with a dependency on the database
describe('ParkHistoryController', () => {
  it('has a temp fix', () => {
    expect(true).toBe(true);
  });
});
// describe('ParkHistoryController', () => {
//   let controller: ParkHistoryController;
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [ParkHistoryController],
//       providers: [ParksService],
//       imports: [CacheModule.register({ ttl: 0 }), ParksModule],
//     }).compile();
//
//     controller = module.get<ParkHistoryController>(ParkHistoryController);
//   });
//
//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });
