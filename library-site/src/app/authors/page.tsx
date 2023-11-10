'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import Menu from '@/app/page';
import { useAuthorsProviders } from '@/hooks';

const AuthorsPage = () => {
  const { useListAuthors, useAddAuthor } = useAuthorsProviders();
  const { authors, load } = useListAuthors();
  const { addAuthor } = useAddAuthor();

  const [newAuthor, setNewAuthor] = useState({
    id: '',
    firstName: '',
    lastName: '',
    photoUrl: '',
    nbrBooks: '',
    books: '',
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await addAuthor(newAuthor);
      setNewAuthor({
        id: '',
        firstName: '',
        lastName: '',
        photoUrl: '',
        nbrBooks: '',
        books: '',
      });
      load();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewAuthor((prevAuthor) => ({ ...prevAuthor, [name]: value }));
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredAuthors = authors.filter((author) => `${author.firstName} ${author.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),);

  return (
    <>
      <Menu />
      <div className="mt-32">
        <div className="text-center">
          <br />
          <p className="text-xl font-semibold">Page des auteurs</p>

          <br />
          <input
            type="text"
            placeholder="Chercher par nom..."
            onChange={handleSearchChange}
            className="border p-1"
          />
        </div>
        <br />
        <form onSubmit={handleSubmit}>
          <input
            name="firstName"
            value={newAuthor.firstName}
            onChange={handleChange}
            placeholder="Prénom"
            required
          />
          <input
            name="lastName"
            value={newAuthor.lastName}
            onChange={handleChange}
            placeholder="Nom"
            required
          />
          <input
            name="photoUrl"
            value={newAuthor.photoUrl}
            onChange={handleChange}
            placeholder="photoUrl"
            required
          />

          <button type="submit" className="border p-0">
            Ajouter un auteur
          </button>
        </form>
        <div>
          {filteredAuthors.map((author) => (
            <div key={author.id}>
              <hr />

              <br />
              <strong>
                <h3>
                  {author.firstName} 
{' '}
{author.lastName}
                </h3>
              </strong>
              <Link href={`/authors/${author.id}`} passHref>
                <button type="button" className="border p-0">
                  Details
                </button>
              </Link>
              <img
                src={author.photoUrl}
                alt={`${author.photoUrl}`}
                className="w-20 h-auto"
              />
              <br />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AuthorsPage;
