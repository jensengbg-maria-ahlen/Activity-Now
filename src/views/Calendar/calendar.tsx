// @ts-nocheck
import React from "react";
import { Link, useHistory } from "react-router-dom";
import {format, getDay, parse, startOfWeek} from "date-fns"
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import GetFromBackend from "../../hooks/getFromBackend";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./_calendar.scss";


const CalendarView: React.FC = () => {
    const { docs } = GetFromBackend("activities");
    const history = useHistory()
    const locales = {
        "en-eu": require("date-fns/locale/en-GB")
    }
    const localizer = dateFnsLocalizer({
        format, parse, startOfWeek, getDay, locales
    })

    const goToActivity = ({action, props}) => {
        console.log(action)
        console.log(props)

        //history.push(`/chosen/${doc.id}`)
    }

    return (
        <div className="calendarDiv">
            <section>
                <Link to="/createactivity">
                    <button>Add new activity</button>
                </Link>
            </section>
            <Calendar 
                localizer={localizer} 
                events={docs} 
                startAccessor="start" 
                endAccessor="end" 
                selectable
                style={{ height: 500, margin: "100px" }}
                onSelectSlot={goToActivity}
            />
        </div>
    );
}
export default CalendarView;