import { ApiProperty } from '@nestjs/swagger';

export class AddSubscriptionDto {
  @ApiProperty({ example: '1', description: 'User id' })
  readonly userId: number;
}
