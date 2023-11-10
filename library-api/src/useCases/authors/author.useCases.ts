import { Injectable } from '@nestjs/common';
import { Author, AuthorId } from 'library-api/src/entities';
import { AuthorRepository } from 'library-api/src/repositories';
import { adaptAuthorEntityToPlainAuthorModel } from 'library-api/src/repositories/authors/author.utils';
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

  /**
   * Delete an Author from database
   * @param id Author's ID
   * @throws
   */
  public async deleteById(id: AuthorId): Promise<void> {
    await this.authorRepository.deleteById(id);
  }

  public async updateById(
    id: AuthorId,
    updatedAuthorData: Partial<Author>,
  ): Promise<PlainAuthorUseCasesOutput> {
    const updatedAuthor = await this.authorRepository.updateById(
      id,
      updatedAuthorData,
    );

    if (updatedAuthor) {
      return adaptAuthorEntityToPlainAuthorModel(updatedAuthor);
    }

    return undefined; // Gérer le cas où l'auteur n'a pas été trouvé ou la mise à jour a échoué
  }
}
