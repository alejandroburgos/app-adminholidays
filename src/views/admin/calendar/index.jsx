import React, {useEffect, useState} from 'react'
import { Box, IconButton, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import BigCalendar from './components/BigCalendar';
import { constants } from 'Constants';
import { BsCalendar2RangeFill, BsCalendar4 } from 'react-icons/bs';
import { Year } from './components/Year';

export const CalendarBooks = () => {
    const brandColor = useColorModeValue("brand.500", "white");
    const [events, setEvents] = useState([{}]);
    const [books, setBooks] = useState([])
    const [fullCalendar, setFullCalendar] = useState(false)

    // get session storage
    const session = JSON.parse(sessionStorage.getItem('login-user'))
    const getBooks = async () => {
      const response = await fetch(`${constants.urlLocal}books/${session.user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setBooks(json);
  
    };
    useEffect(() => {
      getBooks();
    }, []);
    useEffect(() => { 
      const eventsParse = books && books.map((item) => {
          const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
          return {
            _id: item._id,
            localizador: item.localizador,
            nombre_viajero: item.nombre_viajero,
            randomColor: randomColor,
            start: item.fecha_entrada ? new Date(item.fecha_entrada) : null ,
            end: item.fecha_salida ? new Date(item.fecha_salida) : null,
            title: " ",
            color: item.estado === "confirmada"
                ? " #01b574"
                : item.estado=== "pendiente"
                ? "#ffb547"
                : null,
          };
        });
        setEvents(eventsParse);
      }, [books]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
          <div className="d-flex justify-content-between"> 
            <IconButton aria-label='Search database' icon={<BsCalendar2RangeFill />} onClick={() => setFullCalendar(true)} />
            <IconButton aria-label='Search database' icon={<BsCalendar4 />} onClick={() => setFullCalendar(false)} />
          </div>
            {fullCalendar ? <BigCalendar h='100%' minW='100%' events={events} /> : 
            <Year events={events} />}
        </SimpleGrid>
    </Box>
  )
}
