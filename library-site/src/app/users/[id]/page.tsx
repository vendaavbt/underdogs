'use client';

import { useParams } from 'next/navigation';
import React, { FC, useState } from 'react';
import Menu from 'src/app/page';

const users = [
  { id: 1, firstName: 'Matthieu', lastName: 'Gildeux', books: [] },
  { id: 2, firstName: 'Matteo', lastName: 'Guignol', books: [] },
  { id: 3, firstName: 'Arthur', lastName: 'Pasdoué', books: [] },
  { id: 4, firstName: 'Mateo', lastName: 'Papier', books: [] },
  { id: 5, firstName: 'Baptiste', lastName: 'Dehonte', books: [] },
  { id: 6, firstName: 'Edouard', lastName: 'Mourant', books: [] },
];

const UserDetailsPage: FC = () => {
  const { id } = useParams();
  const user = users.find((u) => u.id === parseInt(id, 10));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [newBook, setNewBook] = useState('');

  const handleAddBook = () => {
    if (newBook.trim() !== '') {
      user.books.push(newBook);
      setNewBook('');
    }
  };

  const handleRemoveBook = (book) => {
    const bookIndex = user.books.indexOf(book);
    if (bookIndex !== -1) {
      user.books.splice(bookIndex, 1);
    }
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
          <p>
            ID :
            {user.id}
          </p>
          <p>
            Nom :
            {user.firstName}
          </p>
          <p>
            Prénom :
            {user.lastName}
          </p>
          <p>Livres :</p>
          <ul>
            {user.books.map((book) => (
              <li key={book}>{book}</li>
            ))}
          </ul>
          <div className="mt-4">
            {' '}
            {/* Ajoutez une classe pour la marge supérieure */}
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
        </div>
      ) : (
        <p>L'utilisateur avec l'ID{id} n'a pas été trouvé.</p>
      )}
    </>
  );
};

export default UserDetailsPage;
