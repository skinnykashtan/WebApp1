import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/register', formData)
            alert(res.data.message)
            navigate('/login')
        } catch (error) {
            alert(error.response?.data?.error || 'Error')
        }
    }

    return (
        <div>
            <div className={'register-container'}>
                <form onSubmit={handleSubmit} className={'register-container-form'}>
                    <h1>Register page</h1>

                    Username:
                    <input
                        onChange={handleChange}
                        name={"username"}
                    />

                    Password:
                    <input
                        onChange={handleChange}
                        name={"password"}
                        type={"password"}
                    />

                    Email:
                    <input
                        onChange={handleChange}
                        name={"email"}
                    />

                    <button type={"submit"}>Register</button>

                </form>
            </div>
        </div>
    )
}

export default Register