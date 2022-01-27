import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Entity('user')
export class User implements UserCreationAttrs {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'username', description: 'Username' })
  @Column()
  username: string;

  @ApiProperty({ example: 'qwerty', description: 'Password' })
  @Exclude()
  @Column()
  password: string;

  @ApiProperty({ example: 'qwerty', description: 'Has subscription or not' })
  @Column({ default: false })
  hasSubscription: boolean;

  @ApiProperty({ example: 'false', description: 'Deleted or not' })
  @Column({ default: false })
  isDeleted: boolean;
}
