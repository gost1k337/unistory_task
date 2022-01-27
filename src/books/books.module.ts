import { forwardRef, Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [forwardRef(() => UsersModule)],
})
export class BooksModule {}
