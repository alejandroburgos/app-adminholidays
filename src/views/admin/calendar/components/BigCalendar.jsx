import React, { useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/sass/styles.scss';
import { Text, Icon, Button, useColorModeValue } from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card.js";
import moment from "moment";
import 'moment/locale/es';
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { BsCircleFill } from "react-icons/bs";
import { CgLayoutGrid } from "react-icons/cg";
import {Year} from "./Year";

export default function BigCalendar(props) {
  const {events, ...rest } = props;

  const localizer = momentLocalizer(moment);
  const navigate = useNavigate();

  const handleEventSelection = (e) => {
    navigate.push({
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
          style={{ height: 500 }}
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
          views={{
            month: true,
          }}
          components={{ 
            toolbar: _props => <CustomToolbar {..._props} handleSelectSlot={handleSelectSlot} />,
            event: _props => {
            return (
              <div style={{display: 'flex'}}>
                  <BsCircleFill color={_props.event.randomColor} style={{marginRight: 5}}/>
                  {_props.event.nombre_viajero}
              </div>
            )
          }}
        }
      />
    </Card>
  );
}
const CustomToolbar = (toolbar) => {

    const brandColor = useColorModeValue("brand.500", "white");

  const goToBack = () => {
        toolbar.onNavigate('prev');
        toolbar.date.setMonth(moment(toolbar.date).subtract(1, 'month').month());
      
  };

  const goToNext = () => {
      toolbar.onNavigate('next');
          toolbar.date.setMonth(moment(toolbar.date).add(1, 'month').month());
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

  const goToYear = () => {
      toolbar.onView('year');
      weekView[0].classList.remove('active')
      monthView[0].classList.remove('active')
  };



  return (
    <div>
        <Text className="rbc-toolbar-label-big" color={brandColor}>{toolbar.label}</Text>
        <div className="rbc-toolbar">
            <span className="rbc-btn-group">
                <Button size="xl" onClick={goToBack} color={brandColor} ><ChevronLeftIcon /> </Button>
                <Button size="xl" onClick={goToCurrent} color={brandColor}>Hoy</Button>
                <Button size="xl" onClick={goToNext} color={brandColor}> <ChevronRightIcon /></Button>
            </span>

            {/* <span className="rbc-btn-group">
                <Button type="button" className="rbc-week-view rbc-toolbar active" onClick={goToYear}>Anual</Button>
                <Button type="button" className="rbc-months-view rbc-toolbar" onClick={goToMonth}>Mes</Button>
            </span> */}
        </div>
      </div>
  );
}