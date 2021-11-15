import * as React from "react";
import { auth } from "../firebase-config";
//import { Link } from "react-router-dom";
import '../Styles/_landing.scss';


const YourActivity: React.FC = () => {

    return (
        <>
            <div>
                    <h3 className="orangeHeader">Your activities</h3>
                    <div className="greenDiv">
                        <article className="landingArt">
                            <h4>11/11</h4>
                            <p className="activity">Tea-party!</p>
                        </article>
                    </div>
                </div>
        </>
    );
}
export default YourActivity;