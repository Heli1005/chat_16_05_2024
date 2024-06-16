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
import "./signlechat.css";
import MessageArea from "./MessageArea";
import io from "socket.io-client";
import Lottie from "react-lottie";
import typinganimation from "../assets/typing.json";




let ENDPOINT = 'http://localhost:5000'
var socket, selectedChatCompare;

const SingleChat = ({ toggleFetchAgain }) => {

    const { selectedChat, setSelectedChat, user } = authUser()
    const toast = useToast()
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [socketConnected, setSocketConnected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isSomeOneTyping, setIsSomeOneTyping] = useState(false);

    let defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: typinganimation,
        renderSettings: {
            preserveAspectRatio: "xMidyMid slice"
        }

    }

    let messageInput = {
        id: 'message',
        placeHolder: 'Type your message here...',
    }

    const handleMessage = (val) => {
        setMessage(val)
        //typing socket
        if (!socketConnected)
            return;

        if (!typing) {
            socket.emit("typing", selectedChat._id)
            setTyping(true)
        }

        let lastTypingTime = new Date().getTime()
        let timerLength = 3000

        setTimeout(() => {
            let nowTime = new Date().getTime()
            let diff = nowTime - lastTypingTime
            if (diff >= timerLength && typing) {
                setTyping(false)
                socket.emit('stop typing', selectedChat._id)
            }
        }, timerLength);
    }

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit("setup", user)
        socket.on("connected", () => setSocketConnected(true))
        socket.on("typing", () => setIsSomeOneTyping(true))
        socket.on("stop typing", () => setIsSomeOneTyping(false))
    }, [])

    useEffect(() => {
        fetchChats()
        selectedChatCompare = selectedChat
    }, [selectedChat])

    useEffect(() => {
        socket.on('new-message-received', (newmsg) => {

            console.log("newmsg", selectedChatCompare, newmsg);

            //notification
            if (!selectedChatCompare || selectedChatCompare._id !== newmsg.chat._id) {
                console.log('if');
            } else {
                console.log("el");
                setMessages([...messages, newmsg])
            }
            // message append
        })
    })

    const fetchChats = async () => {
        setLoading(true)
        if (selectedChat) {

            try {
                let url = `api/message/${selectedChat._id}`
                let config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }

                let { data } = await Axios.get(url, config)
                setMessages(data)
                socket.emit('join-chat', selectedChat._id)
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
                socket.emit("new-message", data)
                socket.emit("stop typing",selectedChat._id)
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
                                    <Box className="message" h={'100%'} maxH={'90%'} p={0} overflowY={'scroll'} >
                                        <MessageArea messages={messages} />
                                        {
                                            isSomeOneTyping
                                                ?
                                                <Box as="div" display={'flex'} mb={0} ml={3} justifyContent={'start'}  >
                                                    <Lottie
                                                        options={defaultOptions}
                                                        width={70}
                                                        style={{
                                                            marginLeft: '10px',
                                                            
                                                        }}
                                                    />
                                                </Box>
                                                :
                                                <></>
                                        } 
                                    </Box>
                            } 
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
