'use client';

import { useParams } from 'next/navigation';
import React, { FC, useState } from 'react';
import Menu from 'src/app/page';
import ConfirmationModale from 'src/app/ConfirmationModale';

const users = [
  {
    id: 1,
    firstName: 'Matthieu',
    lastName: 'Gildeux',
    books: [],
    favoriteBook: [],
  },
  {
    id: 2,
    firstName: 'Matteo',
    lastName: 'Guignol',
    books: [],
    favoriteBook: [],
  },
  {
    id: 3,
    firstName: 'Arthur',
    lastName: 'Pasdoué',
    books: [],
    favoriteBook: [],
  },
  {
    id: 4,
    firstName: 'Mateo',
    lastName: 'Papier',
    books: [],
    favoriteBook: [],
  },
  {
    id: 5,
    firstName: 'Baptiste',
    lastName: 'Dehonte',
    books: [],
    favoriteBook: [],
  },
  {
    id: 6,
    firstName: 'Edouard',
    lastName: 'Mourant',
    books: [],
    favoriteBook: [],
  },
];

const UserDetailsPage: FC = () => {
  const { id } = useParams();
  const userIndex = users.findIndex((u) => u.id === parseInt(id, 10));
  const user = users[userIndex];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [newBook, setNewBook] = useState('');
  const [isConfirmationModaleOpen, setIsConfirmationModaleOpen] =
    useState(false); // État pour gérer l'ouverture de la modale

  const handleAddBook = () => {
    if (newBook.trim() !== '') {
      user.books.push(newBook);
      setNewBook('');
    }
  };


  const handleRemoveUser = () => {
    setIsConfirmationModaleOpen(true); // Ouvrir la modale de confirmation
  };

  const confirmRemoveUser = () => {
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      setIsConfirmationModaleOpen(false); // Fermer la modale de confirmation
      // Redirigez l'utilisateur vers une autre page après la suppression si nécessaire
    }
  };

  const cancelRemoveUser = () => {
    setIsConfirmationModaleOpen(false); // Annuler la suppression et fermer la modale
  };

  return (
    <>
      <Menu />
      <div className="mt-32" />
      <div className="text-center">
        <p className="text-xl font-semibold">Détails de l'utilisateur</p>
      </div>

      {user ? (
        <div>
          <div className="mt-4">
            <p>
              ID:
              {user.id}
            </p>
            <p>
              Nom:
              {user.firstName}
            </p>
            <p>
              Prénom:
              {user.lastName}
            </p>
            <p>Livres :</p>
            <ul>
              {user.books.map((book) => (
                <li key={book}>{book}</li>
              ))}
            </ul>


            <input
              type="text"
              placeholder="Ajouter un nouveau livre"
              value={newBook}
              onChange={(e) => setNewBook(e.target.value)}
              style={{ color: '#000000' }}
            />
            <button
              onClick={handleAddBook}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Ajouter
            </button>



          </div>
          <div className="mt-12">
            <button
              onClick={handleRemoveUser}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Supprimer l'utilisateur
            </button>
          </div>
        </div>
      ) : (
        <p>
L'utilisateur avec l'ID{id}
{' '}
n'a pas été trouvé.
</p>
      )}

      <ConfirmationModale
        isOpen={isConfirmationModaleOpen}
        onCancel={cancelRemoveUser}
        onConfirm={confirmRemoveUser}
      />
    </>
  );
};

export default UserDetailsPage;
