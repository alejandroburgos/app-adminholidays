// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import BarChart from "components/charts/BarChart";
import React, { useState, useEffect} from "react";
import moment from "moment";

import { MdBarChart } from "react-icons/md";
import { constants } from "Constants";
import DatePicker from "react-multi-date-picker";

export default function WeeklyRevenue(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  const [dataTable, setDataTable] = useState([]);
  const [monthPrices, setMonthPrices] = useState()
  const [year, setYear] = useState(moment().format("YYYY"))
  const session = JSON.parse(sessionStorage.getItem("login-user"));

  const getDataOfMonthsByYear = async () => {
    setMonthPrices([])

    const response = await fetch(`${constants.urlLocal}month/${session.user}/${year}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    // clear monthPrices
    if (json.ok){
      const prices = json.month.map((data) => { return data.price; })
      setMonthPrices(prices)
    } else {
      console.log("error")
    }
    console.log(monthPrices)
    setDataTable(json);

  };
  useEffect(() => {
    getDataOfMonthsByYear();
  }, [year]);

  // get array of all days of this month
  function getDaysArrayByMonth() {
    var daysInMonth = moment().daysInMonth();
    var arrDays = [];
  
    while(daysInMonth) {
      var current = moment().date(daysInMonth);
      arrDays.push(current);
      daysInMonth--;
    }
  
    return arrDays;
  }

  const days = getDaysArrayByMonth().map((day) => day.format("DD"));
  // sort days in ascending order
  days.sort((a, b) => a - b);

  const data2 = [];
  for (let i = 0; i < 12; i++) {
    data2.push(Math.floor(Math.random() * 500));
  }

  const barChartDataConsumption = [
    {
      name: "GANANCIAS NETAS",
      data: monthPrices,
    },
    {
      name: "GASTOS NETOS",
      data: data2,
    },
  ];
  
   const barChartOptionsConsumption = {
    chart: {
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
      theme: "dark",
    },
    xaxis: {
      categories: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],      
      show: false,
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      color: "black",
      labels: {
        show: false,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
    },
  
    grid: {
      borderColor: "rgba(163, 174, 208, 0.3)",
      show: true,
      yaxis: {
        lines: {
          show: false,
          opacity: 0.5,
        },
      },
      row: {
        opacity: 0.5,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#5E37FF", "#ff686b", "#E1E9F8"],
    },
    legend: {
      show: true,
    },
    colors: ["#5E37FF", "#ff686b", "#E1E9F8"],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "20px",
      },
    },
  };
  

  return (
    <Card align='center' direction='column' w='100%' {...rest}>
      <Flex align='center' w='100%' px='15px' py='10px'>
        <Text
          me='auto'
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          Ganancias anuales
        </Text>
        <DatePicker
          currentDate={year}
          onlyYearPicker
          onChange={(date) => setYear(date)}
        />
        <Button
          align='center'
          justifyContent='center'
          bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          w='37px'
          h='37px'
          lineHeight='100%'
          borderRadius='10px'
          {...rest}>
          <Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
        </Button>
      </Flex>

      <Box h='240px' mt='auto'>
       {dataTable.ok ? <BarChart
          chartData={barChartDataConsumption}
          chartOptions={barChartOptionsConsumption}
        /> : 
        <Spinner />}
      </Box>
    </Card>
  );
}
