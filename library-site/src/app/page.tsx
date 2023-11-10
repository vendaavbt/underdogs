import Link from 'next/link';
import './globals.css';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Menu() {
  return (
    <div className="nav">
      <Link href="/accueil">
        <p className="title">UNDERDOGS</p>
      </Link>
      <ul className="lien">
        <li className="">
          <Link href="/accueil">Accueil</Link>
        </li>
        <li className="">
          <Link href="/authors">Auteurs</Link>
        </li>
        <li className="">
          <Link href="/books">Livres</Link>
        </li>
        <li className="">
          <Link href="/users">Utilisateurs</Link>
        </li>
      </ul>
    </div>
  );
}
