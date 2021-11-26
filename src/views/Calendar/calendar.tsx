// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./_calendar.scss";
import GetFromBackend from "../../hooks/getFromBackend";

const CalendarView: React.FC = () => {

    function fetchEvents() {

    }
    const { docs } = GetFromBackend("cattest");
    const locales = {
        "en-eu": require("date-fns/locale/en-GB")
    }
    const localizer = dateFnsLocalizer({
        format, parse, startOfWeek, getDay, locales
    })

    const events = [
        {
            title: "Big Meeting",
            allDay: true,
            start: new Date(2021, 11, 0),
            end: new Date(2021, 11, 0),
        }
    ];
    /*{docs && docs.map((doc) => (
        <div key={doc.id}>
            <h1>Name: {doc.name}</h1>
        </div>
    ))} */
    return (
        <div className="calendarDiv">
            <section>
                <Link to="/createactivity">
                    <button>Add new activity</button>
                </Link>
            </section>
            <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "100px" }} />
        </div>
    );
}
export default CalendarView;