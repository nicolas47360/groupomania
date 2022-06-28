import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Banner() {
    return (
        <header>
            <img className='logo' src='./image/icon.png' alt='logo groupomania' />
            <Link className='banner-link' to="/" >
                <FontAwesomeIcon className='icon-header' icon={faSignOut} ></FontAwesomeIcon>
            </Link>
        </header>
    )
}

export default Banner;