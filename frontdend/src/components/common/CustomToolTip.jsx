import {  Tooltip } from "@chakra-ui/react";
import React from "react";

const CustomToolTip = ({ title, children }) => {

    return <>
        <Tooltip placement={'top-end'} hasArrow label={title} bg='teal.600' color='white' p={3} borderRadius={5}>
            {children}
        </Tooltip>
    </>;
};

export default CustomToolTip;
