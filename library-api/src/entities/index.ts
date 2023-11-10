import { Author } from 'library-api/src/entities/Author';
import { Book } from 'library-api/src/entities/Book';
import { BookGenre } from 'library-api/src/entities/BookGenre';
import { Genre } from 'library-api/src/entities/Genre';
import { User } from './user';

export * from './Author';
export * from './Book';
export * from './BookGenre';
export * from './Genre';
export * from './user';
export const entities = [Author, Book, BookGenre, Genre, User];
