'use client';


import Menu from  'src/app/page';
import React, { FC, useState } from 'react';

import { PlainAuthorModel } from 'library-api/src/entities'; 

const AuthorPage: FC = () => {

  const [authors, setAuthors] = useState<PlainAuthorModel[]>([
    {
      id: '1',
      firstName: 'Auteur 1',
      lastName: 'Nom 1',
    },
    {
      id: '2',
      firstName: 'Auteur 2',
      lastName: 'Nom 2',
    },

  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [bookCount, setBookCount] = useState(0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleBookCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookCount(parseInt(e.target.value, 10));
  };

  const filteredAuthors = authors.filter((author) => {
    const fullName = `${author.firstName} ${author.lastName}`;
    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (bookCount === 0 || author.booksWritten >= bookCount)
    );
  });

  return (
    <div>
      <h1>Liste des Auteurs</h1>
      <input
        type="text"
        placeholder="Rechercher par nom"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <input
        type="number"
        placeholder="Rechercher par nombre de livres écrits"
        value={bookCount}
        onChange={handleBookCountChange}
      />
      <div>
        {filteredAuthors.map((author) => (
          <div key={author.id} className="auteur-card">
            <img src={author.photoId} alt={`${author.firstName} ${author.lastName}`} />
            <p>Nom: {`${author.firstName} ${author.lastName}`}</p>
            <p>Nombre de livres écrits: {author.booksWritten}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorPage;