

// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
import Es from "assets/img/dashboards/es.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, {useEffect, useState} from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import { FaHouseUser } from "react-icons/fa";
import { AiTwotoneCalendar } from "react-icons/ai";
import moment from "moment";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const redColor = useColorModeValue("red.500", "red.400");
  const grayColor = useColorModeValue("gray.500", "gray.400");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [events, setEvents] = useState([{}]);
  // set columnsDataComplex into events
  useEffect(() => {

    const events = tableDataComplex.map((item) => {
      console.log(item.estado)
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
    console.log(events)
    setEvents(events);
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }
            />
          }
          name='Ganancias anuales'
          value='350,00€'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdAttachMoney} color={redColor} />
              }
            />
          }
          name='Gastos anuales'
          value='100,00€'
        />
        {/* <MiniStatistics growth='+23%' name='Sales' value='$574.34' /> */}

        {/* <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
            />
          }
          name='New Tasks'
          value='154'
        /> */}
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={FaHouseUser} color={grayColor} />
              }
            />
          }
          name='Clientes totales'
          value='10'
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
        {/* <TotalSpent /> */}
        <WeeklyRevenue />
      </SimpleGrid>
      <Grid templateColumns='repeat(5, 1fr)' gap={4}>
        <GridItem colSpan={4}>
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={tableDataComplex}
            addBook={false}
          />
        </GridItem>
        <GridItem colSpan={1} >
          <MiniCalendar h='100%' minW='100%' events={events} />
        </GridItem>
          {/* <PieCard /> */}
      </Grid>
      {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px'>
          <DailyTraffic />
        </SimpleGrid>
      </SimpleGrid> */}
    </Box>
  );
}
