import axios from "axios";
import { useForm } from "react-hook-form";

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
        <form onSubmit={handleSubmit(handlePost)}>
            <label htmlFor="text">Message</label>
            <textarea type="text"{...register("text")} placeholder='votre message' />
            <p>{errors.text?.message}</p>
            <div>
                <button type="submit" className="post-button">Envoyer votre post</button>
            </div>
        </form>

    )
}

export default CreatePost;