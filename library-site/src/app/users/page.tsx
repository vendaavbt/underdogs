'use client';

import { FC } from 'react';
import Breadcrumb from 'src/app/Breadcrumb';
import Menu from  'src/app/page';
import { FC, useState } from 'react';

const users = [
    { id: 1, firstName: 'Matthieu', lastName: 'Gildeux' },
    { id: 2, firstName: 'Matteo', lastName: 'Guignolet' },
    { id: 3, firstName: 'Arthur', lastName: 'Pasdoué' },
    { id: 4, firstName: 'Mateo', lastName: 'Papier' },
    { id: 5, firstName: 'Baptiste', lastName: 'Dehonte' },
    { id: 6, firstName: 'Edouard', lastName: 'Mourant' },

];

const UserPage: FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBook, setSelectedBook] = useState('');

    const handleBookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedBook(e.target.value);
    };

    return (
        <>
            <Menu />
            <div className="text-center">
                <p className="text-xl font-semibold">Page des utilisateurs</p>
            </div>

            <input
                type="text"
                placeholder="Rechercher par nom"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ color: '#000000' }}
                className="mt-4"
            />

            <div className="mt-4">
                <label></label>
                <input
                    type="text"
                    placeholder="Rechercher par livre"
                    value={selectedBook}
                    onChange={handleBookChange}
                    style={{ color: '#000000' }}
                />
            </div>

            <div className="grid grid-cols-16 gap-4">
                {users
                    .filter((user) => {
                        const fullName = user.firstName + ' ' + user.lastName;
                        return (
                            fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
                            (!selectedBook || (user.books && user.books.includes(selectedBook)))
                        );
                    })
                    .map((user) => (
                        <div
                            key={user.id}
                            className="bg-blue-500 text-white rounded-md w-1/16 p-2"
                        >
                            <p className="text-lg">ID: {user.id}</p>
                            <p className="text-lg">Nom: {user.firstName}</p>
                            <p className="text-lg">Prénom: {user.lastName}</p>
                            <p className="text-lg">
                                Livres: {user.books ? user.books.join(', ') : 'Aucun livre'}
                            </p>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default UserPage;

const breadcrumbItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Utilisateurs', path: '/users' },
];
