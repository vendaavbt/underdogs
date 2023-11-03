import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Menu from 'src/app/page';

const AuthorDetailsPage: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [authorDetails, setAuthorDetails] = useState<AuthorDetails | null>(null);

  const fetchAuthorDetails = async (authorId: string) => {
    try {
      // A remplacer par une vraie requête à l'API
      const response = await fetch(`/api/authors/${authorId}`);
      if (response.ok) {
        const authorData = await response.json();
        setAuthorDetails(authorData);
      } else {
        console.error('Erreur lors de la récupération des détails de l\'auteur');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l\'auteur', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAuthorDetails(id as string);
    }
  }, [id]);

  return (
    <>
      <Menu />
      <div className="text-center">
        <p className="text-xl font-semibold">Détails de l'auteur</p>
      </div>
      {authorDetails ? (
        <div>
          <p>ID: {authorDetails.id}</p>
          <p>Nom: {authorDetails.firstName}</p>
          <p>Prénom: {authorDetails.lastName}</p>
        </div>
      ) : (
        <p>Détails de l'auteur &apos;{id}&apos; ne sont pas encore disponibles.</p>
      )}
    </>
  );
};

export default AuthorDetailsPage;
