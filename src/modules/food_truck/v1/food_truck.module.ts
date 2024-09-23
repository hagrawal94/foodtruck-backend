import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodTruck, FoodTruckSchema } from '../schemas/food_truck.schema';
import { FoodTruckController } from './food_truck.controller';
import { FoodTruckService } from './food_truck.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: FoodTruck.name,
                schema: FoodTruckSchema,
            }
        ]),
    ],
    controllers: [FoodTruckController],
    providers: [FoodTruckService, Logger,],
    exports: [FoodTruckService],
})
export class FoodTruckModule { }
