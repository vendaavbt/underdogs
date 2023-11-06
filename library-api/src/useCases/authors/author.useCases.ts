import { Injectable } from '@nestjs/common';
import { AuthorId } from 'library-api/src/entities';
import { AuthorRepository } from 'library-api/src/repositories';
import {
  PlainAuthorUseCasesOutput,
  createAuthorUseCaseInput,
} from 'library-api/src/useCases/authors/author.useCases.type';

@Injectable()
export class AuthorUseCases {
  constructor(private readonly authorRepository: AuthorRepository) {}

  /**
   * Get all plain authors
   * @returns Array of plain authors
   */
  public async getAllPlain(): Promise<PlainAuthorUseCasesOutput[]> {
    return this.authorRepository.getAllPlain();
  }

  /**
   * Get a author by its ID
   * @param id Author's ID
   * @returns Author if found
   * @throws 404: author with this ID was not found
   */
  public async getById(id: AuthorId): Promise<PlainAuthorUseCasesOutput> {
    return this.authorRepository.getById(id);
  }

  /**
   * Create a new author
   * @param input Data for the new author
   * @returns The newly created author
   */
  public async createAuthor(
    input: createAuthorUseCaseInput,
  ): Promise<PlainAuthorUseCasesOutput> {
    const createdAuthor = await this.authorRepository.createAuthor(input);
    return createdAuthor;
  }
}
