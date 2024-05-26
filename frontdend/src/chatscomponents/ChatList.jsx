import { Avatar, Box, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import Axios from "axios";
import { Button } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";


import React, { memo, useEffect, useState } from "react";
import { authUser } from "../components/Auth/auth";
import ChatListLoading from "./ChatListLoading";
import { getUserName } from "../config/ChatLogic";

const ChatList = ({ userList, onClose }) => {
    console.log("chat list called...");

    const [loading, setLoading] = useState(false);
    const toast = useToast()
    let { user, chats, setChats, selectedChat, setSelectedChat } = authUser()
    useEffect(() => {

        fetchChats()
    }, [])

    const fetchChats = async () => {
        try {
            setLoading(true)
            let url = 'api/chat'
            let config = {
                headers: {
                    'Content-type': "application/json",
                    'Authorization': `Bearer ${user.token}`
                }
            }
            const { data } = await Axios.get(url, config)
            setChats(data)
            await setLoading(false)
        } catch (error) {
            await toast({
                title: 'Error occured!!!',
                description: `${error.message}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    return <Box
        bg={'white'}
        borderRadius={'lg'}
        w={{ base: '100%', md: '31%' }}
        flexDirection={'column'}
        p={3}
        alignItems={'center'}
        display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
    >
        <Box
            display={'flex'}
            w={'100%'}
            alignItems={'center'}

            fontSize={{ base: "18px", md: '25px' }}
            justifyContent={'space-between'}

        >
            <Text color={'teal.600'}>
                My Chats
            </Text>
            <Button
                variant={'solid'}
                py={1}
                px={2}
                colorScheme="teal"
                fontSize={{ base: '17px', md: '10px', lg: '12px' }}
                rightIcon={<AddIcon />}
            >
                New Group
            </Button>
        </Box>
        <Box
            d="flex"
            flexDir="column"
            py={3}
            px={1}
            bg="#F8F8F8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"

        >
            {
                loading
                    ?
                    (
                        <Stack overflowY={'scroll'} >
                            {


                                chats.map(chat => {
                                    return <Box
                                    onClick={()=>setSelectedChat(chat)}
                                    cursor={'pointer'}
                                    borderRadius={7}
                                    w={'100%'}
                                   px={3}
                                    py={2}
                                        bg={selectedChat._id === chat._id ? 'teal.500' : 'gray.200'}
                                        color={selectedChat._id === chat._id ? 'white' :'teal.600'}
                                    >
                                        <Text>
                                            {
                                                !chat.isGroupChat
                                                ?
                                                getUserName(chat.users)
                                                :
                                                chat.chatName

                                            }
                                        </Text>
                                    </Box>
                                })
                            }
                        </Stack>
                    )
                    :
                    <ChatListLoading />

            }

        </Box>
    </Box>;
};

export default memo(ChatList);
