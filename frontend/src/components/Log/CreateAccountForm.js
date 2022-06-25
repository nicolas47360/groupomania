import React, { useState } from "react";
import axios from "axios";

function SignInFomr() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {

    }
    return (
        <form action="" onSubmit={handleLogin} id="sign-up-form">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <label htmlFor="password">mot de passe</label>
            <input type="text" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <input type="submit" value="se connecter" />
        </form>
    )
}

export default SignInFomr;