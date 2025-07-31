import {useEffect, useState} from "react";
import axios from "axios";
import {logout, setIsLoggingOut} from "../store/userSlice.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import '../styles/dashboard.css'
import { CiSettings } from "react-icons/ci";

const Dashboard = () => {
    const [userData, setUserData] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/user-data', {withCredentials: true})
            .then(res => setUserData(res.data))
            .catch(error => console.log(error))
    }, []);

    const handleLogout = async () => {
        try {
            dispatch(setIsLoggingOut(true))
            await axios.post('/api/logout', {}, {withCredentials: true})
            dispatch(logout())
            navigate('/home')
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
            {userData && <p>Witaj, {userData.username}</p>}
            <button onClick={handleLogout}>Wyloguj sie</button>

            <div className={"dashboard-settings"}>
                <p>Settings</p>
                <CiSettings onClick={() => navigate('/settings')} className={"dashboard-settings-icon"}/>
            </div>
        </div>
    )
}

export default Dashboard