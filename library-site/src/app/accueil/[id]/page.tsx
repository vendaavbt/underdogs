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
        <p className="text-xl font-semibold">Page d'accueil</p>
      </div>
    </>
  );
};

export default UserDetailsPage;