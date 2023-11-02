// page.tsx (dossier "[id]")
import { useParams } from 'next/navigation';
import { FC } from 'react';
import Menu from 'src/app/page';

const users = [
    { id: 1, firstName: 'Matthieu', lastName: 'Gildeux' },
    { id: 2, firstName: 'Matteo', lastName: 'Guignol' },
    { id: 3, firstName: 'Arthur', lastName: 'Pasdoué' },
    { id: 4, firstName: 'Mateo', lastName: 'Papier' },
];

const UserDetailsPage: FC = () => {
    const { id } = useParams();
    const user = users.find((u) => u.id === parseInt(id, 10));

    return (
        <>
            <Menu />
            <div className="text-center">
                <p className="text-xl font-semibold">Détails de l'utilisateur</p>
            </div>
            {user ? (
                <div>
                    <p>ID: {user.id}</p>
                    <p>Nom: {user.firstName}</p>
                    <p>Prénom: {user.lastName}</p>
                </div>
            ) : (
                <p>L'utilisateur avec l'ID {id} n'a pas été trouvé.</p>
            )}
        </>
    );
};

export default UserDetailsPage;
