import React from "react";

// Chakra imports
import {
  Icon,
  Flex,
  useDisclosure,
  useColorModeValue,
  Button,
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Grid,
  SimpleGrid,
  Select
} from "@chakra-ui/react";

import {BiBookAdd} from "react-icons/bi";
import { useState } from "react";

export default function Banner(props) {
  const {addBook, ...rest } = props;
  const iconColor = useColorModeValue("brand.500", "white");

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  // Ellipsis modals
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [localizador, setLocalizador] = useState('')
  const [fechaAlta, setFechaAlta] = useState('')
  const [fechaEntrada, setFechaEntrada] = useState('')
  const [fechaSalida, setFechaSalida] = useState('')
  const [estado, setEstado] = useState('pendiente')
  const [adultos, setAdultos] = useState('')
  const [ninos, setNinos] = useState('')
  const [bebes, setBebes] = useState('')
  const [alojamiento, setAlojamiento] = useState('')
  const [precio, setPrecio] = useState('')

  return (
    <>
     {addBook && <Flex
        align='center'
        justifyContent='end'
        w='100%'
        h='100%'
        {...rest}>
          <Button 
            borderRadius='10px'
            lineHeight='100%'
            align='center'
            justify='center'
            onClick={onOpen}
            color={iconColor}
            ref={finalRef}
            >
            <Icon as={BiBookAdd} color={iconColor} w='24px' h='24px' marginRight={2} />
            
            Añadir reserva
          </Button>
          <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          size="xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Nueva reserva</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Grid gap={6}>
                <SimpleGrid columns={2} spacing={2}>
                  <FormControl>
                    <FormLabel>Localizador</FormLabel>
                    <Input ref={initialRef} placeholder='Localizador' />
                  </FormControl>
                    <FormControl>
                      <FormLabel>Fecha alta</FormLabel>
                      <Input type="date" placeholder='Fecha alta' />
                    </FormControl>
                </SimpleGrid>

                <SimpleGrid columns={2} spacing={2}>
                  <FormControl>
                    <FormLabel>Fecha entrada</FormLabel>
                    <Input type="date" placeholder='Fecha entrada' />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Fecha salida</FormLabel>
                    <Input type="date" placeholder='Fecha salida' />
                  </FormControl>
                </SimpleGrid>
                <SimpleGrid columns={1} spacing={2}>
                  <FormControl>
                    <FormLabel>Estado</FormLabel>
                    <Select onChange={(e) => setEstado(e.target.value)}
                    bg={
                      estado === "confirmada"
                        ? "green.500"
                        : estado=== "pendiente"
                        ? "orange.500"
                        : null
                    } 
                    >
                      <option value='pendiente'>Pendiente</option>
                      <option value='confirmada'>Confirmada</option>
                    </Select>
                  </FormControl>
                </SimpleGrid>
                <SimpleGrid columns={3} spacing={2}>
                  <FormControl>
                    <FormLabel>Adultos</FormLabel>
                    <Input type="number" min={0} placeholder='Adultos' />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Niños</FormLabel>
                    <Input type="number" min={0} placeholder='Niños' />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Bebés</FormLabel>
                    <Input type="number" min={0} placeholder='Bebés' />
                  </FormControl>
                </SimpleGrid>
                <SimpleGrid columns={2} spacing={2}>
                  <FormControl>
                    <FormLabel>Alojamiento</FormLabel>
                    <Input placeholder='Alojamiento' />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Precio</FormLabel>
                    <Input type="number" min={0} placeholder='Precio' />
                  </FormControl>
                </SimpleGrid>
              </Grid>
            </ModalBody>
  
            <ModalFooter>
              <Button onClick={onClose} mr={3}>Cancelar</Button>
              <Button colorScheme='blue'>
                Guardar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>}
    </>
  );
}
