import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const ChatListLoading = (props) => {

    return <Stack mt={4}>
        {
            [...Array(10)].map((_, index) => <Skeleton key={index} borderRadius={7} height='50px' />)
        }
    </Stack>;
};

export default ChatListLoading;
