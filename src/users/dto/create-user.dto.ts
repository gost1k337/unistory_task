import { IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @ApiProperty({ example: 'username', description: 'Username' })
  @Length(4, 255, { message: 'Length must be between 7 and 255' })
  readonly username: string;

  @ApiProperty({ example: 'qwerty', description: 'Password' })
  @Length(4, 255, { message: 'Length must be between 4 and 255' })
  readonly password: string;
}
