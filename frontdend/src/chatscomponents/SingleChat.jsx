import React, { useEffect, useState } from "react";
import { authUser } from "../components/Auth/auth";
import { Box, FormControl, IconButton, Spinner, Text, Tooltip, useToast } from "@chakra-ui/react";
import { ArrowBackIcon, ViewIcon } from "@chakra-ui/icons";
import { getUserFullDetail, getUserName } from "../config/ChatLogic";
import ProfileModal from "./ProfileModal";
import GroupChatProfileModal from "./GroupChatProfileModal";
import CustomInuputWithForm from "../components/common/CustomInuputWithOutForm";
import CustomInputGroup from "../components/common/CustomInputGroup";
import Axios from "axios";
import   "./signlechat.css";
import MessageArea from "./MessageArea";


const SingleChat = ({ toggleFetchAgain }) => {

    const { selectedChat, setSelectedChat, user } = authUser()
    const toast = useToast()
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);


    let messageInput = {
        id: 'message',
        placeHolder: 'Type your message here...',

    }

    const handleMessage = (val) => {
        setMessage(val)
    }

    useEffect(() => {
        fetchChats()
    }, [selectedChat])

    const fetchChats = async () => {
        setLoading(true)
        if (selectedChat){

        try {
            let url = `api/message/${selectedChat._id}`
            let config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }

            let { data } = await Axios.get(url, config)
            setMessages(data)
        } catch (error) {
            await toast({
                title: error.message,
                description: "Failed to load search result4",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        setLoading(false)
    }
    }


    const submitMessage = async () => {

        setMessage('')
        try {
            if (message) { 

                let url = `api/message`
                let req = {
                    content: message,
                    chatId: selectedChat._id
                }
                let config = {
                    headers: {
                        'Content-type': "application/json",
                        Authorization: `Bearer ${user.token}`
                    }
                }

                let { data } = await Axios.post(url, req, config)
                setMessages([...messages, data])
            }
        } catch (error) {
            await toast({
                title: error.message,
                description: "Failed to load search result",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        setLoading(false)
    }

    return <>
        {
            selectedChat
                ?
                <>
                    <Box
                        display={'flex'}
                        w={'100%'}
                        px={3}
                        py={2}
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
                            fontWeight={'500'}
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
                                <GroupChatProfileModal toggleFetchAgain={toggleFetchAgain} user={selectedChat.users} >
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
                    <Box
                        h={'80vh'}
                        w={'100%'}
                        px={3}
                        pt={0}
                        pb={2}
                        d="flex"
                        flexDir="column"
                        justifyContent="flex-end"
                    >
                        <Box
                            bg={'gray.200'}
                            borderRadius={'7px'}
                            h={'100%'}
                            p={2}
                            d="flex"
                            flexDir="column"
                            justifyContent="flex-end"
                        >
                            {
                                loading
                                    ?
                                    <Box
                                        w={'100%'}
                                        h={'90%'}
                                        display={'flex'}
                                    >
                                        <Spinner size="xl"
                                            w={20}
                                            color="teal.500"
                                            h={20}
                                            fontWeight={800}
                                            alignSelf="center"
                                            margin="auto" />
                                    </Box>
                                    :
                                        
                                    <Box className="message" h={'100%'}  maxH={'90%'}  overflowY={'scroll'} >
                                        <MessageArea messages={messages} />
                                    </Box>
                            }

                            {/* messages */}
                            <CustomInputGroup value={message} onClick={submitMessage} loading={loading}
                                icon={
                                    <IconButton aria-label='Add to friends' _hover={{ bg: 'teal.500' }} color={'white'} bg={'teal.500'}
                                        icon={
                                            <Tooltip label="Send" bg={'teal.500'} m={2} px={2} py={2} borderRadius={7} _hover={{ bg: 'teal.500', fontsize: "30px" }} hasArrow placement="bottom">
                                                <span className="material-symbols-outlined"   >
                                                    near_me
                                                </span>
                                            </Tooltip>
                                        }
                                    />
                                } handleChange={handleMessage} field={messageInput} />
                        </Box>
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
