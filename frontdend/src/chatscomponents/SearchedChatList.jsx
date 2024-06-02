import { Avatar, Box, Spinner, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { authUser } from "../components/Auth/auth";
import  Axios  from "axios";
import SingleSearchUserUI from "./SingleSearchUserUI";

const SearchedChatList = ({ userList, onClose }) => {

    const [loading, setLoading] = useState(false);
    const toast = useToast()
    let { user, chats, setChats, selectedChat, setSelectedChat } = authUser()

    const accessChat = async (userId) => {
        try {
            setLoading(true)
            let url = 'api/chat'
            let reqBody = {
                userId
            }
            let config = {
                headers: {
                    'Content-type': "application/json",
                    'Authorization': `Bearer ${user.token}`
                }
            }
            const { data } = await Axios.post(url, reqBody, config)
            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            await setSelectedChat(data)
            await onClose()
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

    return <div>
        {
            userList?.map(user => {
                return <SingleSearchUserUI handleClick={accessChat} key={user._id} user={user} />
            })
        }
        <>
            {
                loading
                    ?
                    <Spinner color='teal.500' />
                    :
                    <></>
            }
        </>
    </div>;
};

export default SearchedChatList;
