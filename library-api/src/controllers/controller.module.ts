import { Module } from '@nestjs/common';
import { AuthorController } from 'library-api/src/controllers/authors/author.controller';
import { BookController } from 'library-api/src/controllers/books/book.controller';
import { GenreController } from 'library-api/src/controllers/genres/genre.controller';
import { RepositoryModule } from 'library-api/src/repositories/repository.module';
import { UseCasesModule } from 'library-api/src/useCases/useCases.module';

@Module({
  imports: [UseCasesModule, RepositoryModule],
  controllers: [AuthorController, BookController, GenreController],
})
export class ControllerModule {}
