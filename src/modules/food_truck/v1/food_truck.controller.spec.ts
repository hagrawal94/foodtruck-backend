import { Test, TestingModule } from '@nestjs/testing';
import { FoodTruckController } from './food_truck.controller';
import { FoodTruckService } from './food_truck.service';

describe('FoodTruckController', () => {
  let controller: FoodTruckController;
  let foodTruckService: FoodTruckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodTruckController],
      providers: [
        {
          provide: FoodTruckService,
          useValue: {
            getNearbyFoodTrucks: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FoodTruckController>(FoodTruckController);
    foodTruckService = module.get<FoodTruckService>(FoodTruckService);
  });

  describe('getNearbyFoodTrucks', () => {
    it('should return nearby food trucks', async () => {
      const mockResult = [
        {
            "_id": "66f1088ecbdc79a0fc089b1f",
            "applicant": "Natan's Catering",
            "facilitytype": "Truck",
            "cnn": "7727000",
            "locationdescription": "KANSAS ST: 16TH ST to 17TH ST (300 - 399)",
            "address": "350 KANSAS ST",
            "blocklot": "3958001D",
            "block": "3958",
            "lot": "001D",
            "permit": "23MFF-00006",
            "status": "APPROVED",
            "fooditems": "Burgers: melts: hot dogs: burritos:sandwiches: fries: onion rings: drinks",
            "x": "6011363.148",
            "y": "2106748.619",
            "latitude": "37.76537066931712",
            "longitude": "-122.40390784821223",
            "schedule": "http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=23MFF-00006&ExportPDF=1&Filename=23MFF-00006_schedule.pdf",
            "approved": "2023-09-11T18:30:00.000Z",
            "received": "20230911",
            "priorpermit": "1",
            "expirationdate": "2024-11-14T18:30:00.000Z",
            "location": {
                "type": "Point",
                "coordinates": [
                    -122.40390784821223,
                    37.76537066931712
                ]
            },
            ":@computed_region_yftq_j783": "8",
            ":@computed_region_p5aj_wyqh": "3",
            ":@computed_region_rxqg_mtj9": "8",
            ":@computed_region_bh8s_q3mv": "28853",
            ":@computed_region_fyvs_ahh9": "20",
            "__v": 0,
            "createdAt": "2024-09-23T06:19:58.175Z",
            "updatedAt": "2024-09-23T06:19:58.175Z"
        }
    ];
      jest.spyOn(foodTruckService, 'getNearbyFoodTrucks').mockResolvedValue(mockResult as any);

      const result = await controller.getNearbyFoodTrucks('37.76537066931712', '-122.40390784821223', '10');

      expect(foodTruckService.getNearbyFoodTrucks).toHaveBeenCalledWith(37.76537066931712, -122.40390784821223, 10);
      expect(result).toEqual(mockResult);
    });

    it('should handle errors', async () => {
      const mockError = new Error('Test error');
      jest.spyOn(foodTruckService, 'getNearbyFoodTrucks').mockRejectedValue(mockError);

      await expect(controller.getNearbyFoodTrucks('37.76537066931712', '-122.40390784821223', '10')).rejects.toThrow('Test error');
    });
  });
});
