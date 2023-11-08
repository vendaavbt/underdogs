import { Injectable } from '@nestjs/common';
import { BookId } from 'library-api/src/entities';
import { BookRepository } from 'library-api/src/repositories';
import {
  BookUseCasesOutput,
  PlainBookUseCasesOutput,
  createBookUseCaseInput,
} from 'library-api/src/useCases/books/book.useCases.type';

@Injectable()
export class BookUseCases {
  constructor(private readonly bookRepository: BookRepository) {}

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainBookUseCasesOutput[]> {
    return this.bookRepository.getAllPlain();
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: BookId): Promise<BookUseCasesOutput> {
    return this.bookRepository.getById(id);
  }

  /**
   * Create a new book
   * @param input Data for the new book
   * @returns The newly created book
   */
  public async createBook(
    input: createBookUseCaseInput,
  ): Promise<BookUseCasesOutput> {
    const createdBook = await this.bookRepository.createBook(input);
    return createdBook;
  }
  public async deleteById(id: BookId): Promise<void>{
    await this.bookRepository.deleteById(id);
  }
}
