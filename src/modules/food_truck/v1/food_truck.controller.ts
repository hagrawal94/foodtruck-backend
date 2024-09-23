import { Controller, Get, Query } from '@nestjs/common';
import { FoodTruckService } from './food_truck.service';
import { Helper } from '../../../utils/helpers';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateFoodTruckDto } from './dto/food_truck.dto';

@Controller({
    version: '1',
    path: 'food-truck',
})
export class FoodTruckController {
    constructor(private readonly foodTruckService: FoodTruckService) {}

    @Get('nearby')
    @ApiOperation({ summary: 'Get nearby food trucks' })
    @ApiQuery({ name: 'lat', required: true, type: String, description: 'Latitude' })
    @ApiQuery({ name: 'lng', required: true, type: String, description: 'Longitude' })
    @ApiQuery({ name: 'radius', required: true, type: String, description: 'Radius in meters' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved nearby food trucks', type: [CreateFoodTruckDto] })
    async getNearbyFoodTrucks(
        @Query('lat') lat: string,
        @Query('lng') lng: string,
        @Query('radius') radius: string,
    ) {
        try {
            return this.foodTruckService.getNearbyFoodTrucks(parseFloat(lat), parseFloat(lng), parseFloat(radius));
        } catch (error) {
            Helper.errorHelper(error);
        }
    }
}
