import axios from 'axios';
import { useState } from 'react';
import { PlainUserModel } from '@/models';

type UseListUsersProvider = {
  users: PlainUserModel[];
  load: () => void;
};

type UseAddUserProvider = {
  addUser: (userData: PlainUserModel) => Promise<any>;
};

type UseDeleteUserProvider = {
  deleteUser: (id: string) => Promise<any>;
};

type UseUserDetailsProvider = {
  user: PlainUserModel | null;
  loadUserDetails: (id: string) => void;
};

export const useListUsers = (): UseListUsersProvider => {
  const [users, setUsers] = useState<PlainUserModel[]>([]);

  const load = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user`)
      .then((data) => setUsers(data.data))
      .catch((err) =>
        console.error('Erreur lors de la récupération des users:', err),
      );
  };

  return { users, load };
};

export const useAddUser = (): UseAddUserProvider => {
  const addUser = (userData: PlainUserModel) => axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user`, userData);

  return { addUser };
};

export const useDeleteUser = (): UseDeleteUserProvider => {
  const deleteUser = (id: string) => axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`);

  return { deleteUser };
};

export const useUserDetails = (): UseUserDetailsProvider => {
  const [user, setUser] = useState<PlainUserModel | null>(null);

  const loadUserDetails = (id: string) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`)
      .then((data) => setUser(data.data))
      .catch((err) => console.error(err));
  };

  return { user, loadUserDetails };
};

type UserProviders = {
  useListUsers: () => UseListUsersProvider;
  useAddUser: () => UseAddUserProvider;
  useDeleteUser: () => UseDeleteUserProvider;
  useUserDetails: () => UseUserDetailsProvider;
};

export const useUsersProviders = (): UserProviders => ({
  useListUsers,
  useAddUser,
  useDeleteUser,
  useUserDetails,
});
