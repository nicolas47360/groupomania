import React, { useState } from "react";
import SignInFomr from "./LoginForm";
import SignUpFomr from "./CreateAccountForm";

function Log() {
    const [createAccountModal, setCreateAccountModal] = useState(true);
    const [logInModal, setLoginInModal] = useState(false);
    const handleModals = (e) => {
        if (e.target.id === "signup") {
            setLoginInModal(false);
            setCreateAccountModal(true);
        }
        else if (e.target.id === "login") {
            setCreateAccountModal(false);
            setLoginInModal(true);
        }
    }
    return (
        <div className="connection-form">
            <div className="form-container">
                <ul>
                    <li onClick={handleModals} id="signup">S'inscrire</li>
                    <li onClick={handleModals} id="login">Se connecter</li>
                </ul>
                {createAccountModal && <SignUpFomr />}
                {logInModal && <SignInFomr />}
            </div>
        </div>
    );
};

export default Log;