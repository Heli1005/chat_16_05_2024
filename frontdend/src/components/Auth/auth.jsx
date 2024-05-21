import React, { createContext, useContext, useState } from "react";
import UseLocalStorage from "../common/useLocalStore";
import { useLocation, useNavigate } from "react-router-dom";

const userContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [current, setCurrentUser] = UseLocalStorage('user', {})
    const navigate = useNavigate()
    const handleLogin = async (userObj) => {
        await setUser(userObj)
        await setCurrentUser(userObj)
        await navigate('/chat')
    }

    const handleLogOut = async () => {
        setUser(null)
        setCurrentUser(null)
        await navigate('/')
    }

    return <>
        <userContext.Provider value={{ user, handleLogOut, handleLogin }}>
            {children}
        </userContext.Provider>
    </>;
};

export default AuthProvider;

export const authUser = () => {
    return useContext(userContext)
}
