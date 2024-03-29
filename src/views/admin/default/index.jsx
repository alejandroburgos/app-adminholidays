

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
import { constants } from "Constants";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const redColor = useColorModeValue("red.500", "red.400");
  const grayColor = useColorModeValue("gray.500", "gray.400");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [events, setEvents] = useState([{}]);
  const [books, setBooks] = useState([])
  const [sumOfAllBooks, setSumOfAllBooks] = useState()

  const [year, setYear] = useState(new Date())
  const [clientsPerYear, setClientsPerYear] = useState([])


  const session = JSON.parse(sessionStorage.getItem('login-user'))

  const getBooks = async () => {
    const response = await fetch(`${constants.urlLocal}books/${session.user}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setBooks(json);
    getSumOfAllBooks()
    getBooksPerYear()
  };

  const getSumOfAllBooks =  () => {
    // sum if status is confirmed and year is the same
    const sum = books.reduce((acc, item) => {
      if (item.estado === "confirmada" && new Date(year).getFullYear() === new Date(item.fecha_entrada).getFullYear()) {      
        return acc + item.precio
      } else {
        return acc 
      }
    }, 0)
    setSumOfAllBooks(sum)
  }

  // books per years
  const getBooksPerYear = () => {
    const booksPerYear = books.reduce((acc, item) => {
      if (item.estado === "confirmada") {
        const year = new Date(item.fecha_entrada).getFullYear()
        if (acc[year]) {
          acc[year] = acc[year] + 1
        } else {
          acc[year] = 1
        }
      }
      return acc
    }, {})
    setClientsPerYear(booksPerYear)
  }


  useEffect(() => {
    getSumOfAllBooks()
    getBooksPerYear()
  }, [books, year])
  
  
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
          value={sumOfAllBooks + ' €'}
        />
        {/* <MiniStatistics
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
          value={sumOfAllBooks + ' €'}
        /> */}
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
          value={clientsPerYear[moment(year).format('YYYY')]}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        {/* <TotalSpent /> */}
        <WeeklyRevenue year={year} setYear={setYear}/>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
          <MiniCalendar h='100%' minW="100%" events={events} />
        </SimpleGrid>  
      </SimpleGrid>
      <Grid mb='20px'>
        <GridItem >
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={tableDataComplex}
            addBook={false}
          />
        </GridItem>
      </Grid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
      </SimpleGrid>
    </Box>
  );
}
