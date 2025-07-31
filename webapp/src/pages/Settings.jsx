import {useNavigate} from "react-router-dom";
import '../styles/settings.css'
import {use, useState} from "react";
import axios from "axios";
import Notification from "../components/Notification.jsx";

const Settings = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [notification, setNotification] = useState(null)
    const navigate = useNavigate()

    const handleChangePassword = async (e) => {
        e.preventDefault()

        try {
            await axios.post('/api/change-password', {
                oldPassword,
                newPassword
            }, { withCredentials: true })

            setNotification({ message: 'Password changed', type: 'success' })
            setTimeout(() => {
                setNotification(null)
            }, 5000)
            setOldPassword('')
            setNewPassword('')
        } catch (error) {
            setNotification({ message: error.response?.data?.error, type: 'error' })
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    return (
        <div>
            <button onClick={() => navigate('/dashboard')}>Back</button>
            <form onSubmit={handleChangePassword} className={"change-password"}>
                <Notification value={notification}/>
                <h2>Change password</h2>
                Old password:
                <input
                    placeholder={"old password"}
                    onChange={(e) => setOldPassword(e.target.value)}
                    value={oldPassword}
                /> <br/>

                New password:
                <input
                    placeholder={"new password"}
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                /> <br/>

                <button type={"submit"}>Change password</button>
            </form>
        </div>
    )
}

export default Settings