// @ts-nocheck
import React from "react";
import YourActivity from "../../Components/Landing/yourActivities"
import FollowedTopics from "../../Components/Landing/followedTopics";
import HotTopics from "../../Components/Landing/hotTopics";
import { useAuth } from '../../hooks/authentication'

import './_home.scss';

const Home: React.FC = () => {
    const currentUser = useAuth();
    return (
        <>
            <h3>Welcome, { currentUser?.email }</h3>
            <article className="mainLand">
               
                <YourActivity />
                <FollowedTopics />
                <HotTopics />
            </article>
        </>
    );
}
export default Home;