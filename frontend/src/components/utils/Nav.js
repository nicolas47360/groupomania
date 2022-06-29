import React from 'react';
import { Link } from "react-router-dom";

function Nav() {
    return (
        <ul className='nav-container'>
            <Link to="/profil">
                <li className='nav-link'>Créer et gérer Votre profil</li>
            </Link>
            <Link to="/post">
                <li className='nav-link'>Rédiger et gérer vos posts</li>
            </Link>

        </ul>
    )
}

export default Nav;