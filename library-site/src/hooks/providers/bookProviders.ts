import axios from 'axios';
import { useState } from 'react';
import { PlainBookModel } from '@/models';

type UseListBooksProvider = {
  books: PlainBookModel[];
  load: () => void;
};

type UseAddBookProvider = {
  addBook: (bookData: PlainBookModel) => Promise<any>;
};

type UseDeleteBookProvider = {
  deleteBook: (id: string) => Promise<any>;
};

type UseBookDetailsProvider = {
  book: PlainBookModel | null;
  loadBookDetails: (id: string) => void;
};

export const useListBooks = (): UseListBooksProvider => {
  const [books, setBooks] = useState<PlainBookModel[]>([]);

  const load = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books`)
      .then((data) => setBooks(data.data))
      .catch((err) =>
        console.error('Erreur lors de la récupération des livres:', err),
      );
  };

  return { books, load };
};

export const useAddBook = (): UseAddBookProvider => {
  const addBook = (bookData: PlainBookModel) => axios.post(`${process.env.NEXT_PUBLIC_API_URL}/books`, bookData);

  return { addBook };
};

export const useDeleteBook = (): UseDeleteBookProvider => {
  const deleteBook = (id: string) => axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`);

  return { deleteBook };
};

export const useBookDetails = (): UseBookDetailsProvider => {
  const [book, setBook] = useState<PlainBookModel | null>(null);

  const loadBookDetails = (id: string) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`)
      .then((data) => setBook(data.data))
      .catch((err) => console.error(err));
  };

  return { book, loadBookDetails };
};

type BookProviders = {
  useListBooks: () => UseListBooksProvider;
  useAddBook: () => UseAddBookProvider;
  useDeleteBook: () => UseDeleteBookProvider;
  useBookDetails: () => UseBookDetailsProvider;
};

export const useBooksProviders = (): BookProviders => ({
  useListBooks,
  useAddBook,
  useDeleteBook,
  useBookDetails,
});
