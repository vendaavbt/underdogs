'use client';

import { FC, ReactElement, useEffect } from 'react';
import { useBooksProviders } from '@/hooks';
import Breadcrumb from 'src/app/Breadcrumb';
import Menu from  'src/app/page';

const BooksPage: FC = (): ReactElement => {
  const { useListBooks } = useBooksProviders();
   const { books, load } = useListBooks();
   useEffect(() => load, []);

  return (
    <>
      <Menu />
      <div className="text-center">
        <p className="text-xl font-semibold">Page des livres</p>
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
