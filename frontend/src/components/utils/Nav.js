import React from 'react';
import { Link } from "react-router-dom";

function Nav() {
    return (
        <ul className='nav-container'>
            <Link to="/profil">
                <li className='nav-link'>Votre profil</li>
            </Link>
            <li className='nav-link'>Poster un commentaire</li>
        </ul>
    )
}

export default Nav;