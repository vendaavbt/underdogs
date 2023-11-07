import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Menu() {
  return (
    <div className="bg-gray-300 py-2 fixed top-0 w-full z-50">
      <p className="text-xl font-semibold ml-3">UNDERDOGS</p>
      <ul className="flex space-x-4 justify-center py-4">
        <li className="mb-2 p-2 border border-gray-300 rounded-lg w-1/12 flex items-center justify-center">
          <Link href="/accueil">Accueil</Link>
        </li>
        <li className="mb-2 p-2 border border-gray-300 rounded-lg w-1/12 flex items-center justify-center">
          <Link href="/authors">Auteurs</Link>
        </li>
        <li className="mb-2 p-2 border border-gray-300 rounded-lg w-1/12 flex items-center justify-center">
          <Link href="/books">Livres</Link>
        </li>
        <li className="mb-2 p-2 border border-gray-300 rounded-lg w-1/12 flex items-center justify-center">
          <Link href="/users">Utilisateurs</Link>
        </li>
      </ul>
    </div>
  );
}
