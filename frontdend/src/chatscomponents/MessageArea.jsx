import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isSameUser, lastMessage } from "../config/ChatLogic";
import { Avatar, Box, Text } from "@chakra-ui/react";
import { authUser } from "../components/Auth/auth";

const MessageArea = ({ messages }) => {
    const { user } = authUser()
    return <>
        <ScrollableFeed style={{paddingBottom:'0'}}>
            {
                messages &&
                messages?.map((msg, i) => {
                    let loggedInUser = msg?.sender._id === user._id
                    return <Box key={msg._id} as="div" w={'100%'} display={'flex'} alignItems={'center'} >
                        {
                            (
                                (isSameUser(messages, msg, i)) || (lastMessage(messages, msg, i))
                            ) ?
                                <Avatar size={'sm'} boxShadow={'1px 1px 1px gray'} border={'0.5px solid white'} cursor={"pointer"} name={msg?.sender?.name} src={msg?.sender?.profile} />
                                :
                                <Text as={'span'} w={'30px'}></Text>
                        }
                        <Text
                            as={'span'}
                            w={'auto'}
                            bg={loggedInUser ? "#BEE3F8" : "#b9f5d07d"}
                            // bgGradient='linear(to-r, gray.100, teal.700)'
                            // bgGradient={[
                            //     'linear(to-tr, teal.300, white.400)',
                            //     'linear(to-t, teal.200, teal.500)',
                            //     'linear(to-b, teal.100, teal.600)',
                            // ]}
                            px={2.5}
                            py={2.5}
                            fontSize={'15px'}
                            mx={2}
                            mb={(isSameUser(messages, msg, i)) ? 3.5 : 1.5}
                            ml={loggedInUser ? 'auto' : ''}
                            borderRadius={'12px'}
                            fontWeight={'350'}
                            border='1px solid white'
                            boxShadow={loggedInUser ? '2px 4px 3px gray' : '-2px 4px 3px gray'}
                            maxW={'75%'}
                            borderEndEndRadius={loggedInUser ? '0' : '12px'}
                            borderEndStartRadius={!loggedInUser ? '0' : '12px'}
                        > {msg.content} </Text>
                    </Box>
                })
            }
        </ScrollableFeed>
    </>;
};

export default MessageArea;
