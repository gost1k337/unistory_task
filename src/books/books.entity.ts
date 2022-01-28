import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.entity';
import { JoinColumn } from 'typeorm';

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
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: 'Robert Martin', description: 'Author name' })
  @Column()
  author: string;

  @ApiProperty({ example: 'book content', description: 'Book content' })
  @Column()
  content: string;

  @ApiProperty({ example: '1', description: 'Book user id' })
  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.books)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
