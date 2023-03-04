import React, { useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/sass/styles.scss';
import "assets/css/MiniCalendar.css";

import { Text, Icon, Button, useColorModeValue } from "@chakra-ui/react";
// Chakra imports
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// Custom components
import Card from "components/card/Card.js";
import moment from "moment";
import 'moment/locale/es';
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
export default function MiniCalendar(props) {
  const {events, ...rest } = props;

  const localizer = momentLocalizer(moment);
  const history = useHistory();
  
  const handleEventSelection = (e) => {
    console.log(e)
    history.push({
        pathname: `/admin/reserva/${e.localizador}`,
        state: { book: e }
    })  
  }
    
  const handleSelectSlot = (e) => {  
     
  }
  const eventStyleGetter = (e) => {
    return {
        style: {
            backgroundColor: e.color,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
        }
    }
  }
  return (
    <Card
      align='center'
      direction='column'
      w='100%'
      maxW='max-content'
      p='20px 15px'
      h='max-content'
      {...rest}>
      <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 280 }}
          events={events}
          defaultView="month"
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleEventSelection} 
          onSelectSlot={handleSelectSlot}
          popup
          selectable
          messages={{
              month: 'Mes',
              day: 'Días',
              today: 'Hoy',
              week: 'Semana',
              previous: "Atras",
              back: 'Atrás',
              next: 'Siguiente',
              noEventsInRange: 'No hay eventos en este rango.',
              allDay: 'Todo el día',
              date: 'Fecha',
              time: 'Hora',
              event: 'Evento',
              work_week: 'Semana laboral',
              showMore: total => `+ Ver más (${total})`    
          }}
          views={['month', 'week']}
          components={{ toolbar: _props => <CustomToolbar {..._props} handleSelectSlot={handleSelectSlot} />,
          }}
      />
      {/* <Calendar
      tileClassName={({ date, view }) => {
        if(value.find(x=>x===moment(date).format("DD/MM/YYYY"))){
        return  'highlight'
        }
      }}
        onChange={onChange}
        value={new Date()}
        selectRange={true}
        view={"month"}
        disabled={true}
        selectMultiple={true}
        tileContent={<Text color='brand.500'></Text>}
        prevLabel={<Icon as={MdChevronLeft} w='24px' h='24px' mt='4px' />}
        nextLabel={<Icon as={MdChevronRight} w='24px' h='24px' mt='4px' />}
      /> */}
    </Card>
  );
}
const CustomToolbar = (toolbar) => {

  const goToBack = () => {
      toolbar.onNavigate('prev');
      if (toolbar.view === 'month'){
          toolbar.date.setMonth(toolbar.date.getMonth() - 1);
      } else if (toolbar.view === 'week'){
          toolbar.date.setDate(toolbar.date.getDate() - 7);
      } 
  };

  const goToNext = () => {
      toolbar.onNavigate('next');
      if (toolbar.view === 'month'){
          toolbar.date.setMonth(toolbar.date.getMonth() + 1);
      } else if (toolbar.view === 'week'){
          toolbar.date.setDate(toolbar.date.getDate() + 7);
      }
  };

  const goToCurrent = () => {
      const today = new Date();
      toolbar.onNavigate('current', today);
  };

  const monthView = document.getElementsByClassName('rbc-months-view')
  const weekView = document.getElementsByClassName('rbc-week-view')

  const goToMonth = () => {
      toolbar.onView('month');
      monthView[0].classList.add('active')
      weekView[0].classList.remove('active')
  };

  const goToWeek = () => {
      toolbar.onView('week');
      weekView[0].classList.add('active')
      monthView[0].classList.remove('active')
  };

  const textColor = useColorModeValue('secondaryGray.900', 'white');

  return (
      <div className="rbc-toolbar">
          <Text className="rbc-btn-group" color={textColor}>
              <Button size="xs" colorScheme={textColor} onClick={goToBack}><ChevronLeftIcon /> </Button>
              <Button size="xs" colorScheme={textColor} onClick={goToCurrent}>Hoy</Button>
              <Button size="xs" colorScheme={textColor} onClick={goToNext}> <ChevronRightIcon /></Button>
          </Text>
          <Text className="rbc-toolbar-label" color={textColor}>{toolbar.label}</Text>

          {/* <span className="rbc-btn-group">
              <button type="button" className="rbc-week-view" onClick={goToWeek}>Semana</button>
              <Button type="button" className="rbc-week-view rbc-toolbar active" onClick={goToWeek}>Semana</Button>
              <Button type="button" className="rbc-months-view rbc-toolbar" onClick={goToMonth}>Mes</Button>
          </span> */}
      </div>
  );
}