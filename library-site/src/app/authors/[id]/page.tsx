'use client';

import { useParams } from 'next/navigation';
import React, { FC } from 'react';
import Menu from 'src/app/page';
import { useParams } from 'react-router-dom';

const getAuthorById = (id: number) =>
  // Remplacez cette partie par la logique de récupération des données depuis un backend
  ({
    id,
    name: 'Auteur 1',
    photo: 'lien_vers_photo_1.jpg',
    booksCount: 5,
  });

const AuthorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const authorId = parseInt(id, 10);
  const author = getAuthorById(authorId);

  return (
    <div>
      <h1>{author.name}</h1>
      <img src={author.photo} alt={author.name} />
      <p>Nombre de livres :{author.booksCount}</p>
    </div>
  );
};

export default AuthorDetails;
