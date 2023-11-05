import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
import { Author, Book, BookId } from 'library-api/src/entities';
import { v4 } from 'uuid';
import {
  BookRepositoryOutput,
  PlainBookRepositoryOutput,
  createBookRepositoryInput,
} from 'library-api/src/repositories/books/book.repository.type';
import {
  adaptBookEntityToBookModel,
  adaptBookEntityToPlainBookModel,
} from 'library-api/src/repositories/books/book.utils';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(public readonly dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainBookRepositoryOutput[]> {
    const books = await this.find({
      relations: { bookGenres: { genre: true } },
    });

    return books.map(adaptBookEntityToPlainBookModel);
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: BookId): Promise<BookRepositoryOutput> {
    const book = await this.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundError(`Book - '${id}'`);
    }

    return adaptBookEntityToBookModel(book);
  }

  public async createBook(
    input: createBookRepositoryInput,
  ): Promise<BookRepositoryOutput> {
    const newBook = new Book();
    newBook.id = v4();
    newBook.name = input.name;
    newBook.writtenOn = input.writtenOn;
    newBook.author = new Author();
    newBook.bookGenres = [];
    await this.save(newBook);
    return adaptBookEntityToBookModel(newBook);
  }
}
