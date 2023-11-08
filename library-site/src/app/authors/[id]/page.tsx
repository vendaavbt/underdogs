'use client';

import { useParams } from 'next/navigation';
import React, { FC, useState } from 'react';
import Menu from 'src/app/page';
import ConfirmationModale from 'src/app/ConfirmationModale';

const authors = [
  {
    id: 1,
    firstName: 'Alexandre',
    lastName: 'Dumas',
    books: ['Le Comte de Monte-Cristo', 'Les Trois Mousquetaires'],
    nbr: '80',
  },
  {
    id: 2,
    firstName: 'Albert',
    lastName: 'Camus',
    books: ['La Chute', 'La Peste'],
    nbr: '30',
  },
  {
    id: 3,
    firstName: 'Charles',
    lastName: 'Dickens',
    books: ['Oliver Twist', 'David Copperfield'],
    nbr: '34',
  },
  {
    id: 4,
    firstName: 'Marcel',
    lastName: 'Proust',
    books: ['Le Temps Retrouvé', 'Albertine Disparue'],
    nbr: '1',
  },
];

const AuthorDetailsPage: FC = () => {
  const { id } = useParams();
  const authorIndex = authors.findIndex((u) => u.id === parseInt(id, 10));
  const author = authors[authorIndex];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [newBook, setNewBook] = useState('');
  const [isConfirmationModaleOpen, setIsConfirmationModaleOpen] =
    useState(false); // État pour gérer l'ouverture de la modale


  // Ajout et suppresion de livres
  const handleAddBook = () => {
    if (newBook.trim() !== '') {
      author.books.push(newBook);
      setNewBook('');
    }
  };
  const handleRemoveBook = (bookName: string) => {
    const bookIndex = author.books.findIndex((book) => book === bookName);
    if (bookIndex !== -1) {
      author.books.splice(bookIndex, 1);
    }
  };


    // Ajout et suppresion d'auteurs
  const handleRemoveAuthor = () => {
    setIsConfirmationModaleOpen(true); // Ouvrir la modale de confirmation
  };
  const confirmRemoveAuthor = () => {
    if (authorIndex !== -1) {
      authors.splice(authorIndex, 1);
      setIsConfirmationModaleOpen(false); // Fermer la modale de confirmation
      // Redirigez l'utilisateur vers une autre page après la suppression si nécessaire
    }
  };
  const cancelRemoveAuthor = () => {
    setIsConfirmationModaleOpen(false); // Annuler la suppression et fermer la modale
  };


  // Main script
  return (
    <>
      <Menu />

      <div className="mt-32" />
      <div className="text-center">
        <p className="text-xl font-semibold">Détails de l'auteur</p>
      </div>

      {author ? (
        <div>
          <div className="mt-4">
            <p>
              ID:
              {author.id}
            </p>
            <p>
              Nom:
              {author.firstName}
            </p>
            <p>
              Prénom:
              {author.lastName}
            </p>
            <p>
              Nombre de livres:
              {author.nbr}
            </p>
            <p>Livres :</p>
            {author.books.map((book, index) => (
              <li key={index}>{book}</li>
            ))}
            <ul>
              {author.books.map((book) => (
                <li key={book}>
                  {book}{' '}
                  <button onClick={() => handleRemoveBook(book)}
                          className="bg-red-500 text-white px-2 py-2 rounded-lg"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <button
              onClick={handleRemoveAuthor}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Supprimer l'auteur
            </button>

            <div>
              <input
                type="text"
                placeholder="Nouveau livre"
                value={newBook}
                onChange={(e) => setNewBook(e.target.value)}
              />
              <button onClick={handleAddBook}>Ajouter un livre</button>
            </div>
          </div>
        </div>
      ) : (
        <p>
L'auteur avec l'ID{id}
{' '}
n'a pas été trouvé.
</p>
      )}



      <ConfirmationModale
        isOpen={isConfirmationModaleOpen}
        onCancel={cancelRemoveAuthor}
        onConfirm={confirmRemoveAuthor}
      />
    </>
  );
};

export default AuthorDetailsPage;
