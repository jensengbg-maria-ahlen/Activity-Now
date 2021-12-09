// @ts-nocheck
import React from "react";
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
            <div className="home__content">
                <YourActivity />
                <FollowedTopics />
                <HotTopics />
                <CookieConsent
                    location="bottom"
                    buttonText="Accept cookies"
                    cookieName="ActivityToday Cookie"
                    style={{ background: "#2B373B"  }}
                    debug={true}
                    buttonStyle={{color: "#171E20", background: "#87BA77", fontSize: "13px" }}
                    expires={150}
                    enableDeclineButton
                    declineButtonStyle= {{color: "#171E20", background: '#F75031' }}
                    onDecline={() => {
                        
                      console.log('no cookies, user declined');
                    }}
                    className="paragraph paragraph--small"
                >
                    This website uses cookies to enhance the user experience.
                </CookieConsent>
            </div>
        </div>
    );
}
export default Home;