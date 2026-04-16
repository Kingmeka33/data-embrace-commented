import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price!: number;

  @IsOptional()
  @IsString()
  category?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stock_quantity!: number;

  @IsOptional()
  @IsString()
  image_url?: string;
}
