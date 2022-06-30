import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Banner() {
    return (
        <header>
            <img className='logo' src='./image/icon2.png' alt='logo groupomania' />
            <div className='logout'>
                <Link className='banner-link' to="/" >
                    <FontAwesomeIcon className='icon-header' icon={faSignOut} ></FontAwesomeIcon>
                </Link>
            </div>
        </header>
    )
}

export default Banner;