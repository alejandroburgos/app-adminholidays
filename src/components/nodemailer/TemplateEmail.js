import { Flex, Avatar, Box, Heading, Text, IconButton, CardBody, Image, CardFooter, Button } from '@chakra-ui/react'
import Card from 'components/card/Card'
import React from 'react'
import { BiLike } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'

export const TemplateEmail = ({name}) => {
  return (
    <>
        <h1>Recordatorio reserva </h1>
        <Card maxW='md'>
            <div>
                <Flex spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Avatar name='Sawer' />

                    <Box>
                    <Heading size='sm'>{name}</Heading>
                        <Text>Recordatorio de reserva</Text>
                    </Box>
                </Flex>
                <IconButton
                    variant='ghost'
                    colorScheme='gray'
                    aria-label='See menu'
                    icon={<BsThreeDotsVertical />}
                />
                </Flex>
            </div>
            <div>
                <Text>
                {`Queremos recordarle que tienes una reserva para el dia 10/04/2023 a las 10:00 hs. 
                Por favor, no olvides contactar al cliente para confirmar la hora de llegada. `}

                </Text>
            </div>
            <Image
                objectFit='cover'
                src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                alt='Chakra UI'
            />

            <div
                justify='space-between'
                flexWrap='wrap'
                sx={{
                '& > button': {
                    minW: '136px',
                },
                }}
            >
                <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                Like
                </Button>
                <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                Comment
                </Button>
                <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                Share
                </Button>
            </div>
            </Card>
    </>
  )
}
