// Chakra imports
import { Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";

export default function Information(props) {
  const { title, value,id, deleteProperty, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const bg = useColorModeValue("white", "navy.700");

  return (
    <Card bg={bg} {...rest}>
      <Box>
        <Text fontWeight='500' color={textColorSecondary} fontSize='sm'>
          {title}
        </Text>
        <Text color={textColorPrimary} fontWeight='500' fontSize='md'>
          {value}

          <MdDeleteOutline style={{float: 'right', cursor: 'pointer'}} 
            onClick={() => {
              deleteProperty(id);
            }}
            />
        </Text>
      </Box>
    </Card>
  );
}
