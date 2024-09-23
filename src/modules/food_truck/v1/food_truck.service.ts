import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FoodTruck, FoodTruckDocument } from '../schemas/food_truck.schema';
import * as metaData from '../../../meta.json';

@Injectable()
export class FoodTruckService {
    constructor(
        @InjectModel(FoodTruck.name)
        private foodTruckModel: Model<FoodTruckDocument>,
        private readonly logger: Logger,
    ) {
        // only to initially populate the data
        // this.initializeFoodTrucks();
    }

    /**
   * getNearbyFoodTrucks
   * @param {number} lat
   * @param {number} lng
   * @param {number} radius
   * @returns {Promise<object>}
   */
    async getNearbyFoodTrucks(lat: number, lng: number, radius: number) {
        try {
            return this.foodTruckModel.find({
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [lng, lat],
                        },
                        $maxDistance: radius,
                    },
                },
            }).exec();
        } catch (error) {
            this.logger.error('Error fetching nearby food trucks', error);
            throw error;
        }
    }

    // to populate the data initially to the database, not to be used again
    async initializeFoodTrucks() {
        try {
            const foodTrucks = metaData.map(truck => ({
                ...truck,
                location: {
                    type: 'Point',
                    coordinates: [parseFloat(truck.longitude), parseFloat(truck.latitude)]
                }
            }));
    
            await this.foodTruckModel.deleteMany({});
            return this.foodTruckModel.insertMany(foodTrucks);
        } catch (error) {
            this.logger.error('Error initializing food trucks', error);
            throw error;
        }
    }
}
