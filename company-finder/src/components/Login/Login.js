import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [dataResponse, setDataResponse] = useState([]);
    const [state, setState] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleInputChangeUsername = (event) => {
        const target = event.target;
        const value = target.value;

        setState({
            username: value,
            password: state.password,
        });
    };
    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;

        setState({
            username: state.username,
            password: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Envoyer une requête de connexion avec les données d'utilisateur saisies

        const username = state.username;
        const password = state.password;
        axios
            .post("http://localhost:3000/api/login", {
                username: username,
                password: password,
            })
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("token", res.data.token);

                    window.location.reload();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="w-full flex justify-center bg-white max-h-screen">
            <div className="w-full max-w-md relative max-h-screen bg-card-gray mx-2 flex items-center flex-col">
                <div className="w-full max-h-screen profile-page flex justify-center items-center flex-col px-10">
                    <h3 className="w-full text-center font-bold text-3xl mb-10">
                        Connexion
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
                                    value={state.username}
                                    onChange={handleInputChangeUsername}
                                    required
                                    placeholder="Email"
                                    className="w-full border-2 px-4 py-4 border-orange input"
                                />
                            </label>
                            <label className="mb-10 w-full ">
                                <input
                                    type="password"
                                    name="pass"
                                    value={state.password}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Password"
                                    className="w-full border-2 px-4 py-4 border-orange input"
                                />
                            </label>
                            {errorMessage ? (
                                <p className="text-red-500 text-xs italic">
                                    {" "}
                                    {errorMessage}{" "}
                                </p>
                            ) : (
                                ""
                            )}
                            <a href="/" className="w-full">
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="w-full h-max px-4 py-3 bg-black cursor-pointer text-white mt-8 mb-5 font-semibold drop-shadow-lg hover:bg-white hover:text-black ease-in-out duration-200 login-btn"
                                />
                            </a>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
