import { Author } from 'library-api/src/entities';
import { PlainAuthorRepositoryOutput } from 'library-api/src/repositories/authors/author.repository.type';

export const adaptAuthorEntityToPlainAuthorModel = (
  author: Author,
): PlainAuthorRepositoryOutput => ({
  ...author,
});
