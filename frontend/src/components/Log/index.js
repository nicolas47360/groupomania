import React, { useState } from "react";
import SignInFomr from "./Login";
import SignUpFomr from "./CreateAccount";

function Log() {
    const [createAccountModal, setCreateAccountModal] = useState(true);
    const [logInModal, setLoginInModal] = useState(false);
    function handleModals(event) {
        if (event.target.id === "signup") {
            setLoginInModal(false);
            setCreateAccountModal(true);
        }
        else if (event.target.id === "login") {
            setCreateAccountModal(false);
            setLoginInModal(true);
        }
    }
    return (
        <div className="form-container">
            <ul>
                <li onClick={handleModals} id="signup">S'inscrire</li>
                <li onClick={handleModals} id="login">Se connecter</li>
            </ul>
            {createAccountModal && <SignUpFomr />}
            {logInModal && <SignInFomr />}
        </div>

    );
};

export default Log;