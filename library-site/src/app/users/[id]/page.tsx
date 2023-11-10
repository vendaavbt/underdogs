'use client';

import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '@/app/page';
import { PlainUserModel } from '@/models/user.model';

const UserDetailsPage: FC = () => {
  const [user, setUser] = useState<PlainUserModel | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const extractIdFromPath = (path: string): string | null => {
      const parts = path.split('/');
      return parts[parts.length - 1] || null;
    };

    const userId = extractIdFromPath(window.location.pathname);
    if (!userId) {
      setError("Aucun ID de livre trouvé dans l'URL.");
      return;
    }

    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const userId = extractIdFromPath(window.location.pathname);
        if (!userId) {
          throw new Error("Aucun ID de user trouvé dans l'URL.");
        }
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`,
        );
        setUser(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            'Erreur lors du chargement des détails du user:',
            error.response || error.request,
          );
          setError(
            `Erreur lors du chargement des détails du user: ${
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

    fetchUserDetails();
  }, []);

  const handleDelete = async () => {
    if (!user) return;
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce user ?')) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/user/${user.id}`,
        );
        window.location.href = '/users';
      } catch (error) {
        console.error('Erreur lors de la suppression du user:', error);
        setError('Erreur lors de la suppression du user.');
      }
    }
  };

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>Le user n'a pas été trouvé.</p>;

  return (
    <>
      <Menu />
      <div className="mt-32">
        <div>
          <u>
            <h1>Détails du user :</h1>
          </u>
          <big>
            <strong>
              <h2>
                {user.firstName}
                {' '}
                {user.lastName}
              </h2>
            </strong>
          </big>

          <br />
          <button onClick={handleDelete} className="border p-0">
            Supprimer le user
          </button>
          <br />
          <br />
          <br />
          <button
            onClick={() => (window.location.href = '/users')}
            className="border p-0"
          >
            Retour à la liste des users
          </button>
        </div>
      </div>
    </>
  );
};

export default UserDetailsPage;
