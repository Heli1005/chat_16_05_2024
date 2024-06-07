import React, { useState } from "react";
import RegisteredUser from "../chatscomponents/RegisteredUser";
import SideDrawer from "../chatscomponents/SideDrawer";
import ChatList from "../chatscomponents/ChatList";
import ChatBox from "../chatscomponents/ChatBox";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

const Chat = (props) => {

    const [fetchAgain, setFetchAgain] = useState(false);
    useEffect(() => {
        console.log("chat... useffect",setFetchAgain);
    }, [fetchAgain])

    return <div style={{ width: '100%' }}>
        <RegisteredUser>
            <SideDrawer />
        </RegisteredUser>

        <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="8px">
            <RegisteredUser>
                <ChatList fetchAgain={fetchAgain} />
            </RegisteredUser>
            <RegisteredUser>
                <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            </RegisteredUser>
        </Box>
    </div>
}

export default Chat;
