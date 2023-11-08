'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useBooksProviders } from '@/hooks';
import Link from 'next/link';

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


  useEffect(() => {
    load();
  }, []);



  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await addBook(newBook);
      setNewBook({ id: '', name: '', author: '', writtenOn: '', bookGenres: '' });
      load(); 
    } catch (error) {
      console.error(error);

    }
  };


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  return (
    <>
      <h1>Books</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={newBook.name}
          onChange={handleChange}
          placeholder="Book Name"
          required
        />
        <input
          name="author"
          value={newBook.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />
        <input
          name="writtenOn"
          value={newBook.writtenOn}
          onChange={handleChange}
          placeholder="Written On"
          required
        />
        <input
          name="bookGenres"
          value={newBook.bookGenres}
          onChange={handleChange}
          placeholder="Book Genres"
          required
        />
        <button type="submit">Add Book</button>
      </form>

      <div>
        {books.map((book) => (
          <div key={book.id}>
            <h3>{book.name}</h3>
            <Link href={`/books/${book.id}`} passHref>
            <button type="button">Details</button>
          </Link>
            <p>Author: {book.author}
            | Genre: {book.bookGenres}
            | Written on: {book.writtenOn}</p><br></br>
          </div>
        ))}
      </div>
    </>
  );
};

export default BooksPage;

