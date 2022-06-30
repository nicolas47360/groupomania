import axios from "axios";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

function CreatePost() {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const handlePost = (data) => {
        const formdata = new FormData();
        formdata.append("message", data.message)

        axios.post(
            `http://localhost:5000/api/post`,
            formdata,
        )
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => { console.log(err) })
    }
    return (
        <form className="post-form" onSubmit={handleSubmit(handlePost)}>
            <label htmlFor="text">Message</label>
            <textarea className="post-text" type="text"{...register("text")} placeholder='votre message...' />
            <p>{errors.text?.message}</p>
            <div className="img-post-container">
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