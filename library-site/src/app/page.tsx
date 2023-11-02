import Link from 'next/link';

export default function Menu() {
  return (
    <>
      <div className="bg-blue-500 text-center py-2">
        <p className="text-xl font-semibold">Bibliothèque des underdogs</p>
      <ul className="flex space-x-4 justify-center py-4">
        <li className="mb-2 p-2 border border-blue-500 rounded-lg w-1/12 flex items-center justify-center">
          <Link href="/accueil">Accueil</Link>
        </li>
        <li className="mb-2 p-2 border border-blue-500 rounded-lg w-1/12 flex items-center justify-center">
          <Link href="/authors">Auteurs</Link>
        </li>
        <li className="mb-2 p-2 border border-blue-500 rounded-lg w-1/12 flex items-center justify-center">
          <Link href="/books">Livres</Link>
        </li>
        <li className="mb-2 p-2 border border-blue-500 rounded-lg w-1/12 flex items-center justify-center">
          <Link href="/users">Utilisateurs</Link>
        </li>
      </ul>
      </div>
    </>
  );
}