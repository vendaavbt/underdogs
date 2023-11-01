'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import Menu from  'src/app/page';

const AuthorDetailsPage: FC = () => {
  const { id } = useParams();

  return (
    <>
      <Menu /> 
      <div className="text-center">
        <p className="text-xl font-semibold">Page des auteurs</p>
      </div>
      Détails de l'auteur &apos;
      {id}
      &apos; ne sont pas implémentés
    </>
  );
};

export default AuthorDetailsPage;