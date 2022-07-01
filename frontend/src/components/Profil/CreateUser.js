import axios from "axios";
import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

function CreateProfil() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleProfil = (data) => {

        axios.post(
            `http://localhost:5000/api/user`,

            JSON.stringify(data)

        )
        console.log(data)
            .then((res) => {
                console.log(res.data);
                window.location = "/home";
            })
            .catch((err) => { console.log(err) })
    }
    return (
        <form className="submit-form" onSubmit={handleSubmit(handleProfil)}>
            <label htmlFor="pseudo">Pseudo</label>
            <input className="input-user" type="text"{...register("pseudo")} placeholder="Superman47"></input>
            <p>{errors.pseudo?.message}</p>
            <label htmlFor="firstname">Prénom</label>
            <input className="input-user" type="text"{...register("firstname", { required: "Ce champ est requis" })} placeholder="Votre prénom"></input>
            <p>{errors.firstname?.message}</p>
            <label htmlFor="lastname">Nom</label>
            <input className="input-user" type="text"{...register("lastname", { required: "Ce champ est requis" })} placeholder="Votre nom"></input>
            <p>{errors.lastname?.message}</p>
            <label htmlFor="email">Email</label>
            <input className="input-user" type="text"{...register("email")} placeholder="test@test.fr"></input>
            <p>{errors.email?.message}</p>
            <div className="img-user-container">
                <FontAwesomeIcon className="icon-profil" icon={faCamera} ></FontAwesomeIcon>
                <span>Ajouter une photo</span>
            </div>
            <div className="b-user">
                <button type="submit" className="user-button">Créer votre profil</button>
            </div>

        </form>
    )
}

export default CreateProfil;