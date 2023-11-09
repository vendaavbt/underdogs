import { Injectable } from '@nestjs/common';
import { GenreRepository } from 'library-api/src/repositories';
import { GenreUseCasesOutput } from './genre.useCases.type';

@Injectable()
export class GenreUseCases {
  constructor(private readonly genreRepository: GenreRepository) {}

  /**
   * Get all plain authors
   * @returns Array of plain authors
   */
  public async getAll(): Promise<GenreUseCasesOutput[]> {
    return this.genreRepository.getAll();
  }
}
