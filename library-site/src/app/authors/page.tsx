'use client'
import React, { useEffect, useState } from 'react';
import { PlainAuthorModel } from 'library-api/src/models';
import { getAllAuthors } from 'library-api/src/repositories/authors';

const AuthorsPage: React.FC = () => {
    const [authors, setAuthors] = useState<PlainAuthorModel[]>([]);

    useEffect(() => {
        // Utilisez la fonction d'API pour récupérer la liste des auteurs depuis votre backend.
        const fetchAuthors = async () => {
            try {
                const response = await getAllAuthors(); // Assurez-vous d'implémenter cette fonction d'appel API.
                setAuthors(response);
            } catch (error) {
                console.error('Erreur lors de la récupération des auteurs :', error);
            }
        };

        fetchAuthors();
    }, []);

    return (
        <div>
            <h1>Liste des auteurs</h1>
            <ul>
                {authors.map((author) => (
                    <li key={author.id}>
                        <h2>{`${author.firstName} ${author.lastName}`}</h2>
                        {author.photoUrl && <img src={author.photoUrl} alt={`${author.firstName} ${author.lastName}`} />}
                        <p>Nombre de livres écrits : {author.books.length}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuthorsPage;
