import React, { useEffect, useState } from 'react'
import { Calendar } from '@fullcalendar/core'
// import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment'

function ProfileCalendar({auth, posts, setFocus}){
  let calendarEl;//the div for the calendar

  const [ events, setEvents ] = useState([]);//the events
  const [ calendar, setCalendar] = useState({});//the calendar!

  const setUpCalendar = ()=> {
    const _calendar = new Calendar(calendarEl, {
      plugins: [ dayGridPlugin, interactionPlugin ],
      eventClick: (what) => setFocus(what.event._def.publicId)
    });
    _calendar.render();
    //console.log(calendar);
    setCalendar(_calendar);
  };

  useEffect(()=>{
    setEvents(posts.filter(post=>(post.userId === auth.id || post.acceptedId === auth.id)).map(pozt => {
      if(pozt.userId === auth.id){
        return({
          id: pozt.id,
          title: pozt.title,
          start: moment(pozt.startDate).format('YYYY-MM-DD'),
          end: moment(pozt.endDate).format('YYYY-MM-DD'),
          url: `#post/${pozt.id}`,
          color: 'blue',
        })
      } else {
        return({
          id: pozt.id,
          title: pozt.title,
          start: moment(pozt.startDate).format('YYYY-MM-DD'),
          end: moment(pozt.endDate).format('YYYY-MM-DD'),
          url: `#post/${pozt.id}`,
          color: 'orange',
        })
      }
    }))
    console.log(posts)
    console.log(events)
  }, [calendar]);

  useEffect(()=> {
    //if(calendar.addEvent){
      events.forEach( event => calendar.addEvent(event));
    //}
  }, [calendar]);

  useEffect(setUpCalendar, []);

  return (
    <div ref={ ref => calendarEl = ref } ></div>
  );
}

export default ProfileCalendar;