'use client';

import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '@/app/page';
import { PlainBookModel } from '@/models/book.model';

const BookDetailsPage: FC = () => {
  const [book, setBook] = useState<PlainBookModel | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const extractIdFromPath = (path: string): string | null => {
      const parts = path.split('/');
      return parts[parts.length - 1] || null;
    };

    const bookId = extractIdFromPath(window.location.pathname);
    if (!bookId) {
      setError("Aucun ID de livre trouvé dans l'URL.");
      return;
    }

    const fetchBookDetails = async () => {
      setLoading(true);
      try {
        const bookId = extractIdFromPath(window.location.pathname);
        if (!bookId) {
          throw new Error("Aucun ID de livre trouvé dans l'URL.");
        }
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`,
        );
        setBook(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            'Erreur lors du chargement des détails du livre:',
            error.response || error.request,
          );
          setError(
            `Erreur lors du chargement des détails du livre: ${
              error.response?.statusText || error.message
            }`,
          );
        } else {
          console.error('Une erreur inattendue est survenue:', error);
          setError('Une erreur inattendue est survenue.');
        }
      }
      setLoading(false);
    };

    fetchBookDetails();
  }, []);

  const handleDelete = async () => {
    if (!book) return;
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/books/${book.id}`,
        );
        window.location.href = '/books';
      } catch (error) {
        console.error('Erreur lors de la suppression du livre:', error);
        setError('Erreur lors de la suppression du livre.');
      }
    }
  };

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>Le livre n'a pas été trouvé.</p>;

  return (
    <>
      <Menu />
      <div className="flex items-center justify-center mt-12">
        <div>
          <u>
            <h1>Détails du livre :</h1>
          </u>
          <div>
            <big>
              <strong>
                <h2>{book.name}</h2>
              </strong>
            </big>
            <p>
              Auteur:
              {book.author}
            </p>
            <p>
              Écrit le:
              {book.writtenOn}
            </p>
            <p>
              Genres:
              {book.bookGenres}
            </p>
            <button onClick={handleDelete} className="border p-0">
              Supprimer le livre
            </button>
          </div>

          <button
            onClick={() => (window.location.href = '/books')}
            className="border p-0"
          >
            Retour à la liste des livres
          </button>
        </div>
      </div>
    </>
  );
};

export default BookDetailsPage;
