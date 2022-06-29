import React from 'react';
import Banner from '../components/utils/Banner'
import Nav from "../components/utils/Nav";
import GetPosts from "../components/Posts/GetPosts"

function Home() {
    return (

        <main className='home'>
            <Banner />
            <Nav />
            <article className='home-container'>
                < GetPosts />
            </article>
        </main>
    );
};

export default Home;