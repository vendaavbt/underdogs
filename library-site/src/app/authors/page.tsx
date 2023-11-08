'use client';

import React, { FC, useState } from 'react';
import Menu from 'src/app/page';
import Link from 'next/link';

const authors = [
    { id: 1, firstName: 'Alexandre', lastName: 'Dumas', nbr:'80' },
    { id: 2, firstName: 'Albert', lastName: 'Camus',nbr:'30' },
    { id: 3, firstName: 'Charles', lastName: 'Dickens',nbr:'34' },
    { id: 4, firstName: 'Marcel', lastName: 'Proust',nbr:'1' },
];

const AuthorPage: FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectednbr, setSelectednbr] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [newAuthor, setNewAuthor] = useState({ firstName: '', lastName: '', nbr: '' });
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

    const handlenbrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectednbr(e.target.value);
    };

    const handleAddAuthor = () => {
        // Ajoutez le nouvel auteur à la liste d'auteurs
        authors.push({
            id: authors.length + 1,
            ...newAuthor
        });

        // Réinitialisez la modale et les champs
        setNewAuthor({ firstName: '', lastName: '', nbr: '' });
        setModalOpen(false);
    };
    const handleShowAuthorDetails = (author: Author) => {
        setSelectedAuthor(author);
    };


    return (
        <>
            <Menu />
            <div className="mt-32">
                <div className="text-center">
                    <p className="text-xl font-semibold">Page des auteurs</p>
                </div>

                <input
                    type="text"
                    placeholder="Nom/Prénom ?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ color: '#000000' }}
                    className="mt-4"
                />

                <div className="mt-4">
                    <label />
                    <input
                        type="text"
                        placeholder="Nombre de livres ?"
                        value={selectednbr}
                        onChange={handlenbrChange}
                        style={{ color: '#000000' }}
                    />
                </div>

                <button onClick={() => setModalOpen(true)} className="mt-4 bg-blue-500 text-white p-2 rounded">
                    Ajouter un auteur
                </button>

                <div className="grid grid-cols-16 gap-4">
                    {authors
                        .filter((author) => {
                            const fullName = `${author.firstName} ${author.lastName}`;
                            return (
                                fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
                                (!selectednbr ||
                                    (author.nbr && author.nbr.includes(selectednbr)))
                            );
                        })
                        .map((author) => (
                            <Link legacyBehavior key={author.id} href={`/authors/${author.id}`}>
                                <a>
                                    <div className="bg-gray-300 text-black rounded-md w-1/16 p-2">
                                        <p className="text-lg">
                                            ID: {author.id}
                                        </p>
                                        <p className="text-lg">
                                            Nom: {author.firstName}
                                        </p>
                                        <p className="text-lg">
                                            Prénom: {author.lastName}
                                        </p>
                                        <p className="text-lg">
                                            Nombre de livre(s): {author.nbr}
                                        </p>
                                    </div>
                                </a>
                            </Link>
                        ))}
                </div>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span onClick={() => setModalOpen(false)} className="close-button">
                            &times;
                        </span>
                        <h2>Ajouter un nouvel auteur</h2>
                        <input
                            type="text"
                            placeholder="Prénom"
                            value={newAuthor.firstName}
                            onChange={(e) => setNewAuthor({ ...newAuthor, firstName: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Nom"
                            value={newAuthor.lastName}
                            onChange={(e) => setNewAuthor({ ...newAuthor, lastName: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Nombre de livres"
                            value={newAuthor.nbr}
                            onChange={(e) => setNewAuthor({ ...newAuthor, nbr: e.target.value })}
                        />
                        <button onClick={handleAddAuthor}>Ajouter</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AuthorPage;

//const breadcrumbItems = [
// { label: 'Accueil', path: '/' },
//{ label: 'Utilisateurs', path: '/users' },
// ];
