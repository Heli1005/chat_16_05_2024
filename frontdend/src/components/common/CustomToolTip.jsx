import { Text, Tooltip } from "@chakra-ui/react";
import React from "react";

const CustomToolTip = ({title, children}) => {

    console.log("children", children);
    
    
  return <>
      <Tooltip label={title}>
          <>{children}</>
      </Tooltip>
  </>;
};

export default CustomToolTip;
