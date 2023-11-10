'use client';

import React, { FC, useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Menu from '@/app/page';
import { PlainAuthorModel } from '@/models/author.model';

const AuthorDetailsPage: FC = () => {
  const [author, setAuthor] = useState<PlainAuthorModel | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<PlainAuthorModel>>({});

  useEffect(() => {
    const extractIdFromPath = (): string | null => {
      const parts = window.location.pathname.split('/');
      return parts[parts.length - 1] || null;
    };

    const authorId = extractIdFromPath();
    if (!authorId) {
      setError("Aucun ID de auteur trouvé dans l'URL.");
      return;
    }

    const fetchAuthorDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/authors/${authorId}`,
        );
        setAuthor(response.data);
        setEditData(response.data);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des détails de l'auteur:",
          error,
        );
        setError("Erreur lors du chargement des détails de l'auteur.");
      }
      setLoading(false);
    };

    fetchAuthorDetails();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (event: FormEvent) => {
    event.preventDefault();
    const authorId = author?.id;
    if (!authorId) {
      setError("Erreur : ID de l'auteur manquant.");
      return;
    }

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/authors/${authorId}`,
        editData,
      );
      setAuthor(response.data); // Update the author with the new data
      alert('Auteur mis à jour avec succès.');
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'auteur:", error);
      setError("Erreur lors de la mise à jour de l'auteur.");
    }
  };

  const handleDelete = async () => {
    const authorId = author?.id;
    if (!authorId) return;

    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet auteur ?')) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/authors/${authorId}`,
        );
        window.location.href = '/authors';
      } catch (error) {
        console.error("Erreur lors de la suppression de l'auteur:", error);
        setError("Erreur lors de la suppression de l'auteur.");
      }
    }
  };

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!author) return <p>L'auteur n'a pas été trouvé.</p>;

  return (
    <>
      <Menu />
      <div className="flex items-center justify-center">
        <div>
          <u>
            <h1>Détails de l'auteur :</h1>
          </u>
          <big>
            <strong>
              <h2>
                {author.firstName} {author.lastName}
              </h2>
            </strong>
          </big>
          <img
            src={author.photoUrl}
            alt={`${author.photoUrl}`}
            className="max-w-xs h-auto"
          />
{' '}
          <p>
            Livres:
            {author.books}
          </p>
          <br />
          <button onClick={handleDelete} className="border p-0">
            Supprimer l'auteur
          </button>
          <br />
          <br />
          <br />
          <u>
            <h1>Formulaire pour éditer l'auteur</h1>
          </u>
          {author && (
            <form onSubmit={handleUpdate}>
              <label>
                Prénom :
                <input
                  type="text"
                  name="firstName"
                  value={editData.firstName || ''}
                  onChange={handleChange}
                />
              </label>
              <label>
                Nom :
                <input
                  type="text"
                  name="lastName"
                  value={editData.lastName || ''}
                  onChange={handleChange}
                />
              </label>
              <label>
                Photo :
                <input
                  type="text"
                  name="photoUrl"
                  value={editData.photoUrl || ''}
                  onChange={handleChange}
                />
              </label>

              <button type="submit" className="border p-0">
                Mettre à jour l'auteur
              </button>
            </form>
          )}
          <br />
          <button
            onClick={() => (window.location.href = '/authors')}
            className="border p-0"
          >
            Retour à la liste des auteurs
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthorDetailsPage;
