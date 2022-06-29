import React, { useState } from "react";
import CreateProfil from "./CreateUser";
import UpdateProfil from "./UpdateUser"
import DeleteProfil from "./DeleteUser";

function Posts() {
    const [createUserModal, setCreateUserModal] = useState(true);
    const [updateUserModal, setupdateUserModal] = useState(false);
    const [deleteUserModal, setDeleteUserModal] = useState(false);
    function handleModals(event) {
        if (event.target.id === "createuser") {
            setCreateUserModal(true);
            setupdateUserModal(false);
            setDeleteUserModal(false);
        }
        else if (event.target.id === "updateuser") {
            setCreateUserModal(false);
            setupdateUserModal(true);
            setDeleteUserModal(false);
        }
        else if (event.target.id === "deleteuser") {
            setCreateUserModal(false);
            setupdateUserModal(false);
            setDeleteUserModal(true);
        }
    }
    return (
        <div className="user-form">
            <div className="user-container">
                <ul className="user-list">
                    <li className="user-li" onClick={handleModals} id="createuser">Créer un profil</li>
                    <li className="user-li" onClick={handleModals} id="updateuser">Modifier votre profil</li>
                    <li className="user-li" onClick={handleModals} id="deleteuser">Supprimer votre profil</li>
                </ul>
                {createUserModal && <CreateProfil />}
                {updateUserModal && <UpdateProfil />}
                {deleteUserModal && < DeleteProfil />}
            </div>
        </div>
    )
}

export default Posts;
