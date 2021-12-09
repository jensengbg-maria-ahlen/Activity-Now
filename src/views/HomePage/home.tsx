// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../../hooks/authentication'
import YourActivity from "../../Components/HomePage/yourActivities"
import FollowedTopics from "../../Components/HomePage/followedTopics";
import HotTopics from "../../Components/HomePage/hotTopics";
import CookieConsent from "react-cookie-consent";

import './_home.scss';

const Home: React.FC = () => {
    const currentUser = useAuth();

    return (
        <div className="home">
            <h1 className="title title--h1">Welcome, <span className="title title--bold">{currentUser?.displayName}</span></h1>
            <CookieConsent
                location="bottom"
                buttonText="I accept"
                cookieName="ActivityToday Cookie"
                disableStyles={true}
                debug={true}
                expires={150}
                enableDeclineButton
                onDecline={() => {
                    console.log('no cookies, user declined');
                }}
            >
                <div className="CookieConsent__content">
                    <p className="paragraph paragraph--bold">We use cookies</p>
                    <p className="paragraph paragraph--small">We use and analyze cookies in order to be able to optimize this page for you. <br /> By clicking <span className="paragraph--bold orange">"I accept"</span>, you approve our use of cookies.</p>
                    <p className="paragraph paragraph--small">Read more about how we use cookies <Link to={"/cookie"}><span className="paragraph--bold">here.</span></Link></p>
                </div>
            </CookieConsent>
            <div className="home__content">
                <YourActivity />
                <FollowedTopics />
                <HotTopics />
            </div>
        </div>
    );
}
export default Home;