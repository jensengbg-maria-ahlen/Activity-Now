// @ts-nocheck
import React from "react";
import { useAuth } from '../../hooks/authentication'
import YourActivity from "../../Components/HomePage/yourActivities"
import FollowedTopics from "../../Components/HomePage/followedTopics";
import HotTopics from "../../Components/HomePage/hotTopics";

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
            </div>
        </div>
    );
}
export default Home;