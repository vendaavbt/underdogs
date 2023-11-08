import { useRouter } from 'next/router';
import AuthorDetailsPage from 'authorss/[id]/page';

const AuthorDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return <AuthorDetailsPage id={id} />;
};

export default AuthorDetails;
