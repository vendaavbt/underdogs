'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import Menu from '@/app/page';

const Accueil: FC = () => (
  <>
    <Menu />
    <div className="text-center">
      <h1 className="text-4xl font-bold mt-64">
        Bienvenue dans la bibliothèque des underdogs
      </h1>
      <p className="text-xl font-semibold mt-4">
        Retrouvez rapidement et simplement tous les livres que vous avez lus{' '}
      </p>

      <div className="flex justify-center space-x-16 mt-48">
        <div className="bg-gray-300 p-16 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-2">
            Tous vos livres sur le même site
          </h2>
          <p className="text-sm">Comme si c'était votre deuxième cerveau</p>
        </div>

        <div className="bg-gray-300 p-16 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-2">
            L'endroit parfait pour consulter des avis
          </h2>
          <p className="text-sm">
            Notre bibliothèque numérique vous permet de retrouver vos avis
            littéraires facilement.
          </p>
        </div>

        <div className="bg-gray-300 p-16 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-2">Un site utile et pratique</h2>
          <p className="text-sm">
            Plus besoin de transporter tous vos livres !
          </p>
        </div>
      </div>
    </div>
  </>
);

export default Accueil;
