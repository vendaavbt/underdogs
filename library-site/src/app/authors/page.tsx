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
      .includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <Menu />
      <div className="">
        <div className="text-center mt-12">
          <p className="text-xl font-semibold">Page des auteurs</p>
          <input
            type="text"
            placeholder="Chercher par nom..."
            onChange={handleSearchChange}
            className="border border-black text-center py-2 px-4"
          />
        </div>
        <div className="flex items-center justify-center mt-12">
          <form onSubmit={handleSubmit} className="flex flex-row space-x-4">
            <input
              name="firstName"
              value={newAuthor.firstName}
              onChange={handleChange}
              placeholder="Prénom"
              required
              className="border border-black text-center py-2 px-4"
            />
            <input
              name="lastName"
              value={newAuthor.lastName}
              onChange={handleChange}
              placeholder="Nom"
              required
              className="border border-black text-center py-2 px-4"
            />
            <input
              name="photoUrl"
              value={newAuthor.photoUrl}
              onChange={handleChange}
              placeholder="photoUrl"
              required
              className="border border-black text-center py-2 px-4"
            />
            <button
              type="submit"
              className="border border-black py-2 px-4 text-white bg-black"
            >
              Ajouter un auteur
            </button>
          </form>
        </div>

        <div className=" mt-12">
          {filteredAuthors.map((author) => (
            <div key={author.id}>
              <strong>
                <h3>
                  {author.firstName} 
{' '}
{author.lastName}
                </h3>
              </strong>
              <Link href={`/authors/${author.id}`} passHref>
                <button
                  type="button"
                  className="border border-black text-center"
                >
                  <hr />
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
