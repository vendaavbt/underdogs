'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import Menu from '@/app/page';
import { useUsersProviders } from '@/hooks';

const UsersPage = () => {
  const { useListUsers, useAddUser } = useUsersProviders();
  const { users, load } = useListUsers();
  const { addUser } = useAddUser();

  const [newUser, setNewUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await addUser(newUser);
      setNewUser({
        id: '',
        firstName: '',
        lastName: '',
      });
      load();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <Menu />
      <div className="mt-32">
        <div className="text-center">
          <br />
          <p className="text-xl font-semibold">Page des utilisateurs</p>

          <br />
          <input
            type="text"
            placeholder="Chercher par nom..."
            onChange={handleSearchChange}
            className="border p-1"
          />
        </div>

        <br />

        <form onSubmit={handleSubmit}>
          <input
            name="firstName"
            value={newUser.firstName}
            onChange={handleChange}
            placeholder="Prénom"
            required
          />
          <input
            name="lastName"
            value={newUser.lastName}
            onChange={handleChange}
            placeholder="Nom"
            required
          />

          <button type="submit" className="border p-0">
            Ajouter un auteur
          </button>
        </form>

        <div>
          {filteredUsers.map((user) => (
            <div key={user.id}>
              <hr />

              <br />
              <big>
                <strong>
                  <h3>
                    {user.firstName}
                    {' '}
                    {user.lastName}
                  </h3>
                </strong>
              </big>
              <Link href={`/users/${user.id}`} passHref>
                <button type="button" className="border p-0">
                  Details
                </button>
              </Link>
              <br />
              <br />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UsersPage;
