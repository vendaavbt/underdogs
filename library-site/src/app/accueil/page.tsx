'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import Menu from  'src/app/page';

const Accueil: FC = () => {
  const { id } = useParams();

  return (
    <>
      <Menu /> 
      <div className="text-center">
        <p className="text-xl font-semibold">Page d'Accueil</p>
      </div>
     
    </>
  );
};

export default Accueil;