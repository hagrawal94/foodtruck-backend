import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FacilityType, Status } from '../enum/food_truck.enum';

export type FoodTruckDocument = FoodTruck & Document;

@Schema({
    timestamps: {
        updatedAt: 'updatedAt',
        createdAt: 'createdAt',
    },
})
export class FoodTruck extends Document {
    @Prop({ required: true })
    applicant: string;

    @Prop({ enum: FacilityType })
    facilitytype?: FacilityType;

    @Prop()
    cnn: string;

    @Prop()
    locationdescription: string;

    @Prop()
    address: string;

    @Prop()
    blocklot: string;

    @Prop()
    block: string;

    @Prop()
    lot: string;

    @Prop({ required: true })
    permit: string;

    @Prop({ required: true, enum: Status })
    status: Status;

    @Prop()
    fooditems: string;

    @Prop()
    x: string;

    @Prop()
    y: string;

    @Prop()
    latitude: string;

    @Prop()
    longitude: string;

    @Prop()
    schedule: string;

    @Prop()
    dayshours: string;

    @Prop({ type: Date })
    approved: Date;

    @Prop()
    received: string;

    @Prop()
    priorpermit: string;

    @Prop({ type: Date })
    expirationdate: Date;

    // 2dsphere index is used for geo queries
    @Prop({ type: Object, index: '2dsphere', required: true })
    location: {
        type: {
            type: String;
            enum: ['Point'];
            default: 'Point';
        };
        coordinates: {
            type: [Number];
            required: true;
        };
    };

    @Prop()
    ':@computed_region_yftq_j783': string;

    @Prop()
    ':@computed_region_p5aj_wyqh': string;

    @Prop()
    ':@computed_region_rxqg_mtj9': string;

    @Prop()
    ':@computed_region_bh8s_q3mv': string;

    @Prop()
    ':@computed_region_fyvs_ahh9': string;
}

const FoodTruckSchema = SchemaFactory.createForClass(FoodTruck);
export { FoodTruckSchema };
