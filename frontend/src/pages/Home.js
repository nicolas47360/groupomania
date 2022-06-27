import React from 'react';
import Banner from '../components/utils/Banner'
import Nav from "../components/utils/Nav";

function Home() {
    return (

        <main className='home'>
            <Banner />
            <Nav />
            <div>
                Salut la compagnie
            </div>

        </main>
    );
};

export default Home;