import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { authUser } from "../components/Auth/auth";
import { getUserName } from "../config/ChatLogic";

const SingleChatUI = ({ user }) => {
    // console.log("user--", getUserName(user.users));
    
    
    let {  chats, setChats, selectedChat, setSelectedChat } = authUser()

    return <>
        <Box
            onClick={() => setSelectedChat(user)}
            cursor={'pointer'}
            borderRadius={7}
            w={'100%'}
            px={3}
          
            py={2}
            bg={(selectedChat?._id === user._id) ? 'teal.500' : 'gray.200'}
            color={(selectedChat?._id === user._id) ? 'white' : 'teal.600'}
        >
            <Text casing={'capitalize'} >
                
                {
                    !user.isGroupChat
                        ?
                        getUserName(user.users)
                        :
                        user.chatName
                }
            </Text>
        </Box>
    </>
}

export default SingleChatUI;
