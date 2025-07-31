import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {setLogin, setLogin as loginAction} from "../store/userSlice.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import reactRefresh from "eslint-plugin-react-refresh";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            await axios.post('/api/login', {
                username: username,
                password: password
            }, {withCredentials: true})

            console.log('Login payload:', { username, password })

            dispatch(loginAction(username))
            navigate('/dashboard')
        } catch (error) {
            console.log(error.response?.data?.error || "Login error")
            alert('Wrong credentials')

            setUsername('')
            setPassword('')
        }
    }

    return (
        <div>
            <div className={"login-container"}>
                <form onSubmit={handleLogin} className={"login-container-login-form"}>
                    <h1>Login page</h1>

                    Login:
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />

                    Password:
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type={"password"}
                    />

                    <button type={"submit"}>Sign in</button>
                </form>
            </div>
        </div>
    )

}

export default Login