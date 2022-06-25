import { useForm } from "react-hook-form";
import axios from "axios";

function SignInForm(user) {
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { email: "", password: "" } });

    const handleLogin = (data) => {
        axios.post(
            `http://localhost:5000/api/auth/login`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer {token}`
                }
            }
        )
            .then((res) => {
                window.location = "/Home";
                res.json(data);
                console.log(res.data);
            })
            .catch((err) => { console.log(err); })
    }
    return (
        <form onSubmit={handleSubmit(handleLogin)} id="sign-up-form">
            <label htmlFor="email">Email</label>
            <input type="email"{...register("email", { required: "Ce champ est requis" })} placeholder='exemple@exemple.fr' />
            <p>{errors.email?.message}</p>
            <label htmlFor="password">mot de passe</label>
            <input type="password"{...register("password", {
                required: "Ce champ est requis",
                minLenght: { value: 8, message: "Le mot de passe doit contenir 8 caractéres et une majuscule" },
            })} placeholder='Votre mot de passse' />
            <p>{errors.password?.message}</p>
            <button type="submit" className="button">Se connecter</button>
        </form>
    )
};

export default SignInForm;