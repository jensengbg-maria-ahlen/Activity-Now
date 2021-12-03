// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import GetFromBackend from "../../hooks/getFromBackend";
import { useBreakpoint } from "./useBreakpoint";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./_calendar.scss";


const CalendarView: React.FC = () => {
    const { docs } = GetFromBackend("activities");
    const history = useHistory()
    const [events, setEvents] = useState([]);

    const queries = {
        xs: '(max-width: 320px)',
        sm: '(max-width: 720px)',
        md: '(max-width: 1024px)'
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
        <div className="calendar">
            <div className="calendar__content">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    eventClick={(e: EventClickArg) => history.push(`/chosen/${e.event.id}`)}
                />
                <section className="calendar__create">
                <button onClick={() => history.push("/createactivity")}>Create new</button>
            </section>
            </div>
        </div>
    );
}
export default CalendarView;