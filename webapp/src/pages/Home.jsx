import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Home = () => {
    const username = useSelector((state) => state.user.username)
    const isAuthChecked = useSelector(state => state.user.isAuthChecked)
    const navigate = useNavigate()

    useEffect(() => {
        if (username && isAuthChecked) {
            navigate('/dashboard')
        }
    }, [isAuthChecked, username, navigate]);

    if (!isAuthChecked) return <div>Loading...</div>

    return (
        <div className={"home"}>
            <h1>Homepage</h1>
            <button onClick={() => navigate('/login')}>Sign in</button>
            <button onClick={() => navigate('/register')}>Create an account</button>
        </div>
    )
}

export default Home