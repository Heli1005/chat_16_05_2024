import { FormControl, Input } from "@chakra-ui/react";
import React from "react";

const SearchBoxInput = ({ value, field, handleChange }) => {

    return <>
        <FormControl>
            <Input
                id={field.id}
                type={field.type || 'text'}
                bg={'white'}
                disabled={field.disabled || false}
                h={'46px'}
                shadow={'3px 3px 7px gray'}
                name={field.id}
                onChange={(e) => handleChange(e.target.value)}
                value={value || ''}
                my={2}
                placeholder={`Enter ${field.label}`}
            />
        </FormControl>
    </>
};

export default SearchBoxInput;
