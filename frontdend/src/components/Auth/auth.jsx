import React, { createContext, useContext, useState } from "react";
import UseLocalStorage from "../common/useLocalStore";
import { useLocation, useNavigate } from "react-router-dom";

const userContext = createContext()

const AuthProvider = ({ children }) => {

    const [current, setCurrentUser] = UseLocalStorage('user', {})
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState([]);
    const [notificationList, setNotificationList] = useState([]);

    const [user, setUser] = useState(current || null);
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
        <userContext.Provider value={{ user, handleLogOut, handleLogin, selectedChat, setSelectedChat, chats, setChats, notificationList, setNotificationList }}>
            {children}
        </userContext.Provider>
    </>;
};

export default AuthProvider;

export const authUser = () => {
    return useContext(userContext)
}
