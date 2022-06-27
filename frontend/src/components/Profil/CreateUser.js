import axios from "axios";
import { useForm } from "react-hook-form";
import React, { useState  } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

function CreateProfil() {
    const [selectedImage, setSelectedImage] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    function handleProfil(data) {
        axios.post(
            `http://localhost:5000/api/user`,
            data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer {token}`
            }
        }
        )
            .then((res) => {
                res.json(data);
                console.log(res.data)
            })
            .catch((err) => { console.log(err) })
    }
    return (
        <form onSubmit={handleSubmit(handleProfil)}>
            <label htmlFor="pseudo">Pseudo</label>
            <input type="pseudo"{...register("pseudo")} placeholder="Superman47"></input>
            <p>{errors.pseudo?.message}</p>
            <label htmlFor="firstname">Prénom</label>
            <input type="firstname"{...register("firstname")} placeholder="Votre prénom"></input>
            <p>{errors.firstname?.message}</p>
            <label htmlFor="lastname">Nom</label>
            <input type="lastname"{...register("lastname")} placeholder="Votre nom"></input>
            <p>{errors.firstname?.message}</p>
            <label htmlFor="email">Email</label>
            <input type="email"{...register("firstname")} placeholder="Votre prénom"></input>
            <p>{errors.firstname?.message}</p>
            <div className="img-container">
                <FontAwesomeIcon className='icon-profil' icon={faCamera} ></FontAwesomeIcon>
                <p className="img-texte" >Ajouter une photo de profil</p>
                    {selectedImage && (
                    <div>
                    <img alt="not fount" width={"150px"} src={URL.createObjectURL(selectedImage)} />
                    <br />
                    <button onClick={()=>setSelectedImage(null)}>Remove</button>
                    </div>
                )}
                <br />
                
                <br /> 
                <input
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                    }}
                />
            </div>
            <button type="submit" className="user-button">Créer votre profil</button>
        </form>
    )
}

export default CreateProfil;