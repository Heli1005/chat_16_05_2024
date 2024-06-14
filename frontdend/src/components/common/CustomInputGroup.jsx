import { Button, FormControl, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";

const CustomInputGroup = ({ value, field, handleChange, onClick, loading, icon }) => {
    return <>

        <FormControl onKeyDown={(e)=>{
            if (icon && e.key ==='Enter'){
                onClick(e) 
            }
        }}>
            <InputGroup size='md' display={'flex'} alignItems={'center'}>
                <Input
                    id={field.id}
                    type={field.type || 'text'}
                    bg={'white'}
                    disabled={field.disabled || false}
                    h={'46px'}
                    shadow={'3px 3px 7px gray'}
                    name={field.id}
                    // focusBorderColor={''}
                    _focus={{
                        // border:'none',
                        borderWidth:'5',
                        borderColor:'white'
                    }}
                    // _focusWithin={}

                    onChange={(e) => handleChange(e.target.value)}
                    value={value || ''}
                    my={2}
                    placeholder={field.placeHolder ? field.placeHolder : `Enter ${field.label}`}
                />
                {
                    icon ?

                        <InputRightElement h={'46px'} w={''} mt={2} mx={1} alignSelf={'center'} onClick={onClick} display={'flex'} >
                            {icon}
                        </InputRightElement>
                        :
                        <InputRightElement h={'46px'} w={'100px'} my={2} mx={1} display={'flex'} >

                            <Button isLoading={loading} w={'100px'} bg={'teal.500'} _hover={{ bg: 'teal.700', mt: "1px" }} color={"white"} size='md' onClick={onClick}>
                                Update
                            </Button>
                        </InputRightElement>
                }
            </InputGroup>
        </FormControl>
    </>;
};

export default CustomInputGroup;
