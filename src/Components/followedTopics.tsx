import * as React from "react";
import { auth } from "../firebase-config";
//import { Link } from "react-router-dom";
import '../Styles/_landing.scss';


const FollowedTopics: React.FC = () => {

    return (
        <>
            <div>
                    <h3 className="greenHeader">Topics you follow</h3>
                    <div className="midDiv">
                        <article className="landingArt">
                            <h4 className="redHeader">11/11</h4>
                            <p className="activity">Tea-party!</p>
                        </article>
                    </div>
                </div>
        </>
    );
}
export default FollowedTopics;