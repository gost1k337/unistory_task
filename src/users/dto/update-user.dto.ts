import { IsEmail, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: '1', description: 'User id' })
  id: number;

  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @ApiProperty({ example: 'username', description: 'Username' })
  @IsOptional()
  @Length(4, 255, { message: 'Length must be between 7 and 255' })
  readonly username: string;
}
