import {
  Flex,
  Table,
  Progress,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import moment from "moment";
// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import { constants } from "Constants";
import { useState } from "react";

export default function ColumnsTable(props) {
  const { columnsData, tableData, addBook } = props;
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const [books, setBooks] = useState([])

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const session = JSON.parse(sessionStorage.getItem('login-user'))

  // get all books
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

  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='10px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          Reservas
        </Text>
        <Menu addBook={addBook} setBooks={setBooks} />
      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px' size="sm">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {books && books.map((row, index) => {
            return (
              <Tr key={index}>
                <Td color={textColor} fontSize='sm'>
                  {row.localizador}
                </Td>
                <Td color={textColor} fontSize='sm'>
                  {moment(row.fecha_alta).format("DD/MM/YYYY")}
                </Td>
                <Td color={textColor} fontSize='sm'>
                {moment(row.fecha_entrada).format("DD/MM/YYYY")}
                </Td>
                <Td color={textColor} fontSize='sm'>
                  {moment(row.fecha_salida).format("DD/MM/YYYY")}
                </Td>
                <Td color={textColor} fontSize='sm'>
                <Flex align='center'>
                  <Icon
                    w='24px'
                    h='24px'
                    me='5px'
                    color={
                      row.estado === "confirmada"
                        ? "green.500"
                        : row.estado === "cancelada"
                        ? "red.500"
                        : row.estado === "pendiente"
                        ? "orange.500"
                        : null
                    }
                    as={
                      row.estado === "confirmada"
                        ? MdCheckCircle
                        : row.estado === "cancelada"
                        ? MdCancel
                        : row.estado === "pendiente"
                        ? MdOutlineError
                        : null
                    }
                  />
                    {row.estado}
                  </Flex>
                </Td>
                <Td color={textColor} fontSize='sm'>
                  {row.adultos}
                </Td>
                <Td color={textColor} fontSize='sm'>
                  {row.ninos}
                </Td>
                <Td color={textColor} fontSize='sm'>
                  {row.bebes}
                </Td>
                <Td color={textColor} fontSize='sm' >
                  {row.alojamiento}
                </Td>
                <Td color={textColor} fontSize='sm' >
                  {row.precio} €
                </Td>
              </Tr>
            );
          })}

        </Tbody>
      </Table>
    </Card>
  );
}