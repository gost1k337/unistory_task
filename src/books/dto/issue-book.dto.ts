import { ApiProperty } from '@nestjs/swagger';

export class IssueBookDto {
  @ApiProperty({ example: '1', description: 'User id' })
  userId: number;

  @ApiProperty({ example: '2', description: 'Book id' })
  bookId: number;
}
