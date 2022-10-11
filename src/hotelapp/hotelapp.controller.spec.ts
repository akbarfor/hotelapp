import { Test, TestingModule } from '@nestjs/testing';
import { HotelappController } from './hotelapp.controller';
import { HotelAppService } from './hotelapp.service';

describe('HotelappController', () => {
  let controller: HotelappController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelappController],
      providers: [HotelAppService],
    }).compile();

    controller = module.get<HotelappController>(HotelappController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
