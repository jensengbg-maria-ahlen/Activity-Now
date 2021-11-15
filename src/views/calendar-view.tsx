// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import '../Styles/_activity.scss';


const CalendarView: React.FC = () => {


    return (
        <div className="calendarDiv">
            <section>
                <h2>November</h2>
                <Link to="/createactivity">
                    <button>Add new activity</button>
                </Link>
            </section>
        </div>
    );
}
export default CalendarView;