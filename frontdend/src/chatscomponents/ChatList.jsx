import { Box, Stack, Text, useToast } from "@chakra-ui/react";
import Axios from "axios";
import { Button } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import React, { memo, useEffect, useState } from "react";
import { authUser } from "../components/Auth/auth";
import ChatListLoading from "./ChatListLoading";
import GroupChatModal from "./GroupChatModal";
import SingleChatUI from "./SingleChatNameUI";

const ChatList = () => {

    const [loading, setLoading] = useState(false);
    const toast = useToast()
    let { user, chats, setChats, selectedChat, setSelectedChat } = authUser()

    useEffect(() => {
        fetchChats()
    }, [])

    const fetchChats = async () => {
        try {
            await setLoading(true)
            let url = 'api/chat'
            let config = {
                headers: {
                    'Content-type': "application/json",
                    'Authorization': `Bearer ${user.token}`
                }
            }
            const { data } = await Axios.get(url, config)

            await setChats(data)
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
        borderRadius={2}
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
            <GroupChatModal>
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
            </GroupChatModal>
        </Box>
        <Box
            d="flex"
            flexDir="column"
            py={3}
            px={1}
            mt={2}
            bg="#F8F8F8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
        >
            {
                (!loading)
                    ?
                    chats?.length > 0
                        ?
                        (
                            <Stack overflowY={'scroll'} >
                                {
                                    chats.map(user => {
                                        return <SingleChatUI key={user._id} user={user} />
                                    })
                                }
                            </Stack>
                        )
                        :
                        <Box display={'flex'} alignItems={'center'}>
                            <Text color={'teal.600'} textAlign={'center'}  >No chats Exist</Text>
                        </Box>
                    :
                    <ChatListLoading />
            }
        </Box>
    </Box>
}

export default memo(ChatList)
