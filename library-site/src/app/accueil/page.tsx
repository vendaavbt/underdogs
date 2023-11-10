'use client';

import { FC } from 'react';
import Menu from '@/app/page';

const Accueil: FC = () => (
  <>
    <Menu />
    <div className="text-center">
      <h1 className="text-4xl font-bold mt-20">
        Bienvenue dans la bibliothèque des underdogs
      </h1>
      <p className="text-xl font-semibold mt-4">
        Retrouvez rapidement et simplement tous les livres que vous avez lus
{' '}
      </p>

      <div className="flex justify-center space-x-16 mt-36">
        <div className="bg-brown-custom p-16 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-2 text-white">
            Tous vos livres sur le même site
          </h2>
          <p className="text-sm text-white">
            Comme si c'était votre deuxième cerveau
          </p>
        </div>

        <div className="bg-brown-custom p-16 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-2 text-white">
            L'endroit parfait pour consulter vos livres préférés
          </h2>
          <p className="text-sm text-white">
            Notre bibliothèque numérique vous permet de retrouver vos avis
            littéraires facilement.
          </p>
        </div>

        <div className="bg-brown-custom p-16 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-2 text-white">
            Un site utile et pratique
          </h2>
          <p className="text-sm text-white">
            Plus besoin de transporter tous vos livres !
          </p>
        </div>
      </div>
    </div>
  </>
);

export default Accueil;
