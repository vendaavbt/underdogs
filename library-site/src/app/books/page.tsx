'use client';

import React, { FC, ReactElement, useEffect } from 'react';
import Breadcrumb from 'src/app/Breadcrumb';
import Menu from 'src/app/page';
import { useBooksProviders } from '@/hooks';

const BooksPage: FC = (): ReactElement => {
  const { useListBooks } = useBooksProviders();
  const { books, load } = useListBooks();
  useEffect(() => load, []);

  return (
    <>
      <Menu />
      <div className="text-center">
          <h1 className="text-4xl font-bold mt-32">
        <p className="text-xl font-semibold">Page des livres</p>
          </h1>
      </div>
      La page des livres n'est pas (encore) implémentée
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
