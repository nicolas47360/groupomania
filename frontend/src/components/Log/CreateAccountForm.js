import { useForm } from "react-hook-form";
import axios from "axios";

function CreateAccountForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleAccount = (data) => {
        axios.post(
            `http://localhost:5000/api/auth/signup/`,
            data,
        )
            .then((res) => {
                console.log(res.data);
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
                minLenght: { value: 8, message: "Le mot de passe doit contenir 8 caractéres et une majuscule" },
            })} placeholder='Votre mot de passse' />
            <p>{errors.password?.message}</p>
            <button type="submit" className="button">S'inscrire</button>
        </form>
    )
};

export default CreateAccountForm;