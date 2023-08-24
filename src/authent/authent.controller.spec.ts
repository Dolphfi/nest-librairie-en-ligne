import { Test, TestingModule } from '@nestjs/testing';
import { AuthentController } from './authent.controller';
import { AuthentService } from './authent.service';

describe('AuthentController', () => {
  let controller: AuthentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthentController],
      providers: [AuthentService],
    }).compile();

    controller = module.get<AuthentController>(AuthentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
