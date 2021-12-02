// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import GetFromBackend from "../../hooks/getFromBackend";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./_calendar.scss";


const CalendarView: React.FC = () => {
    const { docs } = GetFromBackend("activities");
    const history = useHistory()
    const [events, setEvents] = useState([]);
    
    const goToEvent = (e) => {
        console.log(e.event)
    }

    useEffect(() => {
        if (docs) {
            const item = [...docs].map((obj) => {
                return {
                    title: obj.title, 
                    start: obj.start,
                    end: obj.end,
                    id: obj.id,
                }
            })
            setEvents(item)
        }
    }, [docs])

    return (
        <div className="calendarDiv">
            <section>
                <Link to="/createactivity">
                    <button>Add new activity</button>
                </Link>
            </section>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventClick={(e) => goToEvent(e)}
            />

        </div>
    );
}
export default CalendarView;