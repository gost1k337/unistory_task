import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.entity';

interface BookCreationAttrs {
  name: string;
  author: string;
  content: string;
}

@Entity('books')
export class Book implements BookCreationAttrs {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Clean code', description: 'Book name' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Robert Martin', description: 'Author name' })
  @Column()
  author: string;

  @ApiProperty({ example: 'book content', description: 'Book content' })
  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.books)
  user: User;
}
