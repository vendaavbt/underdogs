import { Book } from 'library-api/src/entities';
import {
  BookRepositoryOutput,
  PlainBookRepositoryOutput,
} from 'library-api/src/repositories/books/book.repository.type';

export const adaptBookEntityToPlainBookModel = (
  book: Book,
): PlainBookRepositoryOutput => ({
  ...book,
  genres: book.bookGenres.map((bookGenre) => bookGenre.genre.name),
});

export const adaptBookEntityToBookModel = (
  book: Book,
): BookRepositoryOutput => ({
  ...book,
  // Check that bookGenres is defined and is an array before mapping
  genres: Array.isArray(book.bookGenres) 
    ? book.bookGenres.map((bookGenre) => bookGenre.genre)
    : [],
});
