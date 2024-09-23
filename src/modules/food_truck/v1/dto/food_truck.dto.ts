import { IsString, IsEnum, IsOptional, IsDate, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FacilityType, Status } from '../../enum/food_truck.enum';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class LocationDto {
  @ApiProperty({ enum: ['Point'] })
  @IsEnum(['Point'])
  type: 'Point';

  @ApiProperty({ type: [Number] })
  @IsNumber({}, { each: true })
  coordinates: number[];
}

//implement swagger documentation for this class
export class CreateFoodTruckDto {
  @ApiProperty({ type: String })
  @IsString()
  applicant: string;

  @ApiProperty({ enum: FacilityType })
  @IsEnum(FacilityType)
  facilitytype: FacilityType;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  cnn?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  locationdescription?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  blocklot?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  block?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  lot?: string;

  @ApiProperty({ type: String })
  @IsString()
  permit: string;

  @ApiProperty({ enum: Status })
  @IsEnum(Status)
  status: Status;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  fooditems?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  x?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  y?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  latitude?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  longitude?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  schedule?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  dayshours?: string;

  @ApiPropertyOptional({ type: Date })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  approved?: Date;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  received?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  priorpermit?: string;

  @ApiPropertyOptional({ type: Date })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  expirationdate?: Date;

  @ApiProperty({ type: LocationDto })
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  ':@computed_region_yftq_j783'?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  ':@computed_region_p5aj_wyqh'?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  ':@computed_region_rxqg_mtj9'?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  ':@computed_region_bh8s_q3mv'?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  ':@computed_region_fyvs_ahh9'?: string;
}

export class UpdateFoodTruckDto extends PartialType(CreateFoodTruckDto) {}
