'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import Menu from 'src/app/page';

const BooksDetailsPage: FC = () => {
  const { id } = useParams();

  return (
    <>
      <Menu />
      <div className="text-center">
        <p className="text-xl font-semibold">Page des livres</p>
      </div>
      Détails du livre &apos;
      {id}
      &apos; ne sont pas implémentés
    </>
  );
};

export default BooksDetailsPage;
