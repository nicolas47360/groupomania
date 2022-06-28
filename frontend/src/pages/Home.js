import React from 'react';
import Banner from '../components/utils/Banner'
import Nav from "../components/utils/Nav";
import GetComments from "../components/comment/GetComments"

function Home() {
    return (

        <main className='home'>
            <Banner />
            <Nav />
            <div>
                < GetComments />
            </div>

        </main>
    );
};

export default Home;