import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCheckoutSessionDto {
  @ApiProperty({
    description: 'The ID of the user initiating the checkout session',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  UserId: string;

  @ApiProperty({
    description: 'The price ID associated with the checkout session',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  priceId: string;
}
