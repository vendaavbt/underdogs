import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { PlainAuthorPresenter } from 'library-api/src/controllers/authors/author.presenter';
import { AuthorId } from 'library-api/src/entities';
import { AuthorUseCases } from 'library-api/src/useCases';
import { createAuthorUseCaseInput } from 'library-api/src/useCases/authors/author.useCases.type';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorUseCases: AuthorUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainAuthorPresenter[]> {
    const authors = await this.authorUseCases.getAllPlain();

    return authors.map(PlainAuthorPresenter.from);
  }

  @Get('/:id')
  public async getById(
    @Param('id') id: AuthorId,
  ): Promise<PlainAuthorPresenter> {
    const author = await this.authorUseCases.getById(id);

    return PlainAuthorPresenter.from(author);
  }

  @Post('/create')
  public async createAuthor(
    @Body() input: createAuthorUseCaseInput,
  ): Promise<PlainAuthorPresenter> {
    const createdAuthor = await this.authorUseCases.createAuthor(input);
    return PlainAuthorPresenter.from(createdAuthor);
  }

  @Delete('/:id')
  public async deleteById(@Param('id') id: AuthorId): Promise<void> {
    await this.authorUseCases.deleteById(id);
  }
}
