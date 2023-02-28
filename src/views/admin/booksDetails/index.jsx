import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { FormBookins } from './components/FormBookins';

export const BooksDetails = () => {
    const bg = useColorModeValue("white", "#1B254B");

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'  bg={bg}>
            <FormBookins />
        </SimpleGrid>
    </Box>  
    )
}
