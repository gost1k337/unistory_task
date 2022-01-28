import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from './books.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { IssueBookDto } from './dto/issue-book.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    private userService: UsersService,
  ) {}

  async createBook(dto: CreateBookDto): Promise<Book> {
    const book = await this.bookRepository.create(dto);
    return await this.bookRepository.save(book);
  }

  async issueBook(dto: IssueBookDto): Promise<Book> {
    const user = await this.userService.findById(dto.userId);
    const book = await this.findById(dto.bookId);

    if (user && book) {
      if (!user.hasSubscription) {
        throw new HttpException(
          'This user does not have subscription',
          HttpStatus.CONFLICT,
        );
      }

      if (book.userId) {
        throw new HttpException(
          'This book already belong to other user',
          HttpStatus.CONFLICT,
        );
      }

      const amountOfBooks = await this.countUserBooks(user.id);

      if (amountOfBooks >= 4) {
        throw new HttpException(
          'Maximum books for user is 5',
          HttpStatus.CONFLICT,
        );
      }

      book.user = user;
      return await this.bookRepository.save(book);
    }

    throw new HttpException('User or book not found', HttpStatus.NOT_FOUND);
  }

  async removeBook(id: number) {
    const book = await this.findById(id);

    if (book) {
      book.userId = null;
      return await this.bookRepository.save(book);
    }

    throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
  }

  async countUserBooks(userId: number): Promise<number> {
    return await this.bookRepository
      .createQueryBuilder('book')
      .where('book.user_id = :userId', { userId })
      .getCount();
  }

  async findById(id: number) {
    return await this.bookRepository.findOne(id);
  }
}
