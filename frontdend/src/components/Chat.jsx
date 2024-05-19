import React, { useEffect } from "react";
import Axios from "axios";

const Chat = (props) => {
    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        
        const data = await Axios.get('/api/chat')
        console.log("data.data", data.data);

    }
    return <div>Chat</div>;
};

export default Chat;
