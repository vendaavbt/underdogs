import { Injectable } from '@nestjs/common';
import { Author, AuthorId } from 'library-api/src/entities';
import { DataSource, Repository } from 'typeorm';
import { NotFoundError } from 'library-api/src/common/errors';
import { v4 } from 'uuid';
import {
  PlainAuthorRepositoryOutput,
  createAuthorRepositoryInput,
} from 'library-api/src/repositories/authors/author.repository.type';
import { adaptAuthorEntityToPlainAuthorModel } from 'library-api/src/repositories/authors/author.utils';

@Injectable()
export class AuthorRepository extends Repository<Author> {
  constructor(public readonly dataSource: DataSource) {
    super(Author, dataSource.createEntityManager());
  }

  /**
   * Get all plain authors
   * @returns Array of plain authors
   */
  public async getAllPlain(): Promise<PlainAuthorRepositoryOutput[]> {
    const authors = await this.find();

    return authors.map(adaptAuthorEntityToPlainAuthorModel);
  }

  /**
   * Get an author by its ID
   * @param id author's ID
   * @returns author if found
   * @throws 404: author with this ID was not found
   */
  public async getById(id: AuthorId): Promise<PlainAuthorRepositoryOutput> {
    const author = await this.findOne({ where: { id } });

    if (!author) {
      throw new NotFoundError(`Author - '${id}'`);
    }

    return adaptAuthorEntityToPlainAuthorModel(author);
  }

  public async createAuthor(
    input: createAuthorRepositoryInput,
  ): Promise<PlainAuthorRepositoryOutput> {
    const newAuthor = new Author();
    newAuthor.id = v4();
    newAuthor.firstName = input.firstName;
    newAuthor.lastName = input.lastName;
    await this.save(newAuthor);
    return adaptAuthorEntityToPlainAuthorModel(newAuthor);
  }
}
