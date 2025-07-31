import {useEffect, useState} from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Settings from "./pages/Settings.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import {useDispatch} from "react-redux";
import {setIsAuthChecked, logout, setLogin as loginAction} from "./store/userSlice.js";
import axios from "axios";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get('/api/user-data', {withCredentials: true})
            .then(res => {
                dispatch(loginAction(res.data.username));
            })
            .catch(() => {
                dispatch(logout())
            }).finally(() => {
            dispatch(setIsAuthChecked(true))
        })
    }, [dispatch]);

    return (
        <Routes>
            <Route path={"/home"} element={<Home/>}/>
            <Route path={"/dashboard"} element={
                <RequireAuth>
                    <Dashboard/>
                </RequireAuth>
            }/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/register"} element={<Register/>}/>
            <Route path={'/settings'} element={
                <RequireAuth>
                    <Settings/>
                </RequireAuth>
            }/>
        </Routes>
    )

}

export default App
