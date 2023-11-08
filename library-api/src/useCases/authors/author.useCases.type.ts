
import { PlainAuthorModel } from 'library-api/src/models';
import { createAuthorRepositoryInput } from 'library-api/src/repositories/authors/author.repository.type';

export type PlainAuthorUseCasesOutput = PlainAuthorModel;
export type createAuthorUseCaseInput = createAuthorRepositoryInput;
