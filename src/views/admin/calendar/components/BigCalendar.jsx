import React, { useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/sass/styles.scss';
import { Text, Icon, Button } from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card.js";
import moment from "moment";
import 'moment/locale/es';
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export default function BigCalendar(props) {
  const {events, ...rest } = props;

  const localizer = momentLocalizer(moment);
  
  const handleEventSelection = (e) => {
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


  return (
    <div>
        <span className="rbc-toolbar-label-big">{toolbar.label}</span>
        <div className="rbc-toolbar">
            <span className="rbc-btn-group">
                <Button size="xl" onClick={goToBack}><ChevronLeftIcon /> </Button>
                <Button size="xl" onClick={goToCurrent}>Hoy</Button>
                <Button size="xl" onClick={goToNext}> <ChevronRightIcon /></Button>
            </span>

            {/* <span className="rbc-btn-group">
                <button type="button" className="rbc-week-view" onClick={goToWeek}>Semana</button>
                <Button type="button" className="rbc-week-view rbc-toolbar active" onClick={goToWeek}>Semana</Button>
                <Button type="button" className="rbc-months-view rbc-toolbar" onClick={goToMonth}>Mes</Button>
            </span> */}
        </div>
      </div>
  );
}