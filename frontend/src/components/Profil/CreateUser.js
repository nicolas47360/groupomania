import axios from "axios";
import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

function CreateProfil() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    function handleProfil(data) {
        axios.post(
            `http://localhost:5000/api/user`,
            data,
        )

            .then(res => {
                console.log(res.data)
            })
            .catch((err) => { console.log(err) })
    }
    return (
        <form onSubmit={handleSubmit(handleProfil)}>
            <label htmlFor="pseudo">Pseudo</label>
            <input type="pseudo"{...register("pseudo", { required: "Ce champ est requis" })} placeholder="Superman47"></input>
            <p>{errors.pseudo?.message}</p>
            <label htmlFor="firstname">Prénom</label>
            <input type="firstname"{...register("firstname", { required: "Ce champ est requis" })} placeholder="Votre prénom"></input>
            <p>{errors.firstname?.message}</p>
            <label htmlFor="lastname">Nom</label>
            <input type="lastname"{...register("lastname", { required: "Ce champ est requis" })} placeholder="Votre nom"></input>
            <p>{errors.firstname?.message}</p>
            <label htmlFor="email">Email</label>
            <input type="email"{...register("email")} placeholder="test@test.fr"></input>
            <p>{errors.firstname?.message}</p>
            {/* <div className="img-container">
                <FontAwesomeIcon className='icon-profil' icon={faCamera} ></FontAwesomeIcon>
            </div> */}
            <button type="submit" className="user-button">Créer votre profil</button>
        </form>
    )
}

export default CreateProfil;