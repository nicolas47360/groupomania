import React from 'react';
import Log from '../components/Log';

function Auth() {
    return (
        <main className='auth'>
            <div className='logo-container'>
                <img className='logo' src='./image/icon.png' alt='logo groupomania' />
            </div>
            <div className='log-container'>
                <Log />
            </div>
        </main>
    );
};

export default Auth;