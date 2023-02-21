import React, {useEffect, useState} from 'react'
import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import MiniCalendar from 'components/calendar/MiniCalendar'
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import BigCalendar from './components/BigCalendar';

export const CalendarBooks = () => {
    const brandColor = useColorModeValue("brand.500", "white");
    const [events, setEvents] = useState([{}]);

    useEffect(() => {
        const events = tableDataComplex.map((item) => {
          return {
            start: new Date(item.fechaEntrada),
            end: new Date(item.fechaSalida),
            title: " ",
            color: item.estado === "Confirmada"
                ? " #01b574"
                : item.estado=== "Prereserva"
                ? "#ffb547"
                : null,
          };
        });
        setEvents(events);
      }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
            <BigCalendar h='100%' minW='100%' events={events} />
        </SimpleGrid>
    </Box>
  )
}
