import { CloseIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const UserBadge = ({ user, handleDelete }) => {
    return <>
        <Box
            px={3}
            m={1}
            py={1}
            bg={'purple'}
            color={'white'}
            display={'flex'}
            fontSize={12}
            alignItems={'center'}
            borderRadius={'9px'}
        >
            <Text>{user.name}</Text>
            <CloseIcon onClick={()=>handleDelete(user._id)} pl={1} />
        </Box>
    </>;
};

export default UserBadge;
