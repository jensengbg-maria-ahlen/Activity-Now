// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import GetFromBackend from "../../hooks/getFromBackend";
import { useBreakpoint } from "../../Components/Breakpoint/useBreakpoint";
import "./_calendar.scss";
import "../../Styles/_buttons.scss"

const CalendarView: React.FC = () => {
    const { docs } = GetFromBackend("activities");
    const history = useHistory();
    const [events, setEvents] = useState([]);
    const breakpoints = useBreakpoint();

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
    }, [docs, breakpoints])

    return (
        <div className="calendar">
            <div className="calendar__content">
                {breakpoints.xsMax ? (
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                        initialView="listMonth"
                        firstDay={1}
                        events={events}
                        noEventsText="No Events to display"
                        eventClick={(e: EventClickArg) => history.push(`/chosen/${e.event.id}`)}
                    />
                ) : null}
                {breakpoints.smMin && breakpoints.smMax ? (
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                        initialView="dayGridWeek"
                        firstDay={1}
                        events={events}
                        eventClick={(e: EventClickArg) => history.push(`/chosen/${e.event.id}`)}
                    />
                ) : null}
                {breakpoints.mdMin && breakpoints.mdMax ? (
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                        initialView="dayGridWeek"
                        firstDay={1}
                        events={events}
                        eventClick={(e: EventClickArg) => history.push(`/chosen/${e.event.id}`)}
                    />
                ) : null}
                {breakpoints.lgMin && breakpoints.lgMax ? (
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                        initialView="dayGridMonth"
                        firstDay={1}
                        events={events}
                        eventClick={(e: EventClickArg) => history.push(`/chosen/${e.event.id}`)}
                    />
                ) : null}
                {breakpoints.xlMin ? (
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                        initialView="dayGridMonth"
                        firstDay={1}
                        events={events}
                        eventClick={(e: EventClickArg) => history.push(`/chosen/${e.event.id}`)}
                    />
                ) : null}
                <section className="calendar__create">
                    <button onClick={() => history.push("/createactivity")}>Create new</button>
                </section>
            </div>
        </div>
    );
}
export default CalendarView;