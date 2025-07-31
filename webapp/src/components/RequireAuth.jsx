import { Navigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {use} from "react";

const RequireAuth = ({ children }) => {
    const username = useSelector(state => state.user.username)
    const isAuthChecked = useSelector(state => state.user.isAuthChecked)
    const isLoggingOut = useSelector((state) => state.user.isLoggingOut)

    if (!isAuthChecked) {
        return <div>Loading...</div>
    }

    if (!username && !isLoggingOut) {
        return <Navigate to={"/login"} replace />
    }

    return children
}

export default RequireAuth