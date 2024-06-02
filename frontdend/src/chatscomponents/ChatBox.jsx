import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { authUser } from "../components/Auth/auth";

const ChatBox = (props) => {

    let { selectedChat } = authUser()

    return <>
        <Box
            display={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
             alignItems={'center'}
             flexDir={'column'}
             w={{base:'100%',md:'68%'}}
             borderRadius={2}
             borderWidth={1}
            bg={'white'}
        >
            <Text>
                Single chat
            </Text>
        </Box>
    </>;
};

export default ChatBox;
