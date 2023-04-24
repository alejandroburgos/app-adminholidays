// Chakra imports
import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import { constants } from "Constants";
import React from "react";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

export default function AddInformation(props) {
  const { session,setProperties, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const bg = useColorModeValue("white", "navy.700");

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState('')

  // post property
  const addProperty = async () => {
    try {
      const response = await fetch(`${constants.urlLocal}property/${session.user}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
        }),
      });
      const data = await response.json();
      setProperties(data.data);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  


  return (
    <Card bg={bg} {...rest}>
      <Box style={{textAlign: 'center', margin: 'auto'}}>
        <Button colorScheme="blue" size="xl" variant="ghost" onClick={
          onOpen
        } >
          Añadir Propiedad
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Añadir Propiedad</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="first-name" isRequired>
                <FormLabel>Nombre de la propiedad</FormLabel>
                <Input placeholder="Nombre de la propiedad"
                onChange={
                  (e) => {
                    setName(e.target.value)
                  }
                } />
              </FormControl>
              </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={addProperty}>
                Guardar
              </Button>
              <Button variant="ghost" onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Card>
  );
}
