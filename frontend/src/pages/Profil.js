import React from 'react';
import Profil from '../components/Profil';
import Banner from '../components/utils/Banner';

function User() {
    return (
        <main className='profil'>
            <Banner />
            <Profil />
        </main>
    );
};

export default User;