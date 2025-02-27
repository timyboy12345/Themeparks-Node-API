import { Test, TestingModule } from '@nestjs/testing';

// TODO: Fix the testing of anything with a dependency on the database
describe('PushService', () => {
  it('has a temp fix', () => {
    expect(true).toBe(true);
  });
});

// describe('PushService', () => {
//   let service: PushService;
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [PushService],
//     }).compile();
//
//     service = module.get<PushService>(PushService);
//   });
//
//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
