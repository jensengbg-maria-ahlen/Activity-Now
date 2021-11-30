// @ts-nocheck
import React from "react";
import {Link} from 'react-router-dom'
import Chosen from "../../Components/Activities/chosenActivity";

const ChosenActivity: React.FC = () => {
    return (
        <>
        <Link to={`/chosen/${activity.id}`}>
            <Chosen />
        </Link>
        </>
    );
}
export default ChosenActivity;