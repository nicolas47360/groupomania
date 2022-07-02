import axios from "axios";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

function CreatePost() {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const handlePost = (data) => {
        axios.post(
            `http://localhost:5000/api/post`,
            data,
        )
            .then((res) => {
                console.log(res.data);
                window.location = "/home"
            })
            .catch((err) => { console.log(err) });
    }
    return (
        <form className="post-form" onSubmit={handleSubmit(handlePost)}>
            <label htmlFor="message">Message</label>
            <textarea className="post-text" type="message"{...register("message", { required: "Ce champ est requis" })} placeholder='votre message...' />
            <p>{errors.text?.message}</p>
            <div className="img-post-container">
                <input type="file"{...register("imageUrl")} />
                <FontAwesomeIcon className="icon-post" icon={faCamera} ></FontAwesomeIcon>
                <span>Ajouter une photo</span>
            </div>
            <div className="b-post">
                <button type="submit" className="post-button">Envoyer votre post</button>
            </div>
        </form>

    )
}

export default CreatePost;