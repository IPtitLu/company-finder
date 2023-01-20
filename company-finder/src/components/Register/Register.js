import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [dataResponse, setDataResponse] = useState([]);
    const [dataError, setDataError] = useState(null);
    const [state, setState] = useState({ pseudo: "", password: "", name: "", mail: "" });
    const navigate = useNavigate();

    const handleInputChangePseudo = (event) => {
        const target = event.target;
        const value = target.value;

        setState({
            pseudo: value,
            password: state.password,
            name: state.name,
            mail: state.mail
        });
    };
    const handleInputChangeMail = (event) => {
        const target = event.target;
        const value = target.value;

        setState({
            pseudo: state.pseudo,
            password: state.password,
            name: state.name,
            mail: value
        });
    };
    const handleInputChangeName = (event) => {
        const target = event.target;
        const value = target.value;

        setState({
            pseudo: state.pseudo,
            password: state.password,
            name: value,
            mail: state.mail
        });
    };
    const handleInputChangePassword = (event) => {
        const target = event.target;
        const value = target.value;

        setState({
            pseudo: state.pseudo,
            password: value,
            name: state.name,
            mail: state.mail
        });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        // Envoyer une requête de connexion avec les données d'utilisateur saisies

        const pseudo = state.pseudo;
        const password = state.password;
        const name = state.name;
        const mail = state.mail;
        axios
            .post("https://company-finder.onrender.com/register", {
                name: name,
                pseudo: pseudo,
                mail: mail,
                password: password,
            })
            .then((res) => {
                if (res.status === 200) {
                    window.location.href= '/login';
                }
            })
            .catch((error) => {
                console.log(error);
                setDataError('Mauvais identifiant ou mot de passe.')
            });
    };

    return (
        <div className="w-full flex justify-center bg-white max-h-screen">
            <div className="w-full max-w-md relative max-h-screen bg-card-gray mx-2 flex items-center flex-col">
                <div className="w-full max-h-screen profile-page flex justify-center items-center flex-col px-10">
                    <h3 className="w-full text-center font-bold text-3xl mb-10">
                        Création du compte
                    </h3>
                    {isSubmitted ? (
                        <p>Login success, you can access now to your cart !</p>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="w-full flex justify-center flex-col items-center "
                        >
                            <label className="mb-5 w-full">
                                <input
                                    type="text"
                                    name="username"
                                    value={state.pseudo}
                                    onChange={handleInputChangePseudo}
                                    required
                                    placeholder="Pseudo"
                                    className="w-full border-2 px-4 py-4 border-orange input"
                                />
                            </label>
                            <label className="mb-10 w-full ">
                                <input
                                    type="text"
                                    name="mail"
                                    value={state.mail}
                                    onChange={handleInputChangeMail}
                                    required
                                    placeholder="Mail"
                                    className="w-full border-2 px-4 py-4 border-orange input"
                                />
                            </label>
                            <label className="mb-10 w-full ">
                                <input
                                    type="text"
                                    name="name"
                                    value={state.name}
                                    onChange={handleInputChangeName}
                                    required
                                    placeholder="Name"
                                    className="w-full border-2 px-4 py-4 border-orange input"
                                />
                            </label>
                            <label className="mb-10 w-full ">
                                <input
                                    type="password"
                                    name="password"
                                    value={state.password}
                                    onChange={handleInputChangePassword}
                                    required
                                    placeholder="Password"
                                    className="w-full border-2 px-4 py-4 border-orange input"
                                />
                            </label>
                            {dataError ? (
                                <p className="text-red-500 text-xs italic">
                                    {dataError}
                                </p>
                            ) : (
                                ""
                            )}
                            <a href="/login" className="w-full">
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="w-full h-max px-4 py-3 bg-black cursor-pointer text-white mt-8 mb-5 font-semibold drop-shadow-lg hover:bg-white hover:text-black ease-in-out duration-200 login-btn"
                                />
                            </a>
                        </form>
                    )}
                    <a href="/login" className="w-full cursor-pointer hover:text-blue text-center">
                        Se connecter
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
