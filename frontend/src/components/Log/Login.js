import { useForm } from "react-hook-form";
import axios from "axios";


function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { email: "", password: "" } });


    const handleLogin = (data) => {
        axios.post(
            `http://localhost:5000/api/auth/login`,
            data,
        )
            .then((res) => {
                console.log(res.data.token);
                localStorage.token = res.data.token;
                axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.token;
                window.location = "/home"
            })
            .catch((err) => { console.log(err) });
    }
    return (
        <form onSubmit={handleSubmit(handleLogin)} id="sign-up-form">
            <label htmlFor="email">Email</label>
            <input type="email"{...register("email", { required: "Ce champ est requis", })} placeholder='exemple@exemple.fr' className="input_password" />
            <p>{errors.email?.message}</p>
            <label htmlFor="password">Mot de passe</label>
            <input type="password"{...register("password", {
                required: "Ce champ est requis",
                minLength: { value: 8, message: "Le mot de passe doit contenir 8 caractéres et une majuscule" },
            })} placeholder='Votre mot de passse' />
            <p>{errors.password?.message}</p>
            <div className="auth-button">
                <button type="submit" className="button">Se connecter</button>
            </div>

        </form>
    )
};

export default LoginForm;