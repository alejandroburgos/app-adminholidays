import { Box, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import {
    columnsDataComplex,
  } from "views/admin/default/variables/columnsData";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import ComplexTable from "views/admin/default/components/ComplexTable";
import { useHistory } from 'react-router-dom';

export const Books = () => {
  const history = useHistory();
  console.log(history)
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
            <ComplexTable 
                columnsData={columnsDataComplex}
                tableData={tableDataComplex}
                addBook={true}
            />
      </SimpleGrid>
    </Box>
  )
}
