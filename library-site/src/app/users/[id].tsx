import { useRouter } from 'next/router';
import UserDetailsPage from 'users/[id]/page';

const UserDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return <UserDetailsPage id={id} />;
};

export default UserDetails;
