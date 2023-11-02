'use client';

import { FC, ReactElement, useEffect } from 'react';
import { useBooksProviders } from '@/hooks';
import Breadcrumb from 'src/app/Breadcrumb';

const BooksPage: FC = (): ReactElement => {
  const { useListBooks } = useBooksProviders();
  const { books, load } = useListBooks();

  useEffect(() => load, []);

  return (
    <>
      <h1>Books</h1>
      {books.map((book) => (
        <div key={book.id}>{book.name}</div>
      ))}
    </>
  );
};

export default BooksPage;
const breadcrumbItems = [
  { label: 'Accueil', path: '/' },
  { label: 'Livres', path: '/books/page' },
];
