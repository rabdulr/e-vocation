import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';

export default function ProfileCalendar(){

  let el;

  useEffect(() => {
    console.log(el.calendar)
  }, []);

  // render() {
    return (
      <FullCalendar 
       ref ={(ref)=>el=ref}
        dateClick = {()=>alert("clicked! WOW!!!")} 
        plugins={[ dayGridPlugin, interactionPlugin ]} 
      />
    )
  // }
}

