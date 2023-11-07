'use client';


import Menu from  'src/app/page';
import React, { FC } from 'react';

const AuthorsPage: FC = () => <>
    <Menu />
    <div className="text-center">
        <h1 className="text-4xl font-bold mt-32">
            <p className="text-xl font-semibold">Page des auteurs</p>
        </h1>
    </div>
    La page des auteurs n'est pas (encore) implémentée
    </>;

export default AuthorsPage;
