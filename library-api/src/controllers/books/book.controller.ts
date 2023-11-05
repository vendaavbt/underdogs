import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import {
  BookPresenter,
  PlainBookPresenter,
} from 'library-api/src/controllers/books/book.presenter';
import { BookId } from 'library-api/src/entities';
import { BookUseCases } from 'library-api/src/useCases';
import { createBookUseCaseInput } from 'library-api/src/useCases/books/book.useCases.type';

@Controller('books')
export class BookController {
  constructor(private readonly bookUseCases: BookUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainBookPresenter[]> {
    const books = await this.bookUseCases.getAllPlain();

    return books.map(PlainBookPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: BookId): Promise<BookPresenter> {
    const book = await this.bookUseCases.getById(id);

    return BookPresenter.from(book);
  }

  @Post('/create')
  public async createBook(
    @Body() input: createBookUseCaseInput,
  ): Promise<BookPresenter> {
    const createdBook = await this.bookUseCases.createBook(input);
    return BookPresenter.from(createdBook);
  }
}
