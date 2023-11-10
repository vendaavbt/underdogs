'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import Menu from '@/app/page';
import { useBooksProviders } from '@/hooks';

const BooksPage = () => {
  const { useListBooks, useAddBook } = useBooksProviders();
  const { books, load } = useListBooks();
  const { addBook } = useAddBook();

  const [newBook, setNewBook] = useState({
    id: '',
    name: '',
    author: '',
    writtenOn: '',
    bookGenres: '',
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await addBook(newBook);
      setNewBook({
        id: '',
        name: '',
        author: '',
        writtenOn: '',
        bookGenres: '',
      });
      load();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = searchTerm
    ? books.filter((book) =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : books;

  return (
    <>
      <Menu />
      <div className="mt-32">
        <div className="text-center">
          <br />
          <p className="text-xl font-semibold">Page des livres</p>

          <br />
          <input
            type="text"
            placeholder="Chercher par titre..."
            onChange={handleSearchChange}
            className="border p-1"
          />
        </div>

        <br />

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={newBook.name}
            onChange={handleChange}
            placeholder="Titre"
            required
          />
          <input
            name="author"
            value={newBook.author}
            onChange={handleChange}
            placeholder="Auteur"
            required
          />
          <input
            name="writtenOn"
            value={newBook.writtenOn}
            onChange={handleChange}
            placeholder="Date de publication"
            required
          />
          <input
            name="bookGenres"
            value={newBook.bookGenres}
            onChange={handleChange}
            placeholder="Genres du livre"
            required
          />
          <button type="submit" className="border p-0">
            Ajouter un livre
          </button>
        </form>

        <div>
          {filteredBooks.map((book) => (
            <div key={book.id}>
              <hr />

              <br />
              <big>
                <strong>
                  <h3>{book.name}</h3>
                </strong>
              </big>
              <Link href={`/books/${book.id}`} passHref>
                <button type="button" className="border p-0">
                  Détails
                </button>
              </Link>
              <p>
                Auteur: 
{' '}
{book.author}| Genre: 
{' '}
{book.bookGenres}| Date de
                publication:
                {book.writtenOn}
              </p>
              <br />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BooksPage;
