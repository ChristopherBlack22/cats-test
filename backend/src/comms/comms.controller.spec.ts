import { Test, TestingModule } from '@nestjs/testing';
import { CommsController } from './comms.controller';
import { CommsService } from './comms.service';
import { UsersModule } from 'src/users/users.module';

describe('CommsController', () => {
  let controller: CommsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      controllers: [CommsController],
      providers: [CommsService],
    }).compile();

    controller = module.get<CommsController>(CommsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
