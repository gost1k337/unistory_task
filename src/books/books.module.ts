import { forwardRef, Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books.entity';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [TypeOrmModule.forFeature([Book]), forwardRef(() => UsersModule)],
  exports: [BooksService],
})
export class BooksModule {}
