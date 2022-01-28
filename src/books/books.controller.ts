import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from './books.entity';
import { IssueBookDto } from './dto/issue-book.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @ApiOperation({ summary: 'Creating book' })
  @ApiResponse({ status: 201, type: Book })
  @Post()
  async create(@Body() dto: CreateBookDto) {
    return await this.bookService.createBook(dto);
  }

  @ApiOperation({ summary: 'Issue book to a user' })
  @ApiResponse({ status: 200, type: Book })
  @Put('user')
  async issueBook(@Body() dto: IssueBookDto) {
    return await this.bookService.issueBook(dto);
  }

  @ApiOperation({ summary: 'Remove book from user' })
  @ApiResponse({ status: 200, type: Book })
  @Delete(':id/user')
  async removeBook(@Param('id') id: number) {
    return await this.bookService.removeBook(id);
  }
}
