import { PlainAuthorModel } from 'library-api/src/models/author.model';

export type PlainAuthorRepositoryOutput = PlainAuthorModel;
export type createAuthorRepositoryInput = Omit<PlainAuthorModel, 'id'>;
