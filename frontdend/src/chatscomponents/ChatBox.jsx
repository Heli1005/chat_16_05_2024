import { Box, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { authUser } from "../components/Auth/auth";
import SingleChat from "./SingleChat";
 
const ChatBox = (props) => {

    let { selectedChat } = authUser()
    useEffect(()=>{
        console.log("setFetchAgain" );
    },[props.fetchAgain])

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
           <SingleChat fetchAgain={props.fetchAgain} setFetchAgain={props.setFetchAgain} />
        </Box>
    </>;
};

export default ChatBox;
