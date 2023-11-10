import { Controller, Get } from '@nestjs/common';
import { GenrePresenter } from 'library-api/src/controllers/genres/genre.presenter';
import { GenreUseCases } from 'library-api/src/useCases';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreUseCases: GenreUseCases) {}

  @Get('/')
  public async getAll(): Promise<GenrePresenter[]> {
    const authors = await this.genreUseCases.getAll();

    return authors.map(GenrePresenter.from);
  }
}
