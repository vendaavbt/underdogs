import { Injectable } from '@nestjs/common';
import { Genre } from 'library-api/src/entities';
import { DataSource, Repository } from 'typeorm';
import { adaptGenreEntityToGenreModel } from './genre.utils';
import { GenreRepositoryOutput } from './genre.repository.type';

@Injectable()
export class GenreRepository extends Repository<Genre> {
  constructor(public readonly dataSource: DataSource) {
    super(Genre, dataSource.createEntityManager());
  }

  /**
   * Get all genres
   * @returns Array of genres
   */
  public async getAll(): Promise<GenreRepositoryOutput[]> {
    const genres = await this.find();

    return genres.map(adaptGenreEntityToGenreModel);
  }
}
