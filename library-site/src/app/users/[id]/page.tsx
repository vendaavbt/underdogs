'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import Menu from  'src/app/page';

const UserDetailsPage: FC = () => {
  const { id } = useParams();

  return (
    <>
      <Menu /> 
      <div className="text-center">
        <p className="text-xl font-semibold">Page des utilisateurs</p>
      </div>
      Détails de l'utilisateur&apos;
      {id}
      &apos; ne sont pas implémentés
    </>
  );
};

export default UserDetailsPage;