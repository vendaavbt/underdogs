import axios from 'axios';
import { useState } from 'react';
import { PlainAuthorModel } from '@/models';

type UseListAuthorsProvider = {
  authors: PlainAuthorModel[];
  load: () => void;
};

type UseAddAuthorProvider = {
  addAuthor: (authorData: PlainAuthorModel) => Promise<any>;
};

type UseDeleteAuthorProvider = {
  deleteAuthor: (id: string) => Promise<any>;
};

type UseAuthorDetailsProvider = {
  author: PlainAuthorModel | null;
  loadAuthorDetails: (id: string) => void;
};

type UseUpdateAuthorProvider = {
  updateAuthor: (
    id: string,
    authorData: Partial<PlainAuthorModel>,
  ) => Promise<any>;
};

export const useListAuthors = (): UseListAuthorsProvider => {
  const [authors, setAuthors] = useState<PlainAuthorModel[]>([]);

  const load = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/authors`)
      .then((data) => setAuthors(data.data))
      .catch((err) =>
        console.error('Erreur lors de la récupération des auteurs:', err),
      );
  };

  return { authors, load };
};

export const useAddAuthor = (): UseAddAuthorProvider => {
  const addAuthor = (authorData: PlainAuthorModel) => axios.post(`${process.env.NEXT_PUBLIC_API_URL}/authors`, authorData);

  return { addAuthor };
};

export const useDeleteAuthor = (): UseDeleteAuthorProvider => {
  const deleteAuthor = (id: string) => axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`);

  return { deleteAuthor };
};

export const useAuthorDetails = (): UseAuthorDetailsProvider => {
  const [author, setAuthor] = useState<PlainAuthorModel | null>(null);

  const loadAuthorDetails = (id: string) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`)
      .then((data) => setAuthor(data.data))
      .catch((err) => console.error(err));
  };

  return { author, loadAuthorDetails };
};

export const useUpdateAuthor = (): UseUpdateAuthorProvider => {
  const updateAuthor = (id: string, authorData: Partial<PlainAuthorModel>) => axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`, authorData);

  return { updateAuthor };
};

type AuthorProviders = {
  useListAuthors: () => UseListAuthorsProvider;
  useAddAuthor: () => UseAddAuthorProvider;
  useDeleteAuthor: () => UseDeleteAuthorProvider;
  useAuthorDetails: () => UseAuthorDetailsProvider;
  useUpdateAuthor: () => UseUpdateAuthorProvider;
};

export const useAuthorsProviders = (): AuthorProviders => ({
  useListAuthors,
  useAddAuthor,
  useDeleteAuthor,
  useAuthorDetails,
  useUpdateAuthor,
});
