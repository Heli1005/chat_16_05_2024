import React, { useEffect } from "react";
import Axios from "axios";
import { authUser } from "./Auth/auth";
import RegisteredUser from "../chatscomponents/RegisteredUser";
import SideDrawer from "../chatscomponents/SideDrawer";
import ChatList from "../chatscomponents/ChatList";
import ChatBox from "../chatscomponents/ChatBox";
import { Box, Container, Text } from "@chakra-ui/react";

const Chat = (props) => {

    return <div style={{ width: '100%' }}>
        <RegisteredUser>
            <SideDrawer />
        </RegisteredUser>
        
        <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="8px">

            <RegisteredUser>
                <ChatList />
            </RegisteredUser>
            <RegisteredUser>
                <ChatBox />
            </RegisteredUser>
        </Box>

    </div>;
};

export default Chat;
