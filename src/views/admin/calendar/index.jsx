import React, {useEffect, useState} from 'react'
import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import MiniCalendar from 'components/calendar/MiniCalendar'
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import BigCalendar from './components/BigCalendar';
import { constants } from 'Constants';

export const CalendarBooks = () => {
    const brandColor = useColorModeValue("brand.500", "white");
    const [events, setEvents] = useState([{}]);
    const [books, setBooks] = useState([])

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
          return {
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
            <BigCalendar h='100%' minW='100%' events={events} />
        </SimpleGrid>
    </Box>
  )
}
