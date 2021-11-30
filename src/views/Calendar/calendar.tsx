// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import GetFromBackend from "../../hooks/getFromBackend";


const CalendarView: React.FC = () => {

    function fetchEvents() {

    }
    const { docs } = GetFromBackend("cattest");

    /*{docs && docs.map((doc) => (
        <div key={doc.id}>
            <h1>Name: {doc.name}</h1>
        </div>
    ))} */
        const today = new Date();

    return (
        <div className="calendarDiv">
            <section>
                <Link to="/createactivity">
                    <button>Add new activity</button>
                </Link>
            </section>
           
        </div>
    );
}
export default CalendarView;