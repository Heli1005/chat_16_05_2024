import React, { useEffect } from "react";
import { authUser } from "../components/Auth/auth";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ViewIcon } from "@chakra-ui/icons";
import { getUserFullDetail, getUserName } from "../config/ChatLogic";
import ProfileModal from "./ProfileModal";
import GroupChatProfileModal from "./GroupChatProfileModal";


const SingleChat = ({fetchAgain, setFetchAgain}) => {
    const { selectedChat, setSelectedChat } = authUser()
    console.log("fetchAgain", fetchAgain);
    
    useEffect(()=>{
        console.log("user signle chat");
    },[fetchAgain])

    return <>
        {
            selectedChat
                ?
                <>
                    <Box
                        display={'flex'}
                        w={'100%'}
                        p={3}
                        justifyContent={'space-between'}
                    >
                        <IconButton
                            display={{ base: 'flex', md: 'none' }}
                            onClick={() => setSelectedChat(null)}
                            icon={<ArrowBackIcon />}
                        />
                        <Text
                            color={'teal.500'}
                            fontSize={{ base: '28px', md: '30px' }}
                            fontWeight={'600'}
                            fontFamily={'sans-serif'}
                            casing={'capitalize'}
                        >
                            {
                                selectedChat?.isGroupChat
                                    ?
                                    selectedChat?.chatName
                                    :
                                    <>
                                        {getUserName(selectedChat.users)}
                                    </>
                            }
                        </Text>
                        {
                            selectedChat?.isGroupChat
                            ?
                                <GroupChatProfileModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} user={ selectedChat.users} >
                                    <IconButton
                                        display={{ base: 'flex' }}
                                        icon={<ViewIcon />}
                                    />
                                </GroupChatProfileModal>
                            :

                        <ProfileModal user={selectedChat?.isGroupChat ? selectedChat.users : getUserFullDetail(selectedChat.users)}>
                            <IconButton
                                display={{ base: 'flex' }}
                                icon={<ViewIcon />}
                                />
                        </ProfileModal>
                            }
                    </Box>
                </>
                :
                <Text
                    w={'100%'}
                    display={'flex'}
                    justifyContent={'center'}
                    color={'teal.500'}
                    fontWeight={'600'}
                    h={'100%'}
                    alignItems={'center'}
                    fontSize={'20px'}
                >
                    Click on user to start chatting
                </Text>
        }

    </>;
};

export default SingleChat;
