import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'Clean code', description: 'Book name' })
  readonly name: string;

  @ApiProperty({ example: 'Robert martin', description: 'Author name' })
  readonly author: string;

  @ApiProperty({ example: 'book content', description: 'Book content' })
  readonly content: string;
}
