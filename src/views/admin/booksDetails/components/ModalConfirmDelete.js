import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import moment from 'moment'
export const ModalConfirmDelete = ({openDelete, cancelDelete, book, deleteBook}) => {

  return (
    <>
      <Modal isOpen={openDelete} onClose={cancelDelete}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Eliminar reserva {book.localizador}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                ¿Estas seguro de eliminar la reserva {book.localizador} con fecha de entrada { ' ' }
                <b>
                    {moment(book.fechaEntrada).format('DD/MM/YYYY')} { ' ' }
                </b>
                y fecha de salida { ' ' }
                <b>
                    {moment(book.fechaSalida).format('DD/MM/YYYY')} 
                </b>
                ?
            </ModalBody>

            <ModalFooter>
                <Button 
                    colorScheme="brand"
                    variant="outline" 
                    mr={3} 
                    onClick={cancelDelete}>
                    Cancelar
                </Button>
                <Button 
                    colorScheme="red" 
                    onClick={
                        () => {
                            deleteBook(book._id)
                            cancelDelete()
                        }
                    }>Eliminar</Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
