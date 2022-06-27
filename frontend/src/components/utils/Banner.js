import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

function Banner() {
    const logout = () => {
        window.location = "/";
    }
    return (
        <header>
            <img className='logo' src='./image/icon.png' alt='logo groupomania' />
            <span onAuxClick={logout}>
                <FontAwesomeIcon className='icon-header' icon={faSignOut} ></FontAwesomeIcon>
            </span>
        </header>
    )
}

export default Banner;