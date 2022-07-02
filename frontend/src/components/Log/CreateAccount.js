import { useForm } from "react-hook-form";
import axios from "axios";

function CreateAccount() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleAccount = (data) => {

        axios.post(
            `http://localhost:5000/api/auth/signup/`,
            data,
        )
        console.log(data)

            .then((res) => {
                console.log(res.postdata);
                window.location = "/"
            })
            .catch((err) => { console.log(err) })
    }
    return (
        <form onSubmit={handleSubmit(handleAccount)} id="sign-up-form">
            <label htmlFor="email">Email</label>
            <input type="email"{...register("email", { required: "Ce champ est requis" })} placeholder='exemple@exemple.fr' />
            <p>{errors.email?.message}</p>
            <label htmlFor="password">Mot de passe</label>
            <input type="password"{...register("password", {
                required: "Ce champ est requis",
                minLength: { value: 8, message: "Le mot de passe doit contenir 8 caractéres et une majuscule" },
            })} placeholder='Votre mot de passse' />
            <p>{errors.password?.message}</p>
            <div className="auth-button">
                <button type="submit" className="button">S'inscrire</button>
            </div>

        </form>
    )
};

export default CreateAccount;